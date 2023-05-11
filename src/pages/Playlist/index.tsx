import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usePlaylistVideos } from '../../api/playlist';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import VideoList from '../../components/video/VideoList';
import { userDetailsState } from '../../data/UserData';
import PlaylistDelete from './PlaylistDelete';
import PlaylistEditForm from './PlaylistEditForm';
import PlaylistInfo from './PlaylistInfo';

function Playlist() {
  const { playlistId } = useParams();
  const { data: playlist, error, isLoading } = usePlaylistVideos(playlistId!);

  const loggedInUser = useRecoilValue(userDetailsState);
  const isOwn = playlist?.authorId === loggedInUser?.id;

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {playlist && (
          <Stack spacing={2}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <PlaylistInfo playlist={playlist} showVisibility={isOwn} />
              <Stack direction='row'>
                {isOwn && (
                  <>
                    <PlaylistEditForm id={playlistId!} playlist={playlist} />
                    <PlaylistDelete id={playlistId!} playlist={playlist} />
                  </>
                )}
              </Stack>
            </Stack>
            <VideoList videos={playlist.videos} />
          </Stack>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default Playlist;
