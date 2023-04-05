import { Mode } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { useEditVideoMetadata } from '../../api/video';
import FormDialog from '../../components/FormDialog';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import {
  GetVideoMetadataResponse,
  UploadVideo,
  VideoVisibility,
} from '../../data/VideoMetadata';
import BaseForm from '../Login/BaseForm';

export interface MetadataFormValues {
  title: string;
  description: string;
  tags: string;
  visibility: VideoVisibility;
}

const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  tags: Yup.string().required(),
});

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
  </>
);

interface MetadataFormProps {
  videoMetadata: GetVideoMetadataResponse;
}

function MetadataForm({ videoMetadata }: MetadataFormProps) {
  const { mutate, error, isLoading } = useEditVideoMetadata(videoMetadata.id);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSubmit = (values: MetadataFormValues) => {
    const parsedValues: UploadVideo = {
      ...values,
      tags: values.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      thumbnail: null,
    };
    mutate(parsedValues);
  };

  const errorMessage = error?.message ?? '';

  const formikInitialValues: MetadataFormValues = {
    title: videoMetadata.title,
    description: videoMetadata.description,
    tags: videoMetadata.tags.join(', '),
    visibility: videoMetadata.visibility,
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Edytuj szczegóły</Button>
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
          alertCollapse={false}
        />
      </FormDialog>
    </>
  );
}

export default MetadataForm;
