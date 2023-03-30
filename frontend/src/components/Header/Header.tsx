import { Typography } from '@mui/material';

function Header({ text }: { text: string }) {
  return (
    <Typography
      style={{ marginBottom: '50px', marginTop: '50px' }}
      variant="h4"
    >
      {text}
    </Typography>
  );
}

export default Header;
