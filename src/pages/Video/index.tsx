import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Metadata from './Metadata';
import Player from './Player';
import ContentSection from '../../components/ContentSection';
import { useVideoMetadata } from '../../api/video';
import { useUserDetails } from '../../api/user';

function Video() {
  const { videoId } = useParams();
  const {
    data: videoMetadata,
    error: videoError,
    isLoading: isVideoLoading,
  } = useVideoMetadata(videoId!);
  const {
    data: userData,
    error: userDataError,
    isLoading: isUserDataLoading,
  } = useUserDetails(videoMetadata?.authorId!);

  return (
    <PageLayout>
      <ContentSection
        error={videoError && userDataError}
        isLoading={isUserDataLoading && isVideoLoading}
      >
        <>
          <Player videoId={videoId!} />
          {videoMetadata && (
            <Metadata
              videoMetadata={videoMetadata}
              authorAvatar={userData?.avatarImage}
              authorSubscriptionsCount={userData?.subscriptionsCount!}
            />
          )}
        </>
      </ContentSection>
    </PageLayout>
  );
}

export default Video;
