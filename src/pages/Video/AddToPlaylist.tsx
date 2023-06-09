import { PlaylistAdd } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAddVideoToPlaylist, useUserPlaylists } from '../../api/playlist';
import ContentSection from '../../components/layout/ContentSection';
import FormDialog from '../../components/layout/FormDialog';
import { snackbarState } from '../../data/SnackbarData';
import { userDetailsState } from '../../data/UserData';
import { useMobileLayout } from '../../theme';
import { GetPlaylistBase } from '../../types/PlaylistTypes';
import { getErrorMessage } from '../../utils/utils';
import PlaylistVisibilityLabel from '../Playlist/PlaylistVisibilityLabel';
import NewPlaylistButton from '../User/Playlists/NewPlaylistButton';

interface AddToPlaylistProps {
  videoId: string;
}

function AddToPlaylist({ videoId }: AddToPlaylistProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string | null>(null);
  const loggedInUser = useRecoilValue(userDetailsState);
  const setSnackbarState = useSetRecoilState(snackbarState);
  const { data: playlists, error, isLoading } = useUserPlaylists(loggedInUser?.id);
  const {
    mutate: addToPlaylist,
    isSuccess: isAddSuccess,
    error: addToPlaylistError,
    reset,
  } = useAddVideoToPlaylist(videoId);

  const { isMobile } = useMobileLayout();

  const handleAdd = (playlist: GetPlaylistBase) => {
    setPlaylistName(playlist.name);
    addToPlaylist(playlist.id);
  };

  useEffect(() => {
    if (isAddSuccess) {
      reset();
      setSnackbarState({
        successMessage: `Pomyślnie dodano film do grajlisty ${playlistName}!`,
      });
      setIsDialogOpen(false);
    }
  }, [isAddSuccess, playlistName, reset, setSnackbarState]);

  const playlistList =
    playlists !== undefined && playlists.length > 0 ? (
      playlists.map((playlist) => (
        <ListItem key={playlist.id} disablePadding>
          <ListItemButton
            onClick={() => handleAdd(playlist)}
            sx={{ paddingX: 3, paddingY: 2 }}
          >
            <Stack spacing={1}>
              <Typography variant='h6'>{playlist.name}</Typography>
              <PlaylistVisibilityLabel visibility={playlist.visibility} />
            </Stack>
          </ListItemButton>
        </ListItem>
      ))
    ) : (
      <Alert severity='info' sx={{ marginX: 3, marginY: 2 }}>
        Nie masz jeszcze żadnej grajlisty!
      </Alert>
    );

  return (
    <>
      <Tooltip title='Dodaj do grajlisty'>
        <IconButton
          sx={{ color: 'primary.main' }}
          onClick={() => setIsDialogOpen(true)}
          size={isMobile ? 'small' : 'medium'}
        >
          <PlaylistAdd fontSize={isMobile ? 'medium' : 'large'} />
        </IconButton>
      </Tooltip>
      <FormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        disablePadding
      >
        {addToPlaylistError && (
          <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
            <AlertTitle>Wystąpił błąd!</AlertTitle>
            {getErrorMessage(addToPlaylistError)}
          </Alert>
        )}
        <Typography variant='h5' sx={{ paddingX: 3, paddingY: 1 }}>
          Wybierz grajlistę
        </Typography>
        <ContentSection error={error} isLoading={isLoading}>
          {playlists && (
            <>
              <Box sx={{ marginX: 3, marginY: 1 }}>
                <NewPlaylistButton />
              </Box>
              <List>{playlistList}</List>
            </>
          )}
        </ContentSection>
      </FormDialog>
    </>
  );
}

export default AddToPlaylist;
