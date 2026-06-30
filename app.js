let jobStatus = "Scheduled";
let workflowStep = "home";
let engineerNotes = "";
let polishedReport = "";
let partsUsed = "No parts added";
let photosTaken = "Not added";

let risks = {
  slipsTrips: "",
  movingVehicles: "",
  workingAtHeight: "",
  electricalHazards: "",
  manualHandling: "",
  publicArea: ""
};

function render() {
  if (workflowStep === "home") showHome();
  if (workflowStep === "travelling") showTravelling();
  if (workflowStep === "risk") showRiskAssessment();
  if (workflowStep === "riskSummary") showRiskSummary();
  if (workflowStep === "onsite") showOnSite();
  if (workflowStep === "photos") showPhotos();
  if (workflowStep === "parts") showParts();
  if (workflowStep === "notes") showNotes();
  if (workflowStep === "review") showReview();
}

function showHome() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Good morning Scott 👋</h1>
      <p>Next action</p>
    </div>

    <div class="card">
      <h2>Tesco Reading</h2>
      <p><strong>Dock Leveller DL500</strong></p>
      <p>09:00 · Priority: High</p>
      <p class="status">${jobStatus}</p>
      <button class="button" onclick="startJourney()">Start Journey</button>
    </div>
  `;
}

function showTravelling() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling</h1>
      <p>Tesco Reading</p>
    </div>

    <div class="card">
      <h2>Estimated arrival</h2>
      <p style="font-size:32px;"><strong>08:57</strong></p>
      <p class="status">Travelling</p>
      <button class="button" onclick="arrivedOnSite()">Arrived On Site</button>
    </div>
  `;
}

function showRiskAssessment() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Risk Assessment</h1>
      <p>Before starting work</p>
    </div>

    <div class="card">
      <h2>Site Risks</h2>

      ${riskRow("slipsTrips", "Slips, trips or poor housekeeping")}
      ${riskRow("movingVehicles", "Moving vehicles / forklift traffic")}
      ${riskRow("workingAtHeight", "Working at height")}
      ${riskRow("electricalHazards", "Electrical hazards")}
      ${riskRow("manualHandling", "Manual handling risk")}
      ${riskRow("publicArea", "Public or customer area nearby")}

      <button class="button" onclick="generateRiskSummary()">Generate Risk Form</button>
    </div>
  `;
}

function riskRow(key, label) {
  return `
    <div style="margin-bottom:18px;">
      <p><strong>${label}</strong></p>
      <button class="button secondary" onclick="setRisk('${key}', 'Yes')">Yes</button>
      <button class="button secondary" onclick="setRisk('${key}', 'No')">No</button>
      <button class="button secondary" onclick="setRisk('${key}', 'N/A')">N/A</button>
      <p class="status">${risks[key] || "Not answered"}</p>
    </div>
  `;
}

function setRisk(key, answer) {
  risks[key] = answer;
  showRiskAssessment();
}

function generateRiskSummary() {
  workflowStep = "riskSummary";
  render();
}

function showRiskSummary() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Risk Form</h1>
      <p>Generated assessment</p>
    </div>

    <div class="card">
      <h2>Risk Assessment Summary</h2>

      <p><strong>Site:</strong> Tesco Reading</p>
      <p><strong>Equipment:</strong> Dock Leveller DL500</p>

      <hr>

      <p><strong>Slips/trips:</strong> ${risks.slipsTrips || "Not answered"}</p>
      <p><strong>Moving vehicles:</strong> ${risks.movingVehicles || "Not answered"}</p>
      <p><strong>Working at height:</strong> ${risks.workingAtHeight || "Not answered"}</p>
      <p><strong>Electrical hazards:</strong> ${risks.electricalHazards || "Not answered"}</p>
      <p><strong>Manual handling:</strong> ${risks.manualHandling || "Not answered"}</p>
      <p><strong>Public/customer area:</strong> ${risks.publicArea || "Not answered"}</p>

      <hr>

      <p><strong>Control Measures:</strong></p>
      <p>Engineer to assess site conditions before starting work, maintain a safe working area, use appropriate PPE, and stop work if conditions become unsafe.</p>

      <button class="button" onclick="workflowStep='onsite'; render()">Confirm & Start Work</button>
      <button class="button secondary" onclick="workflowStep='risk'; render()">Edit Assessment</button>
    </div>
  `;
}

function showOnSite() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>On Site</h1>
      <p>Tesco Reading</p>
    </div>

    <div class="card">
      <h2>Quick Actions</h2>
      <button class="button secondary" onclick="workflowStep='parts'; render()">📷 Scan / Add Parts</button>
      <button class="button secondary" onclick="workflowStep='photos'; render()">📸 Add Photos</button>
      <button class="button secondary" onclick="workflowStep='notes'; render()">📝 Engineer Notes</button>
      <button class="button" onclick="workflowStep='photos'; render()">Complete Job</button>
    </div>
  `;
}

function showPhotos() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 1: Photos</h1>
      <p>Optional evidence</p>
    </div>

    <div class="card">
      <h2>Add job photos</h2>
      <p>Later this will open the camera.</p>
      <button class="button secondary" onclick="photosTaken='Photos added'; workflowStep='parts'; render()">📸 Add Demo Photos</button>
      <button class="button" onclick="workflowStep='parts'; render()">Continue</button>
    </div>
  `;
}

function showParts() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 2: Parts</h1>
      <p>Zero typing parts flow</p>
    </div>

    <div class="card">
      <h2>Parts Used</h2>
      <button class="button secondary" onclick="addPart('DL500-014 Top Hinge')">🔩 DL500-014 Top Hinge</button>
      <button class="button secondary" onclick="addPart('DL500-001 Hydraulic Oil')">🛢 DL500-001 Hydraulic Oil</button>
      <button class="button secondary" onclick="addPart('No parts used')">No parts used</button>

      <p><strong>Selected:</strong></p>
      <p>${partsUsed}</p>

      <button class="button" onclick="workflowStep='notes'; render()">Continue</button>
    </div>
  `;
}

function showNotes() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 3: Notes</h1>
      <p>Only typing point</p>
    </div>

    <div class="card">
      <h2>What happened?</h2>
      <textarea id="notesBox" placeholder="Example: door noisy, changed hinge, greased and tested working" style="width:100%;height:150px;padding:14px;border-radius:12px;border:1px solid #ddd;box-sizing:border-box;">${engineerNotes}</textarea>
      <button class="button" onclick="aiRephrase()">AI Rephrase Report</button>
      <button class="button secondary" onclick="workflowStep='parts'; render()">Back</button>
    </div>
  `;
}

function showReview() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 4: Review</h1>
      <p>Customer-ready report</p>
    </div>

    <div class="card">
      <h2>Professional Report</h2>
      <p>${polishedReport}</p>

      <hr>

      <p><strong>Parts:</strong> ${partsUsed}</p>
      <p><strong>Photos:</strong> ${photosTaken}</p>
      <p><strong>Risk Assessment:</strong> Completed</p>

      <button class="button" onclick="submitJob()">Submit Job</button>
      <button class="button secondary" onclick="workflowStep='notes'; render()">Edit Notes</button>
    </div>
  `;
}

function startJourney() {
  jobStatus = "Travelling";
  workflowStep = "travelling";
  render();
}

function arrivedOnSite() {
  jobStatus = "On Site";
  workflowStep = "risk";
  render();
}

function addPart(part) {
  partsUsed = part;
  render();
}

function aiRephrase() {
  engineerNotes = document.getElementById("notesBox").value;

  if (engineerNotes.trim() === "") {
    alert("Please type what happened on site first.");
    return;
  }

  polishedReport =
    "Attended site to inspect the dock leveller. The reported issue was assessed and the necessary works were completed. The equipment was tested following completion and left operating correctly. Engineer notes: " + engineerNotes;

  workflowStep = "review";
  render();
}

function submitJob() {
  jobStatus = "Completed";
  workflowStep = "home";
  render();
}

render();let jobs = [
  {
    customer: "Tesco Reading",
    equipment: "Dock Leveller DL500",
    time: "09:00",
    priority: "High"
  },
  {
    customer: "DHL Depot",
    equipment: "Industrial Door ID200",
    time: "11:30",
    priority: "Normal"
  }
];

let currentJobIndex = 0;
let jobStatus = "Scheduled";
let workflowStep = "home";
let engineerNotes = "";
let polishedReport = "";
let partsUsed = "No parts added";
let photosTaken = "Not added";

let risks = {
  slipsTrips: "",
  movingVehicles: "",
  workingAtHeight: "",
  electricalHazards: "",
  manualHandling: "",
  publicArea: ""
};

function currentJob() {
  return jobs[currentJobIndex];
}

function resetJobData() {
  jobStatus = "Scheduled";
  engineerNotes = "";
  polishedReport = "";
  partsUsed = "No parts added";
  photosTaken = "Not added";
  risks = {
    slipsTrips: "",
    movingVehicles: "",
    workingAtHeight: "",
    electricalHazards: "",
    manualHandling: "",
    publicArea: ""
  };
}

function render() {
  if (workflowStep === "home") showHome();
  if (workflowStep === "travelling") showTravelling();
  if (workflowStep === "risk") showRiskAssessment();
  if (workflowStep === "riskSummary") showRiskSummary();
  if (workflowStep === "onsite") showOnSite();
  if (workflowStep === "photos") showPhotos();
  if (workflowStep === "parts") showParts();
  if (workflowStep === "notes") showNotes();
  if (workflowStep === "review") showReview();
  if (workflowStep === "complete") showJobComplete();
  if (workflowStep === "travelHome") showTravelHome();
  if (workflowStep === "arrivedHome") showArrivedHome();
  if (workflowStep === "loggedOff") showLoggedOff();
}

function showHome() {
  const job = currentJob();

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Good morning Scott 👋</h1>
      <p>Next action</p>
    </div>

    <div class="card">
      <h2>${job.customer}</h2>
      <p><strong>${job.equipment}</strong></p>
      <p>${job.time} · Priority: ${job.priority}</p>
      <p class="status">${jobStatus}</p>
      <button class="button" onclick="startJourney()">Start Journey</button>
    </div>
  `;
}

function showTravelling() {
  const job = currentJob();

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling</h1>
      <p>${job.customer}</p>
    </div>

    <div class="card">
      <h2>Estimated arrival</h2>
      <p style="font-size:32px;"><strong>08:57</strong></p>
      <p class="status">Travelling</p>
      <button class="button" onclick="arrivedOnSite()">Arrived On Site</button>
    </div>
  `;
}

function showRiskAssessment() {
  const job = currentJob();

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Risk Assessment</h1>
      <p>${job.customer}</p>
    </div>

    <div class="card">
      <h2>Site Risks</h2>

      ${riskRow("slipsTrips", "Slips, trips or poor housekeeping")}
      ${riskRow("movingVehicles", "Moving vehicles / forklift traffic")}
      ${riskRow("workingAtHeight", "Working at height")}
      ${riskRow("electricalHazards", "Electrical hazards")}
      ${riskRow("manualHandling", "Manual handling risk")}
      ${riskRow("publicArea", "Public or customer area nearby")}

      <button class="button" onclick="generateRiskSummary()">Generate Risk Form</button>
    </div>
  `;
}

function riskRow(key, label) {
  return `
    <div style="margin-bottom:18px;">
      <p><strong>${label}</strong></p>
      <button class="button secondary" onclick="setRisk('${key}', 'Yes')">Yes</button>
      <button class="button secondary" onclick="setRisk('${key}', 'No')">No</button>
      <button class="button secondary" onclick="setRisk('${key}', 'N/A')">N/A</button>
      <p class="status">${risks[key] || "Not answered"}</p>
    </div>
  `;
}

function setRisk(key, answer) {
  risks[key] = answer;
  showRiskAssessment();
}

function generateRiskSummary() {
  workflowStep = "riskSummary";
  render();
}

function showRiskSummary() {
  const job = currentJob();

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Risk Form</h1>
      <p>${job.customer}</p>
    </div>

    <div class="card">
      <h2>Risk Assessment Summary</h2>

      <p><strong>Site:</strong> ${job.customer}</p>
      <p><strong>Equipment:</strong> ${job.equipment}</p>

      <hr>

      <p><strong>Slips/trips:</strong> ${risks.slipsTrips || "Not answered"}</p>
      <p><strong>Moving vehicles:</strong> ${risks.movingVehicles || "Not answered"}</p>
      <p><strong>Working at height:</strong> ${risks.workingAtHeight || "Not answered"}</p>
      <p><strong>Electrical hazards:</strong> ${risks.electricalHazards || "Not answered"}</p>
      <p><strong>Manual handling:</strong> ${risks.manualHandling || "Not answered"}</p>
      <p><strong>Public/customer area:</strong> ${risks.publicArea || "Not answered"}</p>

      <hr>

      <p><strong>Control Measures:</strong></p>
      <p>Engineer to assess site conditions before starting work, maintain a safe working area, use appropriate PPE, and stop work if conditions become unsafe.</p>

      <button class="button" onclick="workflowStep='onsite'; render()">Confirm & Start Work</button>
      <button class="button secondary" onclick="workflowStep='risk'; render()">Edit Assessment</button>
    </div>
  `;
}

function showOnSite() {
  const job = currentJob();

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>On Site</h1>
      <p>${job.customer}</p>
    </div>

    <div class="card">
      <h2>Quick Actions</h2>
      <button class="button secondary" onclick="workflowStep='parts'; render()">📷 Scan / Add Parts</button>
      <button class="button secondary" onclick="workflowStep='photos'; render()">📸 Add Photos</button>
      <button class="button secondary" onclick="workflowStep='notes'; render()">📝 Engineer Notes</button>
      <button class="button" onclick="workflowStep='photos'; render()">Complete Job</button>
    </div>
  `;
}

function showPhotos() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 1: Photos</h1>
      <p>Optional evidence</p>
    </div>

    <div class="card">
      <h2>Add job photos</h2>
      <p>Later this will open the camera.</p>
      <button class="button secondary" onclick="photosTaken='Photos added'; workflowStep='parts'; render()">📸 Add Demo Photos</button>
      <button class="button" onclick="workflowStep='parts'; render()">Continue</button>
    </div>
  `;
}

function showParts() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 2: Parts</h1>
      <p>Zero typing parts flow</p>
    </div>

    <div class="card">
      <h2>Parts Used</h2>
      <button class="button secondary" onclick="addPart('DL500-014 Top Hinge')">🔩 DL500-014 Top Hinge</button>
      <button class="button secondary" onclick="addPart('DL500-001 Hydraulic Oil')">🛢 DL500-001 Hydraulic Oil</button>
      <button class="button secondary" onclick="addPart('No parts used')">No parts used</button>

      <p><strong>Selected:</strong></p>
      <p>${partsUsed}</p>

      <button class="button" onclick="workflowStep='notes'; render()">Continue</button>
    </div>
  `;
}

function showNotes() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 3: Notes</h1>
      <p>Only typing point</p>
    </div>

    <div class="card">
      <h2>What happened?</h2>
      <textarea id="notesBox" placeholder="Example: door noisy, changed hinge, greased and tested working" style="width:100%;height:150px;padding:14px;border-radius:12px;border:1px solid #ddd;box-sizing:border-box;">${engineerNotes}</textarea>
      <button class="button" onclick="aiRephrase()">AI Rephrase Report</button>
      <button class="button secondary" onclick="workflowStep='parts'; render()">Back</button>
    </div>
  `;
}

function showReview() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 4: Review</h1>
      <p>Customer-ready report</p>
    </div>

    <div class="card">
      <h2>Professional Report</h2>
      <p>${polishedReport}</p>

      <hr>

      <p><strong>Parts:</strong> ${partsUsed}</p>
      <p><strong>Photos:</strong> ${photosTaken}</p>
      <p><strong>Risk Assessment:</strong> Completed</p>

      <button class="button" onclick="submitJob()">Submit Job</button>
      <button class="button secondary" onclick="workflowStep='notes'; render()">Edit Notes</button>
    </div>
  `;
}

function showJobComplete() {
  const hasNextJob = currentJobIndex < jobs.length - 1;

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Job Complete ✅</h1>
      <p>What next?</p>
    </div>

    <div class="card">
      <h2>${currentJob().customer}</h2>
      <p><strong>${currentJob().equipment}</strong></p>
      <p class="status">Completed</p>

      ${hasNextJob ? `<button class="button" onclick="goToNextJob()">Next Job</button>` : ""}
      <button class="button secondary" onclick="startTravelHome()">Travel Home</button>
    </div>
  `;
}

function showTravelHome() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling Home</h1>
      <p>End of day</p>
    </div>

    <div class="card">
      <h2>Journey home started</h2>
      <p class="status">Travelling Home</p>
      <button class="button" onclick="arrivedHome()">Arrived Home</button>
    </div>
  `;
}

function showArrivedHome() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Arrived Home</h1>
      <p>End of shift</p>
    </div>

    <div class="card">
      <h2>Ready to log off</h2>
      <p>All travel and job activity has been recorded for the day.</p>
      <button class="button" onclick="logOff()">Log Off</button>
    </div>
  `;
}

function showLoggedOff() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Logged Off ✅</h1>
      <p>Shift complete</p>
    </div>

    <div class="card">
      <h2>Good work today</h2>
      <p>Your jobs, reports, risk assessments and travel have been logged.</p>
      <button class="button secondary" onclick="resetDay()">Reset Demo Day</button>
    </div>
  `;
}

function startJourney() {
  jobStatus = "Travelling";
  workflowStep = "travelling";
  render();
}

function arrivedOnSite() {
  jobStatus = "On Site";
  workflowStep = "risk";
  render();
}

function addPart(part) {
  partsUsed = part;
  render();
}

function aiRephrase() {
  engineerNotes = document.getElementById("notesBox").value;

  if (engineerNotes.trim() === "") {
    alert("Please type what happened on site first.");
    return;
  }

  polishedReport =
    "Attended site to inspect the equipment. The reported issue was assessed and the necessary works were completed. The equipment was tested following completion and left operating correctly. Engineer notes: " + engineerNotes;

  workflowStep = "review";
  render();
}

function submitJob() {
  jobStatus = "Completed";
  workflowStep = "complete";
  render();
}

function goToNextJob() {
  currentJobIndex++;
  resetJobData();
  workflowStep = "home";
  render();
}

function startTravelHome() {
  workflowStep = "travelHome";
  render();
}

function arrivedHome() {
  workflowStep = "arrivedHome";
  render();
}

function logOff() {
  workflowStep = "loggedOff";
  render();
}

function resetDay() {
  currentJobIndex = 0;
  resetJobData();
  workflowStep = "home";
  render();
}

render();