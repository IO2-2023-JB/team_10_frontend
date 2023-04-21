import ContentSection from '../../components/layout/ContentSection';
import { useUserDetails } from '../../api/user';
import { useAllVideos } from '../../api/video';
import VideoList from '../../components/video/VideoList';

interface HomepageVideosProps {
  userId: string;
}

function HomepageVideos({ userId }: HomepageVideosProps) {
  const { data: userDetails, error, isLoading } = useUserDetails(userId);
  const { data: allVideos } = useAllVideos();

  return (
    <ContentSection error={error} isLoading={isLoading}>
      {userDetails && allVideos !== undefined && <VideoList videos={allVideos} />}
    </ContentSection>
  );
}

export default HomepageVideos;
