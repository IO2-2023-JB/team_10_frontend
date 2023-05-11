import { Add } from '@mui/icons-material';
import { Alert, Button, Grid, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreatePlaylist } from '../../../api/playlist';
import FormikSwitch from '../../../components/formikFields/FormikSwitch';
import FormikTextField from '../../../components/formikFields/FormikTextField';
import FormDialog from '../../../components/layout/FormDialog';
import { CreatePlaylist, PlaylistVisibility } from '../../../types/PlaylistTypes';
import BaseForm from '../../Login/BaseForm';

export const formFields = (
  <>
    <FormikTextField name='name' label='Nazwa' />
    <FormikSwitch
      name='visibility'
      labels={['Prywatna', 'Publiczna']}
      options={[PlaylistVisibility.Private, PlaylistVisibility.Public]}
    />
  </>
);

const initialValues = {
  name: '',
  visibility: PlaylistVisibility.Private,
};

function NewPlaylistButton() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState<boolean>(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string | null>(null);

  const {
    data: newPlaylist,
    mutate: createPlaylist,
    isLoading,
    error,
  } = useCreatePlaylist();

  const handleSubmit = (values: CreatePlaylist) => {
    setNewPlaylistName(values.name);
    createPlaylist(values);
  };

  useEffect(() => {
    if (isDialogOpen && newPlaylist !== undefined) {
      setIsDialogOpen(false);
      setIsSuccessSnackbarOpen(true);
    }
  }, [isDialogOpen, newPlaylist]);

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Button
          onClick={() => setIsDialogOpen(true)}
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
      </Grid>
      <FormDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <BaseForm<CreatePlaylist>
          title='Utwórz playlistę'
          buttonText='Utwórz'
          icon={<Add />}
          formFields={formFields}
          errorMessage={error?.message ?? ''} // TODO getErrorMessage!
          isLoading={isLoading}
          alertCollapse={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </FormDialog>
      <Snackbar
        open={isSuccessSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setIsSuccessSnackbarOpen(false)}
      >
        <Alert variant='filled'>Pomyślnie utworzono playlistę {newPlaylistName}!</Alert>
      </Snackbar>
    </>
  );
}

export default NewPlaylistButton;
