import { Box, Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usePlaylistVideos } from '../../api/playlist';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import VideoList from '../../components/video/VideoList';
import { ROUTES } from '../../const';
import { userDetailsState } from '../../data/UserData';
import { transitionShort } from '../../theme';
import PlaylistVisibilityLabel from './PlaylistVisibilityLabel';

function Playlist() {
  const { playlistId } = useParams();
  const { data: playlist, error, isLoading } = usePlaylistVideos(playlistId!);

  const loggedInUser = useRecoilValue(userDetailsState);
  const showVisibility = playlist?.authorId === loggedInUser?.id;

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {playlist && (
          <Stack spacing={2}>
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
                    <PlaylistVisibilityLabel
                      visibility={playlist.visibility}
                      scale={1.25}
                    />
                  </>
                )}
              </Stack>
            </Box>
            <VideoList videos={playlist.videos} />
          </Stack>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default Playlist;
