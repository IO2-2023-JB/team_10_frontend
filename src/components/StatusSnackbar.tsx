import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AUTO_HIDE_DURATION } from '../const';
import { snackbarState } from '../data/SnackbarData';

interface StatusSnackbarProps {
  severity?: AlertColor;
}

function StatusSnackbar({ severity = 'success' }: StatusSnackbarProps) {
  const statusSnackbarData = useRecoilValue(snackbarState);
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (statusSnackbarData !== null) setOpen(true);
  }, [statusSnackbarData]);

  const successMessage = statusSnackbarData?.successMessage;

  const autoHideDuration = AUTO_HIDE_DURATION;

  const closeSnackbar = () => setOpen(false);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={closeSnackbar}
      ClickAwayListenerProps={{ onClickAway: () => null }}
    >
      <Alert severity={severity} variant='filled'>
        {successMessage}
      </Alert>
    </Snackbar>
  );
}

export default StatusSnackbar;
