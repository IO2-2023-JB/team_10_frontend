import { Mode } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useEditPlaylist } from '../../api/playlist';
import FormDialog from '../../components/layout/FormDialog';
import { EditPlaylist, Playlist } from '../../types/PlaylistTypes';
import BaseForm from '../Login/BaseForm';
import { formFields } from '../User/Playlists/NewPlaylistButton';

interface PlaylistEditForm {
  id: string;
  playlist: Playlist;
}

function PlaylistEditForm({ id, playlist }: PlaylistEditForm) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    mutate: editPlaylist,
    error,
    isLoading,
    isSuccess,
  } = useEditPlaylist(id, playlist.authorId);

  const handleSubmit = (values: EditPlaylist) => {
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
        <BaseForm<EditPlaylist>
          title='Edycja playlisty'
          buttonText='Zapisz zmiany'
          icon={<Mode />}
          formFields={formFields}
          initialValues={formikInitialValues}
          validationSchema={Yup.object()}
          onSubmit={handleSubmit}
          errorMessage={error?.message ?? ''} // TODO change to getErrorMessage()
          isLoading={isLoading}
          alertCollapse={true}
        />
      </FormDialog>
    </>
  );
}

export default PlaylistEditForm;
