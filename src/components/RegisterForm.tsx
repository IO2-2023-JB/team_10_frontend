import { useState } from 'react';
import { HowToReg } from '@mui/icons-material';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikTextField from './FormikTextField';
import BaseForm from './BaseForm';

interface RegisterFormValues {
  email: string;
  nickname: string;
  name: string;
  surname: string;
  password: string;
  repeatPassword: string;
  userType: number;
  avatar: Blob;
}

const formikInitialValues = {
  email: '',
  nickname: '',
  name: '',
  surname: '',
  password: '',
  repeatPassword: '',
  userType: 0,
  avatar: new Blob(),
};

const validationSchema = Yup.object({
  email: Yup.string().email('Niepoprawny format adresu e-mail'),
  nickname: Yup.string().matches(/([A-Za-z0-9])$/, 'Only letters and numbers allowed'),
  name: Yup.string().max(32, 'Imię zbyt długie'),
  surname: Yup.string().max(32, 'Nazwisko zbyt długie'),
  password: Yup.string().matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
    'Hasło za słabe (minimum 8 znaków, mała litera, wielka litera, cyfra i znak specjalny)'
  ),
  repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Hasła się nie zgadzają'),
});

const formFields = (
  <>
    <FormikTextField name='email' label='E-mail' required type='email' />
    <FormikTextField name='nickname' label='Nazwa użytkownika' required />
    <FormikTextField name='name' label='Imię' required />
    <FormikTextField name='surname' label='Nazwisko' required />
    <FormikTextField name='password' label='Hasło' required type='password' />
    <FormikTextField
      name='repeatPassword'
      label='Powtórz hasło'
      required
      autoComplete='off'
    />
  </>
);

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    // TBD backend login call
  };

  return (
    <BaseForm<RegisterFormValues>
      title='Rejestracja'
      buttonText='Zarejestruj się'
      icon={<HowToReg />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}

export default RegisterForm;
