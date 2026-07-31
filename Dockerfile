# Merrill Digital Systems — static site for Raspberry Pi (or any Linux).
# Stage 1 builds the Next.js static export; stage 2 serves it with nginx.

FROM node:22-alpine AS build
WORKDIR /app

# Install deps first so a content-only change reuses the cached layer.
COPY site/package.json site/package-lock.json ./
RUN npm ci

COPY site/ ./
RUN npm run build

# `next build` with output: 'export' writes the static site to /app/out
# and the postbuild step writes redirects-mds.conf up to the repo root.

FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
# Taken from the builder, not the host, so the rules always match the code
# that generated them.
COPY --from=build /app/redirects-mds.conf /etc/nginx/redirects-mds.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
