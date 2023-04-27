import { Alert, AlertTitle, Button, MenuItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDeleteVideo } from '../../api/video';
import FormDialog from '../../components/layout/FormDialog';
import SpinningButton from '../../components/SpinningButton';
import { useQueryClient } from '@tanstack/react-query';
import { videoMetadataKey } from './../../api/video';

interface VideoDeleteProps {
  videoId: string;
  asMenuItem?: boolean;
}

function VideoDelete({ videoId, asMenuItem = false }: VideoDeleteProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, error, isSuccess, isLoading } = useDeleteVideo(videoId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDeleteDialogOpen(false);
      navigate('/');
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey] });
    }
  }, [isSuccess, navigate, queryClient]);

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
