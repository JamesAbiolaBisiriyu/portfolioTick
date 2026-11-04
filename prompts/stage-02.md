## 7. Stage 2: Scaffold and shared pieces

**Goal.** A Vite project with Tailwind, the global CSS, FadeIn, AnimatedText and the two buttons.

**PROMPT 2 · SCAFFOLD AND SHARED PIECES**

```
Scaffold the project and build the shared pieces (SPEC 2, 3).
1. Create a Vite + React + TypeScript project in the current folder (no extra template files), install tailwindcss@3, postcss, autoprefixer, framer-motion@12, lucide-react. Configure Tailwind (content ./index.html and ./src/**/*.{ts,tsx}, fontFamily kanit). Add src/vite-env.d.ts.
2. index.html: title "My Portfolio", the favicon links, the Kanit link (300 to 900) with the preconnects, #root, the module script.
3. src/index.css: Tailwind layers, the reset, html/body/#root background, .hero-heading, .contact-gradient-text and the whole portrait CSS block from SPEC 4.1.
4. src/main.tsx without StrictMode (keep the comment why). src/App.tsx with the five sections in order (placeholder sections for now).
5. Write FadeIn, AnimatedText, ContactButton and LiveProjectButton exactly as in SPEC 3.3. Do not create Magnet.
6. Run npm run build.
```

**Verify**

- [ ] npm run build passes.
- [ ] No StrictMode in main.tsx.
- [ ] Only the Kanit font is requested externally.
