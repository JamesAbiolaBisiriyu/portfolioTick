You are a senior front-end engineer personalising an existing portfolio
(Vite + React + TypeScript + Tailwind 3 + framer-motion). Work in small steps.

RULES
1. Read AGENTS.md and content/CONTENT.md first. CONTENT.md is the ONLY source of
   text, links, tags and email. Copy it exactly. Never rewrite, shorten, translate
   or invent text, links, tags, years or skills.
2. NEVER modify: src/livingPortrait.ts, anything in public/, src/components/HeroSection.tsx,
   AGENTS.md, SPEC.md, spec/, prompts/, content/.
3. Keep the existing layout classes, animations, scroll effects, z-index order and the
   class name `contact-btn`. Change text, data and the minimum markup needed.
   Do not add packages. Do not use React.StrictMode.
4. Read each file fully before editing it. After each step run `npm run build`, fix
   errors, `git add` only the files you changed, commit with the message given, then
   STOP and wait for me to say "go".
5. If you have no browser tool, tell me what to check by eye. Do not claim visual
   checks passed.

STEP 0 (read only)
Open App.tsx and every file in src/components/. List: (a) which component renders each
section, (b) every place the words Hanna, hanna, mina, Bluebird, TerraGrip or Haven appear
(file and line), (c) how the Contact Me button is built and where it is used.
Change nothing. Stop.

STEP 1 (marquee and images)
New placeholder images already exist in src/media/project/: project-resume-builder.jpg,
project-tollybis.jpg, project-todo-app.jpg. In MarqueeSection.tsx replace the five old
project image imports with these three. Row 1 order: resume-builder, tollybis, todo-app,
resume-builder, tollybis. Row 2 order: todo-app, tollybis, resume-builder, todo-app,
resume-builder. Keep exactly 5 entries per row, the 5 repeated copies, and every width and
scroll formula unchanged. Do not delete the old image files. Remove unused imports.
Commit: "Personalise: marquee".

STEP 2 (projects)
In ProjectsSection.tsx replace the three project entries with the three in CONTENT.md
(Projects), same order. Each card keeps its number 01 to 03, category line and name. Add
the description as a short paragraph and the tags as small rounded chips (1px border,
text-xs, uppercase) between the header row and the image grid. Use the card's own project
image in all three image slots. Render LiveProjectButton only when CONTENT.md gives a link,
opening in a new tab; the Tollybis card has no link, so no button. Keep sticky positions,
the scale formula and the image sizes. Make sure card text does not overflow at 390 px
wide by tightening spacing, not by shrinking the images. Commit: "Personalise: projects".

STEP 3 (about)
Replace the About content with CONTENT.md (About). Keep the section id, white background and
the four decor icons in their corners (they must not cover any text). Use the existing
scroll-lit AnimatedText ONLY for the intro paragraph. Eyebrow, heading, the Background
block, the Skills block (three groups with chips) and the "How I work with AI" block are
normal text wrapped in the existing FadeIn. Commit: "Personalise: about".

STEP 4 (services)
Replace the four service titles and descriptions with CONTENT.md (Services), same order.
Keep numbering 01 to 04 and all motion offsets. Commit: "Personalise: services".

STEP 5 (contact)
In ContactButton.tsx render the button as an anchor with
href="mailto:emperor2g@gmail.com?subject=Project%20enquiry", keeping the same classes, the
class `contact-btn` and the existing label. Do not edit HeroSection.tsx; if the project
cannot compile without it, change only that single line and tell me which. Commit:
"Personalise: contact".

STEP 6 (metadata and leftovers)
In index.html set the <title> and the meta description from CONTENT.md (Metadata). Then
search src/ and index.html with PowerShell Select-String for hanna, bluebird, terragrip,
haven and mina, and list what is left (it will be in HeroSection.tsx; do not edit it).
Commit: "Personalise: metadata".

When all steps are done, print a table: step, files changed, build result.
