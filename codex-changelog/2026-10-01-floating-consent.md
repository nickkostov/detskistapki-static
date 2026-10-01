# Prompt
I want the consent to be hovering in the website with agree and disagree like in other websites. not poping when opening :D

# Output
Replaced the blocking dialog with a floating Bulgarian banner. The site remains usable; agree and disagree choices are saved in localStorage under a new key so visitors see the revised choice. External testimonial photos load only after agreement, with initials shown otherwise.

Validation: root-path Vite build, ESLint, TypeScript, and `git diff --check` passed. Browser interaction was not tested.
