import { Alert, AlertTitle, Stack, TextField, Typography } from '@mui/material';
import { useDonate } from '../../api/donate';
import React, { useEffect, useState } from 'react';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import SpinningButton from '../../components/SpinningButton';
import Avatar from '../../components/Avatar';

interface DonateDialogProps {
  creator: GetUserDetailsResponse;
  closeDialog: () => void;
}

const minValue = 0.0;
const regex = /^(\d*\.?\d{0,2}|\d+)$/;

function DonateDialog({ creator, closeDialog }: DonateDialogProps) {
  const { mutate, error, isLoading, isSuccess } = useDonate(creator.id);
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

  const isValueValid = (value: number) => value > minValue;

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

export default DonateDialog;
