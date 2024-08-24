import { Request, Response } from "express";
import { handleHtpp } from "../utils/error.handle";
import {
  getPersonajes,
  getPersonaje,
  descargarImagenes,
  busquedaPorParametro,
  login,
} from "../services/swapi";

const postLogin = async ({ body }: Request, res: Response) => {
  try {
    const { username, password } = body;
    if (!username) {
      return res.status(400).send({ error: "El usuario es requerido" });
    }
    if (!password) {
      return res.status(400).send({ error: "La contraseña es requerido" });
    }
    const token = await login(username, password);
    res.send({ token: token });
  } catch (error) {
    handleHtpp(res, "ERROR hacer login");
  }
}

const postPersonajes = async ({ body }: Request, res: Response) => {
  try {
    const { id } = body;

    // Validar que el id está presente
    if (!id) {
      return res.status(400).send({ error: "ID de pagina requerido" });
    }

    const dataPersonaje = await getPersonajes(id);
    res.send(dataPersonaje);
  } catch (e) {
    handleHtpp(res, "ERROR obtener lista de personajes");
  }
};

const postPersonaje = async ({ body }: Request, res: Response) => {
  try {
    const { id } = body;

    // Validar que el id está presente
    if (!id) {
      return res.status(400).send({ error: "ID es requerido" });
    }

    const dataPersonaje = await getPersonaje(id);
    res.send(dataPersonaje);
  } catch (e) {
    handleHtpp(res, "ERROR obtener personaje");
  }
};


/**
 * Metodo para descarguar las imagenes de la guia visual de star war
 */
const postDescargarPersonajes = async (req: Request, res: Response) => {
  try {
    const downloadPersonajes = await descargarImagenes();
    res.send(downloadPersonajes);
  } catch (e) {
    handleHtpp(res, "ERROR servicio de starwars-visualguide.com");
  }
};


const postSearch = async ({ body }: Request, res: Response) => {
  try {
    const { tipo, dato } = body;
    const resBusqueda = await busquedaPorParametro(tipo, dato);
    res.send({"results": resBusqueda, "tipo":tipo, "dato": dato});
  } catch (error) {
    handleHtpp(res, "ERROR búsqueda de personajes");
  }
};

export { postPersonajes, postDescargarPersonajes, postPersonaje, postSearch, postLogin };
