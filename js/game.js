// game.js — the spine: state machine, fixed-step loop, spawning, scoring,
// collision resolution, stage flow, and the finale. Reads data from stages.js
// and items.js; delegates drawing to renderer.js.

import { STAGES, GROUND_Y } from "./stages.js";
import { ITEMS, HIT_MESSAGES, rankForScore } from "./items.js";
import { Player } from "./player.js";
import { isColliding, objHitbox } from "./collision.js";
import { VW, VH } from "./renderer.js";

export const State = {
  TITLE: "title",
  PLAYING: "playing",
  STAGE_CLEAR: "stageClear",
  FINALE: "finale",
  INVITATION: "invitation",
};

const FIXED = 1 / 60; // physics step

// Total required memories across every stage (for the "complete" message).
const TOTAL_REQUIRED = Object.values(ITEMS).filter((d) => d.required).length;

export class Game {
  constructor(renderer, audio, input, { onInvitation, onGameStart } = {}) {
    this.r = renderer;
    this.audio = audio;
    this.input = input;
    this.onInvitation = onInvitation || (() => {});
    this.onGameStart = onGameStart || (() => {});

    this.player = new Player();
    this.state = State.TITLE;

    this.stageIndex = 0;
    this.stageTimer = 0;
    this.spawnIndex = 0;
    this.scroll = 0;
    this.objects = [];
    this.particles = [];

    this.inventory = [];           // array of item defs (memories collected)
    this._invIds = new Set();
    this.score = 0;
    this.hitsThisStage = 0;

    this.boostTimer = 0;           // coffee speed boost remaining (s)
    this.shake = 0;                // screen-shake magnitude
    this.toastMsg = "";
    this.toastTimer = 0;
    this.stageClearTimer = 0;
    this.finaleTimer = 0;
    this._finaleSeeded = false;
    this._invitationFired = false;

    this._acc = 0;
    this._last = 0;
  }

  // ---------- lifecycle ----------
  start() {
    this._last = performance.now();
    requestAnimationFrame((t) => this._frame(t));
  }

  reset() {
    this.player.reset();
    this.stageIndex = 0;
    this.inventory = [];
    this._invIds.clear();
    this.score = 0;
    this._invitationFired = false;
    this._beginStage(0);
    this.state = State.TITLE;
  }

  // Jump straight to the end (Skip button).
  skipToInvitation() {
    this._fireInvitation();
  }

  // ---------- main frame ----------
  _frame(now) {
    let dt = (now - this._last) / 1000;
    this._last = now;
    if (dt > 0.1) dt = 0.1; // clamp after tab-away

    this._update(dt);
    this._render();
    requestAnimationFrame((t) => this._frame(t));
  }

  _update(dt) {
    switch (this.state) {
      case State.TITLE: this._updateTitle(); break;
      case State.PLAYING: this._updatePlaying(dt); break;
      case State.STAGE_CLEAR: this._updateStageClear(dt); break;
      case State.FINALE: this._updateFinale(dt); break;
      case State.INVITATION: break;
    }
    this._updateParticles(dt);
    if (this.shake > 0) this.shake = Math.max(0, this.shake - dt * 30);
    if (this.toastTimer > 0) this.toastTimer -= dt;
  }

  // ---------- TITLE ----------
  _updateTitle() {
    if (this.input.consumeConfirm()) {
      this._beginStage(0);
      this.state = State.PLAYING;
      this.onGameStart();
    }
  }

  // ---------- PLAYING ----------
  _beginStage(index) {
    this.stageIndex = index;
    this.stageTimer = 0;
    this.spawnIndex = 0;
    this.scroll = 0;
    this.objects = [];
    this.hitsThisStage = 0;
    this.boostTimer = 0;
    this.player.y = this.player.restingY();
    this.player.velocityY = 0;
  }

  get stage() { return STAGES[this.stageIndex]; }

  _currentSpeed() {
    const boost = this.boostTimer > 0 ? 1.5 : 1;
    // Gradual within-stage acceleration: +45% from start to end of the chapter.
    const ramp = 1 + Math.min(1, this.stageTimer / this.stage.duration) * 0.45;
    return this.stage.speed * ramp * boost;
  }

  _updatePlaying(dt) {
    const stage = this.stage;

    // input
    if (this.input.consumeJump() && this.player.jump()) this.audio.jump();
    this.player.setDucking(this.input.duckHeld);

    // physics in fixed steps
    this._acc += dt;
    while (this._acc >= FIXED) {
      this.player.update(FIXED);
      this._acc -= FIXED;
    }

    if (this.boostTimer > 0) this.boostTimer -= dt;

    // advance time + world
    this.stageTimer += dt;
    const speed = this._currentSpeed();
    this.scroll += speed * dt;

    // spawn from timeline
    while (
      this.spawnIndex < stage.timeline.length &&
      stage.timeline[this.spawnIndex].time <= this.stageTimer
    ) {
      this._spawn(stage.timeline[this.spawnIndex]);
      this.spawnIndex++;
    }

    // move + cull objects
    for (const o of this.objects) {
      o.x -= speed * dt * o.speedFactor;
      if (o.float) o.y = o.baseY + Math.sin((this.stageTimer + o.phase) * 4) * 2.5;
    }
    this.objects = this.objects.filter((o) => o.x + o.def.width > -8 && !o.collected);

    this._resolveCollisions();

    // stage end: timer elapsed and nothing important left on screen
    const lastSpawnDone = this.spawnIndex >= stage.timeline.length;
    if (this.stageTimer >= stage.duration && lastSpawnDone && this.objects.length === 0) {
      // no-hit bonus
      if (this.hitsThisStage === 0) this.score += 500;
      this.score += 1000; // finish bonus
      if (this.stageIndex >= STAGES.length - 1) {
        this._enterFinale();
      } else {
        this.audio.stageClear();
        this.stageClearTimer = 0;
        this.state = State.STAGE_CLEAR;
      }
    }
  }

  _spawn(entry) {
    const def = ITEMS[entry.id];
    if (!def) return;
    const floaty = def.type === "collectible" || def.type === "powerup";
    this.objects.push({
      def,
      x: VW + 12,
      y: entry.y,
      baseY: entry.y,
      collected: false,
      float: floaty,
      phase: Math.random() * 6,
      speedFactor: def.type === "projectile" ? 1.7 : (def.id === "motorbike" ? 1.25 : 1),
    });
  }

  _resolveCollisions() {
    const pbox = this.player.hitbox(4);
    for (const o of this.objects) {
      if (o.collected) continue;
      if (!isColliding(pbox, objHitbox(o))) continue;
      const t = o.def.type;
      if (t === "collectible" || t === "powerup" || t === "npc") {
        this._collect(o);
      } else if (t === "obstacle" || t === "projectile") {
        if (this.player.hit()) {
          this._onHit(o);
          break; // one heart per frame at most
        }
      }
    }
  }

  _collect(o) {
    o.collected = true;
    this.score += o.def.points || 0;
    this._addToInventory(o.def);
    // powerup effects
    if (o.def.effect === "speedBoost") { this.boostTimer = 3.5; this.audio.power(); }
    else if (o.def.effect === "restoreHeart") { this.player.restoreHeart(); this.audio.power(); }
    else if (o.def.required) this.audio.sparkle();
    else this.audio.collect();
    // sparkle particles
    this._burst(o.x + o.def.width / 2, o.y + o.def.height / 2, o.def.required ? "#fff7c8" : "#aee9ff", 8);
  }

  _addToInventory(def) {
    if (this._invIds.has(def.id)) return;
    this._invIds.add(def.id);
    this.inventory.push(def);
  }

  _onHit(o) {
    this.hitsThisStage++;
    this.audio.hit();
    if (!this.r.reducedMotion) this.shake = 6;
    const msgs = HIT_MESSAGES[this.stage.theme] || ["Oops!"];
    this._toast(msgs[Math.floor(Math.random() * msgs.length)]);
    // No hard game over — love always finds a way.
    if (this.player.hearts <= 0) {
      this.player.hearts = 2;
      this._toast("Tình yêu luôn tìm thấy con đường!");
    }
  }

  // ---------- STAGE CLEAR ----------
  _updateStageClear(dt) {
    this.stageClearTimer += dt;
    if (this.stageClearTimer >= 2.2 || this.input.consumeConfirm()) {
      this._beginStage(this.stageIndex + 1);
      this.state = State.PLAYING;
    }
  }

  // ---------- FINALE ----------
  _enterFinale() {
    this.state = State.FINALE;
    this.finaleTimer = 0;
    this._finaleSeeded = false;
    this.audio.finale();
  }

  _updateFinale(dt) {
    this.finaleTimer += dt;

    // Inventory memories fly up and burst into hearts (once).
    if (!this._finaleSeeded && this.finaleTimer > 0.3) {
      this._finaleSeeded = true;
      const step = Math.min(15, this.inventory.length ? (VW - 12) / this.inventory.length : 15);
      this.inventory.forEach((def, i) => this._spawnHeart(6 + i * step, 26));
    }
    // ongoing confetti / hearts rising
    if (!this.r.reducedMotion && Math.random() < 0.4) {
      this.particles.push({
        x: Math.random() * VW, y: VH + 4,
        vx: (Math.random() - 0.5) * 10, vy: -20 - Math.random() * 30,
        life: 3, maxLife: 3, size: 2 + Math.random() * 2, gravity: 6,
        color: ["#e8506b", "#ffd34d", "#7fd0a0", "#9ab4d6"][Math.floor(Math.random() * 4)],
        shape: Math.random() < 0.4 ? "heart" : "square",
      });
    }

    // Allow proceeding to the invitation.
    const ready = this.finaleTimer > 2.4;
    if (ready && (this.input.consumeConfirm() || this.finaleTimer > 7)) {
      this._fireInvitation();
    }
  }

  _spawnHeart(x, y) {
    this.particles.push({
      x, y, vx: (Math.random() - 0.5) * 20, vy: -40 - Math.random() * 30,
      life: 2.5, maxLife: 2.5, size: 8, gravity: 18, color: "#e8506b", shape: "heart",
    });
  }

  _fireInvitation() {
    if (this._invitationFired) return;
    this._invitationFired = true;
    this.state = State.INVITATION;
    this.onInvitation({ score: this.score, rank: rankForScore(this.score) });
  }

  // ---------- particles ----------
  _burst(x, y, color, n) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 20 + Math.random() * 40;
      this.particles.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: 0.6, maxLife: 0.6, size: 2, gravity: 10, color, shape: "square",
      });
    }
  }

  _updateParticles(dt) {
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += (p.gravity || 0) * dt;
      p.life -= dt;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
  }

  // ---------- render ----------
  _render() {
    const ctx = this.r.ctx2d;
    this.r.clear();

    // screen shake offset
    let ox = 0, oy = 0;
    if (this.shake > 0) {
      ox = (Math.random() - 0.5) * this.shake;
      oy = (Math.random() - 0.5) * this.shake;
    }
    ctx.save();
    ctx.translate(ox, oy);

    if (this.state === State.FINALE || this.state === State.INVITATION) {
      this._renderFinale();
    } else {
      this.r.background(this.stage, this.scroll);
      for (const o of this.objects) this.r.object(o);
      this.r.player(this.player);
      this.r.particles(this.particles);
      const progress = Math.min(1, this.stageTimer / this.stage.duration);
      this.r.hud(this.player, this.stage, progress, this.inventory);

      if (this.state === State.TITLE) this._renderTitle();
      if (this.state === State.STAGE_CLEAR) this._renderStageClear();
      if (this.toastTimer > 0) this.r.toast(this.toastMsg);
      if (this.state === State.PLAYING && this.stageTimer < 4) {
        this.r.text("Nhảy: Space/Chạm · Cúi: ↓/Vuốt", VW / 2, VH - 8,
          { size: 7, align: "center", color: "rgba(255,255,255,0.85)" });
      }
    }
    ctx.restore();
  }

  _renderTitle() {
    this.r.dim(0.5);
    this.r.text("OUR LOVE STORY", VW / 2, 70, { size: 20, align: "center", color: "#ffd9a0" });
    this.r.text("Đưa cô dâu và chú rể đến với nhau", VW / 2, 88, { size: 8, align: "center", color: "#fff" });
    if (Math.floor(performance.now() / 500) % 2 === 0) {
      this.r.text("▶ Nhấn Space / Chạm để bắt đầu", VW / 2, 120, { size: 9, align: "center", color: "#aee9ff" });
    }
  }

  _renderStageClear() {
    this.r.dim(0.45);
    const s = this.stage;
    this.r.text(`Chương ${this.stageIndex + 1} Hoàn Thành`, VW / 2, 78, { size: 12, align: "center", color: "#ffd9a0" });
    this.r.text(s.subtitle, VW / 2, 96, { size: 9, align: "center", color: "#fff" });
    this.r.text(`Điểm: ${this.score.toLocaleString()}`, VW / 2, 116, { size: 8, align: "center", color: "#aee9ff" });
  }

  _renderFinale() {
    // warm sky
    const ctx = this.r.ctx2d;
    const g = ctx.createLinearGradient(0, 0, 0, VH);
    g.addColorStop(0, "#3a2350"); g.addColorStop(0.6, "#7a4a6a"); g.addColorStop(1, "#e8a070");
    ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    this.r._ground(ctx, 0, "saigon");

    this.r.weddingArch(VW / 2 - 34, 58);

    // The groom walks in from the left and meets the bride under the arch.
    const W = 22, H = 30, feetY = GROUND_Y - H;
    const approach = Math.min(1, this.finaleTimer / 1.6);
    const ease = 1 - (1 - approach) * (1 - approach); // easeOutQuad
    const groomStartX = VW / 2 - 78;
    const groomMeetX = VW / 2 - 26;
    const gx = groomStartX + (groomMeetX - groomStartX) * ease;
    const brideX = VW / 2 + 4;
    const legSwing = approach < 1 ? Math.sin(this.finaleTimer * 12) * 2 : 0;

    this.r._bride(ctx, brideX, feetY, W, H);
    this.r._groom(ctx, gx, feetY, W, H, legSwing);
    // a heart blooms between them once they meet
    if (approach > 0.95) {
      const beat = 1 + Math.sin(this.finaleTimer * 6) * 0.12;
      const hs = 9 * beat;
      const cx = (groomMeetX + W + brideX) / 2;
      this.r.heartAt(cx - hs / 2, feetY + 4, hs);
    }

    this.r.particles(this.particles);

    this.r.text("HÀNH TRÌNH HOÀN TẤT", VW / 2, 26, { size: 11, align: "center", color: "#fff" });
    const done = this.inventory.filter((d) => d.required).length;
    const msg = done >= TOTAL_REQUIRED ? "Hành trình hoàn tất" : `Kỷ niệm: ${done}/${TOTAL_REQUIRED}`;
    this.r.text(msg, VW / 2, 40, { size: 8, align: "center", color: "#ffd9a0" });
    this.r.text(`Điểm: ${this.score.toLocaleString()} · ${rankForScore(this.score)}`,
      VW / 2, VH - 22, { size: 8, align: "center", color: "#fff" });
    if (this.finaleTimer > 2.4 && Math.floor(performance.now() / 500) % 2 === 0) {
      this.r.text("Mở thiệp mời ▶", VW / 2, VH - 8, { size: 9, align: "center", color: "#aee9ff" });
    }
  }

  _toast(msg) { this.toastMsg = msg; this.toastTimer = 1.6; }
}
