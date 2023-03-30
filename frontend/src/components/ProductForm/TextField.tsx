import { FormControl, Input } from '@mui/material';
import { SetStateAction } from 'react';

type TextFieldProps = {
  value: string;
  setValue: (v: SetStateAction<string>) => void;
  placeholder?: string;
};
function TextField({ placeholder, value, setValue }: TextFieldProps) {
  return (
    <FormControl required={true} style={{ marginBottom: '20px' }}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
}

export default TextField;
