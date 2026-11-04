# AGENTS.md: living-portrait portfolio

## Project
A one-page portfolio: dark typographic hero with a WebGL "living portrait" (a 3D-rendered character on an elastic mesh), a scroll-driven marquee, About, Services (rows that fly in) and three sticky stacking project cards. Vite + React 18 + TypeScript + Tailwind 3 + framer-motion 12. SPEC.md is the contract; if code and SPEC.md disagree, SPEC.md wins unless the user says otherwise.

## Commands
- `npm install` then `npm run dev` (Vite, port 5173) and `npm run build` (runs `tsc --noEmit` first; must pass).
- `python3 tools/check_frames.py public/avatar` checks the portrait frames. `python3 tools/make_decor.py --out public/media/decor` draws stand-in About icons (never overwrites existing files without `--force`).

## Hard rules
1. No external media: portrait frames live in `public/avatar/` (served as `/avatar/<name>.png`), About icons in `public/media/decor/`, project previews in `src/media/project/` (imported). Never hot-link images, GIFs or videos. The only external request allowed is the Kanit font from Google Fonts.
2. Do not use React StrictMode. The portrait engine attaches window listeners once.
3. Copy is verbatim from SPEC.md section 6. Never paraphrase, correct or invent copy, names, numbers or colours.
4. The portrait frames are separate transparent PNGs of one head; the code never morphs between expressions. Never replace them with CSS filters or canvas drawing. Every frame must share the framing of `rest.png`.
5. Colours and sizes come from SPEC.md section 3. No new colours.
6. Respect `prefers-reduced-motion` (idle acts off).
7. Never `git push`, never deploy, never commit `.env*`, tokens or keys, unless the user explicitly asks.
8. After every stage: run its Verify list, fix, `git commit -m "Stage N: ..."`.

## Visual checks
Use a real browser (Playwright, a built-in browser or the Chrome integration). Check 1440x900, 1920x1080, 768x1024 and 390x844. Measure with `getBoundingClientRect`; do not judge by eye. Report the console output.

## Style
TypeScript strict except `src/livingPortrait.ts` (`// @ts-nocheck`). Tailwind classes exactly as in SPEC.md. Small files, one component per file.

## Local-model rules (added for this setup; not part of the original template)
1. Work on ONE stage per session. Read this file, then ONLY the prompt file and the spec/ parts the stage names. Do not read all of SPEC.md at once; it is large.
2. `src/livingPortrait.ts` is already in the project. Never retype, "improve" or reformat it. Read it, explain it if asked, and wire it up.
3. Copy text from spec/ files exactly (copy deck, numbers, class names). If unsure, re-read the spec file instead of guessing.
4. Do not use `sudo`, global installs, `git push`, or delete files outside this folder. Ask before running any command that is not listed in Commands.
5. Missing inputs, as agreed with the user:
   - `src/media/project/*.jpg` are PLACEHOLDER images supplied by the user (this overrides "never fake media" for these 5 files only).
   - `public/media/decor/*.png` already exist; `tools/make_decor.py` does NOT exist, so skip any step that runs it.
   - `tools/check_frames.py` is a user-written replacement; use it as documented.
   - The portrait frames are the template's sample character; keep the name, copy and alt text from the spec.
6. After each stage: list the files changed, the Verify results (pass/fail, with evidence), then stop and wait for "go".
