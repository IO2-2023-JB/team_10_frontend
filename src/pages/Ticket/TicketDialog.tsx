import { Alert, AlertTitle, Stack, TextField, Typography } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import SpinningButton from '../../components/SpinningButton';
import { getErrorMessage } from '../../utils/utils';

interface TicketDialogProps {
  mutation: UseMutationResult<void, AxiosError, string>;
  targetName: string;
  closeDialog: () => void;
  isResponse: boolean;
}

function TicketSubmitDialog({
  mutation,
  targetName,
  closeDialog,
  isResponse,
}: TicketDialogProps) {
  const [reason, setReason] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const { mutate, error, isLoading, isSuccess } = mutation;

  const isError = reason === '';

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
      <Typography variant='h4'>{`${
        isResponse ? 'Rozwiąż' : 'Zgłoś'
      } ${targetName.toLowerCase()}`}</Typography>
      <TextField
        fullWidth
        value={reason}
        helperText={
          isError && touched
            ? `Należy podać ${isResponse ? 'odpowiedź' : 'powód'}`
            : undefined
        }
        label={`Podaj ${isResponse ? 'odpowiedź' : 'powód'}`}
        onChange={onValueChange}
        error={isError && touched}
      />
      <SpinningButton variant='contained' isLoading={isLoading} onClick={onSubmit}>
        {`${isResponse ? 'Rozwiąż' : 'Wyślij'} zgłoszenie`}
      </SpinningButton>
    </Stack>
  );
}

export default TicketSubmitDialog;
