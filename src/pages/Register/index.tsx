import TabTitle from '../../components/TabTitle';
import { ROUTES } from '../../const';
import { TabTitles } from '../../const/tab_titles';
import LoginLayout from '../Login/LoginLayout';
import RegisterForm from './RegisterForm';

function Register() {
  return (
    <>
      <TabTitle title={TabTitles.Register} />
      <LoginLayout
        form={<RegisterForm />}
        hintText='Masz już konto?'
        buttonText='Zaloguj się'
        buttonHref={ROUTES.LOGIN}
      />
    </>
  );
}

export default Register;
