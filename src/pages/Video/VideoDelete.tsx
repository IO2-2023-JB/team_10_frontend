import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDeleteVideo } from '../../api/video';
import FormDialog from '../../components/FormDialog';
import SpinningButton from '../../components/SpinningButton';

interface VideoDeleteProps {
  videoId: string;
}

function VideoDelete({ videoId }: VideoDeleteProps) {
  const navigate = useNavigate();

  const { mutate, error, isSuccess, isLoading } = useDeleteVideo(videoId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {
    mutate(null);
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  return (
    <>
      <Button onClick={() => setIsDeleteDialogOpen(true)}>Usuń</Button>
      <FormDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <Stack spacing={3}>
          {error && (
            <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
              <AlertTitle>Wystąpił błąd!</AlertTitle>
              {error?.message}
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