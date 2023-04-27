import { Avatar, Box, Button, Stack, Typography, Skeleton } from '@mui/material';
import { useField } from 'formik';
import { useState, useEffect } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { toBase64 } from '../../utils/utils';

interface ImageUploaderProps {
  name: string;
  label: string;
  acceptedFileTypes: string[];
  acceptObject: Accept;
  preview: boolean | null;
}

function FormikFileUploader({
  name,
  label,
  acceptedFileTypes,
  acceptObject,
  preview,
}: ImageUploaderProps) {
  const [_, meta, helpers] = useField(name);
  const [dragged, setDragged] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const handleDrop = async (files: File[]) => {
    helpers.setTouched(true);
    setDragged(false);
    if (files.length > 0) {
      helpers.setValue(files[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setDragged(true),
    onDragLeave: () => setDragged(false),
    maxFiles: 1,
    accept: acceptObject,
  });

  const handleDelete = () => {
    helpers.setValue(null);
    setPreviewImage(null);
    meta.touched = true;
  };

  useEffect(() => {
    if (preview && meta.value) {
      setIsPreviewLoading(true);
      toBase64(meta.value).then((res) => {
        setPreviewImage(res);
        setIsPreviewLoading(false);
      });
    }
  }, [meta.value, preview]);

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
      <Stack alignItems='center' direction='row'>
        {preview &&
          (previewImage !== null ? (
            <Avatar
              src={previewImage}
              sx={{
                backgroundColor: 'primary.main',
                width: 70,
                height: 70,
                marginRight: 2,
              }}
            />
          ) : isPreviewLoading ? (
            <Skeleton variant='circular' sx={{ width: 90, height: 70, marginRight: 2 }} />
          ) : (
            <></>
          ))}
        <input {...getInputProps()} />
        <Stack
          direction='row'
          sx={{
            width: '100%',
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
            backgroundColor: dragged ? 'background.light' : 'inherit',
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
                {preview && !meta.touched && meta.initialValue !== null
                  ? `Aktualny ${label}`
                  : meta.value.name}
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
