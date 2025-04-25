# Etapa 1: construir Angular
FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist

# Etapa 2: servidor Apache
FROM httpd:alpine
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
