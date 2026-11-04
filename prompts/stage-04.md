## 9. Stage 4: Hero without the engine

**Goal.** Nav, name, tagline, button and the portrait markup with the static fallback.

**PROMPT 4 · HERO WITHOUT THE ENGINE**

```
Build the hero without the engine (SPEC 4.1).
1. HeroSection.tsx with the nav (HOME, PROJECT, ABOUT ME, CONTACT), the name "Hi, i'm hanna" (use the typographic apostrophe), the tagline, the ContactButton and the portrait markup: #magnetWrap, #magnetInner, img#faceFallback (src /avatar/rest.png), canvas#faceGl, #faceProps with the two inline SVGs (#faceFly and #faceHand, both viewBox 0 0 32 32). The section has id="home".
2. FadeIn delays 0 / .15 / .35 / .5 / .6 and the offsets from SPEC.
3. Do NOT call the engine yet.
Verify at 1440x900 and 390x844: the name is one line; getBoundingClientRect of the portrait wrapper is centred; the static rest.png is visible and covers the middle of the name; the nav and the bottom row stay above it.
```

**Verify**

- [ ] The name is one line at every breakpoint.
- [ ] The portrait wrapper is centred and overlaps the name.
