import { Response } from "express";

const handleHtpp = (res:Response, error: string) => {
    res.status(500);
    res.send({ error });
}

export { handleHtpp };