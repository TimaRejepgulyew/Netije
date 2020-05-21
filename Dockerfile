# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
RUN apk add --update nodejs nodejs-npm
# COPY --from=build-stage /app/dist /usr/share/nginx/html
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

