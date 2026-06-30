let jobStatus = "Scheduled";
let engineerNotes = "";
let polishedReport = "";
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
      <h2>Engineer Notes</h2>

      <textarea id="engineerNotes" placeholder="Type what happened on site..." style="width:100%;height:140px;padding:14px;border-radius:12px;border:1px solid #ddd;box-sizing:border-box;">${engineerNotes}</textarea>

      <button class="button" onclick="rephraseReport()">AI Rephrase Report</button>

      <hr>

      <p><strong>Professional Report:</strong></p>
      <p>${polishedReport || "No professional report generated yet."}</p>

      <hr>

      <p><strong>Parts used</strong></p>
      <button class="button secondary" onclick="showPartsPage()">Open Parts Used</button>
      <p>${partsUsed || "No parts added yet"}</p>

      <p><strong>Follow-up required?</strong></p>
      <button class="button secondary" onclick="setFollowUp('No')">No</button>
      <button class="button secondary" onclick="setFollowUp('Yes')">Yes</button>
      <p>${followUpRequired}</p>

      <button class="button" onclick="submitReport()">Submit Report</button>
      <button class="button secondary" onclick="showJob()">Back</button>
    </div>
  `;
}

function rephraseReport() {
  engineerNotes = document.getElementById("engineerNotes").value;

  if (engineerNotes.trim() === "") {
    alert("Please type the engineer notes first.");
    return;
  }

  polishedReport =
    "Attended site and inspected the dock leveller. " +
    "The reported issue was assessed and the necessary works were carried out. " +
    "The equipment was tested following completion and left operating correctly. " +
    "Engineer notes: " + engineerNotes;

  showReport();
}

function showPartsPage() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Parts Used</h1>
      <p>Zero typing parts workflow</p>
    </div>

    <div class="card">
      <h2>Add Parts</h2>

      <button class="button" onclick="showScannerPage()">📷 Scan Part</button>
      <button class="button secondary" onclick="showVanStockPage()">🔍 Search Van Stock</button>

      <hr>

      <p><strong>Recent Parts</strong></p>
      <button class="button secondary" onclick="addPart('DL500-014 Top Hinge')">DL500-014 Top Hinge</button>
      <button class="button secondary" onclick="addPart('DL500-001 Hydraulic Oil')">DL500-001 Hydraulic Oil</button>
      <button class="button secondary" onclick="addPart('SA250V Control Fuse')">SA250V Control Fuse</button>

      <hr>

      <p><strong>Manual Entry</strong></p>
      <input id="manualPart" placeholder="Enter part number or description" style="width:100%;padding:14px;border-radius:12px;border:1px solid #ddd;box-sizing:border-box;">
      <button class="button" onclick="addManualPart()">Add Manual Part</button>

      <hr>

      <p><strong>Current parts used:</strong></p>
      <p>${partsUsed || "No parts added yet"}</p>

      <button class="button secondary" onclick="showReport()">Back to Report</button>
    </div>
  `;
}

function showScannerPage() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>AI Part Scanner</h1>
      <p>Coming soon</p>
    </div>

    <div class="card">
      <h2>📷 Point camera at part</h2>
      <p>Later, this will use AI to identify parts from an image.</p>

      <button class="button" onclick="addPart('AI Detected Part - Demo')">Add Demo AI Part</button>
      <button class="button secondary" onclick="showPartsPage()">Back</button>
    </div>
  `;
}

function showVanStockPage() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Van Stock</h1>
      <p>Select from van stock</p>
    </div>

    <div class="card">
      <h2>Available Parts</h2>

      <button class="button secondary" onclick="addPart('DL500-014 Top Hinge')">🔩 DL500-014 Top Hinge - Qty 4</button>
      <button class="button secondary" onclick="addPart('DL500-001 Hydraulic Oil')">🛢 DL500-001 Hydraulic Oil - Qty 2</button>
      <button class="button secondary" onclick="addPart('SA250V Control Fuse')">🔌 SA250V Control Fuse - Qty 5</button>

      <button class="button secondary" onclick="showPartsPage()">Back</button>
    </div>
  `;
}

function addPart(part) {
  partsUsed = part;
  showPartsPage();
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

function setFollowUp(answer) {
  followUpRequired = answer;
  showReport();
}

function submitReport() {
  if (polishedReport.trim() === "") {
    alert("Please use AI Rephrase Report before submitting.");
    return;
  }

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