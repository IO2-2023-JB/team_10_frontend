import { Mode } from '@mui/icons-material';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useUserDetailsEdit } from '../../api/user';
import AvatarSection from '../../components/formikFields/FormikAvatarField';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { AccountType, GetUserDetailsResponse } from '../../data/UserData';
import BaseForm from '../Login/BaseForm';
import { registerValidationSchema } from '../Register/RegisterForm';
import FormikSwitch from './../../components/formikFields/FormikSwitch';
import { shallowComparison } from './../../utils';

export interface UserDetailsEditFormValues {
  nickname: string;
  name: string;
  surname: string;
  userType: AccountType;
  avatarImage: string | null;
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
    <AvatarSection name='avatarImage' />
  </>
);

interface UserDetailsEditFormProps {
  userDetails: GetUserDetailsResponse;
  closeDialog: () => void;
}

function UserDetailsEditForm({ userDetails, closeDialog }: UserDetailsEditFormProps) {
  const { mutate, error, isLoading, isSuccess } = useUserDetailsEdit();
  const [errorMessage, setErrorMessage] = useState('');

  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [areInitialValuesReady, setAreInitialValuesReady] = useState<boolean>(
    userDetails.avatarImage === null
  );

  const formikInitialValues: UserDetailsEditFormValues = {
    nickname: userDetails.nickname,
    name: userDetails.name,
    surname: userDetails.surname,
    userType: userDetails.userType,
    avatarImage,
  };

  const prepareInitialValues = useCallback(async () => {
    const { data: file } = await axios.get<Blob>(userDetails.avatarImage!, {
      responseType: 'blob',
    });

    const reader = new FileReader();
    if (file === undefined) return;

    reader.onload = () => {
      setAvatarImage(reader.result as string);
      setAreInitialValuesReady(true);
    };

    reader.readAsDataURL(file);
  }, [userDetails.avatarImage]);

  useEffect(() => {
    if (!areInitialValuesReady) prepareInitialValues();
  }, [areInitialValuesReady, prepareInitialValues]);

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess, closeDialog]);

  const handleSubmit = (values: UserDetailsEditFormValues) => {
    setErrorMessage(error?.message ?? '');
    if (!shallowComparison(values, formikInitialValues)) {
      mutate(values);
    } else setErrorMessage('Wprowadź nowe wartości');
  };

  if (!areInitialValuesReady)
    return (
      <Box sx={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );

  return (
    <BaseForm<UserDetailsEditFormValues>
      title='Edycja danych'
      buttonText='Zmień dane'
      icon={<Mode />}
      formFields={formFields}
      initialValues={formikInitialValues}
      validationSchema={userDetailsEditValidationForm}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
      alertCollapse={true}
    />
  );
}

export default UserDetailsEditForm;
