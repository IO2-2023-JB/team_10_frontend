import { Skeleton } from '@mui/material';
import * as Yup from 'yup';
import FormikAutocomplete from '../../components/formikFields/FormikAutocomplete';
import FormikFileUploader from '../../components/formikFields/FormikFileUploader';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import {
  ALLOWED_IMAGE_FORMATS,
  ALLOWED_IMAGE_OBJECT,
  ALLOWED_VIDEO_FORMATS,
  ALLOWED_VIDEO_OBJECT,
  MAX_VIDEO_DESCRIPTION_LENGTH,
  MAX_VIDEO_TITLE_LENGTH,
} from '../../const';
import { VideoVisibility } from '../../types/VideoTypes';

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

interface MetadataFormFieldsProps {
  showVideoField?: boolean;
}

export function MetadataFormFields({ showVideoField = false }: MetadataFormFieldsProps) {
  return (
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
      {showVideoField && (
        <FormikFileUploader
          name='videoFile'
          label='Wideo'
          acceptedFileTypes={ALLOWED_VIDEO_FORMATS}
          acceptObject={ALLOWED_VIDEO_OBJECT}
        />
      )}
      <FormikSwitch
        name='visibility'
        labels={['Prywatny', 'Publiczny']}
        options={[VideoVisibility.Private, VideoVisibility.Public]}
      />
    </>
  );
}
