import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SetStateAction } from 'react';

type MethodologySelectProps = {
  value: string;
  setValue: (v: SetStateAction<string>) => void;
};
function MethodologySelect({ value, setValue }: MethodologySelectProps) {
  return (
    <FormControl>
      <InputLabel>Methodology</InputLabel>
      <Select
        value={value}
        label="Methodology"
        onChange={(e) => setValue(e.target.value)}
      >
        <MenuItem value="agile">Agile</MenuItem>
        <MenuItem value="waterfall">Waterfall</MenuItem>
      </Select>
    </FormControl>
  );
}

export default MethodologySelect;
