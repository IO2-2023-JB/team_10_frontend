import { Mode } from '@mui/icons-material';
import { Button, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useEditVideoMetadata } from '../../api/video';
import StatusSnackbar from '../../components/StatusSnackbar';
import FormDialog from '../../components/layout/FormDialog';
import {
  MetadataFormFields,
  MetadataFormValues,
  videoUploadValidationSchema,
} from '../../data/formData/video';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { useLoadImage } from '../../utils/hooks';
import { getErrorMessage, toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';

const validationSchema = videoUploadValidationSchema.omit(['videoFile']);

interface MetadataFormProps {
  videoMetadata: GetVideoMetadataResponse;
  asMenuItem?: boolean;
}

function MetadataForm({ videoMetadata, asMenuItem = false }: MetadataFormProps) {
  const { mutate, error, isLoading, isSuccess, reset } = useEditVideoMetadata(
    videoMetadata.id
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [thumbnailImage, setThumbnailImage] = useState<Blob | null>(null);

  const handleSubmit = async (values: MetadataFormValues) => {
    const file = values.thumbnail !== null ? await toBase64(values.thumbnail) : null;
    const payload = {
      ...values,
      thumbnail: file,
    };
    mutate(payload);
    setThumbnailImage(values.thumbnail);
  };

  const prepareInitialValues = useLoadImage(videoMetadata.thumbnail, setThumbnailImage);

  useEffect(() => {
    prepareInitialValues();
  }, [prepareInitialValues]);

  useEffect(() => {
    if (isSuccess) setIsDialogOpen(false);
  }, [isSuccess]);

  const formikInitialValues: MetadataFormValues = {
    title: videoMetadata.title,
    description: videoMetadata.description,
    tags: videoMetadata.tags,
    visibility: videoMetadata.visibility,
    thumbnail: thumbnailImage,
  };

  return (
    <>
      {asMenuItem ? (
        <MenuItem onClick={() => setIsDialogOpen(true)}>Edytuj szczegóły</MenuItem>
      ) : (
        <Button onClick={() => setIsDialogOpen(true)}>Edytuj szczegóły</Button>
      )}
      <FormDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <BaseForm<MetadataFormValues>
          title='Edycja filmu'
          buttonText='Zapisz zmiany'
          icon={<Mode />}
          formFields={<MetadataFormFields />}
          initialValues={formikInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          errorMessage={getErrorMessage(error)}
          isLoading={isLoading}
          alertCollapse
        />
      </FormDialog>
      <StatusSnackbar
        successMessage={`Pomyślnie edytowano dane filmu!`}
        isSuccess={isSuccess}
        reset={reset}
      />
    </>
  );
}

export default MetadataForm;
