import { ROUTES } from '../../const';
import LoginLayout from '../Login/LoginLayout';
import RegisterForm from './RegisterForm';

function Register() {
  return (
    <LoginLayout
      form={<RegisterForm />}
      hintText='Masz już konto?'
      buttonText='Zaloguj się'
      buttonHref={ROUTES.LOGIN}
    />
  );
}

export default Register;
