// main.js — bootstrap. Wires the DOM to the game, handles the scoreboard,
// leaderboard, invitation reveal, and utility buttons (mute / skip / replay).

import { Renderer } from "./renderer.js";
import { Audio } from "./audio.js";
import { Input } from "./input.js";
import { Game } from "./game.js";
import { saveScore, getLeaderboard } from "./leaderboard.js";

const canvas = document.getElementById("game");
const scoreboard = document.getElementById("scoreboard");
const nameEntryEl = document.getElementById("name-entry");
const scoreDisplay = document.getElementById("score-display");
const playerNameInput = document.getElementById("player-name");
const leaderboardPanel = document.getElementById("leaderboard-panel");
const leaderboardList = document.getElementById("leaderboard-list");
const invitation = document.getElementById("invitation");
const stageEl = document.getElementById("stage");

const audio = new Audio();
const renderer = new Renderer(canvas);
const input = new Input(canvas, () => audio.resume());

const btnSkipTitle = document.getElementById("btn-skip-title");
btnSkipTitle.addEventListener("click", () => {
  window.location.href = "invitation.html";
});

let _pendingScore = null;

const game = new Game(renderer, audio, input, {
  onInvitation: ({ score, rank }) => showScoreboard(score, rank),
  onGameStart: () => { btnSkipTitle.hidden = true; },
});

function showScoreboard(score, rank) {
  _pendingScore = { score, rank };
  scoreDisplay.textContent = `Điểm của bạn: ${score.toLocaleString()} · ${rank}`;
  nameEntryEl.hidden = false;
  leaderboardPanel.hidden = true;
  playerNameInput.value = "";
  scoreboard.hidden = false;
  playerNameInput.focus();
}

async function submitScore() {
  if (!_pendingScore) return;

  const btnSave = document.getElementById("btn-save-score");
  btnSave.disabled = true;
  btnSave.textContent = "Đang lưu…";

  const name = playerNameInput.value.trim() || "Vô danh";
  let currentId = null;

  try {
    currentId = await saveScore(name, _pendingScore.score, _pendingScore.rank);
  } catch (err) {
    console.error("Failed to save score:", err);
  }

  _pendingScore = null;

  let entries = [];
  try {
    entries = await getLeaderboard();
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
  }

  nameEntryEl.hidden = true;
  renderLeaderboard(entries, currentId);
  leaderboardPanel.hidden = false;

  btnSave.disabled = false;
  btnSave.textContent = "Lưu ▶";
}

function renderLeaderboard(entries, currentId) {
  leaderboardList.innerHTML = entries.map((e, i) => {
    const classes = [i === 0 ? "top" : "", e.id === currentId ? "current" : ""].filter(Boolean).join(" ");
    return `<li${classes ? ` class="${classes}"` : ""}>
      <span class="lb-pos">#${i + 1}</span>
      <span class="lb-name">${escapeHtml(e.name)}</span>
      <span class="lb-score">${e.score.toLocaleString()}</span>
      <span class="lb-badge">${escapeHtml(e.rank)}</span>
    </li>`;
  }).join("") || `<li style="grid-column:1/-1;text-align:center;color:#7a6080">Chưa có điểm nào.</li>`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.getElementById("btn-save-score").addEventListener("click", submitScore);
playerNameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") submitScore(); });

document.getElementById("btn-open-invite").addEventListener("click", () => {
  window.location.href = "invitation.html";
});

// ---- utility buttons ----
const btnMute = document.getElementById("btn-mute");
btnMute.addEventListener("click", () => {
  const muted = audio.toggleMute();
  btnMute.setAttribute("aria-pressed", String(muted));
  btnMute.textContent = muted ? "♪̷" : "♪";
});

const btnSkip = document.getElementById("btn-skip");
btnSkip.addEventListener("click", () => {
  window.location.href = "invitation.html";
});

document.getElementById("btn-replay").addEventListener("click", () => {
  invitation.hidden = true;
  scoreboard.hidden = true;
  btnSkipTitle.hidden = false;
  game.reset();
});

// ---- on-screen touch controls ----
const btnJump = document.getElementById("btn-jump");
const btnDuck = document.getElementById("btn-duck");
btnJump.addEventListener("touchstart", (e) => { e.preventDefault(); input.pressJump(); input.pressConfirm(); }, { passive: false });
btnJump.addEventListener("mousedown", () => { input.pressJump(); input.pressConfirm(); });
btnDuck.addEventListener("touchstart", (e) => { e.preventDefault(); input.setDuck(true); }, { passive: false });
btnDuck.addEventListener("touchend", (e) => { e.preventDefault(); input.setDuck(false); }, { passive: false });
btnDuck.addEventListener("mousedown", () => input.setDuck(true));
btnDuck.addEventListener("mouseup", () => input.setDuck(false));

game.start();
