## 6. Stage 1: Rules and understanding check

**Goal.** The agent reads the rules and the spec and says what it will build and where it sees risk.

**PROMPT 1 · UNDERSTANDING CHECK**

```
Read AGENTS.md and SPEC.md completely. Do not write code yet.
Then answer in this order:
1. In five sentences: what you will build and what is NOT 3D at run time.
2. The three riskiest parts and how you will check each (I expect: the portrait engine, the stacked sticky cards, the marquee's scroll maths).
3. Which inputs exist: list public/avatar (expect 16 PNG), src/media/project (expect 5 JPG) and public/media/decor with counts, and tell me what you will do about a missing folder. Do not invent files.
4. The exact list of files you will create, in order.
Wait for my "go".
```

**Verify**

- [ ] It names the engine, the sticky stack and the marquee maths as risks.
- [ ] It lists public/avatar, src/media/project and public/media/decor with counts and invents nothing.
