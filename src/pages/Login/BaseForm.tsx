import { ReactNode, useEffect } from 'react';
import { Alert, Stack, Typography, Button, CircularProgress } from '@mui/material';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';

type BaseFormProps<T> = {
  title: string;
  buttonText: string;
  icon: ReactNode;
  formFields: ReactNode;
  errorMessage: string;
  isLoading: boolean;
} & FormikConfig<T>;

function BaseForm<T extends FormikValues>({
  title,
  buttonText,
  icon,
  formFields,
  errorMessage,
  isLoading,
  ...formikConfig
}: BaseFormProps<T>) {
  const { state } = useLocation();
  const successfulRegister = state?.successfulRegister ?? false;
  useEffect(() => {
    window.history.replaceState({}, document.title)
  }, [])
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
          visibility:
            errorMessage === '' && successfulRegister === false ? 'hidden' : 'visible',
          marginY: 5,
          width: '100%',
        }}
        severity={successfulRegister ? 'success' : 'error'}
      >
        {successfulRegister ? 'Registered successfully!' : errorMessage}
      </Alert>
      <Box
        sx={{
          marginBottom: 2,
          display: 'flex',
          alignContent: 'stretch',
          '& > .MuiSvgIcon-root': {
            fontSize: 60,
          },
        }}
      >
        {icon}
      </Box>
      <Typography variant='h5'>{title}</Typography>
      <Formik {...formikConfig}>
        <Box component={Form} sx={{ marginTop: 3, width: '100%' }}>
          <Stack spacing={2}>{formFields}</Stack>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            {isLoading ? (
              <CircularProgress size='1.53rem' sx={{ color: 'inherit' }} />
            ) : (
              <>{buttonText}</>
            )}
          </Button>
        </Box>
      </Formik>
    </Stack>
  );
}

export default BaseForm;
