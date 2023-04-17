import { HowToReg } from '@mui/icons-material';
import * as Yup from 'yup';
import { useRegister } from '../../api/user';
import AvatarSection from '../../components/formikFields/FormikAvatarField';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { AccountType } from '../../types/UserTypes';
import BaseForm from '../Login/BaseForm';

export interface RegisterFormValues {
  email: string;
  nickname: string;
  name: string;
  surname: string;
  password: string;
  repeatPassword: string;
  userType: string;
  avatarImage: string | null;
}

const formikInitialValues = {
  email: '',
  nickname: '',
  name: '',
  surname: '',
  password: '',
  repeatPassword: '',
  userType: AccountType.Simple,
  avatarImage: null,
};

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

const formFields = (
  <>
    <FormikTextField name='email' label='E-mail' type='email' />
    <FormikTextField name='nickname' label='Nazwa użytkownika' />
    <FormikTextField name='name' label='Imię' />
    <FormikTextField name='surname' label='Nazwisko' />
    <FormikTextField name='password' label='Hasło' type='password' />
    <FormikTextField name='repeatPassword' label='Powtórz hasło' type='password' />
    <FormikSwitch
      name='userType'
      labels={['Widz', 'Twórca']}
      options={[AccountType.Simple, AccountType.Creator]}
    />
    <AvatarSection name='avatarImage' />
  </>
);

function RegisterForm() {
  const { isLoading, error, mutate } = useRegister();

  const handleSubmit = (values: RegisterFormValues) => {
    mutate(values);
  };

  const errorMessage = error?.message ?? '';

  return (
    <BaseForm<RegisterFormValues>
      title='Rejestracja'
      buttonText='Zarejestruj się'
      icon={<HowToReg />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
      alertCollapse={false}
    />
  );
}

export default RegisterForm;
