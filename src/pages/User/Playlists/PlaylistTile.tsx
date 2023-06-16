import { Box, Paper, Skeleton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { usePlaylistVideos } from '../../../api/playlist';
import OneLineTypography from '../../../components/OneLineTypography';
import TypographyLink from '../../../components/TypographyLink';
import { ROUTES } from '../../../const';
import { transitionShort } from '../../../theme';
import { GetPlaylistBase } from '../../../types/PlaylistTypes';
import PlaylistVisibilityLabel from '../../Playlist/PlaylistVisibilityLabel';

interface PlaylistTileProps {
  playlist: GetPlaylistBase;
  showVisibility: boolean;
  showAuthor?: boolean;
}

function PlaylistTile({
  playlist,
  showVisibility,
  showAuthor = false,
}: PlaylistTileProps) {
  const playlistUrl = `${ROUTES.PLAYLIST}/${playlist.id}`;

  const { data: playlistDetails } = usePlaylistVideos(playlist.id, showAuthor);

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
        {showAuthor &&
          (playlistDetails !== undefined ? (
            <Box color='text.secondary' fontSize='0.875rem'>
              <TypographyLink to={`${ROUTES.USER}/${playlistDetails?.authorId}`}>
                {playlistDetails?.authorNickname}
              </TypographyLink>
            </Box>
          ) : (
            <Skeleton width={150} />
          ))}
      </Stack>
    </Paper>
  );
}

export default PlaylistTile;
