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

<button class="button" onclick="showJob()">

View Details

</button>

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

<p id="status" class="status">

Scheduled

</p>

<button class="button" onclick="startJourney()">

Start Journey

</button>

<button class="button secondary" onclick="showHome()">

Back

</button>

</div>

`;

}

function startJourney(){

document.getElementById("status").innerHTML="Travelling";

}

showHome();