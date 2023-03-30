import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CreateProduct from './components/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import LandingPage from './components/LandingPage/LandingPage';
import NotFound from './components/NotFound/NotFound';

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
    <Container maxWidth="md">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route
          path="/edit/:product_id"
          element={<EditProduct productId={productId || 'NaN'} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
