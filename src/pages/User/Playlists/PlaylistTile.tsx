import { Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../const';
import { transitionShort } from '../../../theme';
import { PlaylistBase } from '../../../types/PlaylistTypes';
import { useMaxLines } from '../../../utils/hooks';
import PlaylistVisibilityLabel from '../../Playlist/PlaylistVisibilityLabel';

interface PlaylistTileProps {
  playlist: PlaylistBase;
  showVisibility: boolean;
}

function PlaylistTile({ playlist, showVisibility }: PlaylistTileProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { isEllipsisActive, style: maxLinesStyle } = useMaxLines(1, nameRef);

  const playlistUrl = `${ROUTES.PLAYLIST}/${playlist.id}`;

  return (
    <Grid item xs={12} sm={6} md={4}>
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
          <Tooltip title={isEllipsisActive ? playlist.name : null}>
            <Typography
              ref={nameRef}
              component='h4'
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                ...maxLinesStyle,
              }}
            >
              {playlist.name}
            </Typography>
          </Tooltip>
          {showVisibility && <PlaylistVisibilityLabel visibility={playlist.visibility} />}
        </Stack>
      </Paper>
    </Grid>
  );
}

export default PlaylistTile;
