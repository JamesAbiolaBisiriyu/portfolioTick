## 12. Stage 7: Services and Projects

**Goal.** The white Services section with flying rows and the three stacking cards.

**PROMPT 7 · SERVICES AND PROJECTS**

```
Build Services and Projects (SPEC 4.4, 4.5).
1. ServicesSection with the four rows (copy from SPEC 6). Each row is a ServiceRow with useScroll (offset ['start 95%', 'center 58%']), x from -220 (rows 1 and 3) or 220 (rows 2 and 4) to 0, opacity [0, .6, 1], and the gradient number (.contact-gradient-text).
2. ProjectsSection with the three sticky cards, the image assignment table of SPEC 4.5, the scale maths, the top offsets (index x 28 px), the header row, the image grid and the radii.
Verify: scroll a Services row into view and read its transform: translateX starts at -220 or 220 and ends at 0; Projects' dark rounded top overlaps the white Services section (negative margin); while scrolling through the list the 3 cards stick one after another; computed scale of card 1 ends at 0.94 and card 2 at 0.97; all images load with status 200.
```

**Verify**

- [ ] Service rows start at ±220 px and end at 0.
- [ ] Card scales end at 1, 0.97 and 0.94.
