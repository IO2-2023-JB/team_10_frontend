import { Button } from '@mui/material';
import FormDialog from '../layout/FormDialog';
import DonateDialog from '../../pages/Donate/DonateDialog';
import { useState } from 'react';
import { GetUserDetailsResponse } from '../../types/UserTypes';

interface DonateButtonProps {
  creator: GetUserDetailsResponse;
}

function DonateButton({ creator }: DonateButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <Button variant='outlined' size='large' onClick={handleDialogOpen}>
        Donejtuj
      </Button>
      <FormDialog open={dialogOpen} onClose={handleDialogClose}>
        <DonateDialog creator={creator} closeDialog={handleDialogClose} />
      </FormDialog>
    </>
  );
}

export default DonateButton;
