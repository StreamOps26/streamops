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
  },
  {
    customer: "Amazon Birmingham",
    equipment: "High Speed Door Opening",
    type: "Site Survey",
    state: "Ready",
    siteContact: "Facilities Team",
    sitePhone: "0121 111 1111",
    reportTo: "Main Security Gate",
    siteNote: "Photo ID required at security.",
    distance: "18.4 miles",
    eta: "35 mins",
    heading: "Customer Request",
    details: [
      "Measure opening for replacement high-speed door.",
      "Check power supply location.",
      "Confirm fixing structure."
    ]
  },
  {
    customer: "ASDA Swindon",
    equipment: "Industrial Door ID200",
    type: "Planned Repairs",
    state: "Ready",
    siteContact: "Loading Bay Manager",
    sitePhone: "01793 000 000",
    reportTo: "Rear Service Yard",
    siteNote: "Loading bay access through rear yard only.",
    distance: "21.6 miles",
    eta: "42 mins",
    heading: "Repair Scope",
    details: [
      "Replace damaged bottom seal.",
      "Adjust limits.",
      "Test safety edge operation."
    ]
  }
];

let activeJobIndex = 0;
let riskIndex = 0;
let signatureCaptured = false;

let risks = {
  workingAtHeight: "No",
  manualHandling: "No",
  toolsEquipment: "No",
  correctPPE: "No",
  hotWorks: "No",
  electricity: "No",
  loneWorking: "No",
  asbestos: "No",
  coshh: "No",
  additionalHazards: "No"
};

let riskQuestions = [
  ["workingAtHeight", "Working at Height", "Includes ladders, steps, MEWPs or any area where a fall could cause injury."],
  ["manualHandling", "Manual Handling", "Includes lifting, carrying, pushing, pulling or positioning heavy parts, tools or equipment."],
  ["toolsEquipment", "Use of Tools / Equipment", "Includes hand tools, power tools, testing equipment or specialist service tools."],
  ["correctPPE", "Correct PPE", "Confirm use of safety boots, hi-vis clothing and any task-specific PPE."],
  ["hotWorks", "Hot Works", "Includes grinding, cutting, welding or any work that may create heat, sparks or flames."],
  ["electricity", "Electricity", "Includes control panels, live supplies, isolation, damaged cables, motors, sensors or electrical testing."],
  ["loneWorking", "Lone Working", "Consider site access, communication, emergency arrangements and whether additional support is required."],
  ["asbestos", "Asbestos", "Consult the site's asbestos register before commencing work. Stop work immediately if suspected asbestos-containing material is found or disturbed."],
  ["coshh", "COSHH", "Includes oils, grease, sprays, cleaners, adhesives, hydraulic fluid or other controlled substances."],
  ["additionalHazards", "Additional Hazards", "Record any site-specific hazards not already covered before starting work."]
];

function glowColour(type) {
  if (type === "Routine Service") return "rgba(34,197,94,.72)";
  if (type === "Callout") return "rgba(239,68,68,.72)";
  if (type === "Planned Repairs") return "rgba(59,130,246,.72)";
  if (type === "Site Survey") return "rgba(226,232,240,.55)";
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

function yellowGlow() {
  return `
    box-shadow:
      -6px 0 22px rgba(250,204,21,.72),
      inset 4px 0 12px rgba(250,204,21,.08),
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
  riskIndex = 0;
  resetRiskAssessment();
  showRiskAssessment();
}

function resetRiskAssessment() {
  signatureCaptured = false;

  risks = {
    workingAtHeight: "No",
    manualHandling: "No",
    toolsEquipment: "No",
    correctPPE: "No",
    hotWorks: "No",
    electricity: "No",
    loneWorking: "No",
    asbestos: "No",
    coshh: "No",
    additionalHazards: "No"
  };
}

function showRiskAssessment() {
  const job = jobs[activeJobIndex];
  const risk = riskQuestions[riskIndex];
  const key = risk[0];
  const progressPercent = ((riskIndex + 1) / riskQuestions.length) * 100;

  document.getElementById("app").innerHTML = `
    <div class="card" style="position:relative; overflow:hidden; ${yellowGlow()}">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:rgba(250,204,21,.85);"></div>

      <div style="padding-left:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button onclick="riskIndex > 0 ? previousRisk() : showTravelScreen()" style="background:none;border:none;color:white;font-size:16px;">‹ Back</button>
          <p style="opacity:.75;">${riskIndex + 1} of ${riskQuestions.length}</p>
        </div>

        <div style="width:100%; height:8px; background:rgba(255,255,255,.14); border-radius:999px; overflow:hidden; margin:18px 0;">
          <div style="width:${progressPercent}%; height:100%; background:linear-gradient(90deg,#fef08a,#facc15); border-radius:999px;"></div>
        </div>

        <p style="color:#facc15; letter-spacing:.8px; font-weight:700;">RISK ASSESSMENT</p>
        <h2>${risk[1]}</h2>
        <p>${job.customer}</p>
        <p style="opacity:.7;">${job.equipment}</p>

        <div style="height:24px;"></div>

        <div style="padding:24px; border-radius:24px; background:rgba(255,255,255,.06); border:1px solid rgba(250,204,21,.25); text-align:center;">
          <h2>Does this hazard apply to today's work?</h2>
          <p style="opacity:.7;">${risk[2]}</p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:24px;">
            ${riskOption(key, "Yes")}
            ${riskOption(key, "No")}
          </div>
        </div>

        <button class="button" style="background:linear-gradient(135deg,#fde047,#facc15); color:#111827;" onclick="nextRisk()">Next</button>
        <button class="button secondary" onclick="previousRisk()">Back</button>
      </div>
    </div>
  `;
}

function riskOption(key, answer) {
  const selected = risks[key] === answer;

  return `
    <button onclick="setRisk('${key}', '${answer}')" style="
      padding:18px 8px;
      border-radius:18px;
      border:1px solid ${selected ? "rgba(250,204,21,.9)" : "rgba(255,255,255,.15)"};
      background:${selected ? "rgba(250,204,21,.18)" : "rgba(255,255,255,.05)"};
      color:${selected ? "#fde047" : "white"};
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

function nextRisk() {
  if (riskIndex < riskQuestions.length - 1) {
    riskIndex++;
    showRiskAssessment();
  } else {
    showRiskSummary();
  }
}

function previousRisk() {
  if (riskIndex > 0) {
    riskIndex--;
    showRiskAssessment();
  }
}

function showRiskSummary() {
  const job = jobs[activeJobIndex];

  document.getElementById("app").innerHTML = `
    <div class="card" style="position:relative; overflow:hidden; ${yellowGlow()}">
      <div style="position:absolute; left:0; top:18px; bottom:18px; width:4px; border-radius:999px; background:rgba(250,204,21,.85);"></div>

      <div style="padding-left:10px;">
        <p style="color:#facc15; letter-spacing:.8px; font-weight:700;">RISK ASSESSMENT</p>
        <h2>Complete</h2>
        <p>${riskQuestions.length} checks completed.</p>

        <div style="height:18px;"></div>

        <p><strong>Site:</strong> ${job.customer}</p>
        <p><strong>Equipment:</strong> ${job.equipment}</p>

        <div style="height:18px;"></div>

        ${riskQuestions.map(risk => `<p><strong>${risk[1]}:</strong> ${risks[risk[0]]}</p>`).join("")}

        <div style="height:18px;"></div>

        <p style="opacity:.75;"><strong>Control Measures</strong></p>
        <p>Maintain a safe working area, use appropriate PPE, and stop work if conditions become unsafe.</p>

        <div style="height:18px;"></div>

        <p style="opacity:.75;"><strong>Engineer Signature</strong></p>
        <p style="opacity:.65;">Sign below to confirm the risk assessment has been completed correctly.</p>

        <canvas id="signaturePad" width="360" height="160" style="
          width:100%;
          height:160px;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(250,204,21,.25);
          border-radius:20px;
          margin-top:12px;
          touch-action:none;
        "></canvas>

        <button class="button secondary" onclick="clearSignature()">Clear Signature</button>

        <button id="submitRiskButton" class="button" style="
          background:${signatureCaptured ? "linear-gradient(135deg,#fde047,#facc15)" : "rgba(255,255,255,.10)"};
          color:${signatureCaptured ? "#111827" : "rgba(255,255,255,.35)"};
          cursor:${signatureCaptured ? "pointer" : "not-allowed"};
        " onclick="submitRiskAssessment()">
          Continue to Job
        </button>

        <button class="button secondary" onclick="riskIndex=0; showRiskAssessment()">Edit Assessment</button>
      </div>
    </div>
  `;

  setTimeout(initSignaturePad, 50);
}

function initSignaturePad() {
  const canvas = document.getElementById("signaturePad");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;

  ctx.strokeStyle = "#fde047";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;

    return {
      x: (touch.clientX - rect.left) * (canvas.width / rect.width),
      y: (touch.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function start(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    signatureCaptured = true;
    updateSignatureButton();
  }

  function stop() {
    drawing = false;
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("mouseleave", stop);

  canvas.addEventListener("touchstart", start);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stop);
}

function updateSignatureButton() {
  const btn = document.getElementById("submitRiskButton");
  if (!btn) return;

  btn.style.background = "linear-gradient(135deg,#fde047,#facc15)";
  btn.style.color = "#111827";
  btn.style.cursor = "pointer";
}

function clearSignature() {
  signatureCaptured = false;
  showRiskSummary();
}

function submitRiskAssessment() {
  if (!signatureCaptured) {
    alert("Please sign before continuing.");
    return;
  }

  showOnSiteHub();
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