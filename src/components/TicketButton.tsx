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
import StatusSnackbar from './StatusSnackbar';

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
        Zgłoś {' ' + targetNameInTitle}
      </Button>
    ) : buttonType === ButtonType.MenuItem ? (
      <MenuItem onClick={onDialogOpen}>Zgłoś {' ' + targetNameInTitle}</MenuItem>
    ) : (
      <Tooltip title={'Zgłoś ' + targetNameInTitle}>
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
      <StatusSnackbar
        successMessage={`Pomyślnie zgłoszono ${targetNameInTitle}`}
        isSuccess={mutation.isSuccess}
        reset={mutation.reset}
      />
    </>
  );
}

export default TicketButton;
