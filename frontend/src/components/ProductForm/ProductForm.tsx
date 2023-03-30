import { FormGroup } from '@mui/material';
import { SetStateAction, useState } from 'react';
import MethodologySelect from './MethodologySelect';
import TextField from './TextField';

type ProductFormProps = {
  productName: string;
  setProductName: (name: SetStateAction<string>) => void;
  productOwner: string;
  setProductOwner: (owner: SetStateAction<string>) => void;
  developers: string;
  setDevelopers: (developers: SetStateAction<string>) => void;
  scrumMasterName: string;
  setScrumMasterName: (name: SetStateAction<string>) => void;
  startDate: string;
  setStartDate: (date: SetStateAction<string>) => void;
  methodology: string;
  setMethodology: (methodology: SetStateAction<string>) => void;
};

function ProductForm(props: ProductFormProps) {
  return (
    <FormGroup>
      <TextField
        placeholder="Product Name"
        value={props.productName}
        setValue={props.setProductName}
      />

      <TextField
        placeholder="Product Owner"
        value={props.productOwner}
        setValue={props.setProductOwner}
      />
      <TextField
        placeholder="Developers"
        value={props.developers}
        setValue={props.setDevelopers}
      />

      <TextField
        placeholder="Scrum Master Name"
        value={props.scrumMasterName}
        setValue={props.setScrumMasterName}
      />

      <TextField
        placeholder="Start Date (YYYY/MM/DD)"
        value={props.startDate}
        setValue={props.setStartDate}
      />

      <MethodologySelect
        value={props.methodology}
        setValue={props.setMethodology}
      />
    </FormGroup>
  );
}

export default ProductForm;
