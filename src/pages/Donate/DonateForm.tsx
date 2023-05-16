import { Alert, AlertTitle, Stack, TextField, Typography } from '@mui/material';
import { useDonate } from '../../api/donate';
import { useEffect, useState } from 'react';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import Avatar from '../../components/Avatar';
import SpinningButton from '../../components/SpinningButton';

interface DonateFormProps {
  creator: GetUserDetailsResponse;
  closeDialog: () => void;
}

const minValue = 0.0;

function DonateForm({ creator, closeDialog }: DonateFormProps) {
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
    if (!value.startsWith('0') && +value >= minValue) setValue(value);
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
          value={value}
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
        disabled={!+value}
        variant='contained'
        isLoading={isLoading}
        onClick={handleConfirm}
      >
        Potwierdź
      </SpinningButton>
    </Stack>
  );
}

export default DonateForm;
