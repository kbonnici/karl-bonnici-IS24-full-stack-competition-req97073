import { Product } from './product/product';

function generateEmployeeName(): string {
    return `employee_${Math.round(Math.random() * 500)}`;
}

export default function generateData(numProducts: number) {
    const data: Product[] = [];

    for (let i = 0; i < numProducts; i++) {
        data.push({
            productId: Math.round(Math.random() * 10000),
            productName: `product_${Math.round(Math.random() * 100)}`,
            productOwnerName: generateEmployeeName(),
            developers: [
                generateEmployeeName(),
                generateEmployeeName(),
                generateEmployeeName(),
            ],
            scrumMasterName: generateEmployeeName(),
            startDate: `2023/${Math.ceil(Math.random() * 12)
                .toString()
                .padStart(2, '0')}/${Math.ceil(Math.random() * 31)
                .toString()
                .padStart(2, '0')}`,
            methodology: Math.round(Math.random()) ? 'agile' : 'waterfall',
        });
    }

    return data;
}
