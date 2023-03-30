import { Alert, AlertTitle } from '@mui/material';
import { SetStateAction } from 'react';

type ControlledAlertProps = {
  visible: boolean;
  setVisible: (visible: SetStateAction<boolean>) => void;
  text: string;
};

function ControlledAlert({ visible, setVisible, text }: ControlledAlertProps) {
  return visible ? (
    <Alert
      severity="error"
      onClose={() => setVisible(false)}
      style={{ maxWidth: '95%' }}
    >
      <AlertTitle>Error</AlertTitle>
      {text}
    </Alert>
  ) : (
    <></>
  );
}

export default ControlledAlert;
