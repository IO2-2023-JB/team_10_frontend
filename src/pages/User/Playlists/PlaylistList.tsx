import { Grid } from '@mui/material';
import { PlaylistBase } from '../../../types/PlaylistTypes';
import NewPlaylistButton from './NewPlaylistButton';
import PlaylistTile from './PlaylistTile';

interface PlaylistListProps {
  playlists: PlaylistBase[];
  isOwn: boolean;
}

function PlaylistList({ playlists, isOwn }: PlaylistListProps) {
  return (
    <Grid container spacing={2}>
      {isOwn && <NewPlaylistButton />}
      {playlists.map((playlist) => (
        <PlaylistTile key={playlist.id} playlist={playlist} showVisibility={isOwn} />
      ))}
    </Grid>
  );
}

export default PlaylistList;
