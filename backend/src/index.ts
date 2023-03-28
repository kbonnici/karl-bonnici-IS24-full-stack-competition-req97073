import express, {Express, Request, Response} from "express";
import { exit } from "process";
import getProducts from "./getProducts";

const app: Express = express();
const port = process.env.PORT;

if (!port) {
    console.error('[server]: You must run this service through Docker. Try running docker compose up')
    exit(1);
}

const BASE_URL = '/api';

app.get(`${BASE_URL}/health`, (req:Request, res:Response) => {
    res.send('Healthy!')
})

app.get(`${BASE_URL}/products`, (req: Request, res: Response) => {
    res.send(getProducts());
})

app.listen(port, ()=> {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})