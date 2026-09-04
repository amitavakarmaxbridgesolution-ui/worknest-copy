# syntax=docker/dockerfile:1

# ---------- Stage 1: build the WorkNest frontend (Vite/React) ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Stage 2: serve the built bundle with nginx ----------
FROM nginx:1.27-alpine
LABEL org.opencontainers.image.title="WorkNest application"
LABEL org.opencontainers.image.description="WorkNest HR & workforce management platform (Base44 export)"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
