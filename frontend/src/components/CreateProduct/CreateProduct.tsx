import { Container, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControlledAlert from '../ControlledAlert/ControlledAlert';
import Header from '../Header/Header';
import ProductForm from '../ProductForm/ProductForm';

const createProduct = async (
  productName: string,
  productOwner: string,
  developers: string,
  startDate: string,
  scrumMasterName: string,
  methodology: string
) => {
  const response = await fetch(`http://localhost:80/api/products`, {
    method: 'POST',
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

function CreateProduct() {
  // product information
  const [productName, setProductName] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [developers, setDevelopers] = useState('');
  const [scrumMasterName, setScrumMasterName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [methodology, setMethodology] = useState('');
  const navigate = useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleCreate = async () => {
    try {
      const response = await createProduct(
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
      setAlertText('Failed to create product');
      setAlertVisible(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Header text={'Create Product'} />
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
          onClick={handleCreate}
        >
          Create Product
        </Button>

        <Button variant="outlined" href="/">
          Go Back
        </Button>
      </div>
    </Container>
  );
}

export default CreateProduct;
