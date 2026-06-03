# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing website for **veenakumari.in** — a Vastu Shastra consultancy (Veena Kumari). Plain HTML/CSS/JS, no build step, no package manager, no framework. Deployed via **GitHub Pages** with a custom domain set in `CNAME` (`veenakumari.in`).

## Running locally

There is no build or dev server. Open `index.html` directly in a browser, or serve the directory statically:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Deployment is implicit: pushing to the default branch on GitHub publishes the site to `veenakumari.in` via Pages + the `CNAME` file.

## Architecture

Four sibling HTML pages share a single stylesheet and script:

- `index.html`, `about.html`, `services.html`, `contact.html` — each is self-contained and duplicates its own header/footer markup (there is no templating system; cross-page edits to nav, footer, or contact info must be applied to **all four** files).
- `styles.css` — global styles plus per-page sections. Color palette and fonts are CSS custom properties on `:root` (`--color-gold`, `--color-saffron`, `--color-navy`, `--color-dark`, `--color-light`, `--font-serif`, `--font-sans`). Reuse these tokens instead of hardcoding colors.
- `script.js` — vanilla JS, no modules. Initializes hamburger nav, WhatsApp float, contact-form validation (`FormValidator` class targeting `#contactForm`), scroll/fade animations via `IntersectionObserver`, and modal helpers. Loaded by every page.

Inline `style="..."` attributes are used heavily in the HTML for one-off layout tweaks (gradients, spacing, grid templates). This is intentional in the current design — prefer matching the existing pattern over extracting one-off styles into `styles.css` unless the same block is repeated.

## Cross-cutting concerns when editing

- **Contact info is duplicated across pages** and currently inconsistent. The real number is `+91 9971105440` (top bar on `index.html`); footers and `script.js` still hold the placeholder `+91 9999999999`, and `script.js:330` still points to `https://calendly.com/your-username`. When asked to update phone/email/Calendly, search across all HTML files **and** `script.js` — don't assume a single source of truth exists.
- **Email obfuscation**: `index.html` footer email is rendered via Cloudflare's `/cdn-cgi/l/email-protection` wrapper. Don't "fix" that markup by hand — it's injected by Cloudflare on the deployed site and should be replaced as a whole `<a href="mailto:...">` if changing the email.
- **Navigation active state**: each page hardcodes `class="active"` on its own nav link, AND `script.js` recomputes the active link from `window.location.pathname` on load. Both need to agree when adding a new page.
- **Form behavior**: the homepage hero form is a non-functional layout shell (`<a href="contact.html" class="btn btn-appointment">` instead of a submit) — the real working form is `#contactForm` on `contact.html`, wired up via `FormValidator`. Submissions are only `console.log`'d; there is no backend.

## Repository hygiene notes

- `*_UPDATE.txt` files at the root (`CORE_PHILOSOPHY_AND_FAVICON_UPDATE.txt`, `ICON_AND_PROFILE_UPDATE.txt`, `ICON_OPTIMIZATION_COMPLETE.txt`) are historical changelogs from prior edit sessions, not specs. Treat them as reference only — don't update them as part of new work unless asked.
- `README.md` is also a historical handover note (a rename log + manual-update checklist), not current documentation.
