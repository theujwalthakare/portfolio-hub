// Mobile nav toggle
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