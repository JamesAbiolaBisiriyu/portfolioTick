# James Abiola Bisiriyu — Portfolio

Personal portfolio for **James Abiola Bisiriyu**, an AI-native full-stack developer based in Lagos, Nigeria. The site presents practical digital products for small businesses and startups through a dark, typographic one-page experience with motion-led interactions and an interactive WebGL portrait.

## Highlights

- Interactive “living portrait” hero rendered with WebGL
- Cursor, touch, drag, scroll, hover, and idle interactions for the portrait
- Scroll-driven project marquee with opposing image rows
- Animated About section with a scroll-lit introduction and skill groups
- Services rows that slide in from alternating directions
- Sticky project cards that stack and scale while scrolling
- Responsive layout for mobile, tablet, and desktop screens
- Reduced-motion support through `prefers-reduced-motion`
- Local project, portrait, decorative, and favicon assets

## Tech stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/)
- WebGL 1 for the portrait mesh and texture animation
- Kanit typography loaded from Google Fonts

## Page structure

The application is a single route made up of the following sections:

1. **Home** — navigation, introduction, contact button, and the living portrait
2. **Project marquee** — two opposing rows of project previews
3. **About** — background, skills, AI-assisted working approach, and decorative assets
4. **Services** — frontend development, backend and APIs, full-stack apps, and business websites and automation
5. **Projects** — Resume Builder, Tollybis digital presence, and To-do App

Navigation anchors are available for `#home`, `#projects`, `#about`, and `#contact`. The contact anchor is retained as a placeholder for future contact-flow wiring.

## Getting started

### Prerequisites

- Node.js and npm
- A modern browser with WebGL support for the interactive portrait

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite starts the local development server at [http://localhost:5173](http://localhost:5173) by default.

### Create a production build

```bash
npm run build
```

The build command runs TypeScript validation before generating the production bundle in `dist/`.

### Preview the production build

```bash
npm run preview
```

## Project structure

```text
.
├── public/
│   ├── avatar/              # Transparent portrait frames used by the WebGL engine
│   ├── media/decor/         # Decorative About-section images
│   └── favicon*             # Browser and device icons
├── src/
│   ├── components/          # Portfolio sections and reusable motion components
│   ├── media/project/       # Project preview images bundled by Vite
│   ├── livingPortrait.ts    # WebGL portrait and interaction engine
│   ├── App.tsx              # Page composition
│   ├── index.css            # Tailwind layers and global visual styles
│   └── main.tsx             # React entry point
├── index.html               # Document metadata and font loading
├── package.json             # Scripts and dependencies
└── SPEC.md                  # Design and behaviour contract
```

## Media and portrait system

The portrait is not generated with a runtime 3D model. It uses separate transparent PNG frames for expressions and gaze directions. The WebGL engine maps those textures onto a damped 73×73 mesh, allowing the image to respond to pointer movement and dragging while preserving the original framing.

All project and decorative images are stored in the repository. The only external asset request is the Kanit font declared in `index.html`.

## Accessibility and performance

- Semantic sections and headings provide a clear page structure.
- Visible keyboard focus styles are included for interactive links and controls.
- Images use local assets and lazy loading where appropriate.
- The portrait and scroll animations respect `prefers-reduced-motion`.
- The application is built as a static Vite bundle with no backend dependency.

## Deployment

Run `npm run build`, then deploy the generated `dist/` directory to any static hosting provider such as Vercel, Netlify, GitHub Pages, or Azure Static Web Apps. Configure the provider to serve `index.html` for the root route.

## Development notes

- `src/main.tsx` intentionally renders the app without React `StrictMode` because the portrait engine attaches global listeners.
- Keep portrait frames in `public/avatar/` and preserve their shared framing.
- Refer to [`SPEC.md`](./SPEC.md) before changing copy, colours, dimensions, interactions, or asset conventions.
