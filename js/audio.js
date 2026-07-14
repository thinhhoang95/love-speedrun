// audio.js — tiny retro SFX synthesized with the Web Audio API.
//
// The AudioContext and background music are started lazily on the first user
// gesture (browsers block autoplay). A mute toggle silences all output. Each
// sound effect is a short oscillator blip / arpeggio.

const backgroundMusicUrl = new URL('../assets/salut-damour.mp3', import.meta.url).href;

export class Audio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgm = new window.Audio(backgroundMusicUrl);
    this.bgm.loop = true;
    this.bgm.volume = 0.35;
  }

  // Call from the first user gesture.
  resume() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    if (!this.muted && this.bgm.paused) this.bgm.play().catch(() => {});
  }

  setMuted(m) { this.muted = m; this.bgm.muted = m; }
  toggleMute() { this.muted = !this.muted; this.bgm.muted = this.muted; return this.muted; }

  // Play one tone. freq Hz, dur seconds, type waveform, gain 0..1, delay sec.
  _tone(freq, dur, type = "square", gain = 0.12, delay = 0) {
    if (this.muted || !this.ctx) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(env).connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  _arp(freqs, step = 0.08, type = "square", gain = 0.12) {
    freqs.forEach((f, i) => this._tone(f, step * 1.4, type, gain, i * step));
  }

  jump() { this._tone(520, 0.12, "square", 0.1); this._tone(720, 0.1, "square", 0.08, 0.05); }
  collect() { this._tone(880, 0.08, "square", 0.1); this._tone(1175, 0.1, "square", 0.1, 0.05); }
  sparkle() { this._arp([988, 1319, 1568, 1976], 0.06, "triangle", 0.09); }
  hit() { this._tone(160, 0.18, "sawtooth", 0.14); }
  stageClear() { this._arp([523, 659, 784, 1047], 0.1, "square", 0.11); }
  finale() { this._arp([523, 659, 784, 1047, 1319], 0.14, "triangle", 0.12); }
  power() { this._arp([659, 880, 1109], 0.07, "square", 0.1); }
}
