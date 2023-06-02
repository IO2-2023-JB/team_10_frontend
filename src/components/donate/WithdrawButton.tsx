import { Button } from '@mui/material';
import { useState } from 'react';
import { useWithdraw } from '../../api/donate';
import WithdrawDialog from '../../pages/Donate/WithdrawDialog';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import StatusSnackbar from '../StatusSnackbar';
import FormDialog from '../layout/FormDialog';

interface WithdrawButtonProps {
  creator: GetUserDetailsResponse;
}

function WithdrawButton({ creator }: WithdrawButtonProps) {
  const mutation = useWithdraw();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

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
      <StatusSnackbar
        successMessage={`Pomyślnie wypłacono ${amount} €🧽`}
        isSuccess={mutation.isSuccess}
        reset={mutation.reset}
      />
    </>
  );
}

export default WithdrawButton;
