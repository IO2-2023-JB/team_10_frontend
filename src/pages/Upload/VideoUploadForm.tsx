import { Publish } from '@mui/icons-material';
import { Stack } from '@mui/material';
import * as Yup from 'yup';
import { useVideoUpload } from '../../api/video';
import FormikFileUploader from '../../components/formikFields/FormikFileUploader';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { ALLOWED_IMAGE_FORMATS, ALLOWED_IMAGE_OBJECT } from '../../const';
import { UploadVideo, VideoVisibility } from '../../types/VideoTypes';
import { toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';
import { ALLOWED_VIDEO_FORMATS, ALLOWED_VIDEO_OBJECT } from './../../const';
import { MetadataFormValues } from './../Video/MetadataForm';

export type VideoUploadFormValues = {
  videoFile: File | null;
  thumbnail: File | null;
} & MetadataFormValues;

export const videoUploadValidationSchema = Yup.object({
  title: Yup.string().max(100, 'Maksymalnie 100 znaków').required('Pole wymagane'),
  description: Yup.string().max(1000, 'Maksymalnie 1000 znaków'),
  tags: Yup.string(),
  videoFile: Yup.string().required('Pole wymagane'),
});

const formikInitialValues = {
  title: '',
  description: '',
  thumbnail: null,
  tags: '',
  visibility: VideoVisibility.Private,
  videoFile: null,
};

function VideoUploadForm() {
  const { mutate, error, isLoading } = useVideoUpload();

  const formFields = (
    <>
      <FormikTextField name='title' label='Tytuł' />
      <FormikTextField name='description' label='Opis' />
      <FormikTextField name='tags' label='Tagi' />
      <FormikFileUploader
        name='thumbnail'
        label='Miniaturka'
        acceptedFileTypes={ALLOWED_IMAGE_FORMATS}
        acceptObject={ALLOWED_IMAGE_OBJECT}
      />
      <FormikFileUploader
        name='videoFile'
        label='Wideo'
        acceptedFileTypes={ALLOWED_VIDEO_FORMATS}
        acceptObject={ALLOWED_VIDEO_OBJECT}
      />
      <FormikSwitch
        checked={true}
        name='visibility'
        labels={['Prywatny', 'Publiczny']}
        options={[VideoVisibility.Private, VideoVisibility.Public]}
      />
    </>
  );

  const handleSubmit = async (values: VideoUploadFormValues) => {
    const formData = new FormData();
    formData.append('videoFile', values.videoFile as File, values.videoFile?.name);
    const parsedValues: UploadVideo = {
      ...values,
      videoFile: formData,
      thumbnail: values.thumbnail !== null ? await toBase64(values.thumbnail) : null,
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
