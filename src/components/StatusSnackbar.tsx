import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { AUTO_HIDE_DURATION } from '../const';
import { snackbarState } from '../data/SnackbarData';

interface StatusSnackbarProps {
  severity?: AlertColor;
}

function StatusSnackbar({ severity = 'success' }: StatusSnackbarProps) {
  const statusSnackbarData = useRecoilValue(snackbarState);

  const successMessage = statusSnackbarData?.successMessage;
  const isSuccess = statusSnackbarData?.isSuccess;
  const reset = statusSnackbarData?.reset;

  const isOpen = isSuccess;
  const autoHideDuration = AUTO_HIDE_DURATION;

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={reset}
    >
      <Alert severity={severity} variant='filled'>
        {successMessage}
      </Alert>
    </Snackbar>
  );
}

export default StatusSnackbar;
