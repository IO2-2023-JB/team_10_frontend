import * as Yup from 'yup';
import { MAX_VIDEO_DESCRIPTION_LENGTH, MAX_VIDEO_TITLE_LENGTH } from '../const';
import { VideoVisibility } from '../types/VideoTypes';

export interface MetadataFormValues {
  title: string;
  description: string;
  tags: string[];
  visibility: VideoVisibility;
  thumbnail: Blob | null;
}

export const videoUploadValidationSchema = Yup.object({
  title: Yup.string()
    .max(MAX_VIDEO_TITLE_LENGTH, `Maksymalnie ${MAX_VIDEO_TITLE_LENGTH} znaków`)
    .required('Pole wymagane'),
  description: Yup.string().max(
    MAX_VIDEO_DESCRIPTION_LENGTH,
    `Maksymalnie ${MAX_VIDEO_DESCRIPTION_LENGTH} znaków`
  ),
  tags: Yup.array(Yup.string()),
  videoFile: Yup.string().required('Pole wymagane'),
});
