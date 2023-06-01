import { Box, Stack, Typography } from '@mui/material';
import TypographyLink from '../../components/TypographyLink';
import { ROUTES } from '../../const';
import { GetPlaylist } from '../../types/PlaylistTypes';
import PlaylistVisibilityLabel from './PlaylistVisibilityLabel';

interface PlaylistInfoProps {
  playlist: GetPlaylist;
  showVisibility: boolean;
}

function PlaylistInfo({ playlist, showVisibility }: PlaylistInfoProps) {
  return (
    <Box>
      <Typography variant='h3'>{playlist.name}</Typography>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='h6'>
          Playlista użytkownika{' '}
          <TypographyLink to={`${ROUTES.USER}/${playlist.authorId}`}>
            {playlist.authorNickname}
          </TypographyLink>
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
