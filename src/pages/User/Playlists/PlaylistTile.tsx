import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { transitionShort } from '../../../theme';
import { Playlist } from '../../../types/PlaylistTypes';
import { useMaxLines } from '../../../utils/hooks';

interface PlaylistTileProps {
  playlist: Playlist;
}
function PlaylistTile({ playlist }: PlaylistTileProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { isEllipsisActive, style: maxLinesStyle } = useMaxLines(1, nameRef);

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
        to='' // TODO add target
      >
        <Tooltip title={isEllipsisActive ? playlist.name : null}>
          <Typography
            ref={nameRef}
            component='h4'
            sx={{ fontSize: '1rem', fontWeight: 600, ...maxLinesStyle }}
          >
            {playlist.name}
          </Typography>
        </Tooltip>
      </Paper>
    </Grid>
  );
}

export default PlaylistTile;
