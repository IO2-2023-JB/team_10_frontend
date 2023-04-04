import FormikTextField from '../../components/formikFields/FormikTextField';
import BaseForm from '../Login/BaseForm';
import { FormatListBulleted } from '@mui/icons-material';
import * as Yup from 'yup';
import { useUserDetailsEdit } from '../../api/user';
import { AccountType } from '../../data/UserData';
import { GetUserDetailsResponse } from '../../data/UserData';
import FormikSwitch from './../../components/formikFields/FormikSwitch';

export interface UserDetailsEditFormValues {
  nickname: string;
  name: string;
  surname: string;
  userType: AccountType;
}

const validationSchema = Yup.object({
  nickname: Yup.string()
    .required('Pole wymagane')
    .matches(/([A-Za-z0-9])$/, 'Only letters and numbers allowed'),
  name: Yup.string().required('Pole wymagane').max(32, 'Imię zbyt długie'),
  surname: Yup.string().required('Pole wymagane').max(32, 'Nazwisko zbyt długie'),
});

const formFields = (
  <>
    <FormikTextField name='nickname' label='Nazwa użytkownika' />
    <FormikTextField name='name' label='Imię' />
    <FormikTextField name='surname' label='Nazwisko' />
    <FormikSwitch
      name='userType'
      leftLabel='Widz'
      rightLabel='Twórca'
      options={['Simple', 'Creator']}
    />
  </>
);

interface UserDetailsEditFormProps {
  userDetails: GetUserDetailsResponse;
}

function UserDetailsEditForm({ userDetails }: UserDetailsEditFormProps) {
  const { mutate, error, isLoading } = useUserDetailsEdit();

  const formikInitialValues = {
    nickname: userDetails.nickname,
    name: userDetails.name,
    surname: userDetails.surname,
    userType: userDetails.userType,
  };

  const onSubmit = (values: UserDetailsEditFormValues) => {
    console.log('asdf');
    mutate(values);
  };

  const errorMessage = error?.message ?? '';
  return (
    <BaseForm<UserDetailsEditFormValues>
      title='Edycja danych'
      buttonText='Zmień dane'
      icon={<FormatListBulleted />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );
}

export default UserDetailsEditForm;
