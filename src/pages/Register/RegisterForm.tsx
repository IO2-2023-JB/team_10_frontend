import { HowToReg } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useRegister } from '../../api/user';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { ALLOWED_IMAGE_FORMATS, ALLOWED_IMAGE_OBJECT } from '../../const';
import { registerValidationSchema } from '../../formData/user';
import { AccountType, PostUserDetails } from '../../types/UserTypes';
import { getErrorMessage, toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';
import FormikFileUploader from './../../components/formikFields/FormikFileUploader';

type RegisterFormValues = Pick<
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
      previewSkeleton={<Skeleton variant='circular' sx={{ width: 70, height: 70 }} />}
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
