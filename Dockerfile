# Stage 1: Build Vue app dengan Vite
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency dan install
COPY package*.json ./
RUN npm install

# Copy seluruh project
COPY . .

# Build Vite project
RUN npm run build


# Stage 2: Serve dengan Nginx
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build
COPY --from=build /app/dist /usr/share/nginx/html

# (Opsional untuk history mode Vue Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
