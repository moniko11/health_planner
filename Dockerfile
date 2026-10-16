# Multi-stage Dockerfile for Coway Health App on Google Cloud Run
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency configuration
COPY package*.json .npmrc* ./

# Install all dependencies for frontend build
RUN npm install --legacy-peer-deps

# Copy source code and build production assets
COPY . .
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package specs and install dependencies
COPY package*.json .npmrc* ./
RUN npm install --legacy-peer-deps

# Copy compiled frontend assets and server entrypoint
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts

# Cloud Run listens on port 8080
EXPOSE 8080

# Start server using npm start ("tsx server.ts")
CMD ["npm", "start"]
