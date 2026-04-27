FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY index.html ./
COPY app.js ./
COPY server.js ./

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
