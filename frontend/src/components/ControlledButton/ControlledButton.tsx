import { Button } from '@mui/material';

type ControlledButtonProps = {
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  color?: 'info' | 'warning' | 'success' | 'error';
  text: string;
};
function ControlledButton({
  variant,
  disabled,
  color,
  text,
}: ControlledButtonProps) {
  return (
    <Button
      variant={variant}
      disabled={disabled || false}
      size="large"
      color={color}
      style={{
        left: '60%',
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
