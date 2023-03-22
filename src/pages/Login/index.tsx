import { Box } from '@mui/material';
import LoginLayout from '../../components/LoginLayout';

function Login() {
  return (
    <LoginLayout
      form={<Box>Formularz logowania</Box>}
      hintText='Pierwszy raz?'
      buttonText='Zarejestruj się'
      buttonHref='/register'
    />
  );
}

export default Login;
