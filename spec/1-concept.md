## 1. Concept and interactions

### 1.1 What the site is

A one-page portfolio for a 3D creator named Hanna, built as a dark, typographic page with one centrepiece: a **living portrait**. The portrait is a photo-real 3D-rendered woman (shoulder-length wavy chestnut hair, pearl earrings, a black blazer) drawn on a soft elastic sheet. She follows the cursor with her eyes, blinks, can be grabbed and stretched like rubber, reacts to hover and tap on her eyes, nose, mouth, brow, cheek and chin, and, when the visitor goes quiet for 30 to 45 seconds, performs a short act on her own (a yawn, a sneeze, a fly landing on her nose, a hand pulling her cheek).

Nothing is 3D at run time. Every gaze direction and expression is a separate transparent PNG of the same head, and the code decides which picture to show. The skin moves because the picture is drawn on a 73×73 grid of vertices that a damped wave simulation pushes around.

Below the hero sit a scroll-driven double marquee of project previews, an "About me" section with a scroll-lit paragraph and four floating glass icons, a white "Services" section whose four rows fly in from alternating sides, and a "Project" section of three sticky cards that stack and shrink as you scroll.

### 1.2 Page order (single route, anchors)

| Order | Section | Anchor | Background |
|---|---|---|---|
| 1 | Hero: nav, giant name, tagline, button, living portrait | `#home` | `#0C0C0C` |
| 2 | Marquee: two rows of project previews moving against each other with scroll | none | `#0C0C0C` |
| 3 | About: four floating icons, heading, scroll-lit paragraph, button | `#about` | `#0C0C0C` |
| 4 | Services: four numbered rows flying in from left and right | `#price` | `#FFFFFF`, top corners rounded |
| 5 | Project: three sticky cards that stack and shrink | `#projects` | `#0C0C0C`, top corners rounded, pulled up over Services |

The nav links are HOME (`#home`), PROJECT (`#projects`), ABOUT ME (`#about`) and CONTACT (`#contact`). The Contact link points to `#contact`, which the page does not contain, and the "Contact Me" and "Live Project" buttons carry no action. Keep that as the reference behaviour; wiring them (a `mailto:` link, a footer with `id="contact"`, real project URLs) is an optional addition and must be labelled as one. The `#price` anchor on the Services section is not linked from the nav.

### 1.3 Interaction summary

| Input | Result |
|---|---|
| Page load | Hero elements fade in with delays 0 / .15 / .35 / .5 / .6 s. The portrait's eyes are closed and the head asleep until the first pointer move, scroll or tap |
| First pointer move or scroll | Wake-up: half-open eyes for 110 ms, then open, blinking starts 1.6 s later |
| Pointer move | Eyes follow the cursor on a 16-direction ring (mapped to 8 gaze pictures, see 5.2); the head leans a hair toward it; the skin is rubbed along the pointer path |
| Hover over a zone for 80 ms | Nose: cross-eyed picture. Mouth: `grin` (the alias of `kiss`). Eyes: nothing visible, because `winkl` and `winkr` are not supplied |
| Tap a zone | Brow: angry. Either eye: ouch. Nose: sneeze act. Mouth, cheek: the cross-eyed picture. Chin: grin. Hair: nothing visible (no hair-colour pictures are supplied) |
| Press and drag on the head | The skin under the finger follows it up to a limit of 0.24 of the picture; the picture goes `up` (shock), `ouch`, `up` (scared) with distance |
| Release a drag | `half` (deadpan), `ouch` (scrunch, dizzy) by distance; after 5 pulls in 14 s the face turns angry (`angry`); after 8 the cry picture is missing, so it keeps the last one |
| Move the cursor very fast | Wind face (not supplied, ignored), then the cross-eyed picture as "sick" if it keeps going |
| Cursor over any "Contact Me" button | `hearts` while hovering, `grin` for 700 ms after leaving |
| Scroll | Eyes look down for 500 ms |
| 30 to 45 s without input | One idle act from a shuffled rotation of 15 acts; only the acts whose pictures exist are visible (see 5.7) |
| Scroll through the marquee | Row 1 moves right, row 2 moves left at 0.3 px per scrolled px |
| Scroll through Services | Rows 1 and 3 slide in from the left, rows 2 and 4 from the right, fading in |
| Scroll through Projects | Cards stick one after another and the earlier ones shrink to 97% and 94% |
