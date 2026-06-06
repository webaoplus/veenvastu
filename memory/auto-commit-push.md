---
name: auto-commit-push
description: User wants changes committed and pushed by default after every edit, without being asked
metadata:
  type: feedback
---

After making real file changes in this repo, commit and push to `main` by default — don't ask first.

**Why:** The user said "by default, git commit and git push every time we make changes" (2026-06-03). They don't want to be prompted each time.

**How to apply:** When a turn produces actual file edits, finish by committing with a descriptive message and `git push origin main`. Skip this for pure Q&A, read-only investigation, or clearly incomplete/work-in-progress turns. Pushing to `main` deploys live to veenakumari.in via GitHub Pages, so make sure the change is in a coherent state before pushing.
