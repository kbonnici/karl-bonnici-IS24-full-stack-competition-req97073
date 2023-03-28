import getProduct from './getProduct';
import { Product, ProductDetails } from './product';
import fs from 'fs';
import getProducts from './getProducts';

export default function updateProduct(
    productId: number,
    productDetails: ProductDetails
): number | undefined {
    let product = getProduct(productId);

    if (!product) return undefined;

    const updatedProduct: Product = { productId, ...productDetails };

    const products = getProducts();
    const productIdx = products.findIndex(
        (p: Product) => p.productId === productId
    );
    products[productIdx] = { ...updatedProduct };

    fs.writeFileSync('./products.json', JSON.stringify(products));

    return productId;
}
