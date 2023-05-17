import ContentSection from '../../components/layout/ContentSection';
import { useSubscribedVideos } from '../../api/subscription';
import VideoList from '../../components/video/VideoList';

function SubscribedVideos() {
  const { data: subscribedVideos, error, isLoading } = useSubscribedVideos();

  return (
    <ContentSection error={error} isLoading={isLoading}>
      {subscribedVideos && <VideoList videos={subscribedVideos.videos} />}
    </ContentSection>
  );
}

export default SubscribedVideos;
