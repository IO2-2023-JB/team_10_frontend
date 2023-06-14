import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useDeleteUser } from '../../api/user';
import SpinningButton from '../../components/SpinningButton';
import FormDialog from '../../components/layout/FormDialog';
import { snackbarState } from '../../data/SnackbarData';
import { getErrorMessage } from '../../utils/utils';

interface DeleteUserButtonProps {
  userId: string;
}

function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const setSnackbarState = useSetRecoilState(snackbarState);
  const { mutate, error, isLoading, isSuccess, reset } = useDeleteUser(userId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSnackbarState({
        successMessage: `Pomyślnie usunięto użytkownika.`,
      });
      setIsDeleteDialogOpen(false);
    }
  }, [isSuccess, reset, setSnackbarState]);

  return (
    <>
      <Button size='large' onClick={() => setIsDeleteDialogOpen(true)}>
        Usuń konto
      </Button>
      <FormDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <Stack spacing={3}>
          {error && (
            <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
              <AlertTitle>Wystąpił błąd!</AlertTitle>
              {getErrorMessage(error)}
            </Alert>
          )}
          <Typography variant='h5'>
            Czy na pewno chcesz usunąć tego użytkownika?
          </Typography>
          <SpinningButton
            variant='contained'
            color='error'
            onClick={handleDelete}
            isLoading={isLoading}
          >
            Usuń
          </SpinningButton>
        </Stack>
      </FormDialog>
    </>
  );
}

export default DeleteUserButton;
