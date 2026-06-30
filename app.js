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
      <button class="button secondary" onclick="setParts('None')">No parts used</button>
      <button class="button secondary" onclick="setParts('DL500-001 Hydraulic Oil')">Hydraulic Oil</button>
      <button class="button secondary" onclick="setParts('DL500-014 Top Hinge')">Top Hinge</button>

      <p><strong>Follow-up required?</strong></p>
      <button class="button secondary" onclick="setFollowUp('No')">No</button>
      <button class="button secondary" onclick="setFollowUp('Yes')">Yes</button>

      <hr>

      <p><strong>Report:</strong></p>
      <p>${reportText || "No report selected yet"}</p>

      <p><strong>Parts:</strong></p>
      <p>${partsUsed || "No parts selected yet"}</p>

      <p><strong>Follow-up:</strong></p>
      <p>${followUpRequired}</p>

      <button class="button" onclick="submitReport()">Submit Report</button>
      <button class="button secondary" onclick="showJob()">Back</button>
    </div>
  `;
}

function setReport(text) {
  reportText = text;
  showReport();
}

function setParts(parts) {
  partsUsed = parts;
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