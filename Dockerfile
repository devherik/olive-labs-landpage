# -------------------- Build Environment --------------------

FROM node:20-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

ARG MODE=production

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --production=false

COPY . .

RUN npm run build

# -------------------- Runtime Environment --------------------

FROM nginxinc/nginx-unprivileged:1.27-alpine-slim AS production

USER root

RUN apk add --no-cache curl

COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Run as non-root user provided by the unprivileged image
USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]