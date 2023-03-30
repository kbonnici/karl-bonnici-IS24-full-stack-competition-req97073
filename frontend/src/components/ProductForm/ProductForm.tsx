import { FormGroup } from '@mui/material';
import { useState } from 'react';
import MethodologySelect from './MethodologySelect';
import TextField from './TextField';

function ProductForm() {
  const [value, setValue] = useState('');
  const [methodology, setMethodology] = useState('');

  return (
    <FormGroup>
      <TextField placeholder="Product Name" value={value} setValue={setValue} />

      <TextField
        placeholder="Product Owner"
        value={value}
        setValue={setValue}
      />
      <TextField placeholder="Developers" value={value} setValue={setValue} />

      <TextField
        placeholder="Scrum Master Name"
        value={value}
        setValue={setValue}
      />
      <TextField
        placeholder="Start Date (YYYY/MM/DD)"
        value={value}
        setValue={setValue}
      />

      <MethodologySelect value={methodology} setValue={setMethodology} />
    </FormGroup>
  );
}

export default ProductForm;
