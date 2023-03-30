import { GridRowProduct, Product } from './types';

export default function appendRowIdToProduct(
  products: Product[]
): GridRowProduct[] {
  const rowData: GridRowProduct[] = [];
  for (let i = 0; i < products.length; i++) {
    rowData.push({
      id: i,
      ...products[i],
    });
  }

  return rowData;
}
