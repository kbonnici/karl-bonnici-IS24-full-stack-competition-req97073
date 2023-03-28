import getProducts from './getProducts';
import { Product } from './product';
import fs from 'fs';

export default function deleteProduct(id: number): number | undefined {
    const products = getProducts();

    const productIdx = products.findIndex((p: Product) => p.productId === id);
    if (productIdx < 0) return undefined;

    products.splice(productIdx);

    fs.writeFileSync('./products.json', JSON.stringify(products));

    return id;
}
