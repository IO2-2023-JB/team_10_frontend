import { HowToReg } from '@mui/icons-material';
import * as Yup from 'yup';
import { useRegister } from '../../api/user';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { ALLOWED_IMAGE_FORMATS, ALLOWED_IMAGE_OBJECT } from '../../const';
import { AccountType, PostUserDetails } from '../../types/UserTypes';
import { toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';
import FormikFileUploader from './../../components/formikFields/FormikFileUploader';
import { Skeleton } from '@mui/material';
import { getErrorMessage } from '../../utils/utils';

export type RegisterFormValues = Pick<
  PostUserDetails,
  'email' | 'nickname' | 'name' | 'surname' | 'userType' | 'password'
> & { avatarImage: File | null; repeatPassword?: string };

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
    <FormikFileUploader
      name='avatarImage'
      label='Avatar'
      acceptedFileTypes={ALLOWED_IMAGE_FORMATS}
      acceptObject={ALLOWED_IMAGE_OBJECT}
      preview
      previewProps={{ sx: { height: 70, width: 70 } }}
      previewSkeleton={
        <Skeleton variant='circular' sx={{ width: 70, height: 70 }} />
      }
    />
  </>
);

function RegisterForm() {
  const { isLoading, error, mutate } = useRegister();

  const handleSubmit = async (values: RegisterFormValues) => {
    delete values.repeatPassword;
    const avatarImage =
      values.avatarImage !== null ? await toBase64(values.avatarImage) : null;
    const payload: PostUserDetails = { ...values, avatarImage };
    mutate(payload);
  };

  return (
    <BaseForm<RegisterFormValues>
      title='Rejestracja'
      buttonText='Zarejestruj się'
      icon={<HowToReg />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
      errorMessage={getErrorMessage(error)}
      isLoading={isLoading}
      alertCollapse={false}
    />
  );
}

export default RegisterForm;
