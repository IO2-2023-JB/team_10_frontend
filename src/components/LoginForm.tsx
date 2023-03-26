import { Box } from '@mui/system';
import { CssBaseline, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import { UserData } from '../data/UserData';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikTextField from './FormikTextField';
interface LoginFormProps {}

interface Values {
  username: string;
  password: string;
}

function LoginForm({}: LoginFormProps) {
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Box
      sx={{
        ml: 2,
        mr: 2,
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Typography variant='h5' mb={3} style={{ fontWeight: 3 }} color='error'>
        {errorMessage}
      </Typography>
      <LoginIcon sx={{ marginBottom: '20px', height: '60px', width: '60px' }} />
      <Typography component='h1' variant='h5'>
        Logowanie
      </Typography>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          // TBD backend login call
        }}
        validationSchema={Yup.object({
          username: Yup.string().matches(
            /([A-Za-z0-9])$/,
            'Only letters and numbers allowed'
          ),
          password: Yup.string().matches(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            'Password too weak (must be at least 8-character long and contain one lower case letter, one upper case letter, one number and one special character)'
          ),
        })}
      >
        <Form style={{ marginTop: 30, width: '100%' }}>
          <Stack spacing={2}>
            <FormikTextField name='username' label='Nazwa użytkownika' required />
            <FormikTextField name='password' label='Hasło' required autoComplete='off' />
          </Stack>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Zaloguj się
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}

export default LoginForm;
