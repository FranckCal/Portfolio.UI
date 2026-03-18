# Build stage - Angular
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build Angular pour production
RUN npm run build -- --configuration production

# Runtime stage - Nginx
FROM nginx:alpine
WORKDIR /etc/nginx

# Copier la config Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers build Angular
COPY --from=build /app/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
