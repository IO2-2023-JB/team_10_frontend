import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useDonate } from '../../api/donate';
import DonateDialog from '../../pages/Donate/DonateDialog';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import StatusSnackbar from '../StatusSnackbar';
import FormDialog from '../layout/FormDialog';

interface DonateButtonProps {
  creator: GetUserDetailsResponse;
  asMenuItem?: boolean;
}

function DonateButton({ creator, asMenuItem = false }: DonateButtonProps) {
  const mutation = useDonate(creator.id);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

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
        <DonateDialog
          creator={creator}
          closeDialog={handleDialogClose}
          mutation={mutation}
          setAmount={setAmount}
        />
      </FormDialog>
      <StatusSnackbar
        successMessage={`Pomyślnie przesłano ${amount} €🧽 do ${creator.nickname}`}
        isSuccess={mutation.isSuccess}
        reset={mutation.reset}
      />
    </>
  );
}

export default DonateButton;
