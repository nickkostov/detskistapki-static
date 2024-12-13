#!/bin/bash

# Script to build and refresh Docker image

# Define image name
IMAGE_NAME="my-html-site"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Stop and remove the existing container if running
CONTAINER_ID=$(docker ps -q --filter "name=$IMAGE_NAME")
if [ ! -z "$CONTAINER_ID" ]; then
    echo "Stopping and removing existing container..."
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
fi

# Run a new container
echo "Running a new container..."
docker run -d -p 8080:80 --name $IMAGE_NAME $IMAGE_NAME

# Confirm success
echo "Docker image refreshed and running at http://localhost:8080"
