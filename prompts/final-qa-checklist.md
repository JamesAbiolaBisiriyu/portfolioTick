## 16. Final QA checklist

```
Hero
[ ] Name "HI, I'M HANNA" on one line at 390, 768, 1024, 1440 and 1920 px
[ ] Nav (HOME, PROJECT, ABOUT ME, CONTACT), tagline and button fade in with the delays of SPEC 4.1
[ ] The portrait is centred and overlaps the name; the static image is replaced by the canvas after rest.png loads
[ ] No frame request fails (16 files)

Living portrait
[ ] Eyes follow the pointer; blink every 2.2 to 5.6 s once awake
[ ] Hover: nose shows the cross-eyed picture, mouth shows grin; eyes show nothing (no wink frames)
[ ] Tap: brow angry, eyes ouch, nose sneeze act, mouth and cheek cross, chin grin
[ ] Dragging stretches the head; release settles it; no folded mesh (no comb of cuts)
[ ] Hovering a Contact Me button: hearts; after leaving: grin
[ ] 30 to 45 s idle: one act; any pointer move ends it
[ ] prefers-reduced-motion: no idle acts
[ ] Missing pictures never throw; the face holds the previous picture

Sections
[ ] Marquee rows move in opposite directions and never show an empty edge
[ ] About: four icons in the corners, text lights up character by character
[ ] Services: four rows fly in from left, right, left, right; gradient numbers 01 to 04
[ ] Projects: dark rounded top covers the white section; cards stick and shrink to 1, .97, .94

Quality
[ ] npm run build passes
[ ] Only external URLs are Google Fonts
[ ] No horizontal scroll at 390 px; page scrolls with a swipe outside the head
[ ] Console clean; no 404
[ ] No .env, no keys; nothing pushed or deployed

```
