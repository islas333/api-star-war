import { Request, Response, Router } from "express";
import { getItem, getItems, postItem, deleteItem, updateItem } from "../controllers/item";

const router = Router();

/**
 * http://localhost:3002/items
 */
router.get('/', getItem)
router.get('/:id', getItems)
router.post('/', postItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export { router };