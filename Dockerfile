# Use an official Nginx image to serve static files
FROM nginx:alpine

# Copy the HTML and CSS files into the container
COPY . /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80
