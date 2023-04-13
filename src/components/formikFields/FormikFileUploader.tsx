import { Box, Button, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ALLOWED_IMAGE_FORMATS } from '../../const';
import { InputType } from '../../data/VideoData';
import { toBase64 } from '../../utils';
import { ALLOWED_VIDEO_FORMATS } from './../../const';

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
    const formData = new FormData();
    setDragged(false);
    if (files.length > 0) {
      setFile(files[0]);
      if (type === InputType.Image)
        helpers.setValue(await toBase64(files[0]).then((res) => res));
      else {
        formData.append('videoFile', files[0], files[0].name);
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
            'image/jpg': [ALLOWED_IMAGE_FORMATS[0]],
            'image/png': [ALLOWED_IMAGE_FORMATS[1]],
            'image/gif': [ALLOWED_IMAGE_FORMATS[2]],
          }
        : {
            'video/mp4': [ALLOWED_VIDEO_FORMATS[0]],
            'video/avi': [ALLOWED_VIDEO_FORMATS[1]],
            'video/mkv': [ALLOWED_VIDEO_FORMATS[2]],
            'video/webm': [ALLOWED_VIDEO_FORMATS[3]],
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
          borderWidth: 1,
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
                type === InputType.Image
                  ? ALLOWED_IMAGE_FORMATS.join(' ').toString()
                  : ALLOWED_VIDEO_FORMATS.join(' ').toString()
              })`}
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

export default FormikFileUploader;
