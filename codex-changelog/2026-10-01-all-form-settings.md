# Prompt
I want to have all the settings for the email form available.

# Output
Expanded the public YAML to cover all current contact form presentation and behavior settings: visibility, CAPTCHA, text, contact details, labels, placeholders, required fields, length limits, and message rows. The form reads and validates them. Email delivery is still not implemented in this static site.

Validation: root-path Vite build, ESLint, TypeScript, and `git diff --check` passed. Parser checks covered enabled, disabled, and invalid YAML values. Browser interaction was not tested.
