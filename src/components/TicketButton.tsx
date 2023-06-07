import { useState } from 'react';
import FormDialog from './layout/FormDialog';
import TicketSubmitDialog from '../pages/Ticket/TicketDialog';
import { ButtonType } from '../types/TicketTypes';
import {
  Button,
  ButtonPropsColorOverrides,
  IconButton,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { OutlinedFlag } from '@mui/icons-material';
import { useSendTicket } from '../api/ticket';
import { useMobileLayout } from '../theme';

interface TicketButtonProps {
  buttonType: ButtonType;
  targetId: string;
  targetNameInTitle: string;
  size?: ButtonPropsColorOverrides;
  color?: ButtonPropsColorOverrides;
}

function TicketButton({ buttonType, targetId, targetNameInTitle }: TicketButtonProps) {
  const mutation = useSendTicket(targetId);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { isMobile } = useMobileLayout();

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const button =
    buttonType === ButtonType.Standard ? (
      <Button variant='outlined' onClick={onDialogOpen}>
        Zgłoś
      </Button>
    ) : buttonType === ButtonType.MenuItem ? (
      <MenuItem onClick={onDialogOpen}>Zgłoś</MenuItem>
    ) : (
      <Tooltip title='Zgłoś'>
        <IconButton
          sx={{
            alignSelf: targetNameInTitle === 'komentarz' ? 'center' : undefined,
            color: targetNameInTitle === 'komentarz' ? 'grey.800' : 'primary.main',
          }}
          onClick={onDialogOpen}
        >
          <OutlinedFlag
            fontSize={
              isMobile && targetNameInTitle === 'wideło'
                ? 'small'
                : targetNameInTitle === 'wideło'
                ? 'large'
                : undefined
            }
          />
        </IconButton>
      </Tooltip>
    );

  return (
    <>
      {button}
      <FormDialog open={dialogOpen} onClose={onDialogClose}>
        <TicketSubmitDialog
          mutation={mutation}
          closeDialog={onDialogClose}
          targetName={targetNameInTitle}
        ></TicketSubmitDialog>
      </FormDialog>
    </>
  );
}

export default TicketButton;
