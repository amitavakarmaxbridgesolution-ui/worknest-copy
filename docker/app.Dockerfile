# syntax=docker/dockerfile:1

# ---------- Stage 1: build the WorkNest frontend (Vite/React) ----------
FROM node:20-alpine AS build
WORKDIR /app

# Which Base44 app this build talks to, and where that app's backend lives.
# Baked into the JS bundle at build time by Vite (import.meta.env.VITE_*).
# Defaults point at the real WorkNest app; override with --build-arg to
# reuse this Dockerfile for a different Base44 app.
ARG VITE_BASE44_APP_ID=6a911feea78e049e1a1003f4
ARG VITE_BASE44_APP_BASE_URL=https://app.base44.com
ENV VITE_BASE44_APP_ID=${VITE_BASE44_APP_ID} \
    VITE_BASE44_APP_BASE_URL=${VITE_BASE44_APP_BASE_URL}

COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Stage 2: serve the built bundle with nginx ----------
FROM nginx:1.27-alpine
LABEL org.opencontainers.image.title="WorkNest application"
LABEL org.opencontainers.image.description="WorkNest HR & workforce management platform (Base44 export)"

# Same backend, used by nginx to reverse-proxy /api and /ws-user-apps at
# runtime (see docker/nginx.conf.template for why this proxy exists — the
# frontend calls relative /api/* paths and has nowhere to send them without it).
ARG BASE44_BACKEND_URL=https://app.base44.com
ARG BASE44_BACKEND_HOST=app.base44.com
ENV BASE44_BACKEND_URL=${BASE44_BACKEND_URL} \
    BASE44_BACKEND_HOST=${BASE44_BACKEND_HOST}

COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
