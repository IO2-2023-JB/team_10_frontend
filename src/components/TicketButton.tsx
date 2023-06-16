import { useEffect, useState } from 'react';
import FormDialog from './layout/FormDialog';
import TicketSubmitDialog from '../pages/Ticket/TicketDialog';
import { ButtonType } from '../types/TicketTypes';
import { Button, IconButton, MenuItem, Tooltip } from '@mui/material';
import { OutlinedFlag } from '@mui/icons-material';
import { useSendOrResolveTicket } from '../api/ticket';
import { useMobileLayout } from '../theme';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useUserDetails } from '../api/user';
import { userDetailsState } from './../data/UserData';
import { AccountType } from '../types/UserTypes';
import { snackbarState } from '../data/SnackbarData';

interface TicketButtonProps {
  buttonType: ButtonType;
  targetId: string;
  targetNameInTitle: string;
  isResponse?: boolean;
}

function TicketButton({
  buttonType,
  targetId,
  targetNameInTitle,
  isResponse = false,
}: TicketButtonProps) {
  const mutation = useSendOrResolveTicket(targetId, isResponse);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { isMobile } = useMobileLayout();
  const loggedInUserDetails = useRecoilValue(userDetailsState);
  const { data: loggedInUser } = useUserDetails(loggedInUserDetails?.id);
  const setSnackbarState = useSetRecoilState(snackbarState);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const message = `Pomyślnie ${
    isResponse ? 'rozwiązano' : 'zgłoszono'
  } ${targetNameInTitle}`;

  useEffect(() => {
    if (mutation.isSuccess) {
      mutation.reset();
      setSnackbarState({
        successMessage: message,
      });
      setDialogOpen(false);
    }
  }, [mutation.isSuccess, message, mutation, setSnackbarState]);

  const actionText = `${isResponse ? 'Rozwiąż' : 'Zgłoś'} ${targetNameInTitle}`;

  const button =
    buttonType === ButtonType.Standard ? (
      <Button variant='contained' onClick={onDialogOpen}>
        {actionText}
      </Button>
    ) : buttonType === ButtonType.MenuItem ? (
      <MenuItem onClick={onDialogOpen}>{actionText}</MenuItem>
    ) : (
      <Tooltip title={actionText}>
        <IconButton
          sx={{
            alignSelf: targetNameInTitle === 'komentarz' ? 'center' : undefined,
            color: targetNameInTitle === 'komentarz' ? 'grey.800' : 'primary.main',
            padding: isMobile ? '5px' : undefined,
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

  if (loggedInUser?.userType === AccountType.Administrator && !isResponse) return null;

  return (
    <>
      {button}
      <FormDialog open={dialogOpen} onClose={onDialogClose}>
        <TicketSubmitDialog
          mutation={mutation}
          closeDialog={onDialogClose}
          targetName={targetNameInTitle}
          isResponse={isResponse}
        />
      </FormDialog>
    </>
  );
}

export default TicketButton;
