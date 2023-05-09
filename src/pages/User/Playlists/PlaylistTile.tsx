import { LockOutlined, Public } from '@mui/icons-material';
import { Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { transitionShort } from '../../../theme';
import { Playlist, PlaylistVisibility } from '../../../types/PlaylistTypes';
import { useMaxLines } from '../../../utils/hooks';

interface PlaylistTileProps {
  playlist: Playlist;
  showVisibility: boolean;
}

function PlaylistTile({ playlist, showVisibility }: PlaylistTileProps) {
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
          {showVisibility && (
            <Stack
              direction='row'
              spacing={1}
              sx={{
                color: 'text.disabled',
                alignItems: 'center',
                '& > .MuiSvgIcon-root': {
                  fontSize: '1.35rem',
                },
              }}
            >
              {playlist.visibility === PlaylistVisibility.Public ? (
                <Public />
              ) : (
                <LockOutlined />
              )}
              <Typography variant='subtitle2'>
                {playlist.visibility === PlaylistVisibility.Public
                  ? 'Publiczna'
                  : 'Prywatna'}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Grid>
  );
}

export default PlaylistTile;
