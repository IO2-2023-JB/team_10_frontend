import {
  Alert,
  AlertTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import { useWithdraw } from '../../api/donate';
import { useEffect, useState } from 'react';
import SpinningButton from '../../components/SpinningButton';
import { getErrorMessage, valueAsNumber } from '../../utils/utils';

interface WithdrawDialogProps {
  creator: GetUserDetailsResponse;
  closeDialog: () => void;
}

const minValue = 0.0;
const regex = /^(\d*,?\d{0,2}|\d+)$/;

function WithdrawDialog({ creator, closeDialog }: WithdrawDialogProps) {
  const { mutate, error, isLoading, isSuccess } = useWithdraw();
  const [value, setValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess, closeDialog]);

  const numberValue = valueAsNumber(value);
  const isValueValid =
    numberValue === null
      ? false
      : numberValue > minValue && numberValue <= creator.accountBalance!;
  const isError = touched && !isValueValid;

  const handleConfirm = () => {
    if (!touched) {
      setTouched(true);
      return;
    }
    if (isError) return;
    mutate(valueAsNumber(value) ?? 0);
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    const value = event.currentTarget.value;
    if (regex.test(value) || value === '') setValue(value);
  };

  return (
    <Stack spacing={4} alignItems='center'>
      <Typography variant='h4'>Wypłacanie środków</Typography>
      <Typography variant='h5'>Dostępne środki: {creator.accountBalance} zł</Typography>
      <TextField
        fullWidth
        value={value}
        error={isError}
        helperText={isError ? 'Niepoprawna wartość' : undefined}
        label='Podaj kwotę'
        InputProps={{
          endAdornment: <InputAdornment position='end'>zł</InputAdornment>,
        }}
        onChange={onValueChange}
      />
      {error && (
        <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
          <AlertTitle>Wystąpił błąd!</AlertTitle>
          {getErrorMessage(error)}
        </Alert>
      )}
      <SpinningButton variant='contained' isLoading={isLoading} onClick={handleConfirm}>
        Potwierdź
      </SpinningButton>
    </Stack>
  );
}

export default WithdrawDialog;
