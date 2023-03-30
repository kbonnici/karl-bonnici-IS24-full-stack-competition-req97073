import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../utils/types';
import ControlledAlert from '../ControlledAlert/ControlledAlert';
import Header from '../Header/Header';
import ProductForm from '../ProductForm/ProductForm';

const updateProduct = async (
  productId: string,
  productName: string,
  productOwner: string,
  developers: string,
  startDate: string,
  scrumMasterName: string,
  methodology: string
) => {
  const response = await fetch(`http://localhost:80/api/product/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productName,
      productOwnerName: productOwner,
      developers,
      startDate,
      scrumMasterName,
      methodology,
    }),
  });

  return response;
};

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
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await updateProduct(
        productId.toString(),
        productName,
        productOwner,
        developers,
        startDate,
        scrumMasterName,
        methodology
      );

      if (!response.ok) {
        setAlertText(JSON.stringify(await response.json()));
        setAlertVisible(true);
      } else {
        // navigate back to landing page
        navigate('/');
      }
    } catch {
      setAlertText('Failed to save changes');
      setAlertVisible(true);
    }
  };

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

      <div style={{ marginTop: '10px' }}>
        <Button
          variant="contained"
          style={{ marginRight: '10px' }}
          onClick={handleSave}
        >
          Save Changes
        </Button>

        <Button variant="outlined" href="/">
          Go Back
        </Button>
      </div>
    </Container>
  );
}

export default EditProduct;
