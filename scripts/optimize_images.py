#!/usr/bin/env python3
"""Comprime imágenes de frontend/public/images (y opcionalmente dist/images)."""
from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image, ImageOps

EXTS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_W = 1600
MAX_H = 1600
JPEG_Q = 78
WEBP_Q = 78


def has_alpha(im: Image.Image) -> bool:
    if im.mode in ("RGBA", "LA"):
        extrema = im.getchannel("A").getextrema()
        return extrema[0] < 255
    if im.mode == "P" and "transparency" in im.info:
        return True
    return False


def optimize_dir(root: Path) -> tuple[int, int, list[tuple]]:
    before_total = 0
    after_total = 0
    report: list[tuple] = []

    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in EXTS:
            continue
        orig = path.stat().st_size
        before_total += orig
        try:
            im = Image.open(path)
            im = ImageOps.exif_transpose(im)
            w, h = im.size
            scale = min(1.0, MAX_W / max(w, 1), MAX_H / max(h, 1))
            if scale < 1.0:
                im = im.resize(
                    (max(1, int(w * scale)), max(1, int(h * scale))),
                    Image.Resampling.LANCZOS,
                )

            ext = path.suffix.lower()
            tmp = path.with_suffix(path.suffix + ".tmpopt")

            if ext in (".jpg", ".jpeg"):
                im.convert("RGB").save(
                    tmp, format="JPEG", quality=JPEG_Q, optimize=True, progressive=True
                )
            elif ext == ".webp":
                if im.mode not in ("RGB", "RGBA"):
                    im = im.convert("RGBA" if has_alpha(im) else "RGB")
                im.save(tmp, format="WEBP", quality=WEBP_Q, method=6)
            else:  # png
                alpha = has_alpha(im)
                if (not alpha) and orig > 180_000:
                    jpg_path = path.with_suffix(".jpg")
                    im.convert("RGB").save(
                        tmp, format="JPEG", quality=JPEG_Q, optimize=True, progressive=True
                    )
                    data = tmp.read_bytes()
                    jpg_path.write_bytes(data)
                    tmp.unlink(missing_ok=True)
                    if jpg_path.resolve() != path.resolve():
                        path.unlink(missing_ok=True)
                    new_size = jpg_path.stat().st_size
                    after_total += new_size
                    report.append((path.name, orig, new_size, f"png->jpg {jpg_path.name}"))
                    continue
                if alpha:
                    im.convert("RGBA").save(tmp, format="PNG", optimize=True)
                else:
                    im.convert("RGB").save(tmp, format="PNG", optimize=True)

            new_size = tmp.stat().st_size
            if new_size < orig or scale < 1.0:
                tmp.replace(path)
                after_total += path.stat().st_size
                note = "ok" if new_size < orig else "resized"
                report.append((path.name, orig, path.stat().st_size, note))
            else:
                tmp.unlink(missing_ok=True)
                after_total += orig
                report.append((path.name, orig, orig, "skip"))
        except Exception as e:  # noqa: BLE001
            after_total += orig
            report.append((path.name, orig, orig, f"ERR {e}"))

    return before_total, after_total, report


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--dir",
        default=str(
            Path(__file__).resolve().parents[1] / "frontend" / "public" / "images"
        ),
    )
    parser.add_argument("--sync-dist", action="store_true")
    args = parser.parse_args()

    root = Path(args.dir)
    before, after, report = optimize_dir(root)
    report.sort(key=lambda r: (r[1] - r[2]), reverse=True)
    print(f"BEFORE {before/1e6:.2f} MB  AFTER {after/1e6:.2f} MB  SAVED {(before-after)/1e6:.2f} MB")
    for name, b, a, note in report[:35]:
        print(f"{(b-a)/1024:8.1f} KB  {b/1024:8.1f}->{a/1024:7.1f}  {note:18}  {name}")
    print(f"files: {len(report)}")

    if args.sync_dist:
        dist = root.parents[1] / "dist" / "images"
        if dist.exists():
            shutil.rmtree(dist)
        shutil.copytree(root, dist)
        print(f"Synced -> {dist}")


if __name__ == "__main__":
    main()
