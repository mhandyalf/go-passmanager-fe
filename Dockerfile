# Stage 1: Build Vue app
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files dan install
COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

# Build aplikasi Vue (hasilnya ke folder dist)
RUN npm run build


# Stage 2: Serve dengan Nginx
FROM nginx:stable-alpine
# Hapus default config nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build Vue ke folder html Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (opsional, kalau butuh SPA mode / history mode routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
