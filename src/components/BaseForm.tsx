import { ReactNode } from 'react';
import { Alert, Stack, Typography, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { Box } from '@mui/system';

interface BaseFormProps {
  title: string;
  buttonText: string;
  icon: ReactNode;
  formFields: ReactNode;
  initialValues: Object;
  validationSchema: any;
  onSubmit: any;
  errorMessage: string;
}

function BaseForm({
  title,
  buttonText,
  icon,
  formFields,
  initialValues,
  validationSchema,
  onSubmit,
  errorMessage,
}: BaseFormProps) {
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
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
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
