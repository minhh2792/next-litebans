FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_STORE_PATH="/pnpm/store"

RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch --frozen-lockfile

FROM base AS builder

WORKDIR /app
COPY --from=deps /pnpm /pnpm
COPY package.json pnpm-lock.yaml ./
COPY . .

RUN pnpm install --frozen-lockfile --offline
RUN pnpm run setup:db:generate
RUN pnpm run build
RUN pnpm prune --prod --no-optional

FROM node:22-alpine AS runner

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "server.js"]
