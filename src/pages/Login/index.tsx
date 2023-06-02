import TabTitle from '../../components/TabTitle';
import { ROUTES } from '../../const';
import { TabTitles } from '../../const/tab_titles';
import LoginForm from './LoginForm';
import LoginLayout from './LoginLayout';

function Login() {
  return (
    <>
      <TabTitle title={TabTitles.Login} />
      <LoginLayout
        form={<LoginForm />}
        hintText='Pierwszy raz?'
        buttonText='Zarejestruj się'
        buttonHref={ROUTES.REGISTER}
      />
    </>
  );
}

export default Login;
