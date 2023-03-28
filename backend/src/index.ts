import express, {Express, Request, Response} from "express";
import { exit } from "process";
import fs from "fs";

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
    // the path to products.json shouldn't include '../' because in the Docker 
    // container, the current working directory is /app . Therefore,
    // the path to products.json is ./products.json
    let data = fs.readFileSync('./products.json').toString();
    data = JSON.parse(data);
    
    res.send(data);
})

app.listen(port, ()=> {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})