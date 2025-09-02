# Stage 1: Build Vue app
FROM node:16-alpine AS build
WORKDIR /app

# Tambahkan dependency yang kadang dibutuhkan (node-gyp, sass, dll)
RUN apk add --no-cache python3 make g++ 

# Copy file dependency dan install
COPY package*.json ./
RUN npm install

# Copy seluruh project
COPY . .

# Build Vue app
RUN npm run build


# Stage 2: Serve hasil build dengan Nginx
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build dari stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# (Opsional) Copy config untuk routing Vue history mode
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
