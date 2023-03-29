import { useState } from 'react';
import { LoginOutlined } from '@mui/icons-material';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikTextField from './FormikTextField';
import BaseForm from './BaseForm';

interface LoginFormValues {
  username: string;
  password: string;
}

const formikInitialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string().matches(/([A-Za-z0-9])$/, 'Dozwolone tylko litery i cyfry'),
});

const formFields = (
  <>
    <FormikTextField name='username' label='Nazwa użytkownika' required />
    <FormikTextField name='password' label='Hasło' required type='password' />
  </>
);

function LoginForm() {
  const [errorMessage, _setErrorMessage] = useState<string>('');

  const onSubmit = (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    // TBD backend login call
  };

  return (
    <BaseForm<LoginFormValues>
      title='Logowanie'
      buttonText='Zaloguj się'
      icon={<LoginOutlined />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default LoginForm;
