let jobStatus = "Scheduled";
let reportText = "";
let partsUsed = "";
let followUpRequired = "No";

function showHome() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Good morning Scott 👋</h1>
      <p>Engineer Dashboard</p>
    </div>

    <div class="card">
      <h2>Today's First Job</h2>
      <p><strong>Tesco Reading</strong></p>
      <p>Dock Leveller DL500</p>
      <p>09:00</p>
      <p><span class="status">${jobStatus}</span></p>
      <button class="button" onclick="showJob()">View Details</button>
    </div>
  `;
}

function showJob() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Job Details</h1>
    </div>

    <div class="card">
      <h2>Tesco Reading</h2>
      <p>Dock Leveller DL500</p>
      <p class="status">${jobStatus}</p>
      <button class="button" onclick="startJourney()">Start Journey</button>
      <button class="button" onclick="arrivedOnSite()">Arrived On Site</button>
      <button class="button" onclick="showReport()">Complete Report</button>
      <button class="button secondary" onclick="showHome()">Back</button>
    </div>
  `;
}

function showReport() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Job Report</h1>
      <p>Tesco Reading</p>
    </div>

    <div class="card">
      <h2>Quick Report</h2>

      <p><strong>Work completed</strong></p>
      <button class="button secondary" onclick="setReport('Inspected dock leveller, completed safety checks and tested operation successfully.')">
        Inspection completed
      </button>
      <button class="button secondary" onclick="setReport('Repaired fault on dock leveller and confirmed unit is operating correctly.')">
        Repair completed
      </button>
      <button class="button secondary" onclick="setReport('Unable to complete repair. Further parts or follow-up visit required.')">
        Follow-up required
      </button>

      <p><strong>Parts used</strong></p>
      <button class="button secondary" onclick="showPartsPage()">Open Parts Used</button>
      <p>${partsUsed || "No parts added yet"}</p>

      <p><strong>Follow-up required?</strong></p>
      <button class="button secondary" onclick="setFollowUp('No')">No</button>
      <button class="button secondary" onclick="setFollowUp('Yes')">Yes</button>

      <hr>

      <p><strong>Report:</strong></p>
      <p>${reportText || "No report selected yet"}</p>

      <p><strong>Follow-up:</strong></p>
      <p>${followUpRequired}</p>

      <button class="button" onclick="submitReport()">Submit Report</button>
      <button class="button secondary" onclick="showJob()">Back</button>
    </div>
  `;
}

function showPartsPage() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Parts Used</h1>
      <p>Future AI parts recognition</p>
    </div>

    <div class="card">
      <h2>Add Parts</h2>

      <button class="button">📷 AI Image Recognition Coming Soon</button>

      <p><strong>Manual part input</strong></p>
      <input id="manualPart" placeholder="Enter part number or description" style="width:100%;padding:14px;border-radius:12px;border:1px solid #ddd;box-sizing:border-box;">

      <button class="button" onclick="addManualPart()">Add Manual Part</button>

      <p><strong>Current parts used:</strong></p>
      <p>${partsUsed || "No parts added yet"}</p>

      <button class="button secondary" onclick="showReport()">Back to Report</button>
    </div>
  `;
}

function addManualPart() {
  const input = document.getElementById("manualPart").value;

  if (input.trim() === "") {
    alert("Please enter a part first.");
    return;
  }

  partsUsed = input;
  showPartsPage();
}

function setReport(text) {
  reportText = text;
  showReport();
}

function setFollowUp(answer) {
  followUpRequired = answer;
  showReport();
}

function submitReport() {
  jobStatus = "Completed";
  showHome();
}

function startJourney() {
  jobStatus = "Travelling";
  showJob();
}

function arrivedOnSite() {
  jobStatus = "On Site";
  showJob();
}

showHome();