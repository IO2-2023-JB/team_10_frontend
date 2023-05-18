import { Grid } from '@mui/material';
import { PlaylistBase } from '../../../types/PlaylistTypes';
import NewPlaylistButton from './NewPlaylistButton';
import PlaylistTile from './PlaylistTile';

interface PlaylistListProps {
  playlists: PlaylistBase[];
  isOwn: boolean;
}

const GridProps = { xs: 12, sm: 6, md: 4 };

function PlaylistList({ playlists, isOwn }: PlaylistListProps) {
  return (
    <Grid container spacing={2}>
      {isOwn && (
        <Grid item {...GridProps}>
          <NewPlaylistButton />
        </Grid>
      )}
      {playlists.map((playlist) => (
        <Grid item key={playlist.id} {...GridProps}>
          <PlaylistTile playlist={playlist} showVisibility={isOwn} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PlaylistList;
