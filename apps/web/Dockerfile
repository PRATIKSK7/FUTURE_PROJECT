# ----------------------------------
# Stage 1: Install dependencies
# ----------------------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY apps/web/package.json apps/web/package-lock.json* ./apps/web/
RUN cd apps/web && npm ci

# ----------------------------------
# Stage 2: Build the Next.js app
# ----------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY apps/web ./apps/web
# Requires standalone output configured in next.config.mjs
RUN cd apps/web && npm run build

# ----------------------------------
# Stage 3: Production Server
# ----------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Next.js standalone output optimizes image size
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
