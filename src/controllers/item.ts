import { Request, Response } from "express";
import { handleHtpp } from "../utils/error.handle";

const getItem = (req: Request, res: Response) => {
    try {
        
    } catch (e) {
        handleHtpp(res, "ERROR get item")
    }
}

const getItems = (req: Request, res: Response) => {
    try {
        
    } catch (e) {
        handleHtpp(res, "ERROR get items")
    }
}

const postItem = ({ body }: Request, res: Response) => {
    try {
        res.send(body)
    } catch (e) {
        handleHtpp(res, "DELETE get item")
    }
}

const deleteItem = (req: Request, res: Response) => {
    try {
        
    } catch (e) {
        handleHtpp(res, "DELETE get item")
    }
}

const updateItem = (req: Request, res: Response) => {
    try {
        
    } catch (e) {
        handleHtpp(res, "UPDATE get item")
    }
}


export { getItem, getItems, postItem, deleteItem, updateItem }