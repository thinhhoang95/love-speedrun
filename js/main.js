// main.js — bootstrap. Wires the DOM to the game, handles the invitation
// reveal, and the utility buttons (mute / skip / replay).

import { Renderer } from "./renderer.js";
import { Audio } from "./audio.js";
import { Input } from "./input.js";
import { Game } from "./game.js";

const canvas = document.getElementById("game");
const invitation = document.getElementById("invitation");
const stageEl = document.getElementById("stage");

const audio = new Audio();
const renderer = new Renderer(canvas);
const input = new Input(canvas, () => audio.resume());

const game = new Game(renderer, audio, input, {
  onInvitation: () => revealInvitation(),
});

function revealInvitation() {
  invitation.hidden = false;
  invitation.scrollIntoView({ behavior: renderer.reducedMotion ? "auto" : "smooth", block: "start" });
}

function hideInvitation() {
  invitation.hidden = true;
}

// ---- utility buttons ----
const btnMute = document.getElementById("btn-mute");
btnMute.addEventListener("click", () => {
  const muted = audio.toggleMute();
  btnMute.setAttribute("aria-pressed", String(muted));
  btnMute.textContent = muted ? "♪̷" : "♪";
});

const btnSkip = document.getElementById("btn-skip");
btnSkip.addEventListener("click", () => {
  audio.resume();
  game.skipToInvitation();
});

document.getElementById("btn-replay").addEventListener("click", () => {
  hideInvitation();
  game.reset();
  stageEl.scrollIntoView({ behavior: renderer.reducedMotion ? "auto" : "smooth", block: "center" });
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
