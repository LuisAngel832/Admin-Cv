# Etapa 1: Build Angular
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --output-path=dist

# Etapa 2: Servir en Apache
FROM httpd:alpine
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

