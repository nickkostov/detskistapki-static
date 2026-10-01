# Goal
Serve the Детски Стъпки static site through GitHub Pages or a Docker container. Show a Bulgarian floating data-choice banner while keeping the site usable.

# Stack
Vite 5, React 18, TypeScript, Tailwind CSS, npm. Docker builds the site with Node 20 and serves it with Nginx.

# Files
`package.json` defines build and lint scripts. `vite.config.ts` sets the GitHub Pages base path. `.github/workflows/pages.yml` deploys `dist/`. `Dockerfile` builds and serves the container. `.dockerignore` excludes local and repository metadata.
`src/App.tsx` renders the consent banner. `src/components/Testimonials.tsx` controls optional external photos. `src/components/Contact.tsx` contains the contact form and simple arithmetic CAPTCHA.
`public/contact-form.yaml` holds public form toggles; `src/config/contactForm.ts` loads and validates them. `docs/contact-form.md` explains configuration.

# Rules
Check for `AGENTS.md`, `codex-changelog/`, `docs/`, and `architecture.md` before work. Keep a concise prompt and output record in `codex-changelog/`.

# Decisions
GitHub Pages uses `/detskistapki-static/`. The Docker build overrides Vite's base to `/` so assets load when the container serves the site at the domain root. The site has no client router.
Accepted or declined consent is saved in localStorage under `detskistapki-data-consent-v2`; without storage, the choice lasts for the current page visit. The v2 key shows the new banner even to visitors who answered the old dialog. The site remains accessible before and after either choice. External Pexels testimonial photos load only after acceptance; initials appear otherwise.
The contact form is a demo: it logs input in the browser console and does not send email. Its CAPTCHA randomly uses a small two-step addition/subtraction or multiplication/addition problem. It is browser-side only and does not provide server-verified bot protection.
`email_form.enabled` and `email_form.captcha_enabled` are YAML booleans; both default to true in the repo. The browser loads them at page load. Missing or invalid config leaves the form unavailable. Do not store secrets in public YAML.
