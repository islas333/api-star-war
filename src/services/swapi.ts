import {
  Personajes,
  Personaje,
  Pelicula,
  ParametroBusqueda,
} from "../interfaces/swapi.interface";
import axios from "axios";
import fs from "fs-extra";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (username: string, password: string) => {
  const user = {
    username: username,
    password: password,
  };

  if (user.username !== "admin" || user.password !== "admin") {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const token = jwt.sign(
    { id: user.username },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "3m",
    }
  );
  return token;
};

/**
 *
 * @returns Lista personajes
 */
const getPersonajes = async (id = 1) => {
  const url = `https://swapi.dev/api/people/?page=${id}`;
  const response = await axios.get<Personajes>(url);
  const personajes = response.data;

  for (const personaje of personajes.results) {
    // Extraer el valor entre las últimas dos barras `/`
    const urlParts = personaje.url.split("/");
    const id = urlParts[urlParts.length - 2]; // Penúltimo elemento es el ID

    // Agregar el id como id_personaje
    personaje.id_personaje = id;

    try {
      const imgBase64 = await convertirBase64(id);
      personaje.img = imgBase64 || "";
      personaje.homeworld = await getPlaneta(personaje.homeworld);
      personaje.peliculas = await getPeliculas(personaje.films);
    } catch (error) {
      console.error("Error al convertir la imagen a base64:", error);
      personaje.img = "";
    }
  }

  return personajes;
};

/**
 *
 * @returns Lista personajes search
 */
const getPersonajesSearch = async (response: any) => {
  const personajes = response.data;

  for (const personaje of personajes.results) {
    // Extraer el valor entre las últimas dos barras `/`
    const urlParts = personaje.url.split("/");
    const id = urlParts[urlParts.length - 2]; // Penúltimo elemento es el ID

    // Agregar el id como id_personaje
    personaje.id_personaje = id;

    try {
      const imgBase64 = await convertirBase64(id);
      personaje.img = imgBase64 || "";
      personaje.homeworld = await getPlaneta(personaje.homeworld);
      personaje.peliculas = await getPeliculas(personaje.films);
    } catch (error) {
      console.error("Error al convertir la imagen a base64:", error);
      personaje.img = "";
    }
  }

  return personajes;
};

/**
 *
 * @returns Personaje
 */
const getPersonaje = async (id: string) => {
  const url = `https://swapi.dev/api/people/${id}`;
  const response = await axios.get<Personaje>(url);
  const personaje = response.data;

  // Construir la ruta de la imagen
  const rutaImagen = path.resolve(
    "/app",
    "src",
    "static",
    "imagenes-personajes",
    `${id}.jpg`
  );

  console.log("--------------");
  console.log(rutaImagen);

  // Leer la imagen y convertirla a base64
  let imagenBase64 = "";
  let planeta = "";
  let films = "";
  try {
    const imagenBuffer = await fs.readFile(rutaImagen);
    imagenBase64 = imagenBuffer.toString("base64");
    planeta = await getPlaneta(personaje.homeworld);
    films = await getPeliculas(personaje.films);
  } catch (error) {
    console.error("Error al leer la imagen:", error);
  }

  return {
    ...personaje,
    img: imagenBase64,
    homeworld: planeta,
    films: films,
  };
};

/**
 *
 * @param id
 * @returns
 */
const convertirBase64 = async (id: string): Promise<string | undefined> => {
  // Construir la ruta de la imagen
  const rutaImagen = path.resolve(
    "/app",
    "src",
    "static",
    "imagenes-personajes",
    `${id}.jpg`
  );

  // Leer la imagen y convertirla a base64
  let imagenBase64 = "";

  try {
    const imagenBuffer = await fs.readFile(rutaImagen);
    imagenBase64 = imagenBuffer.toString("base64");
    return imagenBase64;
  } catch (error) {
    console.error("Error al leer la imagen:", error);
    return undefined;
  }
};

/**
 *
 * @returns Planeta
 */
const getPlaneta = async (url: string) => {
  const response = await axios.get<any>(url);
  const planeta = response.data;
  try {
    return planeta.name;
  } catch (error) {
    console.error("Error al leer planeta:", error);
  }
};

/**
 *
 * @returns Peliculas
 */
const getPeliculas = async (lista: string[]): Promise<string> => {
  //   return "Regresar peliculas";
  try {
    // Array to hold the names of the movies
    const nombresPeliculas: string[] = [];

    // Loop through each URL in the list and get the movie name
    for (const url of lista) {
      const response = await axios.get<{ title: string }>(url);
      nombresPeliculas.push(response.data.title);
    }

    // Join all movie names into a single string separated by commas
    return nombresPeliculas.join(", ");
  } catch (error) {
    console.error("Error al obtener los nombres de las películas:", error);
    return ""; // Return an empty string in case of error
  }
};

/**
 * Metodo para obtener todos los personajes de swapi
 * @returns
 */
const obtenerPersonajes = async (url: string) => {
  const response = await axios.get<Personajes>(`${url}`);

  const personajes = response.data;
  for (const personaje of personajes.results) {
    const urlParts = personaje.url.split("/");
    const id = urlParts[urlParts.length - 2]; // Penúltimo elemento es el ID
    personaje.id_personaje = id;
    const imgBase64 = await convertirBase64(id);
    personaje.img = imgBase64 || "";
    // personaje.homeworld = await getPlaneta(personaje.homeworld);
    // personaje.peliculas = await getPeliculas(personaje.films);
    personaje.homeworld =
      "Consumo exesivo de recursos, se comento para evitar consulta de API swapi";
    personaje.peliculas =
      "Consumo exesivo de recursos, se comento para evitar consulta de API swapi";
  }
  return response.data;
};

/**
 * Metodo para obtener todos los IDs personajes de swapi
 * @returns
 */
const obtenerIdPersonaje = (url: string): number => {
  const segments = url.split("/");
  return parseInt(segments[segments.length - 2], 10);
};

/**
 * Metodo para obtener la imagen personaje de swapi
 * @returns
 */
const obtenerImagenPersonaje = (id: number): string => {
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};

/**
 * Metodo para almacenar la imagen personaje de swapi
 * @returns
 */
const guardarImagen = async (
  url: string,
  outputPath: string
): Promise<void> => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  await fs.outputFile(outputPath, response.data);
};

/**
 * Metodo y servicio para descargar personajes de starwars-visualguide
 * @returns
 */
const descargarImagenes = async (
  url: string = "https://swapi.dev/api/people/?page=1"
) => {
  try {
    const obtenerIdPersonajes = await obtenerPersonajes(url);
    const carpetaImagenes = path.resolve(
      "/app",
      "src",
      "static",
      "imagenes-personajes"
    );

    // Si no existe la carpeta la crea
    await fs.ensureDir(carpetaImagenes);

    const totalPersonajes = obtenerIdPersonajes.results.length;

    if (totalPersonajes) {
      for (const personaje of obtenerIdPersonajes.results) {
        const idPersonaje = obtenerIdPersonaje(personaje.url);
        const urlImagen = obtenerImagenPersonaje(idPersonaje);
        const nombreArchivo = `${idPersonaje}.jpg`;
        const rutaArchivo = path.join(carpetaImagenes, nombreArchivo);

        // Verificar si el archivo ya existe
        if (await fs.pathExists(rutaArchivo)) {
          console.log(
            `El archivo ${nombreArchivo} ya existe. Saltando descarga...`
          );
          continue;
        }

        console.log(`Descargando ${nombreArchivo}...`);
        await guardarImagen(urlImagen, rutaArchivo);
        console.log(`Imagen guardada en: ${rutaArchivo}`);
      }
      if (obtenerIdPersonajes.next !== null) {
        descargarImagenes(obtenerIdPersonajes.next);
      }
    }
  } catch (error) {
    console.error("Error al descargar las imágenes:", error);
  }
};

/**
 *
 * @returns lista de personajes
 */
const busquedaPorParametro = async (tipo: string, dato: string) => {
  try {
    const url = "https://swapi.dev/api/people/?page=";
    const parametroBusqueda = tipo;
    let nombre = dato;

    if (tipo === "gender") {
      if (/^mas(cu)?(lino)?$/i.test(dato)) {
        nombre = "male";
      } else if (/^fe(m(e)?)?(nino)?$/i.test(dato)) {
        nombre = "female";
      } else if (/^her(ma)?(phrodite)?$/i.test(dato)) {
        nombre = "hermaphrodite";
      }
    }

    if (tipo === "hair_color") {
      const hairColorMap: { [key: string]: string } = {
        Rubio: "blond",
        Negro: "black",
        Cafe: "brown",
        Rojo: "red",
        Gris: "gray",
        Blanco: "white",
        Desconocido: "n/a",
      };
      nombre = hairColorMap[dato] || dato;
    }

    let personajesEncontrados: Personaje[] = [];

    for (let index = 1; index < 10; index++) {
      const consulta = await obtenerPersonajes(url + index);
      const results = consulta.results;

      personajesEncontrados = personajesEncontrados.concat(
        buscarPorParametro(nombre, parametroBusqueda, results)
      );
    }

    return personajesEncontrados;
  } catch (error) {
    console.error("Error en la busqueda por parametro:", error);
  }
};

// Función de búsqueda por parámetro
/**
 *
 * @param searchParameter
 * @param parametroBusqueda
 * @param data
 * @return lista de personajes
 */
const buscarPorParametro = (
  searchParameter: string,
  parametroBusqueda: string,
  data: Personaje[]
): Personaje[] => {
  const regex = new RegExp(searchParameter, "i");
  return data.filter((personaje) => {
    switch (parametroBusqueda) {
      case "name":
        return regex.test(personaje.name);
      case "gender":
        return regex.test(personaje.gender);
      case "homeworld":
        return regex.test(personaje.homeworld);
      case "hair_color":
        return regex.test(personaje.hair_color);
      default:
        return [];
    }
  });
};

export {
  login,
  getPersonajes,
  getPersonaje,
  descargarImagenes,
  busquedaPorParametro,
  getPersonajesSearch,
};
