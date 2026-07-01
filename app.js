let jobs = [
  { customer: "Tesco Reading", equipment: "Dock Leveller DL500", time: "09:00", priority: "High" },
  { customer: "DHL Depot", equipment: "Industrial Door ID200", time: "11:30", priority: "Normal" }
];

let currentJobIndex = 0;
let jobStatus = "Scheduled";
let workflowStep = "home";
let engineerNotes = "";
let polishedReport = "";
let partsUsed = "No parts added";
let photosTaken = "Not added";

let risks = {
  slipsTrips: "N/A",
  movingVehicles: "N/A",
  workingAtHeight: "N/A",
  electricalHazards: "N/A",
  manualHandling: "N/A",
  hotWorks: "N/A",
  publicArea: "N/A"
};

function currentJob() {
  return jobs[currentJobIndex];
}

function progress(current) {
  let percent = 0;
  let hoursWorked = "0h 00m";

  if (jobStatus === "Travelling") {
    percent = 20;
    hoursWorked = "0h 15m";
  }

  if (jobStatus === "On Site") {
    percent = 45;
    hoursWorked = "1h 10m";
  }

  if (workflowStep === "review") {
    percent = 75;
    hoursWorked = "2h 30m";
  }

  if (jobStatus === "Completed") {
    percent = 100;
    hoursWorked = "3h 15m";
  }

  return `
    <div class="card">
      <p style="text-align:center; opacity:.75;">Total daily hours worked</p>
      <h2 style="text-align:center;">${hoursWorked}</h2>

      <div style="display:flex; justify-content:space-between; font-size:13px; opacity:.75; margin-bottom:8px;">
        <span>Start</span>
        <span>End</span>
      </div>

      <div style="width:100%; height:12px; background:rgba(255,255,255,.18); border-radius:999px; overflow:hidden;">
        <div style="
          width:${percent}%;
          height:100%;
          background:linear-gradient(90deg,#60a5fa,#2563eb,#22c55e);
          border-radius:999px;
          transition:.4s;">
        </div>
      </div>
    </div>
  `;
}

function resetJobData() {
  jobStatus = "Scheduled";
  engineerNotes = "";
  polishedReport = "";
  partsUsed = "No parts added";
  photosTaken = "Not added";
  risks = {
    slipsTrips: "N/A",
    movingVehicles: "N/A",
    workingAtHeight: "N/A",
    electricalHazards: "N/A",
    manualHandling: "N/A",
    hotWorks: "N/A",
    publicArea: "N/A"
  };
}

function render() {
  if (workflowStep === "home") showHome();
  if (workflowStep === "travelling") showTravelling();
  if (workflowStep === "risk") showRiskAssessment();
  if (workflowStep === "riskSummary") showRiskSummary();
  if (workflowStep === "onsite") showOnSite();
  if (workflowStep === "notes") showNotes();
  if (workflowStep === "photos") showPhotos();
  if (workflowStep === "parts") showParts();
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
      <h1>Hello Scott 👋</h1>
      <p>Next action</p>
    </div>

    ${progress("Travel")}

    <div class="card">
      <h2>${job.customer}</h2>
      <p><strong>${job.equipment}</strong></p>
      <p>${job.time} · Priority: ${job.priority}</p>
      <p class="status">${jobStatus}</p>
      <button class="button" onclick="startTravel()">Start Travel</button>
    </div>
  `;
}

function showTravelling() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling</h1>
      <p>${currentJob().customer}</p>
    </div>

    ${progress("Travel")}

    <div class="card">
      <h2>Estimated arrival</h2>
      <p style="font-size:32px;"><strong>08:57</strong></p>
      <p class="status">Travelling</p>
      <button class="button" onclick="arriveOnSite()">Arrive On Site</button>
    </div>
  `;
}

function showRiskAssessment() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Risk Assessment</h1>
      <p>${currentJob().customer}</p>
    </div>

    ${progress("Risk")}

    <div class="card">
      <h2>Site Risks</h2>
      ${riskRow("slipsTrips", "Slips, Trips & Falls")}
      ${riskRow("movingVehicles", "Moving Vehicles / FLTs")}
      ${riskRow("workingAtHeight", "Working at Height")}
      ${riskRow("electricalHazards", "Electrical Hazards")}
      ${riskRow("manualHandling", "Manual Handling")}
      ${riskRow("hotWorks", "Hot Works")}
      ${riskRow("publicArea", "Public / Customer Area")}
      <button class="button" onclick="generateRiskSummary()">Risk Assessment</button>
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
      <p class="status">${risks[key]}</p>
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
      <h1>Risk Assessment</h1>
      <p>Generated form</p>
    </div>

    ${progress("Risk")}

    <div class="card">
      <h2>Risk Assessment Summary</h2>
      <p><strong>Site:</strong> ${job.customer}</p>
      <p><strong>Equipment:</strong> ${job.equipment}</p>
      <hr>
      <p><strong>Slips, Trips & Falls:</strong> ${risks.slipsTrips}</p>
      <p><strong>Moving Vehicles / FLTs:</strong> ${risks.movingVehicles}</p>
      <p><strong>Working at Height:</strong> ${risks.workingAtHeight}</p>
      <p><strong>Electrical Hazards:</strong> ${risks.electricalHazards}</p>
      <p><strong>Manual Handling:</strong> ${risks.manualHandling}</p>
      <p><strong>Hot Works:</strong> ${risks.hotWorks}</p>
      <p><strong>Public / Customer Area:</strong> ${risks.publicArea}</p>
      <hr>
      <p><strong>Control Measures:</strong></p>
      <p>Engineer to assess site conditions before starting work, maintain a safe working area, use appropriate PPE, and stop work if conditions become unsafe.</p>
      <button class="button" onclick="workflowStep='onsite'; render()">Risk Assessment Complete</button>
      <button class="button secondary" onclick="workflowStep='risk'; render()">Edit Assessment</button>
    </div>
  `;
}

function showOnSite() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>On Site</h1>
      <p>${currentJob().customer}</p>
    </div>

    ${progress("Work")}

    <div class="card">
      <h2>Next Actions</h2>
      <button class="button secondary" onclick="workflowStep='notes'; render()">📝 Job Report</button>
      <button class="button secondary" onclick="workflowStep='photos'; render()">📸 Add Photos</button>
      <button class="button secondary" onclick="workflowStep='parts'; render()">📦 Add Parts</button>
      <button class="button" onclick="workflowStep='notes'; render()">Complete Job</button>
    </div>
  `;
}

function showNotes() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 1: Job Report</h1>
      <p>Only typing point</p>
    </div>

    ${progress("Report")}

    <div class="card">
      <h2>What happened?</h2>
      <textarea id="notesBox" placeholder="Example: door noisy, changed hinge, greased and tested working" style="width:100%;height:150px;padding:14px;border-radius:12px;border:1px solid #ddd;box-sizing:border-box;">${engineerNotes}</textarea>
      <button class="button" onclick="aiRephrase()">AI Rephrase Report</button>
      <button class="button secondary" onclick="workflowStep='onsite'; render()">Back</button>
    </div>
  `;
}

function showPhotos() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 2: Photos</h1>
      <p>Optional evidence</p>
    </div>

    ${progress("Report")}

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
      <h1>Step 3: Add Parts</h1>
      <p>Zero typing parts flow</p>
    </div>

    ${progress("Report")}

    <div class="card">
      <h2>Parts Used</h2>
      <button class="button secondary" onclick="addPart('DL500-014 Top Hinge')">🔩 DL500-014 Top Hinge</button>
      <button class="button secondary" onclick="addPart('DL500-001 Hydraulic Oil')">🛢 DL500-001 Hydraulic Oil</button>
      <button class="button secondary" onclick="addPart('No parts used')">No parts used</button>
      <p><strong>Selected:</strong></p>
      <p>${partsUsed}</p>
      <button class="button" onclick="workflowStep='review'; render()">Continue</button>
    </div>
  `;
}

function showReview() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Step 4: Review</h1>
      <p>Customer-ready report</p>
    </div>

    ${progress("Complete")}

    <div class="card">
      <h2>Professional Report</h2>
      <p>${polishedReport || "No report generated yet."}</p>
      <hr>
      <p><strong>Parts:</strong> ${partsUsed}</p>
      <p><strong>Photos:</strong> ${photosTaken}</p>
      <p><strong>Risk Assessment:</strong> Completed</p>
      <button class="button" onclick="submitReport()">Submit Report</button>
      <button class="button secondary" onclick="workflowStep='notes'; render()">Edit Report</button>
    </div>
  `;
}

function showJobComplete() {
  const hasNextJob = currentJobIndex < jobs.length - 1;

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Report Submitted ✅</h1>
      <p>Your report has been saved</p>
    </div>

    ${progress("Complete")}

    <div class="card">
      <h2>${currentJob().customer}</h2>
      <p><strong>${currentJob().equipment}</strong></p>
      <p>Risk Assessment ✓</p>
      <p>Photos ✓</p>
      <p>Parts ✓</p>
      <p>AI Report ✓</p>
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

function startTravel() {
  jobStatus = "Travelling";
  workflowStep = "travelling";
  render();
}

function arriveOnSite() {
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

  workflowStep = "photos";
  render();
}

function submitReport() {
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