# Detskistapki Static Website

This project is a simple React + TypeScript site built with [Vite](https://vitejs.dev/). The provided Docker configuration allows you to build the project and serve the static files using Nginx.

## Requirements
- [Docker](https://docs.docker.com/get-docker/) (and optionally Docker Compose)

## Building the Image

```bash
docker build -t detskistapki .
```

## Running with Docker

```bash
docker run -it --rm -p 8080:80 detskistapki
```

The site will be available at [http://localhost:8080](http://localhost:8080).

## Using Docker Compose

A `docker-compose.yml` file is included for convenience. To build and run the container:

```bash
docker compose up --build
```

This will expose the site on port 8080.

## Development

To start a local dev server with hot reloading run:

```bash
npm run dev
```
