import { Alert, AlertTitle, Button, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDeleteVideo } from '../../api/video';
import SpinningButton from '../../components/SpinningButton';
import FormDialog from '../../components/layout/FormDialog';
import { getErrorMessage } from '../../utils/utils';

interface VideoDeleteProps {
  videoId: string;
  asMenuItem?: boolean;
}

function VideoDelete({ videoId, asMenuItem = false }: VideoDeleteProps) {
  const navigate = useNavigate();
  const { mutate, error, isLoading } = useDeleteVideo(videoId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        if (!asMenuItem) navigate('/');
      },
    });
  };

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
    </>
  );
}

export default VideoDelete;
