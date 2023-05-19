import { Mode } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useEditPlaylist } from '../../api/playlist';
import FormDialog from '../../components/layout/FormDialog';
import { formFields } from '../../formData/playlist';
import { GetPlaylist, PutPlaylist } from '../../types/PlaylistTypes';
import { getErrorMessage } from '../../utils/utils';
import BaseForm from '../Login/BaseForm';

interface PlaylistEditForm {
  id: string;
  playlist: GetPlaylist;
}

function PlaylistEditForm({ id, playlist }: PlaylistEditForm) {
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
          title='Edycja playlisty'
          buttonText='Zapisz zmiany'
          icon={<Mode />}
          formFields={formFields}
          initialValues={formikInitialValues}
          validationSchema={Yup.object()}
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
