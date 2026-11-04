## 13. Stage 8: Responsive and quality pass

**Goal.** Five viewport checks, touch behaviour and a transfer-size report.

**PROMPT 8 · RESPONSIVE AND QUALITY PASS**

```
Responsive and quality pass (SPEC 7).
1. Check 390x844, 768x1024, 1024x768, 1440x900 and 1920x1080: no horizontal scroll, no text overlap, tap targets of the buttons at least 40 px high.
2. Add the labelled additions of SPEC 7 only if I say so; by default add nothing.
3. Touch: on a 390 px viewport simulate a touch drag on the head and a vertical swipe on the page; the page must still scroll when the swipe starts outside the head.
4. Network: report the total transfer of the first load and the size of the 16 frames. Do not change the frame format unless I ask.
Report anything that deviates from SPEC.md instead of silently fixing it.
```

**Verify**

- [ ] No horizontal scroll at 390 px.
- [ ] The page scrolls when a swipe starts outside the head.
