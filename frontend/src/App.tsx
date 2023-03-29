import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Hello World!</Typography>
    </Container>
  );
}

export default App;
