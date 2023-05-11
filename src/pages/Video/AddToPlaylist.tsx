import { PlaylistAdd } from '@mui/icons-material';
import {
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
import ContentSection from '../../components/layout/ContentSection';
import FormDialog from '../../components/layout/FormDialog';
import { userDetailsState } from '../../data/UserData';
import PlaylistVisibilityLabel from '../Playlist/PlaylistVisibilityLabel';

interface AddToPlaylistProps {
  videoId: string;
}

function AddToPlaylist({ videoId }: AddToPlaylistProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const loggedInUser = useRecoilValue(userDetailsState);
  const { data: playlists, error, isLoading } = useUserPlaylists(loggedInUser?.id);
  const { mutate: addToPlaylist } = useAddVideoToPlaylist(videoId);

  const handleAdd = (playlistId: string) => {
    addToPlaylist(playlistId);
  };

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
              {playlists.map((playlist) => (
                <ListItem key={playlist.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleAdd(playlist.id)}
                    sx={{ paddingX: 3, paddingY: 2, minWidth: 400 }}
                  >
                    <Stack spacing={1}>
                      <Typography variant='h6'>{playlist.name}</Typography>
                      <PlaylistVisibilityLabel visibility={playlist.visibility} />
                    </Stack>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </ContentSection>
      </FormDialog>
    </>
  );
}

export default AddToPlaylist;
