import { Skeleton } from '@mui/material';
import * as Yup from 'yup';
import { useAdmin } from '../../api/user';
import FormikFileUploader from '../../components/formikFields/FormikFileUploader';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { ALLOWED_IMAGE_FORMATS, ALLOWED_IMAGE_OBJECT } from '../../const';
import { AccountType, PostUserDetails } from '../../types/UserTypes';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('Pole wymagane').email('Niepoprawny format adresu e-mail'),
  password: Yup.string().required('Pole wymagane'),
});

export type RegisterFormValues = Pick<
  PostUserDetails,
  'email' | 'nickname' | 'name' | 'surname' | 'userType' | 'password'
> & { avatarImage: Blob | null; repeatPassword?: string };

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

interface UserFormFieldsProps {
  showRegisterFields?: boolean;
}

export function UserFormFields({ showRegisterFields = false }: UserFormFieldsProps) {
  const isAdmin = useAdmin();

  return (
    <>
      {showRegisterFields && <FormikTextField name='email' label='E-mail' type='email' />}
      <FormikTextField name='nickname' label='Nazwa użytkownika' />
      <FormikTextField name='name' label='Imię' />
      <FormikTextField name='surname' label='Nazwisko' />
      {showRegisterFields && (
        <>
          <FormikTextField name='password' label='Hasło' type='password' />
          <FormikTextField name='repeatPassword' label='Powtórz hasło' type='password' />
        </>
      )}
      {!isAdmin && (
        <FormikSwitch
          name='userType'
          labels={['Widz', 'Twórca']}
          options={[AccountType.Simple, AccountType.Creator]}
        />
      )}
      <FormikFileUploader
        name='avatarImage'
        label='Avatar'
        acceptedFileTypes={ALLOWED_IMAGE_FORMATS}
        acceptObject={ALLOWED_IMAGE_OBJECT}
        preview
        previewProps={{ sx: { height: 70, width: 70 } }}
        previewSkeleton={<Skeleton variant='circular' sx={{ width: 70, height: 70 }} />}
      />
    </>
  );
}
