import { Box, Button, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { TransferType } from '../../data/VideoTypes';
import { toBase64 } from '../../utils';

interface ImageUploaderProps {
  name: string;
  label: string;
  acceptedFileTypes: string[];
  acceptObject: Accept;
  transferType: TransferType;
}

function FormikFileUploader({
  name,
  label,
  acceptedFileTypes,
  acceptObject,
  transferType,
}: ImageUploaderProps) {
  const [_, meta, helpers] = useField(name);
  const [dragged, setDragged] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  const handleDrop = async (files: File[]) => {
    const formData = new FormData();
    helpers.setTouched(true);
    setDragged(false);
    if (files.length > 0) {
      setFileName(files[0].name);
      if (transferType === TransferType.Base64)
        helpers.setValue(await toBase64(files[0]));
      else {
        formData.append(name, files[0], files[0].name);
        helpers.setValue(formData);
      }
    }
  };

  const { getRootProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setDragged(true),
    onDragLeave: () => setDragged(false),
    maxFiles: 1,
    accept: acceptObject,
  });

  const handleDelete = () => {
    helpers.setValue(meta.initialValue);
    meta.touched = true;
  };

  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          marginLeft: 1,
          color: meta && meta.error && meta.touched ? 'error.main' : 'text.secondary',
        }}
      >
        {label}
      </Typography>
      <Stack
        direction='row'
        sx={{
          borderRadius: '4.5px',
          borderWidth: dragged ? 2 : 1,
          borderStyle:
            meta.value === null || (meta && meta.error && meta.touched)
              ? 'dashed'
              : 'solid',
          borderColor:
            meta && meta.error && meta.touched && !dragged
              ? 'error.main'
              : dragged || meta.value !== null
              ? 'primary.main'
              : '#3b3b3b',
          alignItems: 'center',
          height: 56,
          backgroundColor: dragged ? 'background.light' : 'background.default',
        }}
      >
        {meta.value !== null ? (
          <Stack sx={{ width: '97%' }} direction='row'>
            <Typography
              noWrap
              sx={{
                marginX: '15px',
                marginY: '16.5px',
                maxWidth: '80%',
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 'auto',
              }}
            >
              {fileName}
            </Typography>
            <Button onClick={handleDelete}>Usuń</Button>
          </Stack>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
            }}
            {...getRootProps()}
          >
            <Typography
              sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}
              fontWeight='light'
            >
              {`Upuść plik tutaj (${acceptedFileTypes.join(' ').toString()})`}
            </Typography>
          </Box>
        )}
      </Stack>
      {meta && meta.error && meta.touched && (
        <Typography fontSize={12} sx={{ paddingX: '14px', color: 'error.main' }}>
          {meta.error}
        </Typography>
      )}
    </Stack>
  );
}

export default FormikFileUploader;
