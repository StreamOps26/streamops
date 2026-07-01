let jobs = [
  {
    customer: "Tesco Reading",
    equipment: "Dock Leveller DL500",
    type: "Callout",
    state: "Ready",
    siteContact: "Goods In Office",
    sitePhone: "0118 000 0000",
    reportTo: "Loading Bay 4",
    siteNote: "Ask for Mark Williams on arrival.",
    distance: "7.3 miles",
    eta: "14 mins",
    heading: "Customer Reported",
    details: [
      "Dock leveller not lifting.",
      "Hydraulic oil leak visible.",
      "Platform stuck halfway."
    ]
  },
  {
    customer: "DHL Depot",
    equipment: "Planned Maintenance",
    type: "Routine Service",
    state: "Ready",
    siteContact: "Depot Reception",
    sitePhone: "0121 000 0000",
    reportTo: "Goods In",
    siteNote: "Report to reception before entering loading bay area.",
    distance: "12.8 miles",
    eta: "28 mins",
    heading: "Scope of Work",
    details: [
      "10 x Sectional Doors",
      "8 x Dock Levellers",
      "2 x High Speed Doors"
    ]
  }
];

let activeJobIndex = 0;

let risks = {
  slipsTrips: "N/A",
  movingVehicles: "N/A",
  workingAtHeight: "N/A",
  electricalHazards: "N/A",
  manualHandling: "N/A",
  hotWorks: "N/A",
  publicArea: "N/A"
};

function glowColour(type) {
  if (type === "Routine Service") return "rgba(34,197,94,.72)";
  if (type === "Callout") return "rgba(239,68,68,.72)";
  if (type === "Planned Repairs") return "rgba(245,158,11,.72)";
  if (type === "Site Survey") return "rgba(59,130,246,.72)";
  return "rgba(255,255,255,.45)";
}

function dashboardGlow() {
  return `
    box-shadow:
      -6px 0 22px rgba(255,255,255,.30),
      inset 4px 0 12px rgba(255,255,255,.08),
      0 10px 40px rgba(0,0,0,.30);
  `;
}

function jobGlow(type) {
  return `
    box-shadow:
      -6px 0 22px ${glowColour(type)},
      inset 4px 0 12px rgba(255,255,255,.05),
      0 10px 40px rgba(0,0,0,.30);
  `;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning Scott";
  if (hour < 17) return "Good afternoon Scott";
  return "Good evening Scott";
}

function getAppleDateTime() {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

function completedJobs() {
  return jobs.filter(job => job.state === "Completed").length;
}

function dashboardSummaryCard() {
  const completed = completedJobs();
  const percent = (completed / jobs.length) * 100;

  return `
    <div class="card" style="position:relative; overflow:hidden; ${dashboardGlow()}">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:rgba(255,255,255,.65);"></div>
      <div style="padding-left:10px;">
        <h2 id="greetingText">${getGreeting()}</h2>
        <p id="liveDateTime">${getAppleDateTime()}</p>

        <div style="height:24px;"></div>

        <h2>Today’s Schedule</h2>

        <div style="width:100%; height:12px; background:rgba(255,255,255,.18); border-radius:999px; overflow:hidden; margin:16px 0;">
          <div style="width:${percent}%; height:100%; background:linear-gradient(90deg,#60a5fa,#2563eb,#22c55e); border-radius:999px;"></div>
        </div>

        <p>You’ve completed ${completed} of ${jobs.length} jobs today</p>
      </div>
    </div>
  `;
}

function jobCard(job, index) {
  const isCompleted = job.state === "Completed";

  return `
    <div class="card" style="position:relative; overflow:hidden; ${isCompleted ? dashboardGlow() : jobGlow(job.type)}; opacity:${isCompleted ? ".72" : "1"};">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:${isCompleted ? "rgba(255,255,255,.45)" : glowColour(job.type)};"></div>

      <div style="padding-left:10px;">
        <p style="opacity:.65;">${job.type}</p>
        <h2>${job.customer}</h2>
        <p><strong>${job.equipment}</strong></p>

        <div style="height:18px;"></div>

        <p style="opacity:.75;"><strong>${job.heading}</strong></p>
        ${job.details.map(item => `<p>${item}</p>`).join("")}

        <p class="status">${job.state}</p>
      </div>

      ${
        isCompleted
          ? `<button class="button secondary">Completed</button>`
          : `<button class="button" onclick="startTravel(${index})">Start Travel</button>`
      }
    </div>
  `;
}

function showDashboard() {
  document.getElementById("app").innerHTML = `
    ${dashboardSummaryCard()}
    ${jobs.map((job, index) => jobCard(job, index)).join("")}
  `;

  updateLiveDateTime();
}

function updateLiveDateTime() {
  const timeEl = document.getElementById("liveDateTime");
  const greetingEl = document.getElementById("greetingText");

  if (timeEl) timeEl.innerText = getAppleDateTime();
  if (greetingEl) greetingEl.innerText = getGreeting();

  setTimeout(updateLiveDateTime, 1000);
}

function startTravel(index) {
  activeJobIndex = index;
  jobs[index].state = "Travelling";
  showTravelScreen();
}

function showTravelScreen() {
  const job = jobs[activeJobIndex];

  document.getElementById("app").innerHTML = `
    <div class="card" style="position:relative; overflow:hidden; ${jobGlow(job.type)}">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:${glowColour(job.type)};"></div>

      <div style="padding-left:10px;">
        <p style="opacity:.65;">Travelling to</p>
        <h2>${job.customer}</h2>
        <p><strong>${job.equipment}</strong></p>

        <div style="height:22px;"></div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div class="card" style="margin:0; box-shadow:none;">
            <p style="opacity:.65;">ETA</p>
            <h2>${job.eta}</h2>
          </div>

          <div class="card" style="margin:0; box-shadow:none;">
            <p style="opacity:.65;">Distance</p>
            <h2>${job.distance}</h2>
          </div>
        </div>

        <div style="height:22px;"></div>

        <p style="opacity:.75;"><strong>${job.heading}</strong></p>
        ${job.details.map(item => `<p>${item}</p>`).join("")}

        <div style="margin-top:24px; padding:18px; border-radius:18px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.10);">
          <p style="font-size:13px; opacity:.65; margin-bottom:12px; font-weight:600; letter-spacing:.3px;">SITE INFORMATION</p>
          <h3 style="margin:0; font-size:20px; font-weight:600;">${job.siteContact}</h3>

          <a href="tel:${job.sitePhone.replace(/\s/g,'')}" style="display:inline-block; margin-top:10px; font-size:18px; font-weight:500; color:white; text-decoration:none;">
            ${job.sitePhone}
          </a>

          <div style="height:14px;"></div>
          <p style="opacity:.75;"><strong>Report to</strong></p>
          <p>${job.reportTo}</p>

          <p style="opacity:.75; margin-top:12px;"><strong>Site Notes</strong></p>
          <p>${job.siteNote}</p>
        </div>

        <p class="status">Travelling</p>
      </div>

      <button class="button" onclick="openNavigation()">Open Navigation</button>
      <button class="button" onclick="arriveOnSite()">Arrive On Site</button>
      <button class="button secondary" onclick="showDashboard()">Back to Dashboard</button>
    </div>
  `;
}

function openNavigation() {
  alert("Navigation will open in Apple Maps / Google Maps later.");
}

function arriveOnSite() {
  jobs[activeJobIndex].state = "On Site";
  resetRiskAssessment();
  showRiskAssessment();
}

function resetRiskAssessment() {
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

function showRiskAssessment() {
  const job = jobs[activeJobIndex];

  document.getElementById("app").innerHTML = `
    <div class="card" style="position:relative; overflow:hidden; ${jobGlow(job.type)}">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:${glowColour(job.type)};"></div>

      <div style="padding-left:10px;">
        <p style="opacity:.65;">Before work starts</p>
        <h2>Risk Assessment</h2>
        <p>${job.customer}</p>

        <div style="height:18px;"></div>

        ${riskRow("slipsTrips", "Slips, Trips & Falls")}
        ${riskRow("movingVehicles", "Moving Vehicles / FLTs")}
        ${riskRow("workingAtHeight", "Working at Height")}
        ${riskRow("electricalHazards", "Electrical Hazards")}
        ${riskRow("manualHandling", "Manual Handling")}
        ${riskRow("hotWorks", "Hot Works")}
        ${riskRow("publicArea", "Public / Customer Area")}

        <button class="button" onclick="showRiskSummary()">Generate Risk Assessment</button>
        <button class="button secondary" onclick="showTravelScreen()">Back</button>
      </div>
    </div>
  `;
}

function riskRow(key, label) {
  return `
    <div style="margin-bottom:18px;">
      <p style="opacity:.85;"><strong>${label}</strong></p>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
        ${riskButton(key, "Yes")}
        ${riskButton(key, "No")}
        ${riskButton(key, "N/A")}
      </div>
    </div>
  `;
}

function riskButton(key, answer) {
  const selected = risks[key] === answer;

  return `
    <button
      onclick="setRisk('${key}', '${answer}')"
      style="
        padding:12px;
        border-radius:14px;
        border:1px solid ${selected ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.12)"};
        background:${selected ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.05)"};
        color:white;
        font-weight:700;
      ">
      ${answer}
    </button>
  `;
}

function setRisk(key, answer) {
  risks[key] = answer;
  showRiskAssessment();
}

function showRiskSummary() {
  const job = jobs[activeJobIndex];

  document.getElementById("app").innerHTML = `
    <div class="card" style="position:relative; overflow:hidden; ${jobGlow(job.type)}">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:${glowColour(job.type)};"></div>

      <div style="padding-left:10px;">
        <p style="opacity:.65;">Generated form</p>
        <h2>Risk Assessment</h2>

        <p><strong>Site:</strong> ${job.customer}</p>
        <p><strong>Equipment:</strong> ${job.equipment}</p>

        <div style="height:18px;"></div>

        <p><strong>Slips, Trips & Falls:</strong> ${risks.slipsTrips}</p>
        <p><strong>Moving Vehicles / FLTs:</strong> ${risks.movingVehicles}</p>
        <p><strong>Working at Height:</strong> ${risks.workingAtHeight}</p>
        <p><strong>Electrical Hazards:</strong> ${risks.electricalHazards}</p>
        <p><strong>Manual Handling:</strong> ${risks.manualHandling}</p>
        <p><strong>Hot Works:</strong> ${risks.hotWorks}</p>
        <p><strong>Public / Customer Area:</strong> ${risks.publicArea}</p>

        <div style="height:18px;"></div>

        <p style="opacity:.75;"><strong>Control Measures</strong></p>
        <p>Maintain a safe working area, use appropriate PPE, and stop work if conditions become unsafe.</p>

        <button class="button" onclick="showOnSiteHub()">Risk Assessment Complete</button>
        <button class="button secondary" onclick="showRiskAssessment()">Edit Assessment</button>
      </div>
    </div>
  `;
}

function showOnSiteHub() {
  const job = jobs[activeJobIndex];

  document.getElementById("app").innerHTML = `
    <div class="card" style="position:relative; overflow:hidden; ${jobGlow(job.type)}">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:${glowColour(job.type)};"></div>

      <div style="padding-left:10px;">
        <p style="opacity:.65;">On Site</p>
        <h2>${job.customer}</h2>
        <p><strong>${job.equipment}</strong></p>
        <p class="status">On Site</p>
      </div>

      <button class="button" onclick="completeJob()">Complete Job</button>
      <button class="button secondary" onclick="showDashboard()">Back to Dashboard</button>
    </div>
  `;
}

function completeJob() {
  jobs[activeJobIndex].state = "Completed";
  showDashboard();
}

showDashboard();