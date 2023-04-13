import FormikTextField from '../../components/formikFields/FormikTextField';
import BaseForm from '../Login/BaseForm';
import { Publish } from '@mui/icons-material';
import * as Yup from 'yup';
import { useVideoMetadataUpload } from '../../api/video';
import { UploadVideo, VideoVisibility } from '../../data/VideoMetadata';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import { Stack } from '@mui/material';
import { MetadataFormValues } from './../Video/MetadataForm';
import FileUploader from './FileUploader';

export type VideoUploadFormValues = {
  thumbnail: string;
} & MetadataFormValues;

const videoUploadValidationSchema = Yup.object({
  title: Yup.string().max(100, 'Maksymalnie 100 znaków'),
  description: Yup.string().max(1000, 'Maksymalnie 1000 znaków'),
  tags: Yup.string(),
});

const formikInitialValues = {
  title: '',
  description: '',
  thumbnail: '',
  tags: '',
  visibility: VideoVisibility.Private,
};

function VideoUploadForm() {
  const { mutate, error, isLoading } = useVideoMetadataUpload();
  const file1 = { name: 'Miniaturka' };
  const file2 = { name: 'Wideo' };

  const formFields = (
    <>
      <FormikTextField name='title' label='Tytuł' />
      <FormikTextField name='description' label='Opis' />
      <FormikTextField name='tags' label='Tagi' />
      <FileUploader file={file1 as any} onUpload={() => null} onDelete={() => null} />
      <FileUploader file={file2 as any} onUpload={() => null} onDelete={() => null} />
      <FormikSwitch
        checked={true}
        name='visibility'
        labels={['Prywatny', 'Publiczny']}
        options={[VideoVisibility.Private, VideoVisibility.Public]}
      />
    </>
  );

  const handleSubmit = (values: VideoUploadFormValues) => {
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
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <BaseForm<VideoUploadFormValues>
        title='Publikacja wideo'
        buttonText='Publikuj'
        icon={<Publish />}
        formFields={formFields}
        initialValues={formikInitialValues}
        validationSchema={videoUploadValidationSchema}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        isLoading={isLoading}
        alertCollapse={false}
      />
    </Stack>
  );
}

export default VideoUploadForm;
