import { Alert, AlertProps, AlertTitle, Snackbar } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/utils';

interface StatusSnackbarProps {
  loadingMessage: string;
  errorMessage: string;
  successMessage: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: AxiosError | null;
}

function StatusSnackbar({
  loadingMessage,
  errorMessage,
  successMessage,
  isLoading,
  isSuccess,
  error,
}: StatusSnackbarProps) {
  const [canOpen, setCanOpen] = useState<boolean>(true);

  let title: string | null = null;
  let message: string = loadingMessage;
  let severity: AlertProps['severity'] = 'info';

  if (isSuccess) {
    message = successMessage;
    severity = 'success';
  } else if (error) {
    title = errorMessage;
    message = getErrorMessage(error)!;
    severity = 'error';
  }

  const isOpen = Boolean(isLoading || error || isSuccess) && canOpen;
  const autoHideDuration = isLoading ? null : 5000;

  useEffect(() => {
    if (isLoading) setCanOpen(true);
  }, [isLoading]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setCanOpen(false)}
    >
      <Alert severity={severity} variant='filled'>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
}

export default StatusSnackbar;
