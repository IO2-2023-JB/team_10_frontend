import { Mode } from '@mui/icons-material';
import { useEffect, useState } from 'react';
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
import { useLoadImage } from '../../utils/hooks';
import { Skeleton } from '@mui/material';

export interface UserDetailsEditFormValues {
  nickname: string;
  name: string;
  surname: string;
  userType: AccountType;
  avatarImage: Blob | null;
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
      preview
      acceptedFileTypes={ALLOWED_IMAGE_FORMATS}
      acceptObject={ALLOWED_IMAGE_OBJECT}
      label='Avatar'
      previewProps={{ sx: { height: 70, width: 70 } }}
      previewSkeleton={
        <Skeleton variant='circular' sx={{ width: 70, height: 70 }} />
      }
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
  const [avatarImage, setAvatarImage] = useState<Blob | null>(null);
  const prepareInitialValues = useLoadImage(userDetails.avatarImage, setAvatarImage);

  useEffect(() => {
    prepareInitialValues();
  }, [prepareInitialValues]);

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess, closeDialog]);

  const handleSubmit = async (values: UserDetailsEditFormValues) => {
    setErrorMessage(error?.message ?? '');
    if (!shallowComparison(values, formikInitialValues)) {
      const file =
        values.avatarImage !== null ? await toBase64(values.avatarImage) : null;
      const payload = { ...values, avatarImage: file };
      mutate(payload);
    } else setErrorMessage('Wprowadź nowe wartości');
    setAvatarImage(values.avatarImage);
  };

  const formikInitialValues: UserDetailsEditFormValues = {
    nickname: userDetails.nickname,
    name: userDetails.name,
    surname: userDetails.surname,
    userType: userDetails.userType,
    avatarImage: avatarImage,
  };

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
      alertCollapse
      enableReinitialize
    />
  );
}

export default UserDetailsEditForm;
