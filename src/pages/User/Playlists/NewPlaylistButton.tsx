import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreatePlaylist } from '../../../api/playlist';
import FormDialog from '../../../components/layout/FormDialog';
import { snackbarState } from '../../../data/SnackbarData';
import {
  PlaylistFormFields,
  playlistValidationSchema,
} from '../../../data/formData/playlist';
import { PlaylistVisibility, PostPlaylist } from '../../../types/PlaylistTypes';
import { getErrorMessage } from '../../../utils/utils';
import BaseForm from '../../Login/BaseForm';

const initialValues = {
  name: '',
  visibility: PlaylistVisibility.Private,
};

function NewPlaylistButton() {
  const setSnackbarState = useSetRecoilState(snackbarState);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string | null>(null);

  const {
    mutate: createPlaylist,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useCreatePlaylist();

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSnackbarState({
        successMessage: `Pomyślnie utworzono grajlistę ${newPlaylistName}!`,
      });
      setIsDialogOpen(false);
    }
  }, [isSuccess, newPlaylistName, reset, setSnackbarState]);

  const handleSubmit = (values: PostPlaylist) => {
    setNewPlaylistName(values.name);
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
          formFields={<PlaylistFormFields />}
          errorMessage={getErrorMessage(error)}
          validationSchema={playlistValidationSchema}
          isLoading={isLoading}
          alertCollapse={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </FormDialog>
    </>
  );
}

export default NewPlaylistButton;
