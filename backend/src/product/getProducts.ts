import fs from 'fs';
import { Product } from './product';

export default function getProducts(): Product[] {
    // the path to products.json shouldn't include '../' because in the Docker
    // container, the current working directory is /app . Therefore,
    // the path to products.json is ./products.json
    let dataString = fs.readFileSync('./products.json').toString();
    const data: Product[] = JSON.parse(dataString);

    return data;
}
