#!/usr/bin/env python3
"""Checks portrait frames: size, RGBA, head-box spread, byte-identical duplicates.
Usage: python3 tools/check_frames.py public/avatar
Needs: pip install pillow numpy
"""
import sys, hashlib, pathlib
import numpy as np
from PIL import Image

EXPECT = (1024, 1024)
folder = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "public/avatar")
files = sorted(folder.glob("*.png"))
if not files:
    sys.exit(f"No PNG files in {folder}")

boxes, hashes, bad = {}, {}, 0
for f in files:
    im = Image.open(f)
    ok = im.size == EXPECT and im.mode == "RGBA"
    if not ok:
        bad += 1
        print(f"FAIL {f.name}: {im.size} {im.mode} (want {EXPECT} RGBA)")
        continue
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a > 16)
    boxes[f.name] = (xs.min() / 10.24, ys.min() / 10.24, xs.max() / 10.24, ys.max() / 10.24)  # percent
    hashes.setdefault(hashlib.sha256(f.read_bytes()).hexdigest(), []).append(f.name)

print(f"{len(files)} PNG files, {len(boxes)} valid (1024x1024 RGBA)")
if boxes:
    arr = np.array(list(boxes.values()))
    spread = arr.max(0) - arr.min(0)
    print("head-box spread in percentage points (left, top, right, bottom):", [round(float(s), 2) for s in spread])
    worst = float(spread.max())
    print("OK" if worst < 1.5 else "WARNING", f"- worst spread {worst:.2f} (limit 1.5)")
    ref = boxes.get("rest.png")
    if ref:
        for n, b in boxes.items():
            dev = max(abs(b[i] - ref[i]) for i in range(4))
            if dev >= 1.5: print(f"  {n} differs from rest.png by {dev:.2f} points")
dups = [v for v in hashes.values() if len(v) > 1]
for d in dups: print("Byte-identical duplicates:", ", ".join(d))
if not dups: print("No byte-identical duplicates")
sys.exit(1 if bad else 0)
