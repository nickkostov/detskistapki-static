# Prompt
Add a captcha to the email form.

# Clarification
The user chose a simple on-page CAPTCHA for the current form, which does not send email.

# Output
Added a Bulgarian arithmetic challenge with answer validation, an error message, and a refresh button. A correct answer resets the challenge after the existing form action. This is a browser-side check, not server-verified protection.

Validation: root-path Vite build, ESLint, TypeScript, and `git diff --check` passed. Browser interaction was not tested.
