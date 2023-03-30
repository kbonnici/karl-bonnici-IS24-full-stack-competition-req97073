import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import ControlledAlert from '../ControlledAlert/ControlledAlert';
import Header from '../Header/Header';

type EditProductProps = {
  productId?: string;
};
function EditProduct(props: EditProductProps) {
  if (!props.productId) return <Typography>Undefined product ID</Typography>;

  const productId = parseInt(props.productId);
  if (isNaN(productId)) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">Invalid Product ID</Typography>
        <Button variant="contained" style={{ marginTop: '10px' }} href="/">
          Return to Landing Page
        </Button>
      </Container>
    );
  }

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');

  useEffect(() => {
    const getProduct = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:80/api/product/${id}`);
        const data: any = await response.json();

        if (data.errors) {
          setAlertVisible(true);
          setAlertText(data.errors.toString());
        }
      } catch {
        setAlertVisible(true);
      }
    };

    getProduct(productId).catch(console.error);
  }, []);

  return (
    <Container maxWidth="sm">
      <Header text={'Edit Product'} />
      <ControlledAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        text={alertText}
      />
    </Container>
  );
}

export default EditProduct;
