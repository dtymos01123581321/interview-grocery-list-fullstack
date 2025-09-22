# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

# копіюємо білд із попереднього етапу
COPY --from=builder /app/dist /usr/share/nginx/html

# копіюємо кастомний nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
