# Custom art & audio (optional)

The game runs fully without any files here — every object is drawn with built-in
canvas shapes. To swap in custom pixel art later, drop an image in `items/` (or
`sprites/`) and point an item at it in `js/items.js`:

```js
coffee: {
  ...,
  spriteUrl: "assets/items/coffee.png", // was null
}
```

When `spriteUrl` is set, `renderer.js` draws the image (scaled to the item's
`width`/`height`) instead of the default shape — in both the world and the
inventory bar. No other code changes are needed.

Folders:
- `items/`   — collectible / obstacle / power-up sprites
- `sprites/` — character sprites (bride, groom, couple)
- `audio/`   — reserved for future sound files (SFX are currently synthesized)
