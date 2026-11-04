## 11. Stage 6: Marquee and About

**Goal.** The scroll-driven double marquee and the About section with the scroll-lit paragraph.

**PROMPT 6 · MARQUEE AND ABOUT**

```
Build the Marquee and About sections (SPEC 4.2, 4.3).
1. MarqueeSection: the five project previews imported from src/media/project, two rows (row 1 order 1 to 5, row 2 order haven, moss, bluebird, terragrip, japan), each row five copies, margin-left -(5 x 432), the scroll maths from SPEC 4.2 with a passive listener and cleanup.
2. AboutSection: the four decor images from /media/decor (moon top-left, smiley bottom-left, brick top-right, cursor bottom-right) with their classes, delays and entry offsets, the heading, AnimatedText with the exact paragraph, and the ContactButton.
Verify: at scrollY 0, 400 and 800 read the two row transforms and confirm they are opposite; the About text opacity of the first and last character differs while scrolling; the four icons sit in the four corners at 1440 and 390 wide without covering the paragraph.
```

**Verify**

- [ ] Row transforms are opposite.
- [ ] The icons sit in the four corners.
