import { Typography } from '@mui/material';

type EditProductProps = {
  productId: string | undefined;
};
function EditProduct(props: EditProductProps) {
  if (!props.productId) return <div>undefined product id</div>;

  const productId = parseInt(props.productId);

  if (isNaN(productId)) return <div>oh no!</div>;
  return <Typography variant="h3">Edit Product</Typography>;
}

export default EditProduct;
