import * as Yup from 'yup';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('Pole wymagane').email('Niepoprawny format adresu e-mail'),
  password: Yup.string().required('Pole wymagane'),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().required('Pole wymagane').email('Niepoprawny format adresu e-mail'),
  nickname: Yup.string()
    .required('Pole wymagane')
    .matches(/([A-Za-z0-9])$/, 'Dozwolone jedynie litery i cyfry'),
  name: Yup.string().required('Pole wymagane').max(32, 'Imię zbyt długie'),
  surname: Yup.string().required('Pole wymagane').max(32, 'Nazwisko zbyt długie'),
  password: Yup.string()
    .required('Pole wymagane')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      'Hasło za słabe (minimum 8 znaków, mała litera, wielka litera, cyfra i znak specjalny)'
    ),
  repeatPassword: Yup.string()
    .required('Pole wymagane')
    .oneOf([Yup.ref('password')], 'Hasła się nie zgadzają'),
});
