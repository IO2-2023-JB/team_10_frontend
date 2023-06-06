import { useState } from 'react';
import FormDialog from './layout/FormDialog';
import TicketSubmitDialog from '../pages/Ticket/TicketDialog';
import { ButtonType } from '../types/DonateTypes';
import { Button, IconButton, MenuItem } from '@mui/material';
import { OutlinedFlag } from '@mui/icons-material';
import { useSendTicket } from '../api/ticket';

interface TicketButtonProps {
  buttonType: ButtonType;
  targetId: string;
  targetNameInTitle: string;
}

function TicketButton({
  buttonType,
  targetId,
  targetNameInTitle: targetName,
}: TicketButtonProps) {
  const mutation = useSendTicket(targetId);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const button =
    buttonType === ButtonType.Standard ? (
      <Button size='large' variant='outlined' color='primary' onClick={onDialogOpen}>
        Zgłoś
      </Button>
    ) : buttonType === ButtonType.MenuItem ? (
      <MenuItem onClick={onDialogOpen}>Zgłoś</MenuItem>
    ) : (
      <IconButton color='primary' onClick={onDialogOpen}>
        <OutlinedFlag />
      </IconButton>
    );

  return (
    <>
      {button}
      <FormDialog open={dialogOpen} onClose={onDialogClose}>
        <TicketSubmitDialog
          mutation={mutation}
          closeDialog={onDialogClose}
          targetName={targetName}
        ></TicketSubmitDialog>
      </FormDialog>
    </>
  );
}

export default TicketButton;
