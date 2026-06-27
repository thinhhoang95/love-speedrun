// input.js — turns keyboard / touch / button events into intent flags.
//
// The game loop reads:
//   input.consumeJump()  -> true once per jump press (edge-triggered)
//   input.duckHeld       -> true while ducking
//   input.consumeConfirm()-> true once per Start/Continue press
// A `firstGesture` callback fires on the first interaction so audio can resume.

export class Input {
  constructor(canvas, onFirstGesture) {
    this.duckHeld = false;
    this._jumpQueued = false;
    this._confirmQueued = false;
    this._gestureFired = false;
    this._onFirstGesture = onFirstGesture || (() => {});

    this._bindKeyboard();
    this._bindTouch(canvas);
  }

  _firstGesture() {
    if (this._gestureFired) return;
    this._gestureFired = true;
    this._onFirstGesture();
  }

  // Public actions also usable by on-screen buttons.
  pressJump() { this._firstGesture(); this._jumpQueued = true; }
  pressConfirm() { this._firstGesture(); this._confirmQueued = true; }
  setDuck(down) { if (down) this._firstGesture(); this.duckHeld = down; }

  consumeJump() { const v = this._jumpQueued; this._jumpQueued = false; return v; }
  consumeConfirm() { const v = this._confirmQueued; this._confirmQueued = false; return v; }

  _bindKeyboard() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Space":
        case "ArrowUp":
        case "KeyW":
          e.preventDefault();
          this.pressJump();
          this.pressConfirm(); // jump also confirms title / continue
          break;
        case "ArrowDown":
        case "KeyS":
          e.preventDefault();
          this.setDuck(true);
          break;
        case "Enter":
          e.preventDefault();
          this.pressConfirm();
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") this.setDuck(false);
    });
  }

  _bindTouch(canvas) {
    if (!canvas) return;
    let startY = 0;
    let swiped = false;

    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      startY = e.touches[0].clientY;
      swiped = false;
    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {
      const dy = e.touches[0].clientY - startY;
      if (dy > 28 && !swiped) { // swipe down -> duck
        swiped = true;
        this.setDuck(true);
      }
    }, { passive: false });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      if (swiped) {
        this.setDuck(false);
      } else { // a tap -> jump / confirm
        this.pressJump();
        this.pressConfirm();
      }
    }, { passive: false });

    // Mouse click also works (desktop testing / accessibility).
    canvas.addEventListener("mousedown", () => {
      this.pressJump();
      this.pressConfirm();
    });
  }
}
