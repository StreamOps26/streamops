let jobs = [
  {
    customer: "Tesco Reading",
    equipment: "Dock Leveller DL500",
    priority: "High",
    type: "Breakdown",
    status: "Pending"
  },
  {
    customer: "DHL Depot",
    equipment: "Industrial Door ID200",
    priority: "Normal",
    type: "Routine Service",
    status: "Pending"
  }
];

let activeJobIndex = 0;
let jobStatus = "Scheduled";

function currentJob() {
  return jobs[activeJobIndex];
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

  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day} ${date} ${month} ${hours}:${minutes}:${seconds}`;
}

function jobTypeColour(type) {
  if (type === "Emergency") return "#ef4444";
  if (type === "Breakdown") return "#f59e0b";
  if (type === "Routine Service") return "#22c55e";
  if (type === "Survey") return "#3b82f6";
  return "#94a3b8";
}

function dashboardSummaryCard() {
  const completed = jobs.filter(job => job.status === "Completed").length;
  const percent = (completed / jobs.length) * 100;
  const allComplete = completed === jobs.length;

  if (allComplete) {
    return `
      <div class="card">
        <h2 id="greetingText">${getGreeting()}</h2>
        <p id="liveDateTime">${getAppleDateTime()}</p>

        <hr>

        <h2>Fantastic work.</h2>
        <p>All ${jobs.length} jobs completed.</p>
        <p>Drive safely.</p>

        <button class="button" onclick="startTravelHome()">Travel Home</button>
      </div>
    `;
  }

  return `
    <div class="card">
      <h2 id="greetingText">${getGreeting()}</h2>
      <p id="liveDateTime">${getAppleDateTime()}</p>

      <hr>

      <h2>Today’s Schedule</h2>

      <div style="width:100%; height:12px; background:rgba(255,255,255,.18); border-radius:999px; overflow:hidden; margin:16px 0;">
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
  `;
}

function showDashboard() {
  document.getElementById("app").innerHTML = `
    ${dashboardSummaryCard()}

    ${jobs.map((job, index) => `
      <div class="card">
        <p style="opacity:.75;">${job.type}</p>

        <h2>${job.customer}</h2>

        <p><strong>${job.equipment}</strong></p>

        <p>
          <span style="
            display:inline-block;
            width:10px;
            height:10px;
            border-radius:50%;
            background:${jobTypeColour(job.type)};
            margin-right:6px;">
          </span>
          Priority: ${job.priority}
        </p>

        <p class="status">${job.status}</p>

        ${
          job.status === "Completed"
            ? `<button class="button secondary">Completed ✓</button>`
            : `<button class="button" onclick="startTravel(${index})">Start Travel</button>`
        }
      </div>
    `).join("")}
  `;

  updateLiveDateTime();
}

function updateLiveDateTime() {
  const timeEl = document.getElementById("liveDateTime");
  const greetingEl = document.getElementById("greetingText");

  if (timeEl) {
    timeEl.innerText = getAppleDateTime();
  }

  if (greetingEl) {
    greetingEl.innerText = getGreeting();
  }

  setTimeout(updateLiveDateTime, 1000);
}

function startTravel(index) {
  activeJobIndex = index;
  jobStatus = "Travelling";

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling</h1>
      <p>${currentJob().customer}</p>
    </div>

    <div class="card">
      <h2>${currentJob().customer}</h2>
      <p><strong>${currentJob().equipment}</strong></p>
      <p class="status">Travelling</p>

      <button class="button" onclick="arriveOnSite()">Arrive On Site</button>
      <button class="button secondary" onclick="showDashboard()">Back</button>
    </div>
  `;
}

function arriveOnSite() {
  jobStatus = "On Site";

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>On Site</h1>
      <p>${currentJob().customer}</p>
    </div>

    <div class="card">
      <h2>${currentJob().customer}</h2>
      <p><strong>${currentJob().equipment}</strong></p>
      <p class="status">On Site</p>

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

    <div class="card">
      <h2>Journey home started</h2>
      <p class="status">Travelling Home</p>

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

    <div class="card">
      <h2>Ready to log off</h2>
      <p>All job and travel activity has been recorded for the day.</p>

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

    <div class="card">
      <h2>Good work today</h2>
      <p>Your jobs and travel have been logged.</p>

      <button class="button secondary" onclick="resetDemo()">Reset Demo Day</button>
    </div>
  `;
}

function resetDemo() {
  jobs.forEach(job => job.status = "Pending");
  activeJobIndex = 0;
  jobStatus = "Scheduled";
  showDashboard();
}

showDashboard();