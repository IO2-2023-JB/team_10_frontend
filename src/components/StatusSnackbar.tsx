import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AUTO_HIDE_DURATION } from '../const';
import { snackbarState } from '../data/SnackbarData';

function StatusSnackbar() {
  const statusSnackbarData = useRecoilValue(snackbarState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (statusSnackbarData !== null) setIsOpen(true);
  }, [statusSnackbarData]);

  const successMessage = statusSnackbarData?.successMessage;

  const autoHideDuration = AUTO_HIDE_DURATION;

  const closeSnackbar = () => setIsOpen(false);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={closeSnackbar}
      ClickAwayListenerProps={{ onClickAway: () => null }}
    >
      <Alert severity='success' variant='filled'>
        {successMessage}
      </Alert>
    </Snackbar>
  );
}

export default StatusSnackbar;
