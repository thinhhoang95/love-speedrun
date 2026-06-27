// collision.js — axis-aligned box overlap with fair, inset hitboxes.

// Returns the inset collision box for a spawned world object.
export function objHitbox(obj) {
  const pad = obj.def.collisionPad || 0;
  return {
    x: obj.x + pad,
    y: obj.y + pad,
    width: obj.def.width - pad * 2,
    height: obj.def.height - pad * 2,
  };
}

export function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
