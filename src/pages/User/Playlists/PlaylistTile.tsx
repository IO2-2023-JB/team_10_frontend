import { Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import OneLineTypography from '../../../components/OneLineTypography';
import { ROUTES } from '../../../const';
import { transitionShort } from '../../../theme';
import { GetPlaylistBase } from '../../../types/PlaylistTypes';
import PlaylistVisibilityLabel from '../../Playlist/PlaylistVisibilityLabel';

interface PlaylistTileProps {
  playlist: GetPlaylistBase;
  showVisibility: boolean;
}

function PlaylistTile({ playlist, showVisibility }: PlaylistTileProps) {
  const playlistUrl = `${ROUTES.PLAYLIST}/${playlist.id}`;

  return (
    <Paper
      sx={{
        display: 'block',
        textDecoration: 'none',
        padding: 2,
        transition: transitionShort('background-color'),
        '&:hover': {
          backgroundColor: 'background.lighter',
        },
      }}
      component={Link}
      to={playlistUrl}
    >
      <Stack spacing={2}>
        <OneLineTypography
          component='h4'
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {playlist.name}
        </OneLineTypography>
        {showVisibility && <PlaylistVisibilityLabel visibility={playlist.visibility} />}
      </Stack>
    </Paper>
  );
}

export default PlaylistTile;
