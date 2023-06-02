import {
  Alert,
  AlertTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import SpinningButton from '../../components/SpinningButton';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import { getErrorMessage, valueAsNumber } from '../../utils/utils';

interface WithdrawDialogProps {
  creator: GetUserDetailsResponse;
  closeDialog: () => void;
  mutation: UseMutationResult<void, AxiosError, number>;
  setAmount: (amount: number) => void;
}

const minValue = 0.0;
const regex = /^(\d*,?\d{0,2}|\d+)$/;

function WithdrawDialog({
  creator,
  closeDialog,
  mutation,
  setAmount,
}: WithdrawDialogProps) {
  const [value, setValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const { mutate, isSuccess, isLoading, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      setAmount(valueAsNumber(value) ?? 0);
      closeDialog();
    }
  }, [isSuccess, closeDialog, setAmount, value]);

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
