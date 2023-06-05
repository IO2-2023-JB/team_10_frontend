import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useDeletePlaylist } from '../../api/playlist';
import SpinningButton from '../../components/SpinningButton';
import FormDialog from '../../components/layout/FormDialog';
import { ROUTES } from '../../const';
import { snackbarState } from '../../data/SnackbarData';
import { GetPlaylist } from '../../types/PlaylistTypes';
import { getErrorMessage } from '../../utils/utils';

interface PlaylistDeleteProps {
  id: string;
  playlist: GetPlaylist;
}

function PlaylistDelete({ id, playlist }: PlaylistDeleteProps) {
  const setSnackbarState = useSetRecoilState(snackbarState);
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
    if (isSuccess) {
      reset();
      setSnackbarState({
        successMessage: `Pomyślnie usunięto grajlistę ${playlist.name}.`,
      });
      navigate(`${ROUTES.USER}/${playlist.authorId}/playlists`);
    }
  }, [isSuccess, navigate, playlist.authorId, playlist.name, reset, setSnackbarState]);

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
    </>
  );
}

export default PlaylistDelete;
