import { Button } from '@mui/material';
import FormDialog from '../layout/FormDialog';
import { useState } from 'react';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import WithdrawDialog from '../../pages/Donate/WithdrawDialog';

interface WithdrawButtonProps {
  creator: GetUserDetailsResponse;
}

function WithdrawButton({ creator }: WithdrawButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
        <WithdrawDialog creator={creator} closeDialog={handleDialogClose} />
      </FormDialog>
    </>
  );
}

export default WithdrawButton;
