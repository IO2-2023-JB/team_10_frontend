import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import DonateDialog from '../../pages/Donate/DonateDialog';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import FormDialog from '../layout/FormDialog';

interface DonateButtonProps {
  creator: GetUserDetailsResponse;
  asMenuItem?: boolean;
}

function DonateButton({ creator, asMenuItem = false }: DonateButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const button = asMenuItem ? (
    <MenuItem onClick={handleDialogOpen}>Wesprzyj</MenuItem>
  ) : (
    <Button variant='outlined' size='large' onClick={handleDialogOpen}>
      Wesprzyj
    </Button>
  );

  return (
    <>
      {button}
      <FormDialog open={dialogOpen} onClose={handleDialogClose}>
        <DonateDialog creator={creator} closeDialog={handleDialogClose} />
      </FormDialog>
    </>
  );
}

export default DonateButton;
