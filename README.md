# detskistapki-static
Repository containing detskistapki-static

# Nginx Docker Deployment

This project uses Docker to deploy a static website using the official Nginx image.

## Dockerfile Overview
```Dockerfile
# Use an official Nginx image to serve static files
FROM nginx:alpine

# Copy the HTML and CSS files into the container
COPY . /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80
```

## Docker Compose Overview
```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: detskistapki
    ports:
      - "8080:80"
    restart: always

```
## Getting Started

### Prerequisites
- Docker installed
- Docker Compose installed

### Build and Run
1. Clone the repository:
   ```bash
   git clone https://github.com/nickkostov/detskistapki-static.git
   cd detskistapki-static
   ```

2. Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```

3. Open your browser and visit:
   ```
   http://localhost:8080
   ```
### Stopping the Container
```bash
docker-compose down
```

## File Structure
```
/project-root
  |-- Dockerfile
  |-- docker-compose.yml
  |-- html/
      |-- index.html
      |-- styles.css
  |-- README.md
```

## Notes
- Adjust ports and volume mappings in `docker-compose.yml` as needed.
