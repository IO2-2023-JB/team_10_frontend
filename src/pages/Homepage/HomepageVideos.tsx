import ContentSection from '../../components/layout/ContentSection';
import VideoList from '../../components/video/VideoList';
import { useRecommendedPlaylist } from '../../api/playlist';

function HomepageVideos() {
  const { data: recommended, error, isLoading } = useRecommendedPlaylist();

  return (
    <ContentSection error={error} isLoading={isLoading}>
      {recommended !== undefined && <VideoList videos={recommended.videos} />}
    </ContentSection>
  );
}

export default HomepageVideos;
