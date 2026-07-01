let jobs = [
  {
    customer: "Tesco Reading",
    equipment: "Dock Leveller DL500",
    type: "Callout",
    status: "Pending",
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
    status: "Pending",
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
    status: "Pending",
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
    status: "Pending",
    heading: "Repair Scope",
    details: [
      "Replace damaged bottom seal.",
      "Adjust limits.",
      "Test safety edge operation."
    ]
  }
];

let activeJobIndex = 0;

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

  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day} ${date} ${month} ${hours}:${minutes}:${seconds}`;
}

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

function completedJobs() {
  return jobs.filter(job => job.status === "Completed").length;
}

function dashboardSummaryCard() {
  const completed = completedJobs();
  const percent = (completed / jobs.length) * 100;
  const allComplete = completed === jobs.length;

  if (allComplete) {
    return `
      <div class="card" style="position:relative; overflow:hidden; ${dashboardGlow()}">
        <div style="
          position:absolute;
          left:0;
          top:18px;
          bottom:18px;
          width:4px;
          border-radius:999px;
          background:rgba(255,255,255,.65);
          filter:blur(.2px);
        "></div>

        <div style="padding-left:10px;">
          <h2 id="greetingText">${getGreeting()}</h2>
          <p id="liveDateTime">${getAppleDateTime()}</p>

          <hr>

          <h2>Fantastic work.</h2>
          <p>All ${jobs.length} jobs completed.</p>
          <p>Drive safely.</p>

          <button class="button" onclick="startTravelHome()">Travel Home</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="card" style="position:relative; overflow:hidden; ${dashboardGlow()}">
      <div style="
        position:absolute;
        left:0;
        top:18px;
        bottom:18px;
        width:4px;
        border-radius:999px;
        background:rgba(255,255,255,.65);
        filter:blur(.2px);
      "></div>

      <div style="padding-left:10px;">
        <h2 id="greetingText">${getGreeting()}</h2>
        <p id="liveDateTime">${getAppleDateTime()}</p>

        <hr>

        <h2>Today’s Schedule</h2>

        <div style="
          width:100%;
          height:12px;
          background:rgba(255,255,255,.18);
          border-radius:999px;
          overflow:hidden;
          margin:16px 0;">
          <div style="
            width:${percent}%;
            height:100%;
            background:linear-gradient(90deg,#60a5fa,#2563eb,#22c55e);
            border-radius:999px;
            transition:.4s;">
          </div>
        </div>

        <p>You’ve completed ${completed} of ${jobs.length} jobs today</p>
      </div>
    </div>
  `;
}

function jobCard(job, index) {
  return `
    <div class="card" style="position:relative; overflow:hidden; ${jobGlow(job.type)}">
      <div style="
        position:absolute;
        left:0;
        top:18px;
        bottom:18px;
        width:4px;
        border-radius:999px;
        background:${glowColour(job.type)};
        filter:blur(.2px);
      "></div>

      <div style="padding-left:10px;">
        <p style="opacity:.65;">${job.type}</p>

        <h2>${job.customer}</h2>

        <p><strong>${job.equipment}</strong></p>

        <hr>

        <p style="opacity:.75;"><strong>${job.heading}</strong></p>

        ${job.details.map(item => `<p>${item}</p>`).join("")}

        <p class="status">${job.status}</p>
      </div>

      ${
        job.status === "Completed"
          ? `<button class="button secondary">Completed ✓</button>`
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

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling</h1>
      <p>${jobs[activeJobIndex].customer}</p>
    </div>

    <div class="card" style="position:relative; overflow:hidden; ${jobGlow(jobs[activeJobIndex].type)}">
      <div style="
        position:absolute;
        left:0;
        top:18px;
        bottom:18px;
        width:4px;
        border-radius:999px;
        background:${glowColour(jobs[activeJobIndex].type)};
      "></div>

      <div style="padding-left:10px;">
        <h2>${jobs[activeJobIndex].customer}</h2>
        <p><strong>${jobs[activeJobIndex].equipment}</strong></p>
        <p class="status">Travelling</p>
      </div>

      <button class="button" onclick="arriveOnSite()">Arrive On Site</button>
      <button class="button secondary" onclick="showDashboard()">Back</button>
    </div>
  `;
}

function arriveOnSite() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>On Site</h1>
      <p>${jobs[activeJobIndex].customer}</p>
    </div>

    <div class="card" style="position:relative; overflow:hidden; ${jobGlow(jobs[activeJobIndex].type)}">
      <div style="
        position:absolute;
        left:0;
        top:18px;
        bottom:18px;
        width:4px;
        border-radius:999px;
        background:${glowColour(jobs[activeJobIndex].type)};
      "></div>

      <div style="padding-left:10px;">
        <h2>${jobs[activeJobIndex].customer}</h2>
        <p><strong>${jobs[activeJobIndex].equipment}</strong></p>
        <p class="status">On Site</p>
      </div>

      <button class="button" onclick="completeJob()">Complete Job</button>
      <button class="button secondary" onclick="showDashboard()">Back</button>
    </div>
  `;
}

function completeJob() {
  jobs[activeJobIndex].status = "Completed";
  showDashboard();
}

function startTravelHome() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling Home</h1>
      <p>End of day</p>
    </div>

    <div class="card" style="position:relative; overflow:hidden; ${dashboardGlow()}">
      <div style="
        position:absolute;
        left:0;
        top:18px;
        bottom:18px;
        width:4px;
        border-radius:999px;
        background:rgba(255,255,255,.65);
      "></div>

      <div style="padding-left:10px;">
        <h2>Journey home started</h2>
        <p class="status">Travelling Home</p>
      </div>

      <button class="button" onclick="arrivedHome()">Arrived Home</button>
    </div>
  `;
}

function arrivedHome() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Arrived Home</h1>
      <p>End of shift</p>
    </div>

    <div class="card" style="position:relative; overflow:hidden; ${dashboardGlow()}">
      <div style="
        position:absolute;
        left:0;
        top:18px;
        bottom:18px;
        width:4px;
        border-radius:999px;
        background:rgba(255,255,255,.65);
      "></div>

      <div style="padding-left:10px;">
        <h2>Ready to log off</h2>
        <p>All job and travel activity has been recorded for the day.</p>
      </div>

      <button class="button" onclick="logOff()">Log Off</button>
    </div>
  `;
}

function logOff() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Logged Off</h1>
      <p>Shift complete</p>
    </div>

    <div class="card" style="position:relative; overflow:hidden; ${dashboardGlow()}">
      <div style="
        position:absolute;
        left:0;
        top:18px;
        bottom:18px;
        width:4px;
        border-radius:999px;
        background:rgba(255,255,255,.65);
      "></div>

      <div style="padding-left:10px;">
        <h2>Good work today</h2>
        <p>Your jobs and travel have been logged.</p>
      </div>

      <button class="button secondary" onclick="resetDemo()">Reset Demo Day</button>
    </div>
  `;
}

function resetDemo() {
  jobs.forEach(job => job.status = "Pending");
  activeJobIndex = 0;
  showDashboard();
}

showDashboard();