#!/usr/bin/env python3
"""Resize photos in-place so their largest dimension is at most MAX_DIM px.

Usage:
    python3 scripts/resize_photos.py [directory] [--max-dim 3072] [--quality 85]
"""
import argparse
import sys
from pathlib import Path

from PIL import Image, ImageOps

IMAGE_EXTS = {".jpg", ".jpeg", ".png"}


def resize_image(path: Path, max_dim: int, quality: int) -> None:
    with Image.open(path) as img:
        img = ImageOps.exif_transpose(img)
        width, height = img.size
        longest = max(width, height)

        if longest <= max_dim:
            print(f"skip  {path.name} ({width}x{height}, already <= {max_dim}px)")
            return

        scale = max_dim / longest
        new_size = (round(width * scale), round(height * scale))
        resized = img.resize(new_size, Image.Resampling.LANCZOS)

        save_kwargs = {}
        if path.suffix.lower() in (".jpg", ".jpeg"):
            save_kwargs = {"quality": quality, "optimize": True}
            if resized.mode != "RGB":
                resized = resized.convert("RGB")

        resized.save(path, **save_kwargs)
        print(f"resize {path.name} ({width}x{height} -> {new_size[0]}x{new_size[1]})")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "directory",
        nargs="?",
        default=str(Path(__file__).resolve().parent.parent / "assets" / "photos"),
        help="Directory containing photos to resize (default: assets/photos)",
    )
    parser.add_argument("--max-dim", type=int, default=3072, help="Max size of the largest dimension in px")
    parser.add_argument("--quality", type=int, default=85, help="JPEG save quality (1-100)")
    args = parser.parse_args()

    target_dir = Path(args.directory)
    if not target_dir.is_dir():
        sys.exit(f"Not a directory: {target_dir}")

    files = sorted(
        p for p in target_dir.iterdir()
        if p.suffix.lower() in IMAGE_EXTS and not p.name.startswith(".")
    )
    if not files:
        sys.exit(f"No images found in {target_dir}")

    for path in files:
        resize_image(path, args.max_dim, args.quality)


if __name__ == "__main__":
    main()
