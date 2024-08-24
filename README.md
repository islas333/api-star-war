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

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/api-star-war.git
    cd api-star-war
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```


## Ejecutar con Docker

1. Construye la imagen de Docker:

  ```sh
  docker build -t api-star-war .
  ```

1. Ejecuta el contenedor:

  ```sh
  docker run -p 3005:3002 api-star-war
  ```

La API estará disponible en http://localhost:3002

## Uso

### Ejecutar en Local

Para ejecutar la API en tu máquina local:

  ```sh
  npm start
  ```
