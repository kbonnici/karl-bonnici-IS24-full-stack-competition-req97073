import { Alert, AlertTitle } from '@mui/material';
import { SetStateAction } from 'react';

type LandingPageAlertProps = {
  visible: boolean;
  setVisible: (visible: SetStateAction<boolean>) => void;
};

function LandingPageAlert({ visible, setVisible }: LandingPageAlertProps) {
  return visible ? (
    <Alert severity="error" onClose={() => setVisible(false)}>
      <AlertTitle>Error</AlertTitle>
      Failed to fetch products!
    </Alert>
  ) : (
    <></>
  );
}

export default LandingPageAlert;
