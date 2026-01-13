# build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Receive VITE envs from build args (used at build time)
ARG VITE_API_BASE
ARG VITE_UPLOADS_BASE
ARG VITE_SITE_BASE
ENV VITE_API_BASE=$VITE_API_BASE \
    VITE_UPLOADS_BASE=$VITE_UPLOADS_BASE \
    VITE_SITE_BASE=$VITE_SITE_BASE

# Build the app
RUN npm run build

## production stage with nginx
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Create nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]