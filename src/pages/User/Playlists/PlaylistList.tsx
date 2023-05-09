import { Grid } from '@mui/material';
import { Playlist } from '../../../types/PlaylistTypes';
import PlaylistTile from './PlaylistTile';

interface PlaylistListProps {
  playlists: Playlist[];
  showVisibility: boolean;
}

function PlaylistList({ playlists, showVisibility }: PlaylistListProps) {
  return (
    <Grid container spacing={2}>
      {playlists.map((playlist) => (
        <PlaylistTile
          key={playlist.id}
          playlist={playlist}
          showVisibility={showVisibility}
        />
      ))}
    </Grid>
  );
}

export default PlaylistList;
