import { Button } from '@mui/material';

type ControlledButtonProps = {
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  color?: 'info' | 'warning' | 'success' | 'error';
  text: string;
  href?: string;
};
function ControlledButton({
  variant,
  disabled,
  color,
  text,
  href,
}: ControlledButtonProps) {
  return (
    <Button
      variant={variant}
      disabled={disabled || false}
      size="large"
      color={color}
      href={href}
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
