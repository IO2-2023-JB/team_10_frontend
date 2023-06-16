import { LoginOutlined } from '@mui/icons-material';
import { useLogin } from '../../api/user';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { LoginFormValues, loginValidationSchema } from '../../data/formData/user';
import { getErrorMessage } from '../../utils/utils';
import BaseForm from './BaseForm';

const formikInitialValues = {
  email: '',
  password: '',
};

const formFields = (
  <>
    <FormikTextField name='email' label='E-mail' type='email' autoComplete='email' />
    <FormikTextField name='password' label='Hasło' type='password' />
  </>
);

function LoginForm() {
  const { mutate, error, isLoading } = useLogin();
  const onSubmit = (values: LoginFormValues) => {
    mutate(values);
  };

  return (
    <BaseForm<LoginFormValues>
      title='Logowanie'
      buttonText='Zaloguj się'
      icon={<LoginOutlined />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
      errorMessage={getErrorMessage(error)}
      isLoading={isLoading}
      alertCollapse={false}
    />
  );
}

export default LoginForm;
