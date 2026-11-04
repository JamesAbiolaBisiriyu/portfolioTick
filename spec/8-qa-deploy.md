## 8. QA and deploy


### 8.1 Checks

Run at 1440×900, 1920×1080, 768×1024 and 390×844: no horizontal scroll; the name fits on one line; the portrait is centred and does not cover the nav or the button row (her hair covers the middle of the name by design); the cursor is a grab hand over the head only; frames swap without flicker; dragging stretches the head and it settles back; the marquee rows move in opposite directions; the About text lights up character by character; Services rows 1 and 3 fly in from the left and 2 and 4 from the right; Projects cards stack with scale 1, .97, .94; the white Services section is covered by the dark rounded top of Projects; the console is clean; no request goes anywhere except the Kanit font.

### 8.2 Deploy

Static build (`npm run build`, output `dist/`). `vercel.json` is not needed for a Vite project; the build command is `npm run build` and the output directory `dist`. Keep the repository private, never commit `.env*`, and push only when asked.
