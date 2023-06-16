import { Mode } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useUserDetailsEdit } from '../../api/user';
import { snackbarState } from '../../data/SnackbarData';
import {
  RegisterFormValues,
  UserFormFields,
  registerValidationSchema,
} from '../../data/formData/user';
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
}

function UserDetailsEditForm({ userDetails, closeDialog }: UserDetailsEditFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<Blob | null>(null);
  const [newNickname, setNewNickname] = useState<string>(userDetails.nickname);
  const prepareInitialValues = useLoadImage(userDetails.avatarImage, setAvatarImage);
  const setSnackbarState = useSetRecoilState(snackbarState);

  const { mutate, isLoading, isSuccess, error, reset } = useUserDetailsEdit();

  useEffect(() => {
    prepareInitialValues();
  }, [prepareInitialValues]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSnackbarState({
        successMessage: `Pomyślnie edytowano dane użytkownika ${newNickname}!`,
      });
      closeDialog();
    } else if (error !== null) setErrorMessage(getErrorMessage(error));
  }, [closeDialog, error, isSuccess, newNickname, reset, setSnackbarState]);

  const handleSubmit = async (values: UserDetailsEditFormValues) => {
    setNewNickname(values.nickname);
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
