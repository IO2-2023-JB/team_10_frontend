import { Alert, AlertTitle, Button, MenuItem, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDeleteVideo } from '../../api/video';
import SpinningButton from '../../components/SpinningButton';
import FormDialog from '../../components/layout/FormDialog';
import { ROUTES } from '../../const';
import { snackbarState } from '../../data/SnackbarData';
import { userDetailsState } from '../../data/UserData';
import { getErrorMessage } from '../../utils/utils';
import { videoMetadataKey } from './../../api/video';

interface VideoDeleteProps {
  videoId: string;
  asMenuItem?: boolean;
}

function VideoDelete({ videoId, asMenuItem = false }: VideoDeleteProps) {
  const setSnackbarState = useSetRecoilState(snackbarState);
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isSuccess, isLoading, reset } = useDeleteVideo(videoId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const location = useLocation();

  const prevPageExists = location.key !== 'default';

  const handleDelete = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSnackbarState({
        successMessage: `Pomyślnie usunięto film.`,
      });
      setIsDeleteDialogOpen(false);
      if (!asMenuItem) prevPageExists ? navigate(-1) : navigate(`/${ROUTES.HOMEPAGE}`);

      queryClient.invalidateQueries({ queryKey: [videoMetadataKey] });
    }
  }, [
    asMenuItem,
    isSuccess,
    loggedUserDetails?.id,
    navigate,
    prevPageExists,
    queryClient,
    reset,
    setSnackbarState,
  ]);

  const deleteVideoText = 'Usuń wideło';

  return (
    <>
      {asMenuItem ? (
        <MenuItem onClick={() => setIsDeleteDialogOpen(true)}>{deleteVideoText}</MenuItem>
      ) : (
        <Button onClick={() => setIsDeleteDialogOpen(true)}>{deleteVideoText}</Button>
      )}
      <FormDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <Stack spacing={3}>
          {error && (
            <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
              <AlertTitle>Wystąpił błąd!</AlertTitle>
              {getErrorMessage(error)}
            </Alert>
          )}
          <Typography variant='h5'>Czy na pewno chcesz usunąć film?</Typography>
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

export default VideoDelete;
