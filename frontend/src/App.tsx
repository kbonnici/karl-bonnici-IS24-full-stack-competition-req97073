import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import EditProduct from './components/EditProduct';
import LandingPage from './components/LandingPage';

function App() {
  const location = useLocation();
  const [productId, setProductId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (location.pathname.includes('/edit/')) {
      const urlParts = location.pathname.split('/');
      const pId = urlParts[2];

      if (pId.length) setProductId(pId);
      else setProductId(undefined);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/edit/:product_id"
          element={<EditProduct productId={productId} />}
        />
      </Routes>
    </Container>
  );
}

export default App;
