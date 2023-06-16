import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usePlaylistVideos } from '../../api/playlist';
import { useAdmin } from '../../api/user';
import TabTitle from '../../components/TabTitle';
import TicketButton from '../../components/TicketButton';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import VideoList from '../../components/video/VideoList';
import { userDetailsState } from '../../data/UserData';
import { useMobileLayout } from '../../theme';
import { ButtonType } from '../../types/TicketTypes';
import PlaylistDelete from './PlaylistDelete';
import PlaylistEditForm from './PlaylistEditForm';
import PlaylistInfo from './PlaylistInfo';

function Playlist() {
  const { playlistId } = useParams();
  const { data: playlist, error, isLoading } = usePlaylistVideos(playlistId!);
  const isAdmin = useAdmin();
  const { mobileQuery } = useMobileLayout();

  const loggedInUser = useRecoilValue(userDetailsState);
  const isOwn = playlist?.authorId === loggedInUser?.id;

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {playlist && (
          <>
            <TabTitle title={playlist.name} />
            <Stack spacing={2}>
              <Stack
                justifyContent='space-between'
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  [mobileQuery]: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1,
                  },
                }}
              >
                <PlaylistInfo playlist={playlist} showVisibility={isOwn} />
                <Stack direction='row'>
                  {isOwn && (
                    <>
                      <PlaylistEditForm id={playlistId!} playlist={playlist} />
                    </>
                  )}
                  {(isAdmin || isOwn) && (
                    <PlaylistDelete id={playlistId!} playlist={playlist} />
                  )}
                  {!isAdmin && !isOwn && playlistId && (
                    <TicketButton
                      targetId={playlistId}
                      buttonType={ButtonType.Icon}
                      targetNameInTitle='playlistę'
                    />
                  )}
                </Stack>
              </Stack>
              <VideoList
                videos={playlist.videos}
                playlistId={playlistId!}
                isPlaylistOwner={isOwn}
              />
            </Stack>
          </>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default Playlist;
