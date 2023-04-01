import { LoginOutlined } from '@mui/icons-material';
import * as Yup from 'yup';
import FormikTextField from '../../components/formikFields/FormikTextField';
import BaseForm from './BaseForm';
import { useLogin } from '../../api/user';
export interface LoginFormValues {
  email: string;
  password: string;
}

const formikInitialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Pole wymagane').email('Niepoprawny format adresu e-mail'),
  password: Yup.string().required('Pole wymagane'),
});

const formFields = (
  <>
    <FormikTextField name='email' label='E-mail' type='email' />
    <FormikTextField name='password' label='Hasło' type='password' />
  </>
);

function LoginForm() {
  const { mutate, error, isLoading } = useLogin();
  const onSubmit = (values: LoginFormValues) => {
    mutate(values);
  };

  const errorMessage = error?.message ?? '';
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
      isLoading={isLoading}
    />
  );
}

export default LoginForm;