import LoginLayout from '../../components/LoginLayout';
import RegisterForm from '../../components/RegisterForm';

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
