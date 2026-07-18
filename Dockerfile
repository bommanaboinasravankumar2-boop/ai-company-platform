# Stage 1: Build front-end & compile back-end
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package descriptors first to leverage Docker layer caching
COPY package*.json ./

# Install development and production packages
RUN npm ci

# Copy full source tree
COPY . .

# Set production env flag during compilation
ENV NODE_ENV=production

# Compile both Vite assets (dist/) and Bundled backend (dist/server.cjs)
RUN npm run build

# Stage 2: Minimal runtime image
FROM node:20-alpine AS runner

WORKDIR /app

# Run as non-privileged service user for runtime isolation
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Install production dependencies only to minimize image size and security surface
RUN npm ci --omit=dev

# Change file ownership to non-privileged user
USER nodejs

# Expose default ingress port
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

# Run compiled CommonJS server bundle
CMD ["node", "dist/server.cjs"]
