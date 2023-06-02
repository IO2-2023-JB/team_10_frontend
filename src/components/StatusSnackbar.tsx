import { Alert, Snackbar } from '@mui/material';
import { AUTO_HIDE_DURATION } from '../const';

interface StatusSnackbarProps {
  successMessage: string;
  isSuccess: boolean;
  reset: () => void;
}

function StatusSnackbar({ successMessage, isSuccess, reset }: StatusSnackbarProps) {
  const severity = 'success';

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
