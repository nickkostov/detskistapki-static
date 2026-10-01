# Prompt
I want to configure the settings for the email form to be configured through a YAML file with a toggle enabled.

# Output
Added public YAML settings with `email_form.enabled: true` and `captcha_enabled: true`. The site loads and validates the YAML at page load; the form is hidden when disabled or the configuration is invalid. Added configuration instructions. The form still does not send email.

Validation: clean `npm ci`, root-path and GitHub Pages Vite builds, ESLint, TypeScript, and `git diff --check` passed. A local Pages preview served the YAML file at `/detskistapki-static/contact-form.yaml`.
