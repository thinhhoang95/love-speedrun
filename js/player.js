// player.js — the running couple. Simple, forgiving platformer physics.

import { GROUND_Y } from "./stages.js";

export const PLAYER_WIDTH = 22;
export const PLAYER_HEIGHT = 30;
export const PLAYER_DUCK_HEIGHT = 16;

const GRAVITY = 0.4;        // per 1/60s step (lower = floatier, longer airtime)
const JUMP_FORCE = -8.2;
const MAX_HEARTS = 3;

export class Player {
  constructor() {
    this.x = 46;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.velocityY = 0;
    this.isGrounded = true;
    this.isDucking = false;
    this.hearts = MAX_HEARTS;
    this.invulnTimer = 0; // seconds of post-hit invulnerability
    this.knockback = 0;   // small visual recoil offset
    this.runPhase = 0;    // animation cycle for legs
    this.y = this.restingY();
  }

  restingY() {
    return GROUND_Y - this.height;
  }

  jump() {
    if (this.isGrounded && !this.isDucking) {
      this.velocityY = JUMP_FORCE;
      this.isGrounded = false;
      return true;
    }
    return false;
  }

  setDucking(down) {
    // Can only duck while on the ground.
    this.isDucking = down && this.isGrounded;
  }

  hit() {
    if (this.invulnTimer > 0) return false;
    this.hearts -= 1;
    this.invulnTimer = 1.2;
    this.knockback = 8;
    return true;
  }

  restoreHeart() {
    if (this.hearts < MAX_HEARTS) this.hearts += 1;
  }

  get maxHearts() { return MAX_HEARTS; }

  // dt is in seconds; physics is integrated in fixed 1/60 steps by the caller,
  // so here `step` is effectively 1 frame.
  update(dt) {
    // Apply gravity in frame-sized units (caller drives at fixed 60Hz).
    this.velocityY += GRAVITY;
    this.y += this.velocityY;

    const ground = this.restingY();
    if (this.y >= ground) {
      this.y = ground;
      this.velocityY = 0;
      this.isGrounded = true;
    }

    // Adjust height for ducking, keeping feet on the ground.
    const targetH = this.isDucking ? PLAYER_DUCK_HEIGHT : PLAYER_HEIGHT;
    if (this.height !== targetH) {
      const feet = this.y + this.height;
      this.height = targetH;
      this.y = feet - this.height;
    }

    if (this.invulnTimer > 0) this.invulnTimer -= dt;
    if (this.knockback > 0) this.knockback = Math.max(0, this.knockback - 0.6);
    if (this.isGrounded) this.runPhase += dt * 12;
  }

  // Collision box (slightly inset for fairness).
  hitbox(pad = 4) {
    return {
      x: this.x + pad,
      y: this.y + pad,
      width: this.width - pad * 2,
      height: this.height - pad * 2,
    };
  }

  reset() {
    this.velocityY = 0;
    this.isGrounded = true;
    this.isDucking = false;
    this.hearts = MAX_HEARTS;
    this.invulnTimer = 0;
    this.knockback = 0;
    this.height = PLAYER_HEIGHT;
    this.y = this.restingY();
  }
}
