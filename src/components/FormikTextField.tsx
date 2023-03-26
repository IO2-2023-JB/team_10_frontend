import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

interface FormikTextFieldProps {
  name: string;
  [others: string]: any;
}

function FormikTextField({ name, ...others }: FormikTextFieldProps) {
  const [field, meta] = useField(name);

  const config = {
    ...field,
    ...others,
    fullwidth: true,
    variant: 'outlined',
    error: false,
    helperText: '',
  } as TextFieldProps;

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return <TextField {...config} />;
}

export default FormikTextField;
