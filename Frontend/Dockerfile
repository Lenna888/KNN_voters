# Usamos imagen ligera de Node
FROM node:18-alpine

WORKDIR /app

# Copiamos definiciones de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el código fuente
COPY . .

# Exponemos el puerto de Vite (por defecto 5173)
EXPOSE 5173

# Iniciamos el servidor de desarrollo.
CMD ["npm", "run", "dev", "--", "--host"]