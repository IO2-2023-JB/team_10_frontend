import { Mode } from '@mui/icons-material';
import { Button, MenuItem, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useEditVideoMetadata } from '../../api/video';
import FormikAutocomplete from '../../components/formikFields/FormikAutocomplete';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import FormDialog from '../../components/layout/FormDialog';
import { ALLOWED_IMAGE_FORMATS, ALLOWED_IMAGE_OBJECT } from '../../const';
import { EXAMPLE_TAGS } from '../../const/predefined_tags';
import { GetVideoMetadataResponse, VideoVisibility } from '../../types/VideoTypes';
import { useLoadImage } from '../../utils/hooks';
import { getErrorMessage, toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';
import { videoUploadValidationSchema } from '../Upload/VideoUploadForm';
import FormikFileUploader from './../../components/formikFields/FormikFileUploader';

export interface MetadataFormValues {
  title: string;
  description: string;
  tags: string[];
  visibility: VideoVisibility;
  thumbnail: Blob | null;
}

const validationSchema = videoUploadValidationSchema.omit(['videoFile']);

const formFields = (
  <>
    <FormikTextField name='title' label='Tytuł' />
    <FormikTextField name='description' label='Opis' />
    <FormikAutocomplete
      name='tags'
      multiple
      freeSolo
      autoSelect
      options={EXAMPLE_TAGS}
      onInputChange={(event, value) => {
        if (value.endsWith(',')) {
          const target = event.currentTarget as HTMLInputElement;
          target.blur();
          target.focus();
        }
      }}
      TextFieldProps={{
        label: 'Tagi',
      }}
    />
    <FormikSwitch
      name='visibility'
      labels={['Prywatny', 'Publiczny']}
      options={[VideoVisibility.Private, VideoVisibility.Public]}
    />
    <FormikFileUploader
      name='thumbnail'
      label='Miniaturka'
      acceptedFileTypes={ALLOWED_IMAGE_FORMATS}
      acceptObject={ALLOWED_IMAGE_OBJECT}
      preview
      previewProps={{
        sx: {
          height: 70,
          width: 124,
        },
        variant: 'rounded',
      }}
      previewSkeleton={
        <Skeleton variant='rounded' sx={{ aspectRatio: '16 / 9', height: 70 }} />
      }
    />
  </>
);

interface MetadataFormProps {
  videoMetadata: GetVideoMetadataResponse;
  asMenuItem?: boolean;
}

function MetadataForm({ videoMetadata, asMenuItem = false }: MetadataFormProps) {
  const { mutate, error, isLoading, isSuccess } = useEditVideoMetadata(videoMetadata.id);
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
          formFields={formFields}
          initialValues={formikInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          errorMessage={getErrorMessage(error)}
          isLoading={isLoading}
          alertCollapse
        />
      </FormDialog>
    </>
  );
}

export default MetadataForm;
