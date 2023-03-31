import express, { Express, Request, Response } from 'express';
import { exit } from 'process';
import createProduct from './product/createProduct';
import deleteProduct from './product/deleteProduct';
import getProduct from './product/getProduct';
import getProducts from './product/getProducts';
import { Product, ProductDetails } from './product/product';
import updateProduct from './product/updateProduct';
import { validateAndConvert } from './validateAndConvert';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT;
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Product Management App',
        version: '1.0.0',
    },
    servers: [
        { url: `http://localhost:${port}/api`, description: 'API Server' },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/index.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const corsOptions: cors.CorsOptions = {
    // only allow my frontend to call this backend api
    origin: 'http://localhost:5173',
};

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (!port) {
    console.error(
        '[server]: You must run this service through Docker. Try running docker compose up'
    );
    exit(1);
}

const BASE_URL = '/api';

/**
 * @swagger
 * components:
 *  schemas:
 *      Errors:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  minLength:
 *                      type: string
 *                  matches:
 *                      type: string
 *                  isString:
 *                      type: string
 *                  isDefined:
 *                      type: string
 *      NewProduct:
 *          type: object
 *          properties:
 *              productName:
 *                  type: string
 *                  description: The name of the product.
 *                  example: "myProduct"
 *              productOwnerName:
 *                  type: string
 *                  description: The name of the owner of the product.
 *                  example: "Karl"
 *              developers:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: A list of developers working on the product.
 *                  example: ["Karl", "Emerald"]
 *              scrumMasterName:
 *                  type: string
 *                  description: The name of the scrum master for the product.
 *                  example: "Karl"
 *              startDate:
 *                  type: string
 *                  description: The Date the product started development
 *                  example: "2023/01/31"
 *              methodology:
 *                  type: string
 *                  description: The methodology the product is using. Can only be `"agile"` or `"waterfall"`.
 *                  example: "agile"
 *      Product:
 *          allOf:
 *              -   type: object
 *                  properties:
 *                      productId:
 *                          type: number
 *                          description: The Product ID.
 *                          example: 1897
 *              -   $ref: '#/components/schemas/NewProduct'
 */

/**
 * @swagger
 * /health:
 *  get:
 *      summary: Check API health
 *      description: Check if API is up and running as expected.
 *      responses:
 *          200:
 *              description: Whether or not the API is healthy.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              health:
 *                                  type: string
 *                                  description: The health of the API.
 *                                  example: healthy!
 */
app.get(`${BASE_URL}/health`, (req: Request, res: Response) => {
    res.json({ health: 'healthy!' });
});

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Get a list of all products
 *      description: Returns a list of all products in the `products.json` file
 *      responses:
 *          200:
 *              description: Returns a list of all products in the `products.json` file.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
app.get(`${BASE_URL}/products`, (req: Request, res: Response) => {
    res.send(getProducts());
});

/**
 * @swagger
 * /product/{product_id}:
 *  get:
 *      summary: Retrieve a single product.
 *      description: Retrieves a single product from `products.json`.
 *      parameters:
 *          - in: path
 *            name: product_id
 *            schema:
 *              type: number
 *            required: true
 *            description: Numeric ID of the product.
 *      responses:
 *          200:
 *              description: A single product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Product'
 */
app.get(`${BASE_URL}/product/:product_id`, (req: Request, res: Response) => {
    const productId = parseInt(req.params.product_id);
    const product = getProduct(productId);

    if (!product)
        res.status(404).send({ errors: [`product ${productId} not found`] });
    else res.send(product);
});

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Creates a new product
 *      description: Creates a new product in `products.json`
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewProduct'
 *      responses:
 *          201:
 *              description: Product created successfuly.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              productId:
 *                                  type: number
 *          400:
 *              description: Bad request. Invalid request body.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          $ref: '#/components/schemas/Errors'
 */
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
        res.status(201).json({ productId });
    }
);

// enable pre-flight OPTIONS request for cors to work
app.options(`${BASE_URL}/product/:product_id`);
/**
 * @swagger
 * /product/{product_id}:
 *  put:
 *      summary: Update a single product.
 *      description: Updates a new product in `products.json`
 *      parameters:
 *          - in: path
 *            name: product_id
 *            schema:
 *              type: number
 *            required: true
 *            description: Numeric ID of the product.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewProduct'
 *      responses:
 *          200:
 *              description: Product updated successfuly.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              productId:
 *                                  type: number
 *          400:
 *              description: Bad request. Invalid request body.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          $ref: '#/components/schemas/Errors'
 */
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
                .send({ errors: [`product ${productId} not found`] })
                .end();
        else res.json({ productId });
    }
);

// enable pre-flight OPTIONS request for cors to work
app.options(`${BASE_URL}/product/:product_id`);
/**
 * @swagger
 * /product/{product_id}:
 *  delete:
 *      summary: Delete a single product.
 *      description: Deletes a single product from `products.json`.
 *      parameters:
 *          - in: path
 *            name: product_id
 *            schema:
 *              type: number
 *            required: true
 *            description: Numeric ID of the product.
 *      responses:
 *          200:
 *              description: A single product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Invalid Request. Product not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Errors'
 */
app.delete(`${BASE_URL}/product/:product_id`, (req: Request, res: Response) => {
    const productId = parseInt(req.params.product_id);

    const deletedProductId = deleteProduct(productId);
    if (deletedProductId !== productId)
        res.status(400)
            .send({ errors: [`product ${productId} not found`] })
            .end();
    else res.json({ productId });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
