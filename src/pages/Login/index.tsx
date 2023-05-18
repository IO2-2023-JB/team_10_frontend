import LoginLayout from './LoginLayout';
import LoginForm from './LoginForm';
import { ROUTES } from '../../const';

function Login() {
  return (
    <LoginLayout
      form={<LoginForm />}
      hintText='Pierwszy raz?'
      buttonText='Zarejestruj się'
      buttonHref={ROUTES.REGISTER}
    />
  );
}

export default Login;
