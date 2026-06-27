// items.js — data-driven object registry.
//
// Every game object (collectible, power-up, obstacle, NPC, projectile,
// decoration) is described here as plain data. Game logic never hard-codes an
// object's look or behaviour — it reads these fields. To add custom pixel art
// later, set `spriteUrl` to an image path; the renderer will draw the image
// instead of the built-in `defaultRenderer` shape. Nothing else needs to change.
//
// Fields:
//   id            unique key
//   label         human name (shown in the finale timeline)
//   type          collectible | powerup | obstacle | npc | projectile | decoration
//   stage         which chapter it belongs to (informational)
//   defaultRenderer  name of a shape function in renderer.js RENDERERS map
//   spriteUrl     null for now; set to "assets/items/foo.png" to override art
//   width,height  draw + base collision size (virtual px)
//   collisionPad  shrinks the hitbox vs. the sprite so play feels fair
//   points        score awarded on collect (collectibles/powerups/npc)
//   effect        powerup effect id (speedBoost | restoreHeart | bonusHearts)
//   required      memory items needed for the "complete" timeline

export const ITEMS = {
  // ---------- Stage 1: Classroom ----------
  notebook: {
    id: "notebook", label: "Notebook", type: "collectible", stage: "classroom",
    defaultRenderer: "drawNotebook", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 100, required: true,
  },
  pen: {
    id: "pen", label: "Pen", type: "collectible", stage: "classroom",
    defaultRenderer: "drawPen", spriteUrl: null,
    width: 14, height: 14, collisionPad: 3, points: 100, required: true,
  },
  ruler: {
    id: "ruler", label: "Ruler", type: "collectible", stage: "classroom",
    defaultRenderer: "drawRuler", spriteUrl: null,
    width: 18, height: 12, collisionPad: 3, points: 100, required: false,
  },
  loveNote: {
    id: "loveNote", label: "Love Note", type: "collectible", stage: "classroom",
    defaultRenderer: "drawLoveNote", spriteUrl: null,
    width: 16, height: 13, collisionPad: 2, points: 200, required: true,
  },
  schoolbag: {
    id: "schoolbag", label: "Schoolbag", type: "obstacle", stage: "classroom",
    defaultRenderer: "drawSchoolbag", spriteUrl: null,
    width: 18, height: 18, collisionPad: 4,
  },
  chair: {
    id: "chair", label: "Chair", type: "obstacle", stage: "classroom",
    defaultRenderer: "drawChair", spriteUrl: null,
    width: 16, height: 20, collisionPad: 4,
  },
  bookStack: {
    id: "bookStack", label: "Stack of Books", type: "obstacle", stage: "classroom",
    defaultRenderer: "drawBookStack", spriteUrl: null,
    width: 18, height: 22, collisionPad: 4,
  },

  // ---------- Stage 2: Paris ----------
  laptopParis: {
    id: "laptopParis", label: "Laptop", type: "collectible", stage: "paris",
    defaultRenderer: "drawLaptop", spriteUrl: null,
    width: 18, height: 14, collisionPad: 3, points: 100, required: true,
  },
  papers: {
    id: "papers", label: "Papers", type: "collectible", stage: "paris",
    defaultRenderer: "drawPapers", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 100, required: true,
  },
  professor: {
    id: "professor", label: "Professor's Approval", type: "npc", stage: "paris",
    defaultRenderer: "drawProfessor", spriteUrl: null,
    width: 18, height: 26, collisionPad: 3, points: 300, required: true,
  },
  committee: {
    id: "committee", label: "Committee Survived", type: "npc", stage: "paris",
    defaultRenderer: "drawCommittee", spriteUrl: null,
    width: 30, height: 22, collisionPad: 4, points: 500, required: true,
  },
  paperStack: {
    id: "paperStack", label: "Paper Stack", type: "obstacle", stage: "paris",
    defaultRenderer: "drawPaperStack", spriteUrl: null,
    width: 18, height: 16, collisionPad: 4,
  },
  deadlineClock: {
    id: "deadlineClock", label: "Deadline", type: "obstacle", stage: "paris",
    defaultRenderer: "drawClock", spriteUrl: null,
    width: 18, height: 18, collisionPad: 4,
  },
  questionMarkHigh: {
    id: "questionMarkHigh", label: "Question", type: "projectile", stage: "paris",
    defaultRenderer: "drawQuestion", spriteUrl: null,
    width: 12, height: 14, collisionPad: 3,
  },
  questionMarkLow: {
    id: "questionMarkLow", label: "Question", type: "projectile", stage: "paris",
    defaultRenderer: "drawQuestion", spriteUrl: null,
    width: 12, height: 14, collisionPad: 3,
  },

  // ---------- Stage 3: Saigon ----------
  reports: {
    id: "reports", label: "Reports", type: "collectible", stage: "saigon",
    defaultRenderer: "drawReports", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 100, required: true,
  },
  laptopSaigon: {
    id: "laptopSaigon", label: "Laptop", type: "collectible", stage: "saigon",
    defaultRenderer: "drawLaptop", spriteUrl: null,
    width: 18, height: 14, collisionPad: 3, points: 100, required: true,
  },
  coffee: {
    id: "coffee", label: "Coffee", type: "powerup", stage: "saigon",
    defaultRenderer: "drawCoffee", spriteUrl: null,
    width: 14, height: 16, collisionPad: 3, points: 150, effect: "speedBoost",
  },
  grilledChicken: {
    id: "grilledChicken", label: "Grilled Chicken", type: "powerup", stage: "saigon",
    defaultRenderer: "drawChicken", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 200, effect: "restoreHeart",
  },
  finalHeart: {
    id: "finalHeart", label: "Forever", type: "collectible", stage: "saigon",
    defaultRenderer: "drawHeartItem", spriteUrl: null,
    width: 16, height: 16, collisionPad: 2, points: 300, required: true,
  },
  trafficCone: {
    id: "trafficCone", label: "Traffic Cone", type: "obstacle", stage: "saigon",
    defaultRenderer: "drawCone", spriteUrl: null,
    width: 14, height: 18, collisionPad: 4,
  },
  motorbike: {
    id: "motorbike", label: "Motorbike", type: "obstacle", stage: "saigon",
    defaultRenderer: "drawMotorbike", spriteUrl: null,
    width: 26, height: 16, collisionPad: 5,
  },
  deadline: {
    id: "deadline", label: "Deadline", type: "obstacle", stage: "saigon",
    defaultRenderer: "drawClock", spriteUrl: null,
    width: 18, height: 18, collisionPad: 4,
  },

  // ---------- Extra memories (added for a richer journey timeline) ----------
  // Stage 1
  eraser: {
    id: "eraser", label: "Eraser", type: "collectible", stage: "classroom",
    defaultRenderer: "drawEraser", spriteUrl: null,
    width: 16, height: 12, collisionPad: 3, points: 100, required: false,
  },
  chalk: {
    id: "chalk", label: "Chalk", type: "collectible", stage: "classroom",
    defaultRenderer: "drawChalk", spriteUrl: null,
    width: 12, height: 14, collisionPad: 3, points: 100, required: false,
  },
  redScarf: {
    id: "redScarf", label: "Red Scarf", type: "collectible", stage: "classroom",
    defaultRenderer: "drawScarf", spriteUrl: null,
    width: 16, height: 14, collisionPad: 3, points: 150, required: false,
  },
  apple: {
    id: "apple", label: "Apple", type: "collectible", stage: "classroom",
    defaultRenderer: "drawApple", spriteUrl: null,
    width: 15, height: 15, collisionPad: 3, points: 100, required: false,
  },
  // Stage 2
  croissant: {
    id: "croissant", label: "Croissant", type: "collectible", stage: "paris",
    defaultRenderer: "drawCroissant", spriteUrl: null,
    width: 16, height: 14, collisionPad: 3, points: 150, required: false,
  },
  baguette: {
    id: "baguette", label: "Baguette", type: "collectible", stage: "paris",
    defaultRenderer: "drawBaguette", spriteUrl: null,
    width: 18, height: 12, collisionPad: 3, points: 150, required: false,
  },
  thesisBook: {
    id: "thesisBook", label: "Thesis", type: "collectible", stage: "paris",
    defaultRenderer: "drawBook", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 200, required: false,
  },
  metroTicket: {
    id: "metroTicket", label: "Métro Ticket", type: "collectible", stage: "paris",
    defaultRenderer: "drawTicket", spriteUrl: null,
    width: 16, height: 13, collisionPad: 3, points: 100, required: false,
  },
  // Stage 3
  pho: {
    id: "pho", label: "Phở", type: "collectible", stage: "saigon",
    defaultRenderer: "drawPho", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 150, required: false,
  },
  banhMi: {
    id: "banhMi", label: "Bánh Mì", type: "collectible", stage: "saigon",
    defaultRenderer: "drawBanhMi", spriteUrl: null,
    width: 16, height: 14, collisionPad: 3, points: 150, required: false,
  },
  nonLa: {
    id: "nonLa", label: "Nón Lá", type: "collectible", stage: "saigon",
    defaultRenderer: "drawNonLa", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 150, required: false,
  },
  lotus: {
    id: "lotus", label: "Lotus", type: "collectible", stage: "saigon",
    defaultRenderer: "drawLotus", spriteUrl: null,
    width: 16, height: 16, collisionPad: 3, points: 150, required: false,
  },
  smoothie: {
    id: "smoothie", label: "Sinh Tố", type: "collectible", stage: "saigon",
    defaultRenderer: "drawSmoothie", spriteUrl: null,
    width: 14, height: 16, collisionPad: 3, points: 100, required: false,
  },
};

// Funny messages shown briefly when the player takes a hit, keyed by stage.
export const HIT_MESSAGES = {
  classroom: ["Oops, dropped the homework!", "Tripped over a chair!", "Chalk dust everywhere!"],
  paris: ["Committee question dodged badly!", "Answer revised!", "Croissant break gone wrong!"],
  saigon: ["Coffee spill!", "Mind the motorbike!", "Deadline caught up!"],
};

// Sweet, non-competitive ranks based on final score.
export const RANKS = [
  { min: 0, label: "Cute Beginning" },
  { min: 1500, label: "Long-Distance Legends" },
  { min: 3000, label: "Committee Survivors" },
  { min: 5000, label: "Saigon Soulmates" },
  { min: 7000, label: "Wedding Ready" },
];

export function rankForScore(score) {
  let r = RANKS[0].label;
  for (const entry of RANKS) if (score >= entry.min) r = entry.label;
  return r;
}
