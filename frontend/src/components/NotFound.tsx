import { Button, Link, Typography } from '@mui/material';
import { Container } from '@mui/system';

function NotFound() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Oops! Page not found :(</Typography>
      <Button href="/" variant="contained">
        Return to Landing Page
      </Button>
    </Container>
  );
}

export default NotFound;
