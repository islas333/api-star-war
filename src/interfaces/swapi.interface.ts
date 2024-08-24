interface User {
  id: number;
  username: string;
  password: string;
}

interface Personajes {
  count: number;
  next: string | null;
  previous: string | null;
  detail: string;
  results: Personaje[];
}

interface Personaje {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  peliculas: string;
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
  img: string;
  id_personaje: string;
}

interface Pelicula {
  title: string;
  [key: string]: any; // Para manejar cualquier otra propiedad que pueda tener el objeto
}

interface ParametroBusqueda {
  clave: keyof Personaje;
}

export { User, Personajes, Personaje, Pelicula, ParametroBusqueda };
