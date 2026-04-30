const STORAGE_KEY = "jjk-players";

const baseParticipants = [
  { name: "Hajime Kashimo", points: 100, colony: "Tokyo No. 2", alive: true, active: true, notes: "Ancient sorcerer with 200 stated points." },
  { name: "Hiromi Higuruma", points: 1, colony: "Tokyo No. 1", alive: true, active: true, notes: "Lawyer and strong early player with 102 points." },
  { name: "Dhruv Lakdawalla", points: 91, colony: "Sendai", alive: false, active: false, notes: "Sendai powerhouse defeated by Yuta." },
  { name: "Ryu Ishigori", points: 77, colony: "Sendai", alive: true, active: false, notes: "High-output fighter in Sendai." },
  { name: "Takako Uro", points: 70, colony: "Sendai", alive: true, active: false, notes: "Powerful Sendai participant." },
  { name: "Kurourushi", points: 54, colony: "Sendai", alive: false, active: false, notes: "Special grade cursed spirit in Sendai." },
  { name: "Reggie Star", points: 41, colony: "Tokyo No. 1", alive: false, active: false, notes: "Leader of a hostile group in Tokyo No. 1." },
  { name: "Yuta Okkotsu", points: 35, colony: "Sendai", alive: true, active: true, notes: "Shown with 35 points after the Sendai fights begin." },
  { name: "Chizuru Hari", points: 28, colony: "Tokyo No. 1", alive: false, active: false, notes: "Reggies ally with a confirmed point total." },
  { name: "Yuji Itadori", points: 1, colony: "Tokyo No. 1", alive: true, active: true, notes: "No clear point total stated here." },
  { name: "Megumi Fushiguro", points: 51, colony: "Tokyo No. 1", alive: true, active: true, notes: "Entered Tokyo No. 1 to find Higuruma." },
  { name: "Hana Kurusu", points: null, colony: "Tokyo No. 1", alive: true, active: true, notes: "Angel's vessel." },
  { name: "Kinji Hakari", points: null, colony: "Tokyo No. 2", alive: true, active: true, notes: "Entered Tokyo No. 2 to face Kashimo." },
  { name: "Panda", points: null, colony: "Tokyo No. 2", alive: true, active: false, notes: "Survives but is badly damaged." },
  { name: "Charles Bernard", points: null, colony: "Tokyo No. 2", alive: true, active: false, notes: "Modern player defeated by Hakari." },
  { name: "Fumihiko Takaba", points: null, colony: "Tokyo No. 1", alive: true, active: true, notes: "Wildcard player in Tokyo No. 1." },
  { name: "Remi", points: null, colony: "Tokyo No. 1", alive: true, active: false, notes: "Lures Megumi into an ambush." }
];

const body = document.getElementById("participants-body");
const summary = document.getElementById("summary");
const searchInput = document.getElementById("search-input");
const colonyFilter = document.getElementById("colony-filter");
const aliveFilter = document.getElementById("alive-filter");
const activityFilter = document.getElementById("activity-filter");
const sortSelect = document.getElementById("sort-select");
const voteForm = document.getElementById("vote-form");
const voteMessage = document.getElementById("vote-message");
const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

let participants = [...baseParticipants, ...loadCustomPlayers()];

function loadCustomPlayers() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCustomPlayers() {
  const customPlayers = participants.filter((player) => player.custom);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customPlayers));
}

function formatPoints(points) {
  return typeof points === "number" ? points : "—";
}

function badge(value, goodClass, badClass) {
  return `<span class="pill ${value ? goodClass : badClass}">${value ? goodClass : badClass}</span>`;
}

function comparePoints(a, b) {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return a - b;
}

function getFilteredParticipants() {
  const term = searchInput.value.trim().toLowerCase();
  const colony = colonyFilter.value;
  const alive = aliveFilter.value;
  const activity = activityFilter.value;
  const sort = sortSelect.value;

  const filtered = participants.filter((player) => {
    const matchesText =
      player.name.toLowerCase().includes(term) ||
      player.notes.toLowerCase().includes(term);
    const matchesColony = colony === "all" || player.colony === colony;
    const matchesAlive =
      alive === "all" ||
      (alive === "alive" && player.alive) ||
      (alive === "dead" && !player.alive);
    const matchesActivity =
      activity === "all" ||
      (activity === "active" && player.active) ||
      (activity === "inactive" && !player.active);

    return matchesText && matchesColony && matchesAlive && matchesActivity;
  });

  filtered.sort((a, b) => {
    if (sort === "points-asc") return comparePoints(a.points, b.points);
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    if (sort === "colony-asc") return a.colony.localeCompare(b.colony) || a.name.localeCompare(b.name);
    return comparePoints(b.points, a.points);
  });

  return filtered;
}

function renderSummary(list) {
  const aliveCount = list.filter((player) => player.alive).length;
  const activeCount = list.filter((player) => player.active).length;
  const knownPoints = list.filter((player) => typeof player.points === "number");
  const topPlayer = knownPoints.length ? [...knownPoints].sort((a, b) => b.points - a.points)[0] : null;

  summary.innerHTML = `
    <div class="summary-box"><h3>Participants</h3><p>${list.length}</p></div>
    <div class="summary-box"><h3>Alive</h3><p>${aliveCount}</p></div>
    <div class="summary-box"><h3>Active</h3><p>${activeCount}</p></div>
    <div class="summary-box"><h3>Top shown points</h3><p>${topPlayer ? `${topPlayer.name} (${topPlayer.points})` : "—"}</p></div>
  `;
}

function renderTable() {
  const list = getFilteredParticipants();
  renderSummary(list);

  body.innerHTML = list.map((player) => `
    <tr>
      <td>${player.name}</td>
      <td>${formatPoints(player.points)}</td>
      <td>${player.colony}</td>
      <td>${badge(player.alive, "alive", "dead")}</td>
      <td>${badge(player.active, "active", "inactive")}</td>
      <td>${player.notes}</td>
    </tr>
  `).join("");
}

[searchInput, colonyFilter, aliveFilter, activityFilter, sortSelect].forEach((element) => {
  element.addEventListener("input", renderTable);
  element.addEventListener("change", renderTable);
});

voteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const player = document.getElementById("favorite-player").value;
  voteMessage.textContent = `Vote received for ${player}.`;
  voteForm.reset();
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("player-name").value.trim();
  const colony = document.getElementById("player-colony").value;
  const notes = document.getElementById("player-notes").value.trim();

  if (!name || !colony || !notes) return;

  const newPlayer = {
    name,
    points: 0,
    colony,
    alive: true,
    active: true,
    notes,
    custom: true
  };

  participants.push(newPlayer);
  saveCustomPlayers();
  registerMessage.textContent = `${name} was added to the table with 0 points.`;
  registerForm.reset();
  renderTable();
});

renderTable();
