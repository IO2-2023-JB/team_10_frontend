import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../const';
import { transitionShort } from '../../theme';
import { Playlist } from '../../types/PlaylistTypes';
import PlaylistVisibilityLabel from './PlaylistVisibilityLabel';

interface PlaylistInfoProps {
  playlist: Playlist;
  showVisibility: boolean;
}

function PlaylistInfo({ playlist, showVisibility }: PlaylistInfoProps) {
  return (
    <Box>
      <Typography variant='h3'>{playlist.name}</Typography>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='h6'>
          Playlista użytkownika{' '}
          <Box
            onClick={(event) => event.stopPropagation()}
            component={Link}
            to={`${ROUTES.USER}/${playlist.authorId}`}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              transition: transitionShort('color'),
              '&:hover': { color: 'primary.main' },
            }}
          >
            {playlist.authorNickname}
          </Box>
        </Typography>
        {showVisibility && (
          <>
            <Box>·</Box>
            <PlaylistVisibilityLabel visibility={playlist.visibility} scale={1.25} />
          </>
        )}
      </Stack>
    </Box>
  );
}

export default PlaylistInfo;
