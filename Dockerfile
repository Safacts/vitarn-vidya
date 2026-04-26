FROM nginx:alpine

# Copy static files
COPY index.html /usr/share/nginx/html/
COPY data.js /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
