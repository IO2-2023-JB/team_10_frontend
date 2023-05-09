import { Grid } from '@mui/material';
import { Playlist } from '../../../types/PlaylistTypes';
import PlaylistTile from './PlaylistTile';

interface PlaylistListProps {
  playlists: Playlist[];
}

function PlaylistList({ playlists }: PlaylistListProps) {
  return (
    <Grid container spacing={2}>
      {playlists.map((playlist) => (
        <PlaylistTile key={playlist.id} playlist={playlist} />
      ))}
    </Grid>
  );
}

export default PlaylistList;
