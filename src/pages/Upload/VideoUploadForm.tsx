import { Publish } from '@mui/icons-material';
import { Skeleton, Stack } from '@mui/material';
import { useVideoUpload } from '../../api/video';
import FormikAutocomplete from '../../components/formikFields/FormikAutocomplete';
import FormikFileUploader from '../../components/formikFields/FormikFileUploader';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import {
  ALLOWED_IMAGE_FORMATS,
  ALLOWED_IMAGE_OBJECT,
  ALLOWED_VIDEO_FORMATS,
  ALLOWED_VIDEO_OBJECT,
} from '../../const';
import {
  MetadataFormValues,
  videoUploadValidationSchema,
} from '../../data/formData/video';
import { PostVideo, VideoVisibility } from '../../types/VideoTypes';
import { getErrorMessage, toBase64 } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';

type VideoUploadFormValues = {
  videoFile: File | null;
  thumbnail: File | null;
} & MetadataFormValues;

const formikInitialValues = {
  title: '',
  description: '',
  thumbnail: null,
  tags: [],
  visibility: VideoVisibility.Private,
  videoFile: null,
};

function VideoUploadForm() {
  const { mutate, error, isLoading } = useVideoUpload();

  const formFields = (
    <>
      <FormikTextField name='title' label='Tytuł' />
      <FormikTextField name='description' label='Opis' />
      <FormikAutocomplete
        name='tags'
        multiple
        freeSolo
        autoSelect
        optionsPromiseFn={() =>
          import('../../const/predefined_tags').then((module) => module.default)
        }
        loadingText='Pobieranie sugestii...'
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
      <FormikFileUploader
        name='videoFile'
        label='Wideo'
        acceptedFileTypes={ALLOWED_VIDEO_FORMATS}
        acceptObject={ALLOWED_VIDEO_OBJECT}
      />
      <FormikSwitch
        name='visibility'
        labels={['Prywatny', 'Publiczny']}
        options={[VideoVisibility.Private, VideoVisibility.Public]}
      />
    </>
  );

  const handleSubmit = async (values: VideoUploadFormValues) => {
    const formData = new FormData();
    formData.append('videoFile', values.videoFile as File, values.videoFile?.name);
    const parsedValues: PostVideo = {
      ...values,
      videoFile: formData,
      thumbnail: values.thumbnail !== null ? await toBase64(values.thumbnail) : null,
    };
    mutate(parsedValues);
  };

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
        errorMessage={getErrorMessage(error)}
        isLoading={isLoading}
        alertCollapse={false}
      />
    </Stack>
  );
}

export default VideoUploadForm;
