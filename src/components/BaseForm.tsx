import { ReactNode } from 'react';
import { Alert, Stack, Typography, Button } from '@mui/material';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
import { Box } from '@mui/system';

type BaseFormProps<T> = {
  title: string;
  buttonText: string;
  icon: ReactNode;
  formFields: ReactNode;
  initialValues: Object;
  validationSchema: any;
  onSubmit: any;
  errorMessage: string;
} & FormikConfig<T>;

function BaseForm<T extends FormikValues>({
  title,
  buttonText,
  icon,
  formFields,
  errorMessage,
  ...formikConfig
}: BaseFormProps<T>) {
  return (
    <Stack
      sx={{
        marginX: 2,
        width: 400,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Alert
        variant='filled'
        sx={{
          visibility: errorMessage == '' ? 'hidden' : 'visible',
          marginY: 5,
          width: 'inherit',
        }}
        severity='error'
      >
        {errorMessage}
      </Alert>
      {icon}
      <Typography variant='h5'>{title}</Typography>
      <Formik {...formikConfig}>
        <Box component={Form} sx={{ marginTop: 3, width: '100%' }}>
          <Stack spacing={2}>{formFields}</Stack>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            {buttonText}
          </Button>
        </Box>
      </Formik>
    </Stack>
  );
}

export default BaseForm;
