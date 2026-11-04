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
