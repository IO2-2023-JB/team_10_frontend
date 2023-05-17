import { Alert, AlertTitle, Stack, TextField, Typography } from '@mui/material';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import { useWithdraw } from '../../api/donate';
import { useEffect, useState } from 'react';
import SpinningButton from '../../components/SpinningButton';

interface WithdrawDialogProps {
  creator: GetUserDetailsResponse;
  closeDialog: () => void;
}

const minValue = 0.0;
const regex = /^(\d*\.?\d{0,2}|\d+)$/;

function WithdrawDialog({ creator, closeDialog }: WithdrawDialogProps) {
  const { mutate, error, isLoading, isSuccess } = useWithdraw();
  const [value, setValue] = useState('');
  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess, closeDialog]);

  const handleConfirm = () => {
    mutate(+value);
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (regex.test(value) || value === '') setValue(value);
  };

  const isValueValid = (value: number) =>
    value > minValue && value <= creator.accountBalance!;

  return (
    <Stack spacing={4} alignItems='center'>
      <Typography variant='h4'>Wypłacanie środków</Typography>
      <Typography variant='h5'>Dostępne środki: {creator.accountBalance} zł</Typography>
      <Stack direction='row' spacing={3} alignItems='center'>
        <TextField
          fullWidth
          value={value}
          error={!isValueValid(+value)}
          helperText={!isValueValid(+value) ? 'Niepoprawna wartość' : undefined}
          label='Podaj kwotę'
          type='number'
          inputProps={{
            min: minValue,
            step: 0.5,
          }}
          onChange={onValueChange}
        />
        <Typography>zł</Typography>
      </Stack>
      {error && (
        <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
          <AlertTitle>Wystąpił błąd!</AlertTitle>
          {error?.message}
        </Alert>
      )}
      <SpinningButton
        disabled={!isValueValid(+value)}
        variant='contained'
        isLoading={isLoading}
        onClick={handleConfirm}
      >
        Potwierdź
      </SpinningButton>
    </Stack>
  );
}

export default WithdrawDialog;
