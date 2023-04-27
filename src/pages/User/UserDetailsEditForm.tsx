import { Mode } from '@mui/icons-material';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useUserDetailsEdit } from '../../api/user';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { AccountType } from '../../types/UserTypes';
import BaseForm from '../Login/BaseForm';
import { registerValidationSchema } from '../Register/RegisterForm';
import FormikSwitch from './../../components/formikFields/FormikSwitch';
import { GetUserDetailsResponse } from './../../types/UserTypes';
import { shallowComparison, toBase64 } from '../../utils/utils';
import FormikFileUploader from './../../components/formikFields/FormikFileUploader';
import { ALLOWED_IMAGE_FORMATS, ALLOWED_IMAGE_OBJECT } from '../../const';

export interface UserDetailsEditFormValues {
  nickname: string;
  name: string;
  surname: string;
  userType: AccountType;
  avatarImage: File | null;
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
    <FormikFileUploader
      name='avatarImage'
      preview={true}
      acceptedFileTypes={ALLOWED_IMAGE_FORMATS}
      acceptObject={ALLOWED_IMAGE_OBJECT}
      label='Avatar'
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

  const [avatarImage, setAvatarImage] = useState<File | null>(null);
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
    const { data: file } = await axios.get<File>(userDetails.avatarImage!, {
      responseType: 'blob',
    });

    setAvatarImage(file);
    setAreInitialValuesReady(true);
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
      toBase64(values.avatarImage!).then((res) => {
        const payload = { ...values, avatarImage: res };
        mutate(payload);
      });
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
