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
