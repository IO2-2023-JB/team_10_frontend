import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

type FormikTextFieldProps = {
  name: string;
} & TextFieldProps;

function FormikTextField({ name, ...others }: FormikTextFieldProps) {
  const [field, meta] = useField(name);

  const config = {
    ...field,
    ...others,
    fullWidth: true,
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
