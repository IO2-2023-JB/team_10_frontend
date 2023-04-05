import { CameraAlt } from '@mui/icons-material';
import { Avatar, Button, Stack } from '@mui/material';
import { useField } from 'formik';
import { ChangeEvent } from 'react';

interface AvatarSectionProps {
  name: string;
}

function AvatarSection({ name }: AvatarSectionProps) {
  const [_, meta, helpers] = useField<string | null>(name);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.currentTarget.files?.[0];
    if (file === undefined) return;

    reader.onload = () => {
      helpers.setValue(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    helpers.setValue(null);
  };

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <Avatar
        src={meta.value ?? undefined}
        sx={{
          backgroundColor: 'primary.main',
          width: 100,
          height: 100,
        }}
      >
        <CameraAlt fontSize='large' />
      </Avatar>
      <Button component='label'>
        {meta.value !== null ? 'Edytuj zdjęcie' : 'Dodaj zdjęcie'}
        <input
          type='file'
          hidden
          accept='.jpg, .jpeg, .png'
          onChange={handleFileChange}
        />
      </Button>
      {meta.value !== null && <Button onClick={handleDelete}>Usuń zdjęcie</Button>}
    </Stack>
  );
}

export default AvatarSection;
