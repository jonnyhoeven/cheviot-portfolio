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
ARG HOSTNAME=www.justme.dev
ARG SERVER=https://www.justme.dev
ARG SUPABASE_URL=https://opsopxcuijvxynewriib.supabase.co
ARG ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wc29weGN1aWp2eHluZXdyaWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2MzgzOTIsImV4cCI6MjAwNDIxNDM5Mn0.V-zihZEKuDS_FPHIvXnR8ltvlK5blZJ4bscVYPAyJGk

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SERVER=$SERVER
ENV HOSTNAME=$HOSTNAME
ENV NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

RUN echo "building for: {$NEXT_PUBLIC_SERVER} using {$NEXT_PUBLIC_SUPABASE_URL}." 
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
ENV PORT=3000
ENV HOST=0.0.0.0
ENV HOSTNAME=$HOSTNAME
ENV NEXT_PUBLIC_SERVER=$SERVER
ENV NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
EXPOSE 3000

CMD ["node", "server.js"]