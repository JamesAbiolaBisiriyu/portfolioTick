## 10. Stage 5: The living portrait

**Goal.** The WebGL mesh, the physics, the pictures, the input and the idle acts.

**PROMPT 5 · THE LIVING PORTRAIT**

```
Write the living-portrait engine (SPEC 5).
Use the reference engine in the appendix of this file as your base: save it as src/livingPortrait.ts. Read it end to end first and write me back, in 12 lines, how each of these works: the mesh and shaders, the wave step, hold and poke, show/compose, the IDS and EYEFILE tables, the zones, the acts and the props.
Then wire it: HeroSection calls startLivingPortrait() once from useEffect.
Verify in a real browser:
1. Console clean, #faceFallback becomes hidden after rest.png loads.
2. After a pointer move the eyes follow the cursor: move to the four corners and read which frame is shown (log the chosen picture temporarily, then remove the log). Expect right, up, left, down families.
3. A drag on the head moves vertices; on release they settle in under 2 s.
4. Hover and tap each zone from SPEC 5.6 and report the frame shown; the answers that rely on missing pictures must do nothing, not throw.
5. 35 s without input starts an idle act (you may temporarily shorten the timer to test, then restore it).
```

**Verify**

- [ ] The fallback image hides after rest.png loads.
- [ ] Eyes follow the pointer; hover and tap answers match SPEC 5.6.
- [ ] A drag stretches the head and it settles; the console is clean.
