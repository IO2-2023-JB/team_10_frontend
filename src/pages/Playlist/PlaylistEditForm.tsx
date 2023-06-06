import { Mode } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useEditPlaylist } from '../../api/playlist';
import FormDialog from '../../components/layout/FormDialog';
import {
  PlaylistFormFields,
  playlistValidationSchema,
} from '../../data/formData/playlist';
import { GetPlaylist, PutPlaylist } from '../../types/PlaylistTypes';
import { getErrorMessage } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';

interface PlaylistEditFormProps {
  id: string;
  playlist: GetPlaylist;
}

function PlaylistEditForm({ id, playlist }: PlaylistEditFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    mutate: editPlaylist,
    error,
    isLoading,
    isSuccess,
  } = useEditPlaylist(id, playlist.authorId);

  const handleSubmit = (values: PutPlaylist) => {
    editPlaylist(values);
  };

  const formikInitialValues = {
    name: playlist.name,
    visibility: playlist.visibility,
  };

  useEffect(() => {
    if (isSuccess) setIsDialogOpen(false);
  }, [isSuccess]);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Edytuj</Button>
      <FormDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <BaseForm<PutPlaylist>
          title='Edycja grajlisty'
          buttonText='Zapisz zmiany'
          icon={<Mode />}
          formFields={<PlaylistFormFields />}
          initialValues={formikInitialValues}
          validationSchema={playlistValidationSchema}
          onSubmit={handleSubmit}
          errorMessage={getErrorMessage(error)}
          isLoading={isLoading}
          alertCollapse={true}
        />
      </FormDialog>
    </>
  );
}

export default PlaylistEditForm;
