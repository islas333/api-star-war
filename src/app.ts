import "dotenv/config"
import express from "express"
import cors from "cors"
import { router } from "./routers"
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3002
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(router)

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`))