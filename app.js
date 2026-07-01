let jobs = [
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
let workflowStep = "dashboard";

function currentJob() {
  return jobs[currentJobIndex];
}

function getOrdinal(day) {
  if (day > 3 && day < 21) return day + "th";

  switch (day % 10) {
    case 1: return day + "st";
    case 2: return day + "nd";
    case 3: return day + "rd";
    default: return day + "th";
  }
}

function getDateTimeText() {
  const now = new Date();

  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const dayName = days[now.getDay()];
  const day = getOrdinal(now.getDate());
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${dayName} ${day} ${month} ${year} - ${hours}${minutes}`;
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

function showDashboard() {
  const job = currentJob();

  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Hello Scott</h1>
      <p>${getDateTimeText()}</p>
    </div>

    ${dailyHoursBar()}

    <div class="card">
      <p style="opacity:.75;">Today’s first job</p>

      <h2>${job.customer}</h2>

      <p><strong>${job.equipment}</strong></p>
      <p>${job.time} · Priority: ${job.priority}</p>

      <p class="status">${jobStatus}</p>

      <button class="button" onclick="startTravel()">Start Travel</button>
    </div>

    <div class="card">
      <h2>Today’s Schedule</h2>
      <p>${jobs.length} jobs assigned</p>
      <p>${currentJobIndex} completed</p>
    </div>
  `;
}

function startTravel() {
  jobStatus = "Travelling";
  document.getElementById("app").innerHTML = `
    <div class="header">
      <h1>Travelling</h1>
      <p>${currentJob().customer}</p>
    </div>

    <div class="card">
      <h2>Estimated Arrival</h2>
      <p style="font-size:42px;"><strong>08:57</strong></p>
      <p class="status">Travelling</p>

      <button class="button">Arrive On Site</button>
      <button class="button secondary" onclick="showDashboard()">Back</button>
    </div>
  `;
}

showDashboard();