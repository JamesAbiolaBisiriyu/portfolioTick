## 8. Stage 3: Media

**Goal.** The 16 portrait frames, the 5 project previews, the icons and the favicons in their folders.

**PROMPT 3 · MEDIA**

```
Put the media in place.
1. public/avatar/: the 16 portrait PNGs of SPEC 2.3 (rest, closed, half, up, down, right, left, upright, upleft, downleft, side_left, cross, grin, hearts, ouch, angry). If the user supplied them they are already there; if not, stop and tell me which files are missing.
2. src/media/project/: the 5 project JPGs of SPEC 2.3.
3. public/ favicons: favicon.ico, favicon.png, apple-touch-icon.png.
4. Run python3 tools/check_frames.py public/avatar and report: every frame 1024x1024 RGBA, head-box spread under 1.5 percentage points, and any byte-identical pair (expect upleft = downleft in the reference set; say so, do not "fix" it silently).
5. Run python3 tools/make_decor.py --out public/media/decor (it keeps files that already exist) and list the four icons.
Do not touch anything else.
```

**Verify**

- [ ] 16 frames, all 1024×1024 RGBA, head-box spread under 1.5 points.
- [ ] The upleft = downleft duplicate is reported, not hidden.
