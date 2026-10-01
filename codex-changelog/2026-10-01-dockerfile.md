# Prompt
Analyze this repository and create a dockerfile for it.

# Output
Added a two-stage Dockerfile: npm installs from the lockfile and builds the Vite app for `/`, then Nginx serves the static output on port 80. Added `.dockerignore` to keep local files out of the build context.

Validation: `npm ci`, `npm run build -- --base=/`, and `npm run lint` passed. Generated CSS and JavaScript URLs start with `/assets/`. Container startup could not be tested because the Docker daemon was unavailable.
