import {
  Alert,
  AlertTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useWithdraw } from '../../api/donate';
import SpinningButton from '../../components/SpinningButton';
import { snackbarState } from '../../data/SnackbarData';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import { getErrorMessage, valueAsNumber } from '../../utils/utils';

interface WithdrawDialogProps {
  creator: GetUserDetailsResponse;
  closeDialog: () => void;
}

const minValue = 0.0;
const regex = /^(\d*,?\d{0,2}|\d+)$/;

function WithdrawDialog({ creator, closeDialog }: WithdrawDialogProps) {
  const setSnackbarState = useSetRecoilState(snackbarState);
  const { mutate, isSuccess, isLoading, error, reset } = useWithdraw();
  const [value, setValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSnackbarState({
        successMessage: `Pomyślnie wypłacono ${value} €🧽`,
      });
      closeDialog();
    }
  }, [closeDialog, isSuccess, reset, setSnackbarState, value]);

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
      {error && (
        <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
          <AlertTitle>Wystąpił błąd!</AlertTitle>
          {getErrorMessage(error)}
        </Alert>
      )}
      <Typography variant='h4'>Wypłacanie środków</Typography>
      <Typography variant='h5'>
        Dostępne środki:{' '}
        {getNumberWithLabel(creator.accountBalance!, NumberDeclinedNoun.Eurogombka, true)}
      </Typography>
      <TextField
        fullWidth
        value={value}
        error={isError}
        helperText={isError ? 'Niepoprawna wartość' : undefined}
        label='Podaj kwotę'
        InputProps={{
          endAdornment: <InputAdornment position='end'>€🧽</InputAdornment>,
        }}
        onChange={onValueChange}
      />
      <SpinningButton variant='contained' isLoading={isLoading} onClick={handleConfirm}>
        Potwierdź
      </SpinningButton>
    </Stack>
  );
}

export default WithdrawDialog;
