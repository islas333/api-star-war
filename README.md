# api-star-war

## Descripción

`api-star-war` es una API que proporciona información sobre personajes, naves espaciales y planetas del universo de Star Wars. Esta API está construida con Node.js y se ejecuta en un contenedor Docker.

## Características

- Obtener información detallada sobre personajes de Star Wars.
- Consultar datos sobre naves espaciales y planetas.
- Imágenes de personajes almacenadas en `/app/src/static/imagenes-personajes`.

## Requisitos

- Node.js (versión 14 o superior)
- Docker
- Docker Compose

# Rutas de API

| endpoint | Descripcion |
|----------|----------|
| /login  | Hacer login de para obtener el token  |
| /people   | Lista de todos los personajes de la pagina 1  |
| /search   | Buscar personajes: [ Nombre - Color de Cabello - Planeta de origen - Genero ] |


# Ejecutar en local

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/api-star-war.git
    cd api-star-war
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Correr ambiente de Desarrollo:

    ```sh
    npm run dev
    ```

# Ejecutar con Docker

1. Construye la imagen de Docker:

  ```sh
  docker build . -t node-api-star-war:latest
  ```

2. Ejecuta el contenedor en modo dev:

  ```sh
  docker run -d -p 3002:3002 \
  -v "{ruta_local}:/usr/src/app" \
  --name mi-api-ts node-api-star-war npm run dev
  ```

3. Ejecuta el contenedor en modo produccion:

  ```sh
  docker run -d -p 3002:3002 \
  -v "{ruta_local}:/usr/src/app" \
  --name mi-api-ts node-api-star-war npm run start
  ```

La API estará disponible en http://localhost:3002

### HIR 2024