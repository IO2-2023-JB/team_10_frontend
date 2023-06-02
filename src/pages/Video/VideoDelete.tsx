import { Alert, AlertTitle, Button, MenuItem, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useDeleteVideo } from '../../api/video';
import SpinningButton from '../../components/SpinningButton';
import StatusSnackbar from '../../components/StatusSnackbar';
import FormDialog from '../../components/layout/FormDialog';
import { ROUTES } from '../../const';
import { userDetailsState } from '../../data/UserData';
import { getErrorMessage } from '../../utils/utils';
import { videoMetadataKey } from './../../api/video';

interface VideoDeleteProps {
  videoId: string;
  asMenuItem?: boolean;
}

function VideoDelete({ videoId, asMenuItem = false }: VideoDeleteProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isSuccess, isLoading, reset } = useDeleteVideo(videoId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        if (!asMenuItem) navigate('/');
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDeleteDialogOpen(false);
      if (!asMenuItem) navigate(`${ROUTES.USER}/${loggedUserDetails?.id}`);
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey] });
    }
  }, [isSuccess, navigate, queryClient, asMenuItem, loggedUserDetails?.id]);

  return (
    <>
      {asMenuItem ? (
        <MenuItem onClick={() => setIsDeleteDialogOpen(true)}>Usuń</MenuItem>
      ) : (
        <Button onClick={() => setIsDeleteDialogOpen(true)}>Usuń</Button>
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
      <StatusSnackbar
        successMessage='Pomyślnie usunięto film.'
        isSuccess={isSuccess}
        reset={reset}
      />
    </>
  );
}

export default VideoDelete;
