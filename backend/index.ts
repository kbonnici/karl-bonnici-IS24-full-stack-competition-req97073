import express, {Express, Request, Response} from "express";
import { exit } from "process";

const app: Express = express();
const port = process.env.PORT;

if (!port) {
    console.error('[server]: You must run this service through Docker. Try running docker compose up')
    exit(1);
}

app.get('/', (req:Request, res:Response) => {
    res.send('Hello bar!')
})

app.listen(port, ()=> {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})