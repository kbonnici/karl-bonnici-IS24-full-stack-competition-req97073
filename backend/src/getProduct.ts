import getProducts from "./getProducts";
import { Product } from "./product";

export default function getProduct(id: number): Product | undefined {
    const products = getProducts();
    
    return products.find((product:Product)=> product.productId === id);
}