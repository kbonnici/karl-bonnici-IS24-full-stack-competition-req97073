import getProducts from './getProducts';
import { Product, ProductDetails } from './product';
import fs from 'fs';
import getProduct from './getProduct';

export default function createProduct(details: ProductDetails): number {
    let productId = Math.round(Math.random() * 10000);
    // ensure there isnt a conflict
    while (getProduct(productId)) productId = Math.round(Math.random() * 10000);

    const product: Product = {
        productId,
        ...details,
    };

    const products = getProducts();
    products.push(product);

    fs.writeFileSync('products.json', JSON.stringify(products));

    return product.productId;
}
