import { HowToReg } from '@mui/icons-material';
import { useRegister } from '../../api/user';
import {
  RegisterFormValues,
  UserFormFields,
  registerValidationSchema,
} from '../../data/formData/user';
import { AccountType, PostUserDetails } from '../../types/UserTypes';
import { getErrorMessage, toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';

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
      formFields={<UserFormFields showRegisterFields />}
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
