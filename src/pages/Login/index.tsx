import LoginLayout from './LoginLayout';
import LoginForm from './LoginForm';

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
