import fs from "fs";

export default function getProducts() {
    // the path to products.json shouldn't include '../' because in the Docker 
    // container, the current working directory is /app . Therefore,
    // the path to products.json is ./products.json
    let data = fs.readFileSync('./products.json').toString();
    data = JSON.parse(data);
    
    return data;
}