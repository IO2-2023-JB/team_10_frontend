import FormikTextField from '../../components/formikFields/FormikTextField';
import BaseForm from '../Login/BaseForm';
import { Mode } from '@mui/icons-material';
import * as Yup from 'yup';
import { useUserDetailsEdit } from '../../api/user';
import { AccountType } from '../../data/UserData';
import { GetUserDetailsResponse } from '../../data/UserData';
import FormikSwitch from './../../components/formikFields/FormikSwitch';
import { useState, useEffect } from 'react';
import { registerValidationSchema } from '../Register/RegisterForm';
import { shallowComparison } from './../../utils';

export interface UserDetailsEditFormValues {
  nickname: string;
  name: string;
  surname: string;
  userType: AccountType;
}
const userDetailsEditValidationForm = new Yup.ObjectSchema({
  name: registerValidationSchema.fields.name,
  surname: registerValidationSchema.fields.surname,
  nickname: registerValidationSchema.fields.nickname,
});

const formFields = (
  <>
    <FormikTextField name='nickname' label='Nazwa użytkownika' />
    <FormikTextField name='name' label='Imię' />
    <FormikTextField name='surname' label='Nazwisko' />
    <FormikSwitch
      name='userType'
      labels={['Widz', 'Twórca']}
      options={[AccountType.Simple, AccountType.Creator]}
    />
  </>
);

interface UserDetailsEditFormProps {
  userDetails: GetUserDetailsResponse;
  closeDialog: () => void;
}

function UserDetailsEditForm({ userDetails, closeDialog }: UserDetailsEditFormProps) {
  const { mutate, error, isLoading, isSuccess } = useUserDetailsEdit();
  const [errorMessage, setErrorMessage] = useState('');
  const formikInitialValues = {
    nickname: userDetails.nickname,
    name: userDetails.name,
    surname: userDetails.surname,
    userType: userDetails.userType,
  };

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess]);

  const onSubmit = (values: UserDetailsEditFormValues) => {
    setErrorMessage(error?.message ?? '');
    if (!shallowComparison(values, formikInitialValues)) {
      mutate(values);
    } else setErrorMessage('Wprowadź nowe wartości');
  };

  return (
    <BaseForm<UserDetailsEditFormValues>
      title='Edycja danych'
      buttonText='Zmień dane'
      icon={<Mode />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={userDetailsEditValidationForm}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
      alertCollapse={true}
    />
  );
}

export default UserDetailsEditForm;
