import { Box } from '@mui/system';
import { CssBaseline, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikTextField from './FormikTextField';
interface RegisterFormProps {}

interface Values {
  email: string;
  nickname: string;
  name: string;
  surname: string;
  password: string;
  repeatPassword: string;
  userType: number;
  avatar: Blob;
}

function RegisterForm({}: RegisterFormProps) {
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
      <HowToRegIcon sx={{ marginBottom: '20px', height: '60px', width: '60px' }} />
      <Typography component='h1' variant='h5'>
        Rejestracja
      </Typography>

      <Formik
        initialValues={{
          email: '',
          nickname: '',
          name: '',
          surname: '',
          password: '',
          repeatPassword: '',
          userType: 0,
          avatar: new Blob(),
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          // TBD backend login call
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Incorrect email format'),
          nickname: Yup.string().matches(
            /([A-Za-z0-9])$/,
            'Only letters and numbers allowed'
          ),
          name: Yup.string().max(32, 'Name too long'),
          surname: Yup.string().max(32, 'Surname too long'),
          password: Yup.string().matches(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            'Password too weak (must be at least 8-character long and contain one lower case letter, one upper case letter, one number and one special character)'
          ),
          repeatPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            "Passwords don't match"
          ),
        })}
      >
        <Form style={{ marginTop: 30, width: '100%' }}>
          <Stack spacing={2}>
            <FormikTextField name='email' label='E-mail' required />
            <FormikTextField name='nickname' label='Nazwa użytkownika' required />
            <FormikTextField name='name' label='Imię' required />
            <FormikTextField name='surname' label='Nazwisko' required />
            <FormikTextField name='password' label='Hasło' required />
            <FormikTextField name='repeatPassword' label='Powtórz hasło' required />
          </Stack>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Zarejestruj się
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}

export default RegisterForm;
