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
