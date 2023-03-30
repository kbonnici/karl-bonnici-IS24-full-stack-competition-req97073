import { Button } from '@mui/material';

type ControlledButtonProps = {
  variant?: 'text' | 'outlined' | 'contained';
  disabled: boolean;
  text: string;
};
function ControlledButton({ variant, disabled, text }: ControlledButtonProps) {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      size="large"
      style={{
        left: '75%',
        position: 'relative',
        minWidth: '100px',
        marginRight: '10px',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      {text}
    </Button>
  );
}

export default ControlledButton;
