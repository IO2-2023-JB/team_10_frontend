import { Box } from '@mui/system';
import LoginLayout from '../../components/LoginLayout';

function Register() {
  return (
    <LoginLayout
      form={<Box>Formularz rejestracji</Box>}
      hintText='Masz już konto?'
      buttonText='Zaloguj się'
      buttonHref='/login'
    />
  );
}

export default Register;
