# Living Portrait starter kit

1. Create an empty project folder (e.g. `living-portfolio`) and `git init`.
2. Unzip this kit into it.
3. Copy the `public/` folder from `AI_WebForge_Free_Edition/01_Living_Portrait_Portfolio/` into the project root
   (frames, decor icons and favicons; they are not included here because you already have them).
4. Open the folder in your IDE. Pick your agent tool (Continue, Cline, Roo Code or OpenCode) with an Ollama model.
5. Paste the contents of `prompts/00-bootstrap.md`, then run the stages one at a time.
6. After Stage 3, run: `python3 tools/check_frames.py public/avatar`

Notes
- `src/livingPortrait.ts` is the template's engine, extracted unchanged from its Appendix A.
- `src/media/project/*.jpg` are placeholders; replace them later with real screenshots, same file names.
- `tools/check_frames.py` is a replacement written for this kit; the original tools folder is not in the free edition.
