# Use Node 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev for ts-node)
RUN npm install

# Copy project files
COPY . .

# Build TypeScript -> dist/
RUN npm run build

# Expose port (Render will set PORT env variable)
EXPOSE 7555
ENV PORT=7555

# Start the server using compiled JS
CMD ["node", "dist/index.js"]
