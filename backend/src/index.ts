import express, { Express, Request, Response } from 'express';
import { exit } from 'process';
import createProduct from './product/createProduct';
import deleteProduct from './product/deleteProduct';
import getProduct from './product/getProduct';
import getProducts from './product/getProducts';
import { Product, ProductDetails } from './product/product';
import updateProduct from './product/updateProduct';
import { validateAndConvert } from './validateAndConvert';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    else res.send(product);
});

app.post<{}, Product, ProductDetails, {}, {}>(
    `${BASE_URL}/products`,
    async (req: Request, res: Response) => {
        const conversionResult = await validateAndConvert(
            ProductDetails,
            req.body
        );

        if (conversionResult.error) {
            res.status(400).send(conversionResult.error).end();
            return;
        }

        const productDetails = conversionResult.data;
        const productId = createProduct(productDetails);
        res.json({ productId });
    }
);

app.put(
    `${BASE_URL}/product/:product_id`,
    async (req: Request, res: Response) => {
        const conversionResult = await validateAndConvert(
            ProductDetails,
            req.body
        );

        if (conversionResult.error) {
            res.status(400).send(conversionResult.error).end();
            return;
        }

        const productDetails = conversionResult.data;
        const productId = updateProduct(
            parseInt(req.params.product_id),
            productDetails
        );

        if (productId === undefined)
            res.status(400)
                .send({ errors: ['product not found'] })
                .end();
        else res.json({ productId });
    }
);

app.delete(`${BASE_URL}/product/:product_id`, (req: Request, res: Response) => {
    const productId = parseInt(req.params.product_id);

    const deletedProductId = deleteProduct(productId);
    if (deletedProductId !== productId)
        res.status(400)
            .send({ errors: ['product not found'] })
            .end();
    else res.json({ productId });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
