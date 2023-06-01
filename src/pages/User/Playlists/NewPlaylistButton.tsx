import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useCreatePlaylist } from '../../../api/playlist';
import StatusSnackbar from '../../../components/StatusSnackbar';
import FormDialog from '../../../components/layout/FormDialog';
import { formFields } from '../../../data/formData/playlist';
import { PlaylistVisibility, PostPlaylist } from '../../../types/PlaylistTypes';
import { getErrorMessage } from '../../../utils/utils';
import BaseForm from '../../Login/BaseForm';

const initialValues = {
  name: '',
  visibility: PlaylistVisibility.Private,
};

function NewPlaylistButton() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string | null>(null);

  const { mutate: createPlaylist, isLoading, isSuccess, error } = useCreatePlaylist();

  const handleSubmit = (values: PostPlaylist) => {
    setNewPlaylistName(values.name);
    setIsDialogOpen(false);
    createPlaylist(values);
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        disabled={isLoading}
        startIcon={<Add />}
        variant='contained'
        size='large'
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        Utwórz nową
      </Button>
      <FormDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <BaseForm<PostPlaylist>
          title='Utwórz grajlistę'
          buttonText='Utwórz'
          icon={<Add />}
          formFields={formFields}
          errorMessage={getErrorMessage(error)}
          isLoading={isLoading}
          alertCollapse={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </FormDialog>
      <StatusSnackbar
        loadingMessage={`Tworzenie grajlisty ${newPlaylistName}…`}
        successMessage={`Pomyślnie utworzono grajlistę ${newPlaylistName}!`}
        errorMessage='Nie udało się utworzyć grajlisty'
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default NewPlaylistButton;
