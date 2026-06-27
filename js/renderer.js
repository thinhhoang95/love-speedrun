// renderer.js — every pixel drawn here. View layer only.
//
// Default object art lives in RENDERERS as small canvas-drawn shapes, each
// drawn inside a (x, y, w, h) box so the SAME function serves both the world
// and the inventory bar. If an item has a `spriteUrl`, the image is drawn
// instead — that is the single hook for swapping in custom pixel art later.

export const VW = 320; // virtual width
export const VH = 180; // virtual height

// ---- small drawing helpers ----
function px(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

// Map of default shape renderers. (ctx, x, y, w, h) draws within that box.
export const RENDERERS = {
  // --- Stage 1 ---
  drawNotebook(ctx, x, y, w, h) {
    px(ctx, x, y, w, h, "#2f6fd0");
    px(ctx, x + w * 0.18, y, w * 0.12, h, "#ffffff"); // spiral stripe
    px(ctx, x + w * 0.45, y + h * 0.3, w * 0.4, 1, "#cfe0ff");
    px(ctx, x + w * 0.45, y + h * 0.55, w * 0.4, 1, "#cfe0ff");
  },
  drawPen(ctx, x, y, w, h) {
    px(ctx, x + w * 0.35, y, w * 0.3, h * 0.8, "#d23b48");
    px(ctx, x + w * 0.35, y + h * 0.8, w * 0.3, h * 0.2, "#333");
    px(ctx, x + w * 0.4, y, w * 0.2, h * 0.15, "#ffd34d");
  },
  drawRuler(ctx, x, y, w, h) {
    px(ctx, x, y + h * 0.3, w, h * 0.4, "#f2c14e");
    for (let i = 1; i < 6; i++) px(ctx, x + (w / 6) * i, y + h * 0.3, 1, h * 0.18, "#8a6d1f");
  },
  drawLoveNote(ctx, x, y, w, h) {
    px(ctx, x, y, w, h, "#fff0f3");
    px(ctx, x, y, w, h * 0.55, "#ffd0db");
    ctx.fillStyle = "#e8506b";
    ctx.beginPath();
    const cx = x + w / 2, cy = y + h * 0.55, s = w * 0.16;
    ctx.moveTo(cx, cy + s);
    ctx.lineTo(cx - s * 1.4, cy - s * 0.3);
    ctx.lineTo(cx + s * 1.4, cy - s * 0.3);
    ctx.closePath();
    ctx.fill();
    px(ctx, cx - s * 1.1, cy - s, s, s, "#e8506b");
    px(ctx, cx + s * 0.1, cy - s, s, s, "#e8506b");
  },
  drawSchoolbag(ctx, x, y, w, h) {
    px(ctx, x, y + h * 0.2, w, h * 0.8, "#7a3fb5");
    px(ctx, x + w * 0.2, y, w * 0.6, h * 0.3, "#5d2e8c"); // flap
    px(ctx, x + w * 0.4, y + h * 0.35, w * 0.2, h * 0.25, "#ffd34d");
  },
  drawChair(ctx, x, y, w, h) {
    px(ctx, x + w * 0.15, y, w * 0.7, h * 0.45, "#9c6b3f"); // back
    px(ctx, x + w * 0.1, y + h * 0.45, w * 0.8, h * 0.2, "#b07b48"); // seat
    px(ctx, x + w * 0.15, y + h * 0.65, w * 0.12, h * 0.35, "#7a4f2a");
    px(ctx, x + w * 0.73, y + h * 0.65, w * 0.12, h * 0.35, "#7a4f2a");
  },
  drawBookStack(ctx, x, y, w, h) {
    px(ctx, x, y + h * 0.66, w, h * 0.34, "#c0392b");
    px(ctx, x + w * 0.06, y + h * 0.33, w * 0.9, h * 0.33, "#2980b9");
    px(ctx, x + w * 0.12, y, w * 0.8, h * 0.33, "#27ae60");
  },

  // --- Stage 2 ---
  drawLaptop(ctx, x, y, w, h) {
    px(ctx, x + w * 0.1, y, w * 0.8, h * 0.7, "#8a8f98"); // lid
    px(ctx, x + w * 0.18, y + h * 0.1, w * 0.64, h * 0.5, "#1f2a36"); // screen
    px(ctx, x, y + h * 0.7, w, h * 0.3, "#6c7079"); // base
  },
  drawPapers(ctx, x, y, w, h) {
    px(ctx, x + w * 0.15, y + h * 0.15, w * 0.8, h * 0.8, "#e9e9e9");
    px(ctx, x + w * 0.05, y + h * 0.05, w * 0.8, h * 0.8, "#ffffff");
    px(ctx, x + w * 0.18, y + h * 0.25, w * 0.5, 1, "#bbb");
    px(ctx, x + w * 0.18, y + h * 0.45, w * 0.5, 1, "#bbb");
  },
  drawProfessor(ctx, x, y, w, h) {
    px(ctx, x + w * 0.3, y, w * 0.4, h * 0.3, "#e8c39a"); // head
    px(ctx, x + w * 0.28, y, w * 0.44, h * 0.08, "#8a8a8a"); // grey hair
    px(ctx, x + w * 0.32, y + h * 0.14, w * 0.12, h * 0.08, "#222"); // glasses
    px(ctx, x + w * 0.56, y + h * 0.14, w * 0.12, h * 0.08, "#222");
    px(ctx, x + w * 0.2, y + h * 0.3, w * 0.6, h * 0.55, "#34495e"); // suit
    px(ctx, x + w * 0.45, y + h * 0.32, w * 0.1, h * 0.5, "#c0392b"); // tie
  },
  drawCommittee(ctx, x, y, w, h) {
    px(ctx, x, y + h * 0.55, w, h * 0.45, "#5a3a22"); // table
    for (let i = 0; i < 3; i++) {
      const hx = x + w * (0.13 + i * 0.3);
      px(ctx, hx, y, w * 0.16, h * 0.3, "#e8c39a"); // head
      px(ctx, hx - w * 0.02, y + h * 0.28, w * 0.2, h * 0.3, "#2c3e50"); // body
    }
  },
  drawPaperStack(ctx, x, y, w, h) {
    px(ctx, x, y + h * 0.5, w, h * 0.5, "#dfe6e9");
    px(ctx, x + w * 0.05, y + h * 0.25, w * 0.9, h * 0.3, "#f5f6fa");
    px(ctx, x + w * 0.1, y, w * 0.8, h * 0.3, "#ffffff");
  },
  drawClock(ctx, x, y, w, h) {
    ctx.fillStyle = "#c0392b";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    px(ctx, x + w / 2 - 0.5, y + h * 0.25, 1.5, h * 0.28, "#222"); // hands
    px(ctx, x + w / 2, y + h / 2 - 0.5, w * 0.25, 1.5, "#222");
  },
  drawQuestion(ctx, x, y, w, h) {
    ctx.fillStyle = "#ffce54";
    ctx.font = `bold ${Math.round(h)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", x + w / 2, y + h / 2 + 1);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  },

  // --- Stage 3 ---
  drawReports(ctx, x, y, w, h) {
    px(ctx, x, y, w, h, "#ffffff");
    px(ctx, x, y, w, h * 0.22, "#2980b9");
    px(ctx, x + w * 0.15, y + h * 0.4, w * 0.7, 1.5, "#2980b9");
    px(ctx, x + w * 0.15, y + h * 0.6, w * 0.7, 1.5, "#2980b9");
    px(ctx, x + w * 0.15, y + h * 0.78, w * 0.45, 1.5, "#2980b9");
  },
  drawCoffee(ctx, x, y, w, h) {
    px(ctx, x + w * 0.2, y + h * 0.3, w * 0.6, h * 0.7, "#fff");
    px(ctx, x + w * 0.2, y + h * 0.3, w * 0.6, h * 0.4, "#7a4a2b"); // coffee
    px(ctx, x + w * 0.8, y + h * 0.45, w * 0.18, h * 0.3, "#fff"); // handle
    px(ctx, x + w * 0.35, y + h * 0.05, 1.5, h * 0.2, "#cdb4a0"); // steam
    px(ctx, x + w * 0.55, y, 1.5, h * 0.22, "#cdb4a0");
  },
  drawChicken(ctx, x, y, w, h) {
    ctx.fillStyle = "#a86a32";
    ctx.beginPath();
    ctx.arc(x + w * 0.6, y + h * 0.45, w * 0.32, 0, Math.PI * 2); // meat
    ctx.fill();
    px(ctx, x + w * 0.1, y + h * 0.6, w * 0.4, h * 0.16, "#f2e3c6"); // bone
    px(ctx, x, y + h * 0.55, w * 0.16, h * 0.26, "#f2e3c6"); // bone knob
  },
  drawHeartItem(ctx, x, y, w, h) { RENDERERS._heart(ctx, x, y, w, h, "#e8506b"); },
  drawCone(ctx, x, y, w, h) {
    ctx.fillStyle = "#e9622f";
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w * 0.85, y + h);
    ctx.lineTo(x + w * 0.15, y + h);
    ctx.closePath();
    ctx.fill();
    px(ctx, x + w * 0.22, y + h * 0.45, w * 0.56, h * 0.16, "#fff");
  },
  drawMotorbike(ctx, x, y, w, h) {
    px(ctx, x + w * 0.15, y + h * 0.3, w * 0.7, h * 0.35, "#34495e"); // body
    px(ctx, x + w * 0.6, y + h * 0.1, w * 0.18, h * 0.3, "#2c3e50"); // rider torso
    ctx.fillStyle = "#222";
    ctx.beginPath(); ctx.arc(x + w * 0.25, y + h * 0.78, h * 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w * 0.75, y + h * 0.78, h * 0.2, 0, Math.PI * 2); ctx.fill();
    px(ctx, x + w * 0.05, y + h * 0.4, w * 0.12, h * 0.1, "#ffd34d"); // headlight
  },

  // --- extra Stage 1 memories ---
  drawEraser(ctx, x, y, w, h) {
    px(ctx, x, y + h * 0.25, w, h * 0.5, "#f48fb1");
    px(ctx, x, y + h * 0.25, w * 0.34, h * 0.5, "#5b8def");
  },
  drawChalk(ctx, x, y, w, h) {
    px(ctx, x + w * 0.32, y + h * 0.05, w * 0.36, h * 0.9, "#f7f7f7");
    px(ctx, x + w * 0.32, y + h * 0.05, w * 0.36, h * 0.14, "#dcdce0");
  },
  drawScarf(ctx, x, y, w, h) {
    ctx.fillStyle = "#d23b48";
    ctx.beginPath();
    ctx.moveTo(x + w * 0.1, y + h * 0.2);
    ctx.lineTo(x + w * 0.9, y + h * 0.2);
    ctx.lineTo(x + w * 0.5, y + h * 0.68);
    ctx.closePath(); ctx.fill();
    px(ctx, x + w * 0.42, y + h * 0.55, w * 0.16, h * 0.42, "#a82c36");
  },
  drawApple(ctx, x, y, w, h) {
    ctx.fillStyle = "#e23b3b";
    ctx.beginPath(); ctx.arc(x + w * 0.5, y + h * 0.56, w * 0.38, 0, Math.PI * 2); ctx.fill();
    px(ctx, x + w * 0.47, y + h * 0.06, w * 0.06, h * 0.26, "#6b4a2a");
    ctx.fillStyle = "#5aa84a";
    ctx.beginPath(); ctx.ellipse(x + w * 0.64, y + h * 0.2, w * 0.12, h * 0.07, 0, 0, Math.PI * 2); ctx.fill();
  },

  // --- extra Stage 2 memories ---
  drawCroissant(ctx, x, y, w, h) {
    ctx.strokeStyle = "#d49a4a"; ctx.lineWidth = h * 0.4; ctx.lineCap = "round";
    ctx.beginPath(); ctx.arc(x + w * 0.5, y + h * 0.85, w * 0.4, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
    ctx.lineWidth = 1; ctx.lineCap = "butt";
  },
  drawBaguette(ctx, x, y, w, h) {
    ctx.strokeStyle = "#d9b06a"; ctx.lineWidth = h * 0.42; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(x + w * 0.16, y + h * 0.6); ctx.lineTo(x + w * 0.84, y + h * 0.42); ctx.stroke();
    ctx.lineCap = "butt"; ctx.lineWidth = 1;
    ctx.strokeStyle = "#a87d3c";
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x + w * (0.32 + i * 0.18), y + h * 0.4);
      ctx.lineTo(x + w * (0.38 + i * 0.18), y + h * 0.52);
      ctx.stroke();
    }
  },
  drawBook(ctx, x, y, w, h) {
    px(ctx, x + w * 0.15, y + h * 0.1, w * 0.7, h * 0.8, "#7a3fb5");
    px(ctx, x + w * 0.15, y + h * 0.1, w * 0.13, h * 0.8, "#5d2e8c");
    px(ctx, x + w * 0.8, y + h * 0.15, w * 0.06, h * 0.7, "#fff");
    px(ctx, x + w * 0.4, y + h * 0.45, w * 0.3, 1.5, "#ffd34d");
  },
  drawTicket(ctx, x, y, w, h) {
    px(ctx, x, y + h * 0.28, w, h * 0.44, "#ffe08a");
    px(ctx, x + w * 0.1, y + h * 0.4, w * 0.3, h * 0.2, "#cdab53");
    for (let ty = y + h * 0.3; ty < y + h * 0.7; ty += 3) px(ctx, x + w * 0.52, ty, 1, 1.5, "#cdab53");
  },

  // --- extra Stage 3 memories ---
  drawPho(ctx, x, y, w, h) {
    ctx.fillStyle = "#e8eef0";
    ctx.beginPath(); ctx.arc(x + w * 0.5, y + h * 0.52, w * 0.45, 0, Math.PI); ctx.fill();
    px(ctx, x + w * 0.05, y + h * 0.46, w * 0.9, h * 0.12, "#cdd6da");
    px(ctx, x + w * 0.2, y + h * 0.42, w * 0.6, h * 0.07, "#caa24a");
    px(ctx, x + w * 0.35, y + h * 0.06, 1.5, h * 0.22, "#cdd6da");
    px(ctx, x + w * 0.6, y, 1.5, h * 0.24, "#cdd6da");
  },
  drawBanhMi(ctx, x, y, w, h) {
    ctx.fillStyle = "#d9a85c";
    ctx.beginPath(); ctx.ellipse(x + w * 0.5, y + h * 0.5, w * 0.45, h * 0.27, 0, 0, Math.PI * 2); ctx.fill();
    px(ctx, x + w * 0.12, y + h * 0.48, w * 0.76, h * 0.12, "#6fae5a");
    px(ctx, x + w * 0.2, y + h * 0.52, w * 0.6, h * 0.06, "#c0392b");
  },
  drawNonLa(ctx, x, y, w, h) {
    ctx.fillStyle = "#e3c779";
    ctx.beginPath();
    ctx.moveTo(x + w * 0.5, y + h * 0.1);
    ctx.lineTo(x + w * 0.92, y + h * 0.78);
    ctx.lineTo(x + w * 0.08, y + h * 0.78);
    ctx.closePath(); ctx.fill();
    px(ctx, x + w * 0.02, y + h * 0.76, w * 0.96, h * 0.1, "#d4b25f");
    ctx.strokeStyle = "#c19b4a"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(x + w * 0.5, y + h * 0.1); ctx.lineTo(x + w * 0.3, y + h * 0.78); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + w * 0.5, y + h * 0.1); ctx.lineTo(x + w * 0.7, y + h * 0.78); ctx.stroke();
    ctx.lineWidth = 1;
  },
  drawLotus(ctx, x, y, w, h) {
    const cx = x + w * 0.5, cy = y + h * 0.6;
    ctx.fillStyle = "#f4a6c0";
    for (let i = 0; i < 5; i++) {
      const ang = -Math.PI / 2 + (i - 2) * 0.55;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
      ctx.beginPath(); ctx.ellipse(0, -h * 0.22, w * 0.12, h * 0.22, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    px(ctx, cx - w * 0.08, cy - h * 0.08, w * 0.16, h * 0.16, "#ffd34d");
  },
  drawSmoothie(ctx, x, y, w, h) {
    px(ctx, x + w * 0.25, y + h * 0.2, w * 0.5, h * 0.75, "#ffffff");
    px(ctx, x + w * 0.27, y + h * 0.36, w * 0.46, h * 0.56, "#ff8fab");
    px(ctx, x + w * 0.55, y, w * 0.08, h * 0.42, "#e0e0e0");
  },

  _heart(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    const cx = x + w / 2, top = y + h * 0.32, s = w * 0.28;
    ctx.beginPath();
    ctx.arc(cx - s * 0.7, top, s, 0, Math.PI * 2);
    ctx.arc(cx + s * 0.7, top, s, 0, Math.PI * 2);
    ctx.moveTo(x + w * 0.12, top + s * 0.2);
    ctx.lineTo(cx, y + h * 0.95);
    ctx.lineTo(x + w * 0.88, top + s * 0.2);
    ctx.closePath();
    ctx.fill();
  },
};

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this._spriteCache = new Map();
    this.reducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  get ctx2d() { return this.ctx; }

  clear() {
    this.ctx.clearRect(0, 0, VW, VH);
  }

  // ---- backgrounds (3 parallax layers each) ----
  background(stage, scroll) {
    const ctx = this.ctx;
    if (stage.theme === "classroom") this._bgClassroom(ctx, scroll);
    else if (stage.theme === "paris") this._bgParis(ctx, scroll);
    else this._bgSaigon(ctx, scroll);
    this._ground(ctx, scroll, stage.theme);
  }

  _bgClassroom(ctx, scroll) {
    px(ctx, 0, 0, VW, VH, "#f3e2b8"); // cream wall
    px(ctx, 12, 18, 120, 46, "#1f5d3a"); // chalkboard
    px(ctx, 12, 18, 120, 46, "#2a7a4d");
    ctx.strokeStyle = "#7fd0a0"; ctx.lineWidth = 1;
    ctx.strokeRect(14, 20, 116, 42);
    // class name written in chalk
    this.text("PTNK", 72, 38, { size: 13, align: "center", color: "#eafff2", shadow: false });
    this.text("L1013", 72, 54, { size: 12, align: "center", color: "#bfeccf", shadow: false });
    px(ctx, 46, 41, 52, 1, "#9fe0bf"); // chalk underline
    // far windows scrolling slowly
    const off = (scroll * 0.3) % 110;
    for (let i = -1; i < 4; i++) {
      const wx = 170 + i * 110 - off;
      px(ctx, wx, 22, 60, 44, "#cdeaff");
      px(ctx, wx + 28, 22, 4, 44, "#f3e2b8");
      px(ctx, wx, 42, 60, 3, "#f3e2b8");
      ctx.strokeStyle = "#9bbcd6"; ctx.strokeRect(wx, 22, 60, 44);
    }
  }

  _bgParis(ctx, scroll) {
    // sky gradient
    const g = ctx.createLinearGradient(0, 0, 0, VH);
    g.addColorStop(0, "#bcd8ff"); g.addColorStop(1, "#eef4ff");
    ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);

    // Far Haussmannian rooftops (hazy, slow parallax) — a Paris boulevard skyline
    const offFar = (scroll * 0.18) % 64;
    for (let i = -1; i < 7; i++) {
      const bx = i * 64 - offFar;
      px(ctx, bx, 84, 60, 66, "#cbd2dd");           // hazy facade
      // mansard roofline (trapezoid)
      ctx.fillStyle = "#aab2c0";
      ctx.beginPath();
      ctx.moveTo(bx + 4, 84); ctx.lineTo(bx + 12, 74);
      ctx.lineTo(bx + 48, 74); ctx.lineTo(bx + 56, 84);
      ctx.closePath(); ctx.fill();
    }

    // Mid Haussmannian facades (detailed) — the French flair up close
    const off = (scroll * 0.5) % 54;
    for (let i = -1; i < 8; i++) {
      this._haussmann(ctx, i * 54 - off, 150, 50);
    }
  }

  // One Haussmannian apartment building: limestone facade, zinc mansard roof,
  // string courses, tall windows and wrought-iron balconies.
  _haussmann(ctx, x, baseY, w) {
    const roofTop = 60, facadeTop = 74;
    // limestone facade
    px(ctx, x, facadeTop, w, baseY - facadeTop, "#e9dec6");
    px(ctx, x, facadeTop, w, 2, "#d4c8aa");                 // cornice shadow
    px(ctx, x, baseY - 18, w, 18, "#ddd1b6");               // darker ground floor
    // zinc mansard roof (trapezoid) with a chimney + dormer
    ctx.fillStyle = "#59616e";
    ctx.beginPath();
    ctx.moveTo(x + 3, facadeTop); ctx.lineTo(x + 9, roofTop);
    ctx.lineTo(x + w - 9, roofTop); ctx.lineTo(x + w - 3, facadeTop);
    ctx.closePath(); ctx.fill();
    px(ctx, x + w * 0.42, roofTop - 6, 4, 6, "#4a525d");    // chimney
    px(ctx, x + w * 0.42 + 5, roofTop - 8, 4, 8, "#4a525d");
    px(ctx, x + w / 2 - 4, roofTop + 2, 8, 6, "#8b94a2");   // dormer window
    // three floors of tall windows with balconies
    const cols = [x + 8, x + w / 2 - 3, x + w - 14];
    const floors = [facadeTop + 8, facadeTop + 28, facadeTop + 48];
    floors.forEach((fy, fi) => {
      px(ctx, x + 2, fy - 4, w - 4, 1, "#cbbfa0");          // string course
      for (const cx of cols) {
        px(ctx, cx, fy, 6, 13, "#cfd8e2");                  // window frame
        px(ctx, cx + 1, fy + 1, 4, 11, "#3f5168");          // glass
        px(ctx, cx + 2, fy + 1, 1, 11, "#5d7088"); // mullion (light)
        if (fi < 2) {                                       // wrought-iron balcony
          for (let bxp = cx - 1; bxp < cx + 7; bxp += 2) px(ctx, bxp, fy + 13, 1, 3, "#2b2f36");
          px(ctx, cx - 1, fy + 13, 8, 1, "#2b2f36");
        }
      }
    });
  }

  _bgSaigon(ctx, scroll) {
    const g = ctx.createLinearGradient(0, 0, 0, VH);
    g.addColorStop(0, "#ff9a52"); g.addColorStop(0.6, "#ffb36b"); g.addColorStop(1, "#ffd9a0");
    ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    // sun
    ctx.fillStyle = "#fff1c9";
    ctx.beginPath(); ctx.arc(250, 48, 20, 0, Math.PI * 2); ctx.fill();

    // far hazy skyline band (slow parallax) for depth
    const offFar = (scroll * 0.16) % 40;
    const far = "#c98aa0";
    for (let i = -1; i < 10; i++) {
      const bx = i * 40 - offFar;
      const hh = 26 + ((i * 7) % 5) * 6;
      px(ctx, bx, 150 - hh, 30, hh, far);
    }

    // near recognizable Saigon landmarks (faster parallax)
    const P = 330;
    const off = (scroll * 0.42) % P;
    for (let i = -1; i < 3; i++) {
      const bx = i * P - off;
      this._landmark81(ctx, bx + 22, 150);
      this._bitexco(ctx, bx + 92, 150);
      this._notredame(ctx, bx + 150, 150);
      this._benThanh(ctx, bx + 198, 150);
    }
  }

  // Landmark 81 — Vietnam's tallest: a tapering, tiered super-tall tower + spire.
  _landmark81(ctx, x, b) {
    const c = "#5e3b46", seam = "#7a4f5a", win = "#ffd98a", w = 22;
    ctx.fillStyle = c; // tapering body (22 wide base -> 12 at top)
    ctx.beginPath();
    ctx.moveTo(x, b); ctx.lineTo(x + 5, 50);
    ctx.lineTo(x + w - 5, 50); ctx.lineTo(x + w, b);
    ctx.closePath(); ctx.fill();
    px(ctx, x + 6, 42, 10, 9, c);          // setback tier
    px(ctx, x + 8, 33, 6, 10, c);          // upper tier
    px(ctx, x + 10.25, 16, 1.5, 17, c);    // spire
    for (const sx of [x + 6, x + 10.5, x + 15]) px(ctx, sx, 52, 0.75, b - 52, seam); // bundled-shaft seams
    for (let wy = 60; wy < b - 6; wy += 12) // window glow rows
      for (const wx of [x + 4, x + 9, x + 14]) px(ctx, wx, wy, 1.5, 2, win);
  }

  // Bitexco Financial Tower — lotus-bud taper with the cantilevered helipad disc.
  _bitexco(ctx, x, b) {
    const c = "#6b424b", win = "#ffd98a", w = 18;
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(x, b); ctx.lineTo(x + 3, 60);
    ctx.lineTo(x + 6, 46); ctx.lineTo(x + 12, 46);
    ctx.lineTo(x + 15, 60); ctx.lineTo(x + w, b);
    ctx.closePath(); ctx.fill();
    // helipad disc protruding to the right near the top
    ctx.fillStyle = c;
    ctx.beginPath(); ctx.ellipse(x + 16, 56, 8, 2.6, 0, 0, Math.PI * 2); ctx.fill();
    px(ctx, x + 8.5, 32, 1.5, 14, c);      // mast
    for (let wy = 66; wy < b - 6; wy += 11) // window glow
      for (const wx of [x + 5, x + 9, x + 12]) px(ctx, wx, wy, 1.5, 2, win);
  }

  // Notre-Dame Cathedral Basilica of Saigon — twin square bell towers + spires.
  _notredame(ctx, x, b) {
    const c = "#7a3f3a", win = "#ffd98a"; // warm brick tone
    px(ctx, x + 9, 100, 12, b - 100, c);   // nave
    ctx.fillStyle = c;                      // gable
    ctx.beginPath(); ctx.moveTo(x + 9, 100); ctx.lineTo(x + 15, 92); ctx.lineTo(x + 21, 100); ctx.closePath(); ctx.fill();
    px(ctx, x + 1, 86, 8, b - 86, c);      // left tower
    px(ctx, x + 21, 86, 8, b - 86, c);     // right tower
    ctx.beginPath(); ctx.moveTo(x + 1, 86); ctx.lineTo(x + 5, 72); ctx.lineTo(x + 9, 86); ctx.closePath(); ctx.fill(); // L spire
    ctx.beginPath(); ctx.moveTo(x + 21, 86); ctx.lineTo(x + 25, 72); ctx.lineTo(x + 29, 86); ctx.closePath(); ctx.fill(); // R spire
    px(ctx, x + 13, 108, 4, 4, win);       // rose window
  }

  // Bến Thành Market — wide halls flanking the iconic clock tower.
  _benThanh(ctx, x, b) {
    const c = "#6e4a3f", roof = "#5a3a30", win = "#ffd98a";
    px(ctx, x, 126, 24, b - 126, c);       // left hall
    px(ctx, x + 40, 126, 24, b - 126, c);  // right hall
    // sloped hall roofs
    ctx.fillStyle = roof;
    ctx.beginPath(); ctx.moveTo(x - 1, 126); ctx.lineTo(x + 12, 119); ctx.lineTo(x + 25, 126); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + 39, 126); ctx.lineTo(x + 52, 119); ctx.lineTo(x + 65, 126); ctx.closePath(); ctx.fill();
    // central clock tower
    px(ctx, x + 24, 100, 16, b - 100, c);
    ctx.fillStyle = roof; // pyramidal roof
    ctx.beginPath(); ctx.moveTo(x + 22, 100); ctx.lineTo(x + 32, 84); ctx.lineTo(x + 42, 100); ctx.closePath(); ctx.fill();
    px(ctx, x + 31, 79, 2, 6, roof);       // finial
    px(ctx, x + 28, 90, 8, 8, win);        // clock face
    px(ctx, x + 31.5, 91, 1, 4, "#6e4a3f"); // clock hands
    px(ctx, x + 32, 93.5, 3, 1, "#6e4a3f");
    // little arched market windows
    for (const wx of [x + 4, x + 11, x + 18, x + 46, x + 53, x + 60]) px(ctx, wx, 132, 3, 6, win);
  }

  _ground(ctx, scroll, theme) {
    const top = 150;
    let g1 = "#caa46a", g2 = "#a8854f"; // wood/floor default
    if (theme === "paris") { g1 = "#9aa0a6"; g2 = "#7c828a"; }
    if (theme === "saigon") { g1 = "#6b5550"; g2 = "#54423e"; }
    px(ctx, 0, top, VW, VH - top, g1);
    px(ctx, 0, top, VW, 3, g2);
    // scrolling dashes for motion
    const off = scroll % 24;
    for (let x = -off; x < VW; x += 24) px(ctx, x, top + 12, 12, 2, g2);
  }

  // ---- world object ----
  object(obj) {
    const def = obj.def;
    if (def.spriteUrl) {
      const img = this._sprite(def.spriteUrl);
      if (img && img.complete && img.naturalWidth) {
        this.ctx.drawImage(img, Math.round(obj.x), Math.round(obj.y), def.width, def.height);
        return;
      }
    }
    // subtle float bob for collectibles / powerups already applied to obj.y by game
    const fn = RENDERERS[def.defaultRenderer];
    if (fn) fn(this.ctx, obj.x, obj.y, def.width, def.height);
    // glow ring for required memory items
    if (def.required) this._glow(obj.x + def.width / 2, obj.y + def.height / 2, def.width);
  }

  _glow(cx, cy, size) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = 0.35 + 0.15 * Math.sin(performance.now() / 200);
    ctx.strokeStyle = "#fff7c8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.75, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Draw any item's default art into an arbitrary box (used by inventory bar).
  icon(def, x, y, w, h) {
    if (def.spriteUrl) {
      const img = this._sprite(def.spriteUrl);
      if (img && img.complete && img.naturalWidth) {
        this.ctx.drawImage(img, x, y, w, h);
        return;
      }
    }
    const fn = RENDERERS[def.defaultRenderer];
    if (fn) fn(this.ctx, x, y, w, h);
  }

  _sprite(url) {
    if (!this._spriteCache.has(url)) {
      const img = new Image();
      img.src = url;
      this._spriteCache.set(url, img);
    }
    return this._spriteCache.get(url);
  }

  // ---- the running groom (the only playable character) ----
  player(p) {
    const ctx = this.ctx;
    // flicker while invulnerable
    if (p.invulnTimer > 0 && Math.floor(performance.now() / 90) % 2 === 0) return;
    const legSwing = p.isGrounded ? Math.sin(p.runPhase) * 2 : 0;
    this._groom(ctx, p.x - p.knockback, p.y, p.width, p.height, legSwing);
  }

  // Groom sprite drawn to fill the given box.
  _groom(ctx, x, y, w, h, legSwing = 0) {
    px(ctx, x + w * 0.18, y + h * 0.18, w * 0.64, h * 0.52, "#2c3e50"); // suit body
    px(ctx, x + w * 0.4, y + h * 0.2, w * 0.2, h * 0.4, "#ecf0f1");      // shirt front
    px(ctx, x + w * 0.46, y + h * 0.2, w * 0.08, h * 0.28, "#c0392b");   // tie
    px(ctx, x + w * 0.32, y, w * 0.36, h * 0.22, "#e8c39a");             // head
    px(ctx, x + w * 0.3, y, w * 0.4, h * 0.08, "#3a2a1a");               // hair
    px(ctx, x + w * 0.2, y + h * 0.7, w * 0.24, h * 0.3 - legSwing, "#1f2a36"); // leg
    px(ctx, x + w * 0.56, y + h * 0.7, w * 0.24, h * 0.3 + legSwing, "#1f2a36"); // leg
  }

  // Bride sprite (met at the finale) drawn to fill the given box.
  _bride(ctx, x, y, w, h) {
    ctx.fillStyle = "#fdfdfd";
    ctx.beginPath(); // dress
    ctx.moveTo(x + w * 0.5, y + h * 0.2);
    ctx.lineTo(x + w * 0.92, y + h * 0.92);
    ctx.lineTo(x + w * 0.08, y + h * 0.92);
    ctx.closePath(); ctx.fill();
    px(ctx, x + w * 0.32, y, w * 0.36, h * 0.22, "#e8c39a");   // head
    px(ctx, x + w * 0.28, y - h * 0.04, w * 0.44, h * 0.12, "#5a3a1a"); // hair
    px(ctx, x + w * 0.3, y - h * 0.06, w * 0.4, h * 0.05, "#fff");      // veil band
    px(ctx, x + w * 0.34, y + h * 0.86, w * 0.14, h * 0.14, "#e8c39a"); // leg
    px(ctx, x + w * 0.52, y + h * 0.86, w * 0.14, h * 0.14, "#e8c39a"); // leg
  }

  // ---- text helpers ----
  text(str, x, y, { size = 10, color = "#fff", align = "left", weight = "bold", shadow = true } = {}) {
    const ctx = this.ctx;
    ctx.font = `${weight} ${size}px "Trebuchet MS", sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = "alphabetic";
    if (shadow) { ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillText(str, x + 1, y + 1); }
    ctx.fillStyle = color;
    ctx.fillText(str, x, y);
    ctx.textAlign = "left";
  }

  // ---- HUD ----
  hud(p, stage, progress, inventory) {
    const ctx = this.ctx;
    // hearts
    for (let i = 0; i < p.maxHearts; i++) {
      const filled = i < p.hearts;
      RENDERERS._heart(ctx, 6 + i * 12, 5, 9, 9, filled ? "#e8506b" : "rgba(255,255,255,0.25)");
    }
    // chapter title (center)
    this.text(stage.title, VW / 2, 12, { size: 8, align: "center", color: "#fff" });
    // progress %
    this.text(`${Math.round(progress * 100)}%`, VW - 6, 12, { size: 9, align: "right", color: "#fff" });
    // inventory bar — scales down as more memories are collected
    const n = inventory.length;
    const step = Math.min(15, n ? (VW - 12) / n : 15);
    const iconW = Math.max(6, step - 3);
    inventory.forEach((def, i) => {
      const ix = 6 + i * step;
      px(ctx, ix - 1, 18, iconW + 2, iconW + 2, "rgba(0,0,0,0.3)");
      this.icon(def, ix, 19, iconW, iconW);
    });
  }

  // ---- particles ----
  particles(list) {
    const ctx = this.ctx;
    for (const pt of list) {
      ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
      if (pt.shape === "heart") RENDERERS._heart(ctx, pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size, pt.color);
      else px(ctx, pt.x, pt.y, pt.size, pt.size, pt.color);
      ctx.globalAlpha = 1;
    }
  }

  // ---- full-screen overlays ----
  dim(alpha = 0.45) {
    px(this.ctx, 0, 0, VW, VH, `rgba(15,10,25,${alpha})`);
  }

  // Draw a heart at (x,y) sized `size` (used by the finale).
  heartAt(x, y, size, color = "#e8506b") {
    RENDERERS._heart(this.ctx, x, y, size, size, color);
  }

  // Wedding arch for the finale (top-left anchored, ~68px wide).
  weddingArch(x, y) {
    const ctx = this.ctx;
    const h = 150 - y; // ground surface is at y=150
    px(ctx, x, y + 8, 7, h, "#e9e0d0");          // left post
    px(ctx, x + 61, y + 8, 7, h, "#e9e0d0");     // right post
    // arched top
    ctx.strokeStyle = "#e9e0d0"; ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(x + 34, y + 12, 30, Math.PI, 0);
    ctx.stroke();
    // flowers / greenery dabs along the arch
    const dabs = ["#e87a90", "#f6d58d", "#7fc99a", "#e87a90", "#f6b5c3"];
    for (let i = 0; i <= 8; i++) {
      const a = Math.PI + (Math.PI * i) / 8;
      const fx = x + 34 + Math.cos(a) * 30;
      const fy = y + 12 + Math.sin(a) * 30;
      px(ctx, fx - 2, fy - 2, 4, 4, dabs[i % dabs.length]);
    }
    px(ctx, x - 1, y + 8, 5, 5, "#7fc99a");
    px(ctx, x + 64, y + 8, 5, 5, "#7fc99a");
  }

  toast(msg) {
    if (!msg) return;
    const ctx = this.ctx;
    const w = Math.min(VW - 20, msg.length * 6 + 16);
    px(ctx, (VW - w) / 2, 40, w, 16, "rgba(0,0,0,0.6)");
    this.text(msg, VW / 2, 51, { size: 8, align: "center", color: "#ffd9a0", shadow: false });
  }
}
