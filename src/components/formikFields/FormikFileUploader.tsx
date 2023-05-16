import { Avatar, Box, Button, Stack, Typography, AvatarProps } from '@mui/material';
import { useField } from 'formik';
import { useState, useEffect, ReactNode } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { nounGenders } from '../../utils/genderDeclinedAdjectives';
import { toBase64 } from '../../utils/utils';
import { Adjective, genderDeclension } from '../../utils/genderDeclinedAdjectives';

interface FormikFileUploaderProps {
  name: string;
  label: string;
  acceptedFileTypes: string[];
  acceptObject: Accept;
  preview?: boolean;
  previewProps?: AvatarProps;
  previewSkeleton?: ReactNode;
}

function FormikFileUploader({
  name,
  label,
  acceptedFileTypes,
  acceptObject,
  preview,
  previewProps,
  previewSkeleton,
}: FormikFileUploaderProps) {
  const [_, meta, helpers] = useField<File | null>(name);
  const [dragged, setDragged] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
      toBase64(meta.value).then((file) => {
        setPreviewImage(file);
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
          meta.value !== null &&
          (previewImage !== null ? (
            <Box sx={{ marginRight: 2 }}>
              <Avatar src={previewImage} {...previewProps} />
            </Box>
          ) : (
            <Box sx={{ marginRight: 2 }}>{previewSkeleton}</Box>
          ))}
        <input {...getInputProps()} />
        <Stack
          direction='row'
          sx={{
            flex: 1,
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
            backgroundColor: dragged ? 'background.light' : null,
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
                  ? `${genderDeclension(
                      Adjective.Current,
                      nounGenders[label.toLowerCase()],
                      false,
                      true
                    )} ${label.toLowerCase()}`
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
