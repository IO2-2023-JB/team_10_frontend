import {
  Alert,
  AlertTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDonate } from '../../api/donate';
import React, { useEffect, useState } from 'react';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import SpinningButton from '../../components/SpinningButton';
import Avatar from '../../components/Avatar';
import { getErrorMessage, valueAsNumber } from '../../utils/utils';

interface DonateDialogProps {
  creator: GetUserDetailsResponse;
  closeDialog: () => void;
}

const minValue = 0.0;
const regex = /^(\d*,?\d{0,2}|\d+)$/;

function DonateDialog({ creator, closeDialog }: DonateDialogProps) {
  const { mutate, error, isLoading, isSuccess } = useDonate(creator.id);
  const [value, setValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) closeDialog();
  }, [isSuccess, closeDialog]);

  const numberValue = valueAsNumber(value);
  const isValueValid = numberValue === null ? false : numberValue > minValue;
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
      <Typography variant='h4'>Wesprzyj twórcę</Typography>
      <Stack direction='row' spacing={3} alignItems='center'>
        <Stack spacing={1} alignItems='center'>
          <Avatar userDetails={creator} size={60} />
          <Typography>{creator.nickname}</Typography>
        </Stack>
        <TextField
          fullWidth
          value={value}
          error={isError}
          helperText={isError ? 'Niepoprawna wartość' : undefined}
          label='Podaj kwotę'
          onChange={onValueChange}
          InputProps={{
            endAdornment: <InputAdornment position='end'>€🧽</InputAdornment>,
          }}
        />
      </Stack>
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

export default DonateDialog;
