## 14. Stage 9: Final QA and repository

**Goal.** The full checklist, the external-URL grep, the build and a clean repository, without deploying.

**PROMPT 9 · FINAL QA AND REPOSITORY**

```
Run the final QA and prepare the repository, but do NOT push and do NOT deploy.
1. Run the checklist at the end of this file item by item against the running site and print a table: item, pass/fail, evidence.
2. grep -rn "http" index.html src public and confirm that the only external URLs are the Google Fonts ones.
3. npm run build must pass; report the size of dist/assets.
4. Create .gitignore (node_modules, dist, .DS_Store, .env*, .vercel), make sure no .env or key file exists, run git status and show it.
5. Print the exact commands I need to run to deploy to Vercel (framework Vite, build npm run build, output dist) and wait.
```

**Verify**

- [ ] The grep shows only the Google Fonts URLs.
- [ ] No secrets in the repository.
