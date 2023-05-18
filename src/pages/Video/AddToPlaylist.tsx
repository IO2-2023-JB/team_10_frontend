import { PlaylistAdd } from '@mui/icons-material';
import {
  Alert,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAddVideoToPlaylist, useUserPlaylists } from '../../api/playlist';
import StatusSnackbar from '../../components/StatusSnackbar';
import ContentSection from '../../components/layout/ContentSection';
import FormDialog from '../../components/layout/FormDialog';
import { userDetailsState } from '../../data/UserData';
import { PlaylistBase } from '../../types/PlaylistTypes';
import PlaylistVisibilityLabel from '../Playlist/PlaylistVisibilityLabel';
import NewPlaylistButton from '../User/Playlists/NewPlaylistButton';

interface AddToPlaylistProps {
  videoId: string;
}

function AddToPlaylist({ videoId }: AddToPlaylistProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string | null>(null);
  const loggedInUser = useRecoilValue(userDetailsState);
  const { data: playlists, error, isLoading } = useUserPlaylists(loggedInUser?.id);
  const {
    mutate: addToPlaylist,
    error: addError,
    isSuccess: isAddSuccess,
    isLoading: isAddLoading,
  } = useAddVideoToPlaylist(videoId);

  const handleAdd = (playlist: PlaylistBase) => {
    setPlaylistName(playlist.name);
    setIsDialogOpen(false);
    addToPlaylist(playlist.id);
  };

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
        Nie masz jeszcze żadnej playlisty!
      </Alert>
    );

  return (
    <>
      <Tooltip title='Dodaj do playlisty'>
        <IconButton sx={{ color: 'primary.main' }} onClick={() => setIsDialogOpen(true)}>
          <PlaylistAdd fontSize='large' />
        </IconButton>
      </Tooltip>
      <FormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        disablePadding
      >
        <Typography variant='h5' sx={{ paddingX: 3, paddingY: 1 }}>
          Wybierz playlistę
        </Typography>
        <ContentSection error={error} isLoading={isLoading}>
          {playlists && (
            <List>
              <Box sx={{ marginX: 3, marginY: 1, minWidth: 400 }}>
                <NewPlaylistButton />
              </Box>
              {playlistList}
            </List>
          )}
        </ContentSection>
      </FormDialog>
      <StatusSnackbar
        loadingMessage={`Dodawanie do playlisty ${playlistName}…`}
        successMessage={`Pomyślnie dodano do playlisty ${playlistName}!`}
        errorMessage={`Nie udało się dodać do playlisty`}
        isLoading={isAddLoading}
        isSuccess={isAddSuccess}
        error={addError}
      />
    </>
  );
}

export default AddToPlaylist;
