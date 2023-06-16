import { Publish } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useVideoUpload } from '../../api/video';
import {
  MetadataFormFields,
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
  const navigate = useNavigate();
  const { mutate, error, isLoading } = useVideoUpload();

  const handleSubmit = async (values: VideoUploadFormValues) => {
    const formData = new FormData();
    formData.append('videoFile', values.videoFile as File, values.videoFile?.name);
    const parsedValues: PostVideo = {
      ...values,
      videoFile: formData,
      thumbnail: values.thumbnail !== null ? await toBase64(values.thumbnail) : null,
    };
    mutate(parsedValues);
    navigate('/');
  };

  return (
    <BaseForm<VideoUploadFormValues>
      title='Publikacja wideo'
      buttonText='Publikuj'
      icon={<Publish />}
      formFields={<MetadataFormFields showVideoField />}
      initialValues={formikInitialValues}
      validationSchema={videoUploadValidationSchema}
      onSubmit={handleSubmit}
      errorMessage={getErrorMessage(error)}
      isLoading={isLoading}
      alertCollapse={false}
    />
  );
}

export default VideoUploadForm;
