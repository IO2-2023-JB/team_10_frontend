import { Stack, Typography, Button, Box } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InputType } from '../../data/VideoMetadata';
import { toBase64 } from '../../utils';

interface ImageUploaderProps {
  name: string;
  label: string;
  type: InputType;
}

function FormikFileUploader({ name, label, type }: ImageUploaderProps) {
  const [_, __, helpers] = useField(name);
  const [dragged, setDragged] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = async (files: File[]) => {
    setDragged(false);
    if (files.length > 0) {
      setFile(files[0]);
      console.log(files);
      if (type === InputType.Image)
        helpers.setValue(await toBase64(files[0]).then((res) => res));
      else {
        const formData = new FormData();
        formData.append('video', files[0], files[0].name);
        helpers.setValue(formData);
      }
    }
  };

  const { getRootProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setDragged(true),
    onDragLeave: () => setDragged(false),
    maxFiles: 1,
    accept:
      type === InputType.Image
        ? {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/gif': ['.gif'],
          }
        : {
            'video/mp4': ['.mp4'],
            'video/webm': ['.webm'],
            'video/mkv': ['.mkv'],
            'video/avi': ['.avi'],
          },
  });

  const handleDelete = () => {
    helpers.setValue('');
    setFile(null);
  };

  return (
    <Stack spacing={1}>
      <Typography sx={{ marginLeft: 1 }}>{label}</Typography>
      <Stack
        direction='row'
        sx={{
          borderRadius: 2,
          borderWidth: 2,
          borderStyle: file === null ? 'dashed' : 'solid',
          borderColor: 'primary.main',
          alignItems: 'center',
          height: 50,
          backgroundColor: dragged === true ? 'background.light' : 'background.default',
        }}
      >
        {file !== null ? (
          <Stack sx={{ width: '97%', marginX: 1 }} direction='row'>
            <Typography
              noWrap
              sx={{
                maxWidth: '80%',
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 'auto',
              }}
            >
              {file.name}
            </Typography>
            <Button sx={{}} onClick={handleDelete}>
              Usuń
            </Button>
          </Stack>
        ) : (
          <Box
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            {...getRootProps({ className: 'dropzone' })}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center' }} fontWeight='light'>
              {`Upuść plik tutaj (${
                type === InputType.Image ? '.jpg, .png, .gif' : '.mp4, .mkv, .webm, .avi'
              })`}
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

export default FormikFileUploader;
