import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useCreatePlaylist } from '../../../api/playlist';
import StatusSnackbar from '../../../components/StatusSnackbar';
import FormikSwitch from '../../../components/formikFields/FormikSwitch';
import FormikTextField from '../../../components/formikFields/FormikTextField';
import FormDialog from '../../../components/layout/FormDialog';
import { CreatePlaylist, PlaylistVisibility } from '../../../types/PlaylistTypes';
import { getErrorMessage } from '../../../utils/utils';
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
  const [newPlaylistName, setNewPlaylistName] = useState<string | null>(null);

  const { mutate: createPlaylist, isLoading, isSuccess, error } = useCreatePlaylist();

  const handleSubmit = (values: CreatePlaylist) => {
    setNewPlaylistName(values.name);
    setIsDialogOpen(false);
    createPlaylist(values);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
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
      </Grid>
      <FormDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <BaseForm<CreatePlaylist>
          title='Utwórz playlistę'
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
        loadingMessage={`Tworzenie playlisty ${newPlaylistName}…`}
        successMessage={`Pomyślnie utworzono playlistę ${newPlaylistName}!`}
        errorMessage='Nie udało się utworzyć playlisty'
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default NewPlaylistButton;
