// Mobile nav toggl// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgqUJvKCwJxUbZbbatC7rrkvId4mVj8Pk",
    authDomain: "portfolio-hub-e2bff.firebaseapp.com",
      projectId: "portfolio-hub-e2bff",
        storageBucket: "portfolio-hub-e2bff.firebasestorage.app",
          messagingSenderId: "27782433690",
            appId: "1:27782433690:web:1215a44213312040c6c823",
              measurementId: "G-Y8RJ0DJK4Z"
              };

              // Initialize Firebase
              const app = initializeApp(firebaseConfig);
              const analytics = getAnalytics(app);

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Simple search filter on students page
const studentSearchInput = document.getElementById("studentSearch");
const studentsTable = document.getElementById("studentsTable");

if (studentSearchInput && studentsTable) {
  studentSearchInput.addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const rows = studentsTable.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) { // skip header row
      const cells = rows[i].getElementsByTagName("td");
      let rowText = "";
      for (let c = 0; c < cells.length; c++) {
        rowText += cells[c].innerText.toLowerCase() + " ";
      }
      if (rowText.indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  });
}