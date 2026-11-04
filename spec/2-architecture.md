## 2. Architecture

### 2.1 Stack

| Layer | Choice |
|---|---|
| Build | Vite 5, React 18, TypeScript 5.5, no StrictMode (the engine attaches global listeners once) |
| Styling | Tailwind CSS 3.4 plus one small global stylesheet; font family `Kanit` through Tailwind (`font-kanit`) |
| Motion | framer-motion 12 for FadeIn, scroll-lit text, flying service rows and stacked cards; plain `requestAnimationFrame` for the portrait; a scroll listener for the marquee |
| Icons | `lucide-react` is installed but not used by the shipped components |
| Portrait | WebGL 1 (`getContext('webgl')`), one 73×73 mesh, two textures cross-faded in the fragment shader, a CPU wave simulation |
| Fonts | Kanit 300 to 900 from Google Fonts: the only external request |
| Hosting | Static files (`vite build` output) on Vercel |

### 2.2 Files

```
index.html                       title "My Portfolio", favicon links, Kanit link, #root, /src/main.tsx
src/main.tsx                     createRoot(...).render(<App />), no StrictMode
src/index.css                    Tailwind layers, reset, .hero-heading, .contact-gradient-text, hero portrait CSS, #faceGl/#faceProps/#faceFly/#faceHand
src/App.tsx                      <main class="font-kanit" bg #0C0C0C overflowX clip> Hero, Marquee, About, Services, Projects
src/livingPortrait.ts            the engine (startLivingPortrait), // @ts-nocheck
src/components/HeroSection.tsx   nav, h1, tagline, ContactButton, portrait markup, starts the engine in useEffect
src/components/MarqueeSection.tsx   imports the 5 project images
src/components/AboutSection.tsx
src/components/ServicesSection.tsx  ServiceRow with useScroll
src/components/ProjectsSection.tsx  imports the 5 project images
src/components/FadeIn.tsx  AnimatedText.tsx  ContactButton.tsx  LiveProjectButton.tsx  Magnet.tsx (unused)
src/media/project/*.jpg          5 project previews (bundled by Vite through imports)
public/avatar/<name>.png         16 portrait frames, 1024x1024 RGBA (served from /avatar/...)
public/media/decor/*.png         4 About icons
public/favicon.ico  favicon.png  apple-touch-icon.png
```

`Magnet.tsx` is a mouse-following hover component that nothing imports; the ids `magnetWrap` and `magnetInner` in the hero belong to the engine, not to that component.

### 2.3 Media contract

| Group | Files | Size | Where it is used |
|---|---|---|---|
| Portrait frames | 16 transparent PNG in `public/avatar/`: `rest closed half up down right left upright upleft downleft side_left cross grin hearts ouch angry` | 1024×1024 RGBA, full-bleed bust: the head and shoulders fill 3% to 97.5% across and 3.6% to 100% down; all 16 share identical framing (head box spread under 0.1%) | WebGL textures; `rest.png` also the static fallback `<img>` |
| Project previews | `project-bluebird-ai`, `project-terragrip-3d`, `project-japan-travel`, `project-haven-design`, `project-3d-moss-branch` (`.jpg` in `src/media/project/`) | 735 to 1200 px wide website screenshots (about 3:2 or 4:3) | Imported by Marquee and Projects (Vite hashes and bundles them) |
| About icons | `public/media/decor/moon.png`, `smiley.png`, `brick.png`, `cursor.png` | any size, transparent PNG (about 700 px); shown at 100 to 220 px | Four corners of About: moon top-left, smiley bottom-left, brick top-right, cursor bottom-right |
| Favicons | `public/favicon.ico`, `favicon.png` (32), `apple-touch-icon.png` | | `index.html` |

The four About icons are glassy, iridescent 3D icons (a blue crescent moon, a pink-violet smiley outline, a translucent brick, a chrome cursor arrow). The package ships neutral stand-ins drawn by `tools/make_decor.py`; replace them with your own icons under the same names.

Every image is an own asset: no URL to another site appears in the code. Do not hot-link media.
