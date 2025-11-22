/*
  assets/js/main.js
  - ES module that initializes Firebase (Firestore) when configured
  - Handles registration form (save to Firestore), generates row preview
  - Fetches students collection and renders table (realtime when available)
  - Adds client-side search/filter and mobile nav toggle

  IMPORTANT: Replace the firebaseConfig placeholder below with your project's
  actual config values from the Firebase console. If you don't configure
  Firebase, the UI will still work client-side for preview and search.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ----- Firebase config (REPLACE with your values) -----
const firebaseConfig = {
  // Example placeholder - replace these with your project's settings
  // apiKey: "YOUR_API_KEY",
  // authDomain: "your-project.firebaseapp.com",
  // projectId: "your-project-id",
};

let db = null;
try {
  if (firebaseConfig && Object.keys(firebaseConfig).length) {
    initializeApp(firebaseConfig);
    db = getFirestore();
    console.log("Firebase initialized");
  } else {
    console.warn("Firebase configuration object is empty. Firestore will be disabled until configured.");
  }
} catch (err) {
  console.warn("Firebase init error:", err.message || err);
}

// ----- UI helpers -----
function qs(id) {
  return document.getElementById(id);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateRowHtml({ fullName, domain, techStack, portfolioUrl, githubUrl, resumeUrl }) {
  const p = portfolioUrl ? `<a href="${escapeHtml(portfolioUrl)}" target="_blank" rel="noopener">View</a>` : "";
  const g = githubUrl ? `<a href="${escapeHtml(githubUrl)}" target="_blank" rel="noopener">GitHub</a>` : "";
  const r = resumeUrl ? `<a href="${escapeHtml(resumeUrl)}" target="_blank" rel="noopener">📄</a>` : "";

  return `
<tr>
  <td>${escapeHtml(fullName)}</td>
  <td>${escapeHtml(domain)}</td>
  <td>${escapeHtml(techStack)}</td>
  <td>${p}</td>
  <td>${g}</td>
  <td>${r}</td>
</tr>`;
}

// ----- Firestore actions -----
async function saveStudent(data) {
  if (!db) throw new Error("Firestore not configured");
  const docRef = await addDoc(collection(db, "students"), {
    fullName: data.fullName || "",
    domain: data.domain || "",
    techStack: data.techStack || "",
    portfolioUrl: data.portfolioUrl || "",
    githubUrl: data.githubUrl || "",
    resumeUrl: data.resumeUrl || "",
    createdAt: serverTimestamp(),
  });
  return docRef;
}

function listenStudents(onUpdate) {
  if (!db) return null;
  const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const rows = [];
    snapshot.forEach((doc) => {
      rows.push({ id: doc.id, ...doc.data() });
    });
    onUpdate(rows);
  });
}

async function fetchStudentsOnce() {
  if (!db) return [];
  const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const rows = [];
  snap.forEach((d) => rows.push({ id: d.id, ...d.data() }));
  return rows;
}

// ----- Render functions -----
function renderStudentsTable(rows) {
  const tbody = document.querySelector("#studentsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">No student entries yet.</td></tr>`;
    return;
  }
  for (const s of rows) {
    const tr = document.createElement("tr");
    const portfolioLink = s.portfolioUrl ? `<a href="${escapeHtml(s.portfolioUrl)}" target="_blank" rel="noopener">View</a>` : "";
    const githubLink = s.githubUrl ? `<a href="${escapeHtml(s.githubUrl)}" target="_blank" rel="noopener">GitHub</a>` : "";
    const resumeLink = s.resumeUrl ? `<a href="${escapeHtml(s.resumeUrl)}" target="_blank" rel="noopener">📄</a>` : "";

    tr.innerHTML = `
      <td>${escapeHtml(s.fullName || "")}</td>
      <td>${escapeHtml(s.domain || "")}</td>
      <td>${escapeHtml(s.techStack || "")}</td>
      <td>${portfolioLink}</td>
      <td>${githubLink}</td>
      <td>${resumeLink}</td>
    `;
    tbody.appendChild(tr);
  }
}

// ----- Page behavior -----
document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = qs("navToggle");
  const navLinks = qs("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
  }

  // Registration form
  const form = qs("registerForm");
  if (form) {
    const fullName = qs("fullName");
    const domain = qs("domain");
    const techStack = qs("techStack");
    const portfolioUrl = qs("portfolioUrl");
    const githubUrl = qs("githubUrl");
    const resumeUrl = qs("resumeUrl");
    const previewBtn = qs("previewBtn");
    const rowPreview = qs("rowPreview");
    const formMessage = qs("formMessage");

    function gather() {
      return {
        fullName: fullName.value.trim(),
        domain: domain.value.trim(),
        techStack: techStack.value.trim(),
        portfolioUrl: portfolioUrl.value.trim(),
        githubUrl: githubUrl.value.trim(),
        resumeUrl: resumeUrl.value.trim(),
      };
    }

    if (previewBtn) {
      previewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const data = gather();
        rowPreview.textContent = generateRowHtml(data);
      });
    }

    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      formMessage.textContent = "";
      const data = gather();
      if (!data.fullName || !data.domain || !data.techStack) {
        formMessage.style.color = "#b91c1c";
        formMessage.textContent = "Please fill required fields (name, domain, tech stack).";
        return;
      }

      try {
        if (!db) throw new Error("Firestore not configured. Set firebaseConfig in assets/js/main.js.");
        await saveStudent(data);
        formMessage.style.color = "green";
        formMessage.textContent = "Saved — thank you! Your entry will appear shortly.";
        rowPreview.textContent = generateRowHtml(data);
        form.reset();
      } catch (err) {
        formMessage.style.color = "#b91c1c";
        formMessage.textContent = err.message || String(err);
      }
    });
  }

  // Students listing: realtime if possible, otherwise try one-time fetch
  const studentsTable = qs("studentsTable");
  if (studentsTable) {
    if (db) {
      listenStudents((rows) => renderStudentsTable(rows));
    } else {
      // leave sample rows; optionally try a one-time fetch (no-op if db not configured)
      fetchStudentsOnce()
        .then((rows) => {
          if (rows && rows.length) renderStudentsTable(rows);
        })
        .catch(() => {});
    }

    // Client-side search (works whether rows came from Firestore or are static)
    const studentSearchInput = qs("studentSearch");
    if (studentSearchInput) {
      studentSearchInput.addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        const tbody = studentsTable.querySelector("tbody");
        if (!tbody) return;
        const rows = Array.from(tbody.querySelectorAll("tr"));
        for (const r of rows) {
          const text = r.innerText.toLowerCase();
          r.style.display = text.indexOf(filter) > -1 ? "" : "none";
        }
      });
    }
  }
});

export { saveStudent, generateRowHtml, fetchStudentsOnce };
