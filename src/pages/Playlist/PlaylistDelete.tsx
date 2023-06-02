import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeletePlaylist } from '../../api/playlist';
import SpinningButton from '../../components/SpinningButton';
import StatusSnackbar from '../../components/StatusSnackbar';
import FormDialog from '../../components/layout/FormDialog';
import { ROUTES } from '../../const';
import { GetPlaylist } from '../../types/PlaylistTypes';
import { getErrorMessage } from '../../utils/utils';

interface PlaylistDeleteProps {
  id: string;
  playlist: GetPlaylist;
}

function PlaylistDelete({ id, playlist }: PlaylistDeleteProps) {
  const navigate = useNavigate();

  const {
    mutate: deletePlaylist,
    error,
    isSuccess,
    isLoading,
    reset,
  } = useDeletePlaylist(id, playlist.authorId);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {
    deletePlaylist();
  };

  useEffect(() => {
    if (isSuccess) navigate(`${ROUTES.USER}/${playlist.authorId}/playlists`);
  }, [isSuccess, navigate, playlist.authorId]);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Usuń</Button>
      <FormDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Stack spacing={3}>
          {error && (
            <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
              <AlertTitle>Wystąpił błąd!</AlertTitle>
              {getErrorMessage(error)}
            </Alert>
          )}
          <Typography variant='h5'>
            Czy na pewno chcesz usunąć grajlistę {playlist.name}?
          </Typography>
          <SpinningButton
            variant='contained'
            color='error'
            onClick={handleDelete}
            isLoading={isLoading}
          >
            Usuń
          </SpinningButton>
        </Stack>
      </FormDialog>
      <StatusSnackbar
        successMessage='Pomyślnie usunięto film.'
        isSuccess={isSuccess}
        reset={reset}
      />
    </>
  );
}

export default PlaylistDelete;
