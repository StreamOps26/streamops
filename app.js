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

function dailyHoursBar() {
  return `
    <div class="card">
      <p style="text-align:center; opacity:.75;">Total daily hours worked</p>
      <h2 style="text-align:center;">0h 00m</h2>

      <div style="display:flex; justify-content:space-between; font-size:13px; opacity:.75; margin-bottom:8px;">
        <span>Start</span>
        <span>End</span>
      </div>

      <div style="width:100%; height:12px; background:rgba(255,255,255,.18); border-radius:999px; overflow:hidden;">
        <div style="
          width:0%;
          height:100%;
          background:linear-gradient(90deg,#60a5fa,#2563eb,#22c55e);
          border-radius:999px;">
        </div>
      </div>
    </div>
  `;
}

function scheduleProgress() {
  const completed = jobs.filter(job => job.status === "Completed").length;
  const percent = (completed / jobs.length) * 100;

  return `
    <div style="width:100%; height:10px; background:rgba(255,255,255,.18); border-radius:999px; overflow:hidden; margin:12px 0;">
      <div style="
        width:${percent}%;
        height:100%;
        background:linear-gradient(90deg,#60a5fa,#22c55e);
        border-radius:999px;">
      </div>
    </div>

    <p style="opacity:.75;">${completed} of ${jobs.length} jobs completed</p>
  `;
}

function jobTypeColour(type) {
  if (type === "Emergency") return "#ef4444";
  if (type === "Breakdown") return "#f59e0b";
  if (type === "Routine Service") return "#22c55e";
  if (type === "Survey") return "#3b82f6";
  return "#94a3b8";
}

function showDashboard() {
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Hello Scott</h1>
      <p id="liveDateTime">${getAppleDateTime()}</p>
    </div>

    ${dailyHoursBar()}

    <div class="card">
      <h2>Today’s Schedule</h2>
      <p>${jobs.length} jobs assigned</p>
      ${scheduleProgress()}
    </div>

    ${jobs.map((job, index) => `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
          <div>
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
          </div>

          <p class="status">${job.status}</p>
        </div>

        ${
          job.status === "Completed"
            ? `<button class="button secondary">Completed ✓</button>`
            : `<button class="button" onclick="startTravel(${index})">Start Travel</button>`
        }
      </div>
    `).join("")}
  `;

  setTimeout(updateLiveDateTime, 1000);
}

function updateLiveDateTime() {
  const el = document.getElementById("liveDateTime");

  if (el) {
    el.innerText = getAppleDateTime();
    setTimeout(updateLiveDateTime, 1000);
  }
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

showDashboard();