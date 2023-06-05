import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useWithdraw } from '../../api/donate';
import { snackbarState } from '../../data/SnackbarData';
import WithdrawDialog from '../../pages/Donate/WithdrawDialog';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import FormDialog from '../layout/FormDialog';

interface WithdrawButtonProps {
  creator: GetUserDetailsResponse;
}

function WithdrawButton({ creator }: WithdrawButtonProps) {
  const [_, setSnackbarState] = useRecoilState(snackbarState);
  const mutation = useWithdraw();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setSnackbarState({
      successMessage: `Pomyślnie wypłacono ${amount} €🧽`,
      isSuccess: mutation.isSuccess,
      reset: mutation.reset,
    });
  }, [amount, creator.nickname, mutation.isSuccess, mutation.reset, setSnackbarState]);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button variant='outlined' size='large' onClick={handleDialogOpen}>
        Wypłać środki
      </Button>
      <FormDialog open={dialogOpen} onClose={handleDialogClose}>
        <WithdrawDialog
          creator={creator}
          closeDialog={handleDialogClose}
          setAmount={setAmount}
          mutation={mutation}
        />
      </FormDialog>
    </>
  );
}

export default WithdrawButton;
