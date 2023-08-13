FROM node:18-alpine AS base
# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json  ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
ARG _NEXT_PUBLIC_SERVER
ARG _NEXT_PUBLIC_SUPABASE_URL
ARG _NEXT_PUBLIC_SUPABASE_ANON_KEY

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SERVER=$_NEXT_PUBLIC_SERVER
ENV NEXT_PUBLIC_SUPABASE_URL=$_NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$_NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

RUN echo "building for public server: {$NEXT_PUBLIC_SERVER} using supabase {$NEXT_PUBLIC_SUPABASE_URL}." 
RUN echo "Anon key: {$NEXT_PUBLIC_SUPABASE_ANON_KEY}." 
RUN rm /app/.env.local
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs


ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SERVER=$_NEXT_PUBLIC_SERVER
ENV NEXT_PUBLIC_SUPABASE_URL=$_NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$_NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_SHARP_PATH=/app/node_modules/sharp
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node", "server.js"]