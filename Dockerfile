# Stage 1: Build Vite app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Nginx untuk serve hasil build
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy template env + entrypoint
COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
