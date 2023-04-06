import FormikTextField from '../../components/formikFields/FormikTextField';
import BaseForm from '../Login/BaseForm';
import { Publish } from '@mui/icons-material';
import * as Yup from 'yup';
import { useVideoMetadataUpload } from '../../api/video';
import {
  InputType,
  UploadVideo,
  VideoVisibility,
} from '../../data/VideoMetadata';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import { Stack } from '@mui/material';
import { MetadataFormValues } from './../Video/MetadataForm';
import FormikFileUploader from '../../components/formikFields/FormikFileUploader';

export type VideoUploadFormValues = {
  video: FormData;
  thumbnail: string;
} & MetadataFormValues;

const videoUploadValidationSchema = Yup.object({
  title: Yup.string().max(100, 'Maksymalnie 100 znaków').required('Pole wymagane'),
  description: Yup.string().max(1000, 'Maksymalnie 1000 znaków'),
  tags: Yup.string(),
});

const formikInitialValues = {
  title: '',
  description: '',
  thumbnail: '',
  tags: '',
  visibility: VideoVisibility.Private,
  video: new FormData(),
};

function VideoUploadForm() {
  const { mutate, error, isLoading } = useVideoMetadataUpload();

  const formFields = (
    <>
      <FormikTextField name='title' label='Tytuł' />
      <FormikTextField name='description' label='Opis' />
      <FormikTextField name='tags' label='Tagi' />
      <FormikFileUploader name='thumbnail' label='Miniaturka' type={InputType.Image} />
      <FormikFileUploader name='video' label='Wideo' type={InputType.Video} />
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
