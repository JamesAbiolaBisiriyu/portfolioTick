## 15. Stage 10: Optional: more frames

**Goal.** Add your own extra expressions to unlock the hover answers and idle acts that are still partial.

**PROMPT 10 · OPTIONAL: MORE FRAMES**

```
Optional: unlock more of the portrait (SPEC 5.2). Only run this if I have put extra frames in public/avatar.
1. Run python3 tools/check_frames.py public/avatar; every new frame must match the framing of rest.png.
2. For each new file add one line to IDS in src/livingPortrait.ts (for example winkl: '/avatar/winkl.png'), replacing the alias where one exists. Touch nothing else in the engine.
3. List which idle acts and hover/tap answers are now fully backed by pictures and which are still partial.
4. Re-run Stage 5's checks for the new frames.
```

**Verify**

- [ ] New frames match the framing of rest.png.
- [ ] Each new file has one line in IDS.
