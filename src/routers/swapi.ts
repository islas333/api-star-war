import { Request, Response, Router } from "express";
import { postPersonajes, postDescargarPersonajes, postPersonaje, postSearch, postLogin } from "../controllers/swapi";
import { verifyToken } from "../controllers/authMiddleware";

const router = Router();

router.post('/login', postLogin);
router.post('/', verifyToken, postPersonajes)
router.post('/people', verifyToken, postPersonajes)
router.post('/personaje', verifyToken, postPersonaje);
router.post('/search', verifyToken, postSearch);
router.post('/download', postDescargarPersonajes)

export { router };