import { FormControl, Input } from '@mui/material';
import React, { SetStateAction } from 'react';

type TextFieldProps = {
  value: string;
  setValue: (v: SetStateAction<string>) => void;
  placeholder?: string;
  required?: boolean;
};
function TextField({ placeholder, required, value, setValue }: TextFieldProps) {
  return (
    <FormControl required={required || false} style={{ marginBottom: '20px' }}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
}

export default TextField;
