import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { handleHtpp } from "../utils/error.handle";

const secretKey = process.env.JWT_SECRET || 'secret';

const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const timeout = setTimeout(() => {
      handleHtpp(res, "Tiempo de espera excedido");
    }, 10000); // 10 segundos

    try {
      let token = req.headers.authorization;

      if (!token) {
        clearTimeout(timeout);
        handleHtpp(res, "Token no proporcionado");
      }

      if (token && !token.startsWith("Bearer ")) {
        clearTimeout(timeout);
        return handleHtpp(res, "Token no válido");
      }

      if (token) {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, secretKey) as JwtPayload;;

        if (!decoded) {
          clearTimeout(timeout);
          return handleHtpp(res, "Token no válido");
        }

        clearTimeout(timeout);
        next();
      }
    } catch (e) {
      clearTimeout(timeout);
      handleHtpp(res, `ERROR: ${e}`);
    }
  }
);

export { verifyToken };
