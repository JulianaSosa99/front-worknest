# Usar una imagen de Node.js para construir el frontend
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente de React
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
