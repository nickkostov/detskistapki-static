# Prompt
Add a pop up in bulgarian that the user must agree that the website might collect data.

# Output
Added a Bulgarian consent dialog that blocks the site until the visitor selects “Съгласявам се и продължавам”. The choice is saved in localStorage; the page mounts only after agreement. Set the document language to Bulgarian.

Validation: root-path Vite build, ESLint, and TypeScript checks passed. No browser interaction test was run.
