import { Mode } from '@mui/icons-material';
import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useEditVideoMetadata } from '../../api/video';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import FormDialog from '../../components/layout/FormDialog';
import { GetVideoMetadataResponse, VideoVisibility } from '../../types/VideoTypes';
import BaseForm from '../Login/BaseForm';
import { videoUploadValidationSchema } from '../Upload/VideoUploadForm';
import FormikFileUploader from './../../components/formikFields/FormikFileUploader';
import { ALLOWED_IMAGE_FORMATS, ALLOWED_IMAGE_OBJECT } from '../../const';
import { toBase64 } from '../../utils/utils';

export interface MetadataFormValues {
  title: string;
  description: string;
  tags: string;
  visibility: VideoVisibility;
  thumbnail: File | null;
}

const validationSchema = videoUploadValidationSchema.omit(['videoFile']);

const formFields = (
  <>
    <FormikTextField name='title' label='Tytuł' />
    <FormikTextField name='description' label='Opis' />
    <FormikTextField name='tags' label='Tagi' />
    <FormikSwitch
      name='visibility'
      labels={['Prywatny', 'Publiczny']}
      options={[VideoVisibility.Private, VideoVisibility.Public]}
    />
    <FormikFileUploader
      name='thumbnail'
      label='Thumbnail'
      acceptedFileTypes={ALLOWED_IMAGE_FORMATS}
      acceptObject={ALLOWED_IMAGE_OBJECT}
      preview={true}
    />
  </>
);

interface MetadataFormProps {
  videoMetadata: GetVideoMetadataResponse;
  asMenuItem?: boolean;
}

function MetadataForm({ videoMetadata, asMenuItem = false }: MetadataFormProps) {
  const { mutate, error, isLoading } = useEditVideoMetadata(videoMetadata.id);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSubmit = (values: MetadataFormValues) => {
    toBase64(values.thumbnail!).then((res) => {
      const payload = {
        ...values,
        tags: values.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        thumbnail: res,
      };
      mutate(payload);
    });
  };

  const errorMessage = error?.message ?? '';

  const formikInitialValues: MetadataFormValues = {
    title: videoMetadata.title,
    description: videoMetadata.description,
    tags: videoMetadata.tags.join(', '),
    visibility: videoMetadata.visibility,
    thumbnail: null,
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
          errorMessage={errorMessage}
          isLoading={isLoading}
          alertCollapse={true}
        />
      </FormDialog>
    </>
  );
}

export default MetadataForm;
