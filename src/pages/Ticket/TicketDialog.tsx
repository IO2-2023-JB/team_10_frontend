import { Alert, AlertTitle, Stack, Typography, TextField } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../utils/utils';
import SpinningButton from '../../components/SpinningButton';

interface TicketDialogProps {
  mutation: UseMutationResult<void, AxiosError, string>;
  targetName: string;
  closeDialog: () => void;
}

function TicketSubmitDialog({ mutation, targetName, closeDialog }: TicketDialogProps) {
  const [reason, setReason] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const { mutate, error, isLoading, isSuccess } = mutation;

  const isError = reason === '';
  console.log(error?.message);
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setReason(event.currentTarget.value);
  };

  const onSubmit = () => {
    if (isError) setTouched(true);
    else mutate(reason);
  };

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess, closeDialog]);

  return (
    <Stack spacing={4} alignItems='center'>
      {error && (
        <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
          <AlertTitle>Wystąpił błąd!</AlertTitle>
          {getErrorMessage(error)}
        </Alert>
      )}
      <Typography variant='h4'>Zgłoś {targetName.toLowerCase()}</Typography>
      <TextField
        fullWidth
        value={reason}
        helperText={isError && touched ? 'Należy podać powód' : undefined}
        label='Podaj powód'
        onChange={onValueChange}
        error={isError && touched}
      />
      <SpinningButton variant='contained' isLoading={isLoading} onClick={onSubmit}>
        Wyślij zgłoszenie
      </SpinningButton>
    </Stack>
  );
}

export default TicketSubmitDialog;
