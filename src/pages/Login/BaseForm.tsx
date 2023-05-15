import { Alert, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpinningButton from '../../components/SpinningButton';

type BaseFormProps<T> = {
  title: string;
  buttonText: string;
  icon: ReactNode;
  formFields: ReactNode;
  errorMessage: string;
  isLoading: boolean;
  alertCollapse: boolean;
} & FormikConfig<T>;

function BaseForm<T extends FormikValues>({
  title,
  buttonText,
  icon,
  formFields,
  errorMessage,
  isLoading,
  alertCollapse,
  ...formikConfig
}: BaseFormProps<T>) {
  const { state } = useLocation();
  const successfulRegister = state?.successfulRegister ?? false;
  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);
  return (
    <Stack
      sx={{
        marginX: 2,
        width: 400,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {(!alertCollapse || (alertCollapse && errorMessage !== '')) && (
        <Alert
          variant='filled'
          sx={{
            visibility: errorMessage === '' && !successfulRegister ? 'hidden' : 'visible',
            marginY: 2,
            width: '100%',
          }}
          severity={successfulRegister ? 'success' : 'error'}
        >
          {successfulRegister
            ? 'Pomyślnie zarejestrowano! Teraz możesz się zalogować.'
            : errorMessage}
        </Alert>
      )}
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
          <SpinningButton
            type='submit'
            fullWidth
            formNoValidate
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            isLoading={isLoading}
          >
            {buttonText}
          </SpinningButton>
        </Box>
      </Formik>
    </Stack>
  );
}

export default BaseForm;
