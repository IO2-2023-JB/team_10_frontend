import { Button, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useDonate } from '../../api/donate';
import { snackbarState } from '../../data/SnackbarData';
import DonateDialog from '../../pages/Donate/DonateDialog';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import FormDialog from '../layout/FormDialog';

interface DonateButtonProps {
  creator: GetUserDetailsResponse;
  asMenuItem?: boolean;
}

function DonateButton({ creator, asMenuItem = false }: DonateButtonProps) {
  const [_, setSnackbarState] = useRecoilState(snackbarState);
  const mutation = useDonate(creator.id);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setSnackbarState({
      successMessage: `Pomyślnie przesłano ${amount} €🧽 do ${creator.nickname}`,
      isSuccess: mutation.isSuccess,
      reset: mutation.reset,
    });
  }, [amount, creator.nickname, mutation.isSuccess, mutation.reset, setSnackbarState]);

  const handleDialogOpen = () => {
    mutation.reset();
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
    </>
  );
}

export default DonateButton;
