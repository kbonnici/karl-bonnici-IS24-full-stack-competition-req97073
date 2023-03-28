import express, { Express, Request, Response } from 'express';
import { exit } from 'process';
import getProduct from './product/getProduct';
import getProducts from './product/getProducts';

const app: Express = express();
const port = process.env.PORT;

if (!port) {
    console.error(
        '[server]: You must run this service through Docker. Try running docker compose up'
    );
    exit(1);
}

const BASE_URL = '/api';

app.get(`${BASE_URL}/health`, (req: Request, res: Response) => {
    res.send('Healthy!');
});

app.get(`${BASE_URL}/products`, (req: Request, res: Response) => {
    res.send(getProducts());
});

app.get(`${BASE_URL}/product/:product_id`, (req: Request, res: Response) => {
    const product_id = parseInt(req.params.product_id);
    const product = getProduct(product_id);

    if (!product) res.sendStatus(404).end();
    res.send(product);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
