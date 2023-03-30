import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Product } from '../../utils/types';
import ControlledAlert from '../ControlledAlert/ControlledAlert';
import Header from '../Header/Header';
import ProductForm from '../ProductForm/ProductForm';

type EditProductProps = {
  productId: string;
};
function EditProduct(props: EditProductProps) {
  const productId = parseInt(props.productId);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');

  // product information
  const [productName, setProductName] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [developers, setDevelopers] = useState('');
  const [scrumMasterName, setScrumMasterName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [methodology, setMethodology] = useState('');

  useEffect(() => {
    const getProduct = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:80/api/product/${id}`);
        const data: { errors: string[] } | Product = await response.json();

        if ('errors' in data) {
          setAlertVisible(true);
          setAlertText(data.errors.toString());
        } else {
          setProductName(data.productName);
          setProductOwner(data.productOwnerName);
          setDevelopers(data.developers.toString());
          setScrumMasterName(data.scrumMasterName);
          setStartDate(data.startDate);
          setMethodology(data.methodology);
        }
      } catch {
        setAlertVisible(true);
      }
    };

    if (productId) {
      getProduct(productId).catch(console.error);
    }
  }, [productId]);

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

  return (
    <Container maxWidth="sm">
      <Header text={'Edit Product'} />
      <ControlledAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        text={alertText}
      />

      <ProductForm
        productName={productName}
        setProductName={setProductName}
        productOwner={productOwner}
        setProductOwner={setProductOwner}
        developers={developers}
        setDevelopers={setDevelopers}
        scrumMasterName={scrumMasterName}
        setScrumMasterName={setScrumMasterName}
        startDate={startDate}
        setStartDate={setStartDate}
        methodology={methodology}
        setMethodology={setMethodology}
      />
    </Container>
  );
}

export default EditProduct;
