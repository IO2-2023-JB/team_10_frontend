import { Mode } from '@mui/icons-material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import {
  RegisterFormValues,
  UserFormFields,
  registerValidationSchema,
} from '../../data/formData/user';
import { PutUserDetails, UserDetails } from '../../types/UserTypes';
import { useLoadImage } from '../../utils/hooks';
import { getErrorMessage, shallowComparison, toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';
import { GetUserDetailsResponse } from './../../types/UserTypes';

type UserDetailsEditFormValues = Omit<
  RegisterFormValues,
  'email' | 'password' | 'repeatPassword'
>;

const userDetailsEditValidationForm = registerValidationSchema.pick([
  'name',
  'surname',
  'nickname',
]);

interface UserDetailsEditFormProps {
  userDetails: GetUserDetailsResponse;
  closeDialog: () => void;
  mutation: UseMutationResult<UserDetails, AxiosError<unknown>, PutUserDetails, unknown>;
}

function UserDetailsEditForm({
  userDetails,
  closeDialog,
  mutation,
}: UserDetailsEditFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<Blob | null>(null);
  const prepareInitialValues = useLoadImage(userDetails.avatarImage, setAvatarImage);

  const { mutate, isLoading, isSuccess, error } = mutation;

  useEffect(() => {
    prepareInitialValues();
  }, [prepareInitialValues]);

  useEffect(() => {
    if (isSuccess) closeDialog();
    else if (error !== null) setErrorMessage(getErrorMessage(error));
  }, [isSuccess, closeDialog, error]);

  const handleSubmit = async (values: UserDetailsEditFormValues) => {
    setErrorMessage(getErrorMessage(error));

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
      formFields={<UserFormFields />}
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
