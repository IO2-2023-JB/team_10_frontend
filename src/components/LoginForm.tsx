import { useState } from 'react';
import { useRecoilState } from 'recoil';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import { userDetailsState } from '../data/UserData';
import { FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikTextField from './FormikTextField';
import BaseForm from './BaseForm';

interface LoginFormValues {
  username: string;
  password: string;
}

const formikInitialValues: LoginFormValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string().matches(/([A-Za-z0-9])$/, 'Dozwolone tylko litery i cyfry'),
  password: Yup.string().matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
    'Hasło za słabe (minimum 8 znaków, mała litera, wielka litera, cyfra i znak specjalny)'
  ),
});

const formFields = (
  <>
    {' '}
    <FormikTextField name='username' label='Nazwa użytkownika' required />
    <FormikTextField name='password' label='Hasło' required type='password' />
  </>
);

function LoginForm() {
  const [userLogged, setUserLogged] = useRecoilState(userDetailsState);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    // TBD backend login call
  };

  return (
      <BaseForm
        title='Logowanie'
        buttonText='Zaloguj się'
        icon={<LoginIcon sx={{ marginBottom: 2, height: 60, width: 60 }} />}
        formFields={formFields}
        initialValues={formikInitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        
      />
  );
}

export default LoginForm;
