import LoginLayout from '../../components/LoginLayout';
import LoginForm from '../../components/LoginForm';

function Login() {
  return (
    <LoginLayout
      form={<LoginForm />}
      hintText='Pierwszy raz?'
      buttonText='Zarejestruj się'
      buttonHref='/register'
    />
  );
}

export default Login;
