import LoginLayout from '../Login/LoginLayout';
import RegisterForm from './RegisterForm';

function Register() {
  return (
    <LoginLayout
      form={<RegisterForm />}
      hintText='Masz już konto?'
      buttonText='Zaloguj się'
      buttonHref='/login'
    />
  );
}

export default Register;
