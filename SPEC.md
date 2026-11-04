# SPEC.md: living-portrait portfolio, design and behaviour contract

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

---

## 2. Architecture

### 2.1 Stack

| Layer | Choice |
|---|---|
| Build | Vite 5, React 18, TypeScript 5.5, no StrictMode (the engine attaches global listeners once) |
| Styling | Tailwind CSS 3.4 plus one small global stylesheet; font family `Kanit` through Tailwind (`font-kanit`) |
| Motion | framer-motion 12 for FadeIn, scroll-lit text, flying service rows and stacked cards; plain `requestAnimationFrame` for the portrait; a scroll listener for the marquee |
| Icons | `lucide-react` is installed but not used by the shipped components |
| Portrait | WebGL 1 (`getContext('webgl')`), one 73×73 mesh, two textures cross-faded in the fragment shader, a CPU wave simulation |
| Fonts | Kanit 300 to 900 from Google Fonts: the only external request |
| Hosting | Static files (`vite build` output) on Vercel |

### 2.2 Files

```
index.html                       title "My Portfolio", favicon links, Kanit link, #root, /src/main.tsx
src/main.tsx                     createRoot(...).render(<App />), no StrictMode
src/index.css                    Tailwind layers, reset, .hero-heading, .contact-gradient-text, hero portrait CSS, #faceGl/#faceProps/#faceFly/#faceHand
src/App.tsx                      <main class="font-kanit" bg #0C0C0C overflowX clip> Hero, Marquee, About, Services, Projects
src/livingPortrait.ts            the engine (startLivingPortrait), // @ts-nocheck
src/components/HeroSection.tsx   nav, h1, tagline, ContactButton, portrait markup, starts the engine in useEffect
src/components/MarqueeSection.tsx   imports the 5 project images
src/components/AboutSection.tsx
src/components/ServicesSection.tsx  ServiceRow with useScroll
src/components/ProjectsSection.tsx  imports the 5 project images
src/components/FadeIn.tsx  AnimatedText.tsx  ContactButton.tsx  LiveProjectButton.tsx  Magnet.tsx (unused)
src/media/project/*.jpg          5 project previews (bundled by Vite through imports)
public/avatar/<name>.png         16 portrait frames, 1024x1024 RGBA (served from /avatar/...)
public/media/decor/*.png         4 About icons
public/favicon.ico  favicon.png  apple-touch-icon.png
```

`Magnet.tsx` is a mouse-following hover component that nothing imports; the ids `magnetWrap` and `magnetInner` in the hero belong to the engine, not to that component.

### 2.3 Media contract

| Group | Files | Size | Where it is used |
|---|---|---|---|
| Portrait frames | 16 transparent PNG in `public/avatar/`: `rest closed half up down right left upright upleft downleft side_left cross grin hearts ouch angry` | 1024×1024 RGBA, full-bleed bust: the head and shoulders fill 3% to 97.5% across and 3.6% to 100% down; all 16 share identical framing (head box spread under 0.1%) | WebGL textures; `rest.png` also the static fallback `<img>` |
| Project previews | `project-bluebird-ai`, `project-terragrip-3d`, `project-japan-travel`, `project-haven-design`, `project-3d-moss-branch` (`.jpg` in `src/media/project/`) | 735 to 1200 px wide website screenshots (about 3:2 or 4:3) | Imported by Marquee and Projects (Vite hashes and bundles them) |
| About icons | `public/media/decor/moon.png`, `smiley.png`, `brick.png`, `cursor.png` | any size, transparent PNG (about 700 px); shown at 100 to 220 px | Four corners of About: moon top-left, smiley bottom-left, brick top-right, cursor bottom-right |
| Favicons | `public/favicon.ico`, `favicon.png` (32), `apple-touch-icon.png` | | `index.html` |

The four About icons are glassy, iridescent 3D icons (a blue crescent moon, a pink-violet smiley outline, a translucent brick, a chrome cursor arrow). The package ships neutral stand-ins drawn by `tools/make_decor.py`; replace them with your own icons under the same names.

Every image is an own asset: no URL to another site appears in the code. Do not hot-link media.

---

## 3. Design system


### 3.1 Tokens

| Token | Value |
|---|---|
| Page background | `#0C0C0C` (set on `html`, `body`, `#root`, `<main>` and every dark section) |
| Text | `#D7E2EA` (cool off-white) |
| Gradient text (`.contact-gradient-text`) | `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)` clipped to the text, `display: inline-block`; used for the digits of Services and Project cards |
| Heading gradient (`.hero-heading`) | `linear-gradient(180deg, #646973 0%, #bbccd7 100%)` clipped to the text, `-webkit-text-fill-color: transparent` |
| Services background and text | `#FFFFFF` and `#0C0C0C` (secondary text opacity .6, dividers `rgba(12,12,12,.15)`) |
| Card border | `2px solid #D7E2EA` |
| Contact button gradient | `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)`, shadow `0 4px 4px rgba(181,1,167,.25), 4px 4px 12px #7721B1 inset`, outline `2px solid white`, offset `-3px` |
| Font | Kanit; weights 300 (light), 500 (medium), 900 (black) are used |
| Radii | cards and section tops: 40 / 50 / 60 px at base / sm / md; buttons: full |
| Breakpoints | Tailwind defaults: sm 640, md 768, lg 1024 |
| Heading size | `clamp(3rem, 12vw, 160px)` for About, Services, Project; numbers `clamp(3rem, 10vw, 140px)` |

### 3.2 Reference canvas

Fluid sizes were tuned at a 1440×900 desktop window. The hero name is `11vw / 11.8vw / 12.4vw / 13vw` at base / sm / md / lg so it always sits on one line.

### 3.3 Components

**FadeIn** (props `delay=0, duration=.7, x=0, y=30, as='div', className, style`): a framer-motion element, `initial {opacity 0, x, y}`, `whileInView {opacity 1, x 0, y 0}`, `viewport {once: true, margin: '50px', amount: 0}`, `transition {duration, delay, ease: [0.25, 0.1, 0.25, 1]}`. The motion component is created with `motion.create(as)` inside `useMemo`.

**AnimatedText** (props `text, className, style`): the paragraph is split into words and characters. Each character is a relatively positioned inline-block holding an invisible copy (for layout) and an absolutely positioned `motion.span` whose opacity is `useTransform(progress, [i/total, (i+1)/total], [0.2, 1])`. `progress` is `useScroll({target: ref, offset: ['start 0.8', 'end 0.2']}).scrollYProgress`. Words are `inline-block; white-space: nowrap` so they never break mid-word. The `<p>` carries `aria-label={text}` and the spans are `aria-hidden`.

**ContactButton**: `<button type="button" class="contact-btn rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base">Contact Me</button>` with the gradient, shadow and outline above, `cursor: pointer`, `border: none`. The class `contact-btn` is how the engine finds it.

**LiveProjectButton**: `<button type="button" class="rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base">Live Project</button>`.

---

## 4. Layout

### 4.1 Hero

`<section id="home" class="relative flex h-screen flex-col" style="overflow-x: clip; background: #0C0C0C">`

1. **Nav** (FadeIn `delay 0`, `y -20`, `relative z-20`): `<nav class="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">` with four anchors (HOME `#home`, PROJECT `#projects`, ABOUT ME `#about`, CONTACT `#contact`), class `text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]`.
2. **Name**: wrapper `mt-6 w-full overflow-hidden sm:mt-4 md:-mt-5`, FadeIn `delay .15`, `y 40`; `<h1 class="hero-heading w-full whitespace-nowrap text-center text-[11vw] font-black uppercase leading-none tracking-tight sm:text-[11.8vw] md:text-[12.4vw] lg:text-[13vw]">Hi, i’m hanna</h1>`.
3. **Bottom row**: `relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10`. Left: FadeIn `delay .35`, `y 20`, a `<p>` `max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]`, `font-size: clamp(0.75rem, 1.4vw, 1.5rem)`. Right: FadeIn `delay .5`, `y 20`, the ContactButton.
4. **Portrait**: `<div class="hero-portrait-wrap" id="magnetWrap">` containing FadeIn `delay .6`, `y 30`, then `<div class="hero-portrait-inner" id="magnetInner">` with, in this order: `<img id="faceFallback" src="/avatar/rest.png" alt="Portrait">`, `<canvas id="faceGl" aria-hidden="true">`, and `<div id="faceProps" aria-hidden="true">` holding two inline SVGs: `#faceFly` (a fly: two wings with class `wing` and `wing r`, an ellipse body, a circle head, viewBox 32×32) and `#faceHand` (viewBox 32×32 with two paths: `.open` and `.grab`).

CSS for the portrait (global stylesheet):

```css
.hero-portrait-wrap { position: absolute; left: 50%; z-index: 10; width: 400px; top: 50%;
  transform: translate(-50%, -50%); touch-action: pan-y; }
@media (min-width: 640px)  { .hero-portrait-wrap { width: 500px; } }
@media (min-width: 768px)  { .hero-portrait-wrap { width: 600px; } }
@media (min-width: 1024px) { .hero-portrait-wrap { width: clamp(640px, 78vh, 46vw); } }
.hero-portrait-inner { position: relative; transition: transform .6s ease-in-out; will-change: transform; }
.hero-portrait-inner img { display: block; width: 100%; height: auto; object-fit: contain; user-select: none; -webkit-user-drag: none; }
#faceGl { position: absolute; left: -35%; top: -35%; width: 170%; height: 170%; pointer-events: none; }
#faceProps { position: absolute; inset: 0; pointer-events: none; }
#faceFly, #faceHand { position: absolute; opacity: 0; transition: opacity .2s; transform: translate(-50%, -50%); }
#faceFly { width: 6%; fill: #111; }
#faceFly .wing { fill: rgba(220,235,255,.7); transform-origin: 16px 15px; animation: flap .05s linear infinite alternate; }
#faceFly .wing.r { animation-direction: alternate-reverse; }
@keyframes flap { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
#faceHand { width: 11%; fill: #fff; stroke: #0c0c0c; stroke-width: 1.4; stroke-linejoin: round; }
#faceHand .grab { display: none; }
#faceHand.shut .open { display: none; }
#faceHand.shut .grab { display: block; }
```

The canvas is 170% of the picture because the mesh covers 1.7 times the picture area (see 5.3): the head can be pulled well beyond its own edges without being clipped. The portrait (z-index 10) overlaps the name, so her hair covers the middle letters of "HANNA"; the nav and the bottom row (z-index 20) stay above her.

### 4.2 Marquee

`<section class="flex flex-col gap-3 pb-10 pt-24 sm:pt-32 md:pt-40" style="background:#0C0C0C; overflow:hidden">` with two rows built from the five project previews: row 1 uses the order 1 to 5 (`bluebird-ai, terragrip-3d, japan-travel, haven-design, 3d-moss-branch`), row 2 the order `haven-design, 3d-moss-branch, bluebird-ai, terragrip-3d, japan-travel`. Tiles: `<img class="h-[270px] w-[420px] flex-shrink-0 rounded-2xl object-cover" loading="lazy" draggable="false" alt="">`. A row is `flex w-max gap-3` holding its five images **five times in a row** (25 tiles) with `margin-left: -(5 × (420 + 12)) = -2160 px`, so the row starts one copy to the left and movement in either direction never shows an empty edge.

Scroll maths (on mount, on scroll with `{passive: true}` and on resize):

```
sectionTop = section.getBoundingClientRect().top + scrollY
offset     = (scrollY - sectionTop + innerHeight) * 0.3
row1.style.transform = translateX(offset - 200 px)
row2.style.transform = translateX(-(offset - 200) px)
```

### 4.3 About

`<section id="about" class="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10" style="background:#0C0C0C">`.

Four decor images, each wrapped in a FadeIn (`duration .9`, `y 0`) with `pointer-events-none absolute`:

| Image | Classes | Delay | Enters from |
|---|---|---|---|
| `moon.png` | `w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]` | .1 | x −80 |
| `smiley.png` | `w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]` | .25 | x −80 |
| `brick.png` | `w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]` | .15 | x 80 |
| `cursor.png` | `w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]` | .3 | x 80 |

Images use `loading="lazy"`, `class="h-auto w-full select-none"`, `draggable={false}`, `alt=""`. Content (`relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16`): FadeIn (`y 40`) around `<h2 class="hero-heading text-center font-black uppercase leading-none tracking-tight" style="font-size: clamp(3rem, 12vw, 160px)">About me</h2>`, then AnimatedText with class `max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]` and `font-size: clamp(1rem, 2vw, 1.35rem)`. Then `<div class="relative z-10"><ContactButton /></div>`.

### 4.4 Services

`<section id="price" class="relative overflow-hidden rounded-t-[40px] px-5 py-20 pb-24 sm:rounded-t-[50px] sm:px-8 sm:py-24 sm:pb-32 md:rounded-t-[60px] md:px-10 md:py-32 md:pb-44" style="background:#FFFFFF">`. Heading "Services" in `#0C0C0C` (no gradient), `mb-16 sm:mb-20 md:mb-28`, size `clamp(3rem, 12vw, 160px)`, black, uppercase, `leading-none`, inside a FadeIn. Rows live in `mx-auto max-w-5xl`.

Each **ServiceRow** is an outer `div` with the borders (`border-bottom: 1px solid rgba(12,12,12,.15)`, plus a top border on the first row) and an inner `motion.div` (`flex items-start gap-5 py-8 will-change-transform sm:gap-8 sm:py-10 md:gap-12 md:py-12`) that flies in with scroll:

```
const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start 95%', 'center 58%'] })
const initialX = index % 2 === 0 ? -220 : 220          // rows 1 and 3 from the left, 2 and 4 from the right
x       = useTransform(scrollYProgress, [0, 1],        [initialX, 0])
opacity = useTransform(scrollYProgress, [0, 0.4, 1],   [0, 0.6, 1])
```

Left of each row: the number `01` to `04` in `<span class="contact-gradient-text select-none font-black leading-none" style="font-size: clamp(3rem, 10vw, 140px)">` (the violet-to-orange gradient clipped to the digits). Right: `<h3>` medium uppercase `clamp(1rem, 2.2vw, 2.1rem)` in `#0C0C0C` and a `<p>` light, `max-w-2xl leading-relaxed`, `clamp(0.85rem, 1.6vw, 1.25rem)`, `#0C0C0C` at opacity .6.

### 4.5 Projects

`<section id="projects" class="relative z-10 -mt-10 rounded-t-[40px] px-5 pb-32 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32" style="background:#0C0C0C">`: the negative margin pulls it over the white Services section so the dark rounded top covers it. Heading "Project" (gradient `hero-heading`, `mb-16 sm:mb-20 md:mb-28`). The list `div.mx-auto.max-w-7xl` is the scroll target of `useScroll({target, offset: ['start start', 'end end']})`.

Each card is `<div class="sticky top-24 h-[85vh] md:top-32">` holding a `motion.div`:

```
className  relative border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8  + rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
style      background #0C0C0C; scale; top: index × 28 px; transformOrigin: 'top center'
scale      useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) × 0.03])
```

Header row (`mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:mb-6 md:mb-8`): the card number `01` to `03` (`contact-gradient-text font-black leading-none`, `clamp(3rem, 10vw, 140px)`), then a column with the category (light, uppercase, `tracking-widest`, opacity .6, `clamp(0.7rem, 1.2vw, 1rem)`) and the project name (`h3`, medium, uppercase, `clamp(1rem, 2.2vw, 2.1rem)`), then LiveProjectButton.

Image grid (`flex gap-3 sm:gap-4 md:gap-5`): left column `w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-5` with two images (heights `clamp(130px, 16vw, 230px)` and `clamp(160px, 22vw, 340px)`), right column `w-[60%]` with one image `h-full w-full`. All images `object-cover`, `loading="lazy"`, with the card's corner radius.

| # | Name | Category | Left top | Left bottom | Right |
|---|---|---|---|---|---|
| 01 | Bluebird AI Security | Client | japan-travel | 3d-moss-branch | bluebird-ai |
| 02 | TerraGrip Hardware 3D | Personal | 3d-moss-branch | haven-design | terragrip-3d |
| 03 | Haven AI Design System | Client | bluebird-ai | japan-travel | haven-design |

---

## 5. The living portrait


### 5.1 Principle

One WebGL canvas draws a flat 73×73 vertex mesh. Two textures (the picture on screen and the one it is fading from) are mixed in the fragment shader. A CPU wave simulation moves the vertices; brightness follows the local stretch so the skin shades as it deforms. Pictures are swapped by name; nothing is morphed, so every expression must be a separate image of the same head in the same position.

### 5.2 Frames and aliases

Every frame is a transparent 1024×1024 PNG of identical framing: a full-bleed bust (hair, face, shoulders) filling the frame from 3% to 97.5% across and 3.6% to 100% down. The 16 supplied files:

| Group | Files |
|---|---|
| Neutral | `rest` (also the static fallback), `closed`, `half` |
| Gaze (8 pictures) | `right`, `upright`, `up`, `upleft`, `left`, `downleft`, `down` and `side_left` |
| Reactions | `cross`, `grin`, `hearts`, `ouch`, `angry` |

`side_left` is loaded but nothing refers to it. `upleft.png` is, at the moment, a byte-identical copy of `downleft.png`: the gaze that should look up-left looks down-left. Both are findings, not features: re-generate `upleft` to fix it.

The engine's table `IDS` maps **29 logical names to the 16 files**: the 16 file names map to themselves and 13 more are aliases: `laugh, kiss → grin`; `stars, shock, scared → up`; `tongue, sick, puff → cross`; `snore → closed`; `deadpan, shy → half`; `dizzy, scrunch → ouch`. Names that the engine knows but `IDS` does not list (`winkl, winkr, smug, raised, cry, fish, wind, pink, blue, blonde, yawn, yawn1, yawn2, yawn4, whistle1, whistle2, sneeze1, sneeze2, gum1, gum2, gum3, gumpop`) have **no picture**: the engine silently ignores them (`show()` returns when the texture is missing), so the face simply holds the previous picture. To unlock one, save a PNG with the same framing and add one line to `IDS`, for example `winkl: '/avatar/winkl.png'`.

The 16-direction gaze ring (`e, ene, ne, nne, n, nnw, nw, wnw, w, wsw, sw, ssw, s, sse, se, ese`) maps to the 8 gaze pictures through `EYEFILE`:

| Ring cell | File | Ring cell | File |
|---|---|---|---|
| `e` | `right` | `w` | `left` |
| `ene`, `ne` | `upright` | `wsw`, `sw` | `downleft` |
| `nne`, `n`, `nnw` | `up` | `ssw`, `s`, `sse` | `down` |
| `nw`, `wnw` | `upleft` | `se`, `ese` | `right` |

`half` and `closed` map to themselves; the neutral gaze (cursor near the centre) shows `rest`.

### 5.3 Mesh and shaders

Constants: `OVER = 1.7`, `N = 72` cells (`M = 73` vertices per side), `SPAN = OVER / N`, `ORIGIN = 0.5 − OVER / 2`. Vertex `(i, j)` rests at `(ORIGIN + i·SPAN, ORIGIN + j·SPAN)` in picture units, so the mesh covers 1.7× the picture and the picture occupies its middle.

Vertex shader (attributes `a` rest position, `d` displacement, `s` shade; uniforms `lean`, `overS`):

```glsl
attribute vec2 a, d; attribute float s; varying vec2 vUv; varying float vS;
uniform vec2 lean; uniform float overS;
void main(){ vUv = a; vS = s; vec2 p = a + d + lean;
  gl_Position = vec4(vec2(p.x-.5, .5-p.y)*2./overS, 0., 1.); }
```

Fragment shader (uniforms `faceA`, `faceB`, `fade`):

```glsl
precision highp float; varying vec2 vUv; varying float vS;
uniform sampler2D faceA, faceB; uniform float fade;
void main(){
  if(vUv.x<0.||vUv.y<0.||vUv.x>1.||vUv.y>1.){ gl_FragColor = vec4(0.); return; }
  vec4 c = mix(texture2D(faceA,vUv), texture2D(faceB,vUv), fade);
  if(c.a<.004){ gl_FragColor = vec4(0.); return; }
  gl_FragColor = vec4(c.rgb*vS, c.a);
}
```

GL state: `alpha: true, premultipliedAlpha: true, antialias: true`; blending `ONE, ONE_MINUS_SRC_ALPHA`; `UNPACK_PREMULTIPLY_ALPHA_WEBGL = true`; textures are uploaded on unit `TEXTURE5` so they never disturb the sampler units 0 and 1; clamp-to-edge, linear filtering. The canvas backing store is the CSS size × `min(devicePixelRatio, 2)`, updated by a `ResizeObserver`.

### 5.4 The elastic sheet

A damped wave equation on the displacement `(ux, uy)` of each interior vertex, integrated with a fixed step `H = 1/240 s` (at most 9 sub-steps per frame):

```
WOBBLE = 2.3 · 2π      REACH = 0.085 / SPAN      C = REACH · WOBBLE
GAMMA  = 2 · 0.14 · WOBBLE      NU = 0.2 · C

v += ( C²·laplacian(u) − WOBBLE²·u − GAMMA·v + NU·laplacian(v) ) · dt
u += v · dt
```

* **Hold (drag):** `takeHold(u, v, radius .22)` records the vertices within a Gaussian of the grab point (weights above .02). While held, each gets a spring to `start + pull·weight` with stiffness `3000·w` and damping `90·w`. The pull is soft-clamped to a length of `0.24 · (1 − e^(−L/0.24))`.
* **Poke:** `poke(u, v, dx, dy, radius)` adds a velocity impulse with a Gaussian falloff (used for taps, sneezes, jolts and for rubbing the skin while the pointer moves: `dx·.00035`, radius .07).
* **Smoothing:** each frame the displacement is smoothed with a 1-4-1 cross filter (edge vertices untouched) into `sx, sy`.
* **Untangling:** the mesh must never fold. Every frame each row and column is forced back into order with a minimum gap of `0.34 · SPAN` between neighbours (a forward and a backward pass, two rounds); the picture can squash but never cross itself.
* **Shading:** `shade = clamp(1 − ((sx[k+1] − sx[k−1]) + (sy[k+M] − sy[k−M]))·1.8, .86, 1.16)` for interior vertices, 1 on the edge.
* **Head lean:** a spring toward `(pu−.5)·.012`, `(pv−.46)·.008` (or `pull·.16` while held) plus the act's lean and a slow sine drift, `lvX += ((tx−leanX)·70 − lvX·8)·dt`.

### 5.5 Pictures, cross-fade and loading

* `show(name, ms)` makes `name` the target picture: the previous target becomes `faceA` unless the previous fade is still below half, and the fade time is `min(70, ms)` ms. Only one picture is on screen at a time; the fade is `(now − fadeT) / fadeMs`.
* `compose()` picks what to show: the logical face if it is not `rest`; otherwise the hair-colour picture if a colour is active (gaze pictures do not exist in colour, so the head faces front); otherwise the current eye picture.
* **Loading:** the URL of a frame is the path in `IDS` (`/avatar/<file>.png`, one size for all screens: 16 files of about 1.7 MB). Load `rest` first; when it arrives upload it, build the 128×128 alpha hit map from it, hide `#faceFallback` (`visibility: hidden`) and start the frame loop. Then load `closed` and `half`, then the remaining frames with six parallel workers. A missing frame is skipped silently.
* **Hit test:** a point is on the head when the alpha of the 128×128 map is above 40.

### 5.6 Input, zones and moods

`toUv(x, y)` converts a client point to picture units through the canvas rectangle and the factor `OVER`. Zones, from `zoneAt(u, v)` with `a = (u − .505)/.225`, `b = (v − .485)/.33`:

| Test (in order) | Zone |
|---|---|
| `a² + b² > 1` or `v < .23` | `hair` |
| `v < .385` | `brow` |
| `|v − .455| < .05` and `.33 < u < .455` | `eyeL` |
| `|v − .455| < .05` and `.545 < u < .67` | `eyeR` |
| `|u − .5| < .055` and `v < .6` | `nose` |
| `.6 < v < .71` and `|u − .5| < .1` | `mouth` |
| `v > .71` | `chin` |
| else | `cheek` |

Hover answers (after 80 ms in a zone): `eyeL→winkl, eyeR→winkr, nose→cross, mouth→kiss` (only `cross` has its own picture; `kiss` is an alias of `grin`). Tap answers: `brow→angry, eyeL→ouch, eyeR→ouch, nose→act sneeze, mouth→tongue, cheek→puff, chin→laugh, hair→next hair colour` (`tongue` and `puff` are aliases of `cross`, `laugh` of `grin`; the hair colours have no pictures). A tap is a release with pull length under .03 and press time under 380 ms; non-act answers last 1100 ms.

Eye logic while the face is `rest`: asleep (`closed`) until the first input; blinking every `2200 + random·3400` ms through `half → closed → half` at 62 ms steps; otherwise the gaze cell is the ring direction of the vector from the head centre `(.5, .46)` to the pointer, `rest` if shorter than .13; while scrolling (500 ms) the target is straight down.

Pointer speed: `speed += |Δ|·.004`, decaying `e^(−6·dt)`; `shake` follows `speed > 1.5` and shows `wind` above .55 and `sick` above .92.

### 5.7 Idle acts

After `30 000 + random·15 000` ms without input (and only when `prefers-reduced-motion` is not set) the engine shuffles the 15-act list `yawn, shifty, gum, fly, flirt, roll, sneeze, hair, tug, cross, whistle, doze, cheeky, wow, sad` and plays the next one. An act is a list of steps `[picture or "eye:<cell>", cross-fade ms, hold ms, extras]`, extras being `jolt [u, v, dx, dy, radius]`, `lean [x, y]` and `call(fn)`. Any pointer movement ends the act (except during `doze`, where it jumps to the final shock). The `fly` act moves the SVG fly between points while the eyes track it and the head reacts when it lands on the nose; the `tug` act moves the SVG hand to the cheek, grips (the hand switches to the `.grab` path), pulls the skin to a limit and lets go. With the 16 supplied pictures the acts that read well are `shifty`, `roll` (all gaze pictures exist), `doze` (`half`, `closed`, `snore`→`closed`, then `shock`→`up`), `wow` (`stars`→`up`, `grin`), `fly` and `tug` (props plus `cross`, `ouch`, `angry`, `up`). Acts built from missing pictures (`yawn`, `whistle`, `gum`, `hair`, `sad`) show nothing or hold the previous face, and `flirt`, `cheeky`, `cross` and `sneeze` play only partly, until you add their frames. Both props are placed with percentage `left`/`top` computed from picture units: `left = ((u − .5)·100 + 50)%`.

### 5.8 Engine source

The full, working engine is included in the Master Prompt (appendix) and in `assets/reference-build/src/livingPortrait.ts`. It is wrapped in `startLivingPortrait()`, guarded by `window.__faceEngineStarted`, runs once from `useEffect` in the hero, and attaches window listeners (`pointermove`, `pointerup`, `pointercancel`, `pointerleave`, `scroll`) that are never removed (hence no StrictMode).

---

## 6. Copy deck (verbatim)

| Where | Text |
|---|---|
| Browser title | `My Portfolio` |
| Nav | HOME · PROJECT · ABOUT ME · CONTACT |
| Hero name | `Hi, i’m hanna` (rendered uppercase) |
| Hero tagline | `crafting high-impact 3d visual worlds and visionary digital experiences` |
| Buttons | `Contact Me`, `Live Project` |
| About heading | `About me` |
| About paragraph | `With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!` |
| Services heading | `Services` |
| Service 01 | `3D Modeling`: `Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.` |
| Service 02 | `Rendering`: `High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.` |
| Service 03 | `Motion Design`: `Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.` |
| Service 04 | `Branding`: `Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.` |
| Projects heading | `Project` |
| Projects | `Bluebird AI Security` (Client), `TerraGrip Hardware 3D` (Personal), `Haven AI Design System` (Client) |

The persona is "Hanna". To make the portfolio your own, change the `<h1>` in `HeroSection.tsx`, the `<title>` in `index.html` and the copy above (the `package.json` name is `mina-portfolio`; rename it freely).

---

## 7. Accessibility and performance


| Topic | Rule |
|---|---|
| Reduced motion | The reference engine skips idle acts under `prefers-reduced-motion: reduce` but still follows the pointer. Addition (not in the original): also disable the marquee scroll offset and make FadeIn instant |
| Semantics | One `<h1>`, `<h2>` per section, `<h3>` for cards and services. Decorative images have `alt=""`; the portrait fallback has `alt="Portrait"`; the canvas and props are `aria-hidden` |
| Keyboard | Nav anchors and both buttons are focusable. Addition: a visible `:focus-visible` outline in `#D7E2EA` |
| Touch | `touch-action: pan-y` on the portrait wrapper so vertical scrolling still works; `pointerdown` calls `preventDefault()` only on the solid head |
| Weight | Portrait frames load progressively (rest first, then closed and half, then the rest six at a time); tiles and project images are `loading="lazy"`. The 16 PNG frames are about 1.7 MB each (27 MB in total): optional optimisation: export a 640 px set for phones or convert to WebP (keep alpha), and select it in `IDS` by `innerWidth` |
| Rendering | The frame loop returns early while the canvas is off screen (`IntersectionObserver`) |
| Fallback | If WebGL is unavailable the engine returns and the static `rest.png` stays visible |

---

## 8. QA and deploy


### 8.1 Checks

Run at 1440×900, 1920×1080, 768×1024 and 390×844: no horizontal scroll; the name fits on one line; the portrait is centred and does not cover the nav or the button row (her hair covers the middle of the name by design); the cursor is a grab hand over the head only; frames swap without flicker; dragging stretches the head and it settles back; the marquee rows move in opposite directions; the About text lights up character by character; Services rows 1 and 3 fly in from the left and 2 and 4 from the right; Projects cards stack with scale 1, .97, .94; the white Services section is covered by the dark rounded top of Projects; the console is clean; no request goes anywhere except the Kanit font.

### 8.2 Deploy

Static build (`npm run build`, output `dist/`). `vercel.json` is not needed for a Vite project; the build command is `npm run build` and the output directory `dist`. Keep the repository private, never commit `.env*`, and push only when asked.
