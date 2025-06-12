# === Base image ===
FROM node:18-alpine AS deps
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# === Builder image ===
FROM node:18-alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy env file used during build
COPY .env.build .env

# Build with env loaded
RUN set -a && . .env && set +a && pnpm prisma generate && pnpm build

# === Final image ===
FROM node:18-alpine AS runner
WORKDIR /app

# Setup pnpm and dotenv-cli
ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN mkdir -p $PNPM_HOME \
  && corepack enable \
  && corepack prepare pnpm@latest --activate \
  && pnpm add -g dotenv-cli

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary app files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Copy env file into final image (for testing only)
COPY .env.build .env

# Regenerate Prisma client (optional)
RUN pnpm prisma generate

EXPOSE 3000

# Run with env loaded
CMD ["dotenv", "pnpm", "start"]