import { Box, Stack, Typography } from '@mui/material';
import TypographyLink from '../../components/TypographyLink';
import { ROUTES } from '../../const';
import { useMobileLayout } from '../../theme';
import { GetPlaylist } from '../../types/PlaylistTypes';
import PlaylistVisibilityLabel from './PlaylistVisibilityLabel';

interface PlaylistInfoProps {
  playlist: GetPlaylist;
  showVisibility: boolean;
}

function PlaylistInfo({ playlist, showVisibility }: PlaylistInfoProps) {
  const { mobileQuery } = useMobileLayout();

  return (
    <Box>
      <Typography variant='h3'>{playlist.name}</Typography>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,

          [mobileQuery]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            '& > .hide-on-mobile': { display: 'none' },
          },
        }}
      >
        <Typography variant='h6'>
          Grajlista użytkownika{' '}
          <TypographyLink to={`${ROUTES.USER}/${playlist.authorId}`}>
            {playlist.authorNickname}
          </TypographyLink>
        </Typography>
        {showVisibility && (
          <>
            <Box className='hide-on-mobile'>·</Box>
            <PlaylistVisibilityLabel visibility={playlist.visibility} scale={1.25} />
          </>
        )}
      </Stack>
    </Box>
  );
}

export default PlaylistInfo;
