import ContentSection from '../../components/layout/ContentSection';
import { useAllVideos } from '../../api/video';
import VideoList from '../../components/video/VideoList';

function HomepageVideos() {
  const { data: allVideos, error, isLoading } = useAllVideos();

  return (
    <ContentSection error={error} isLoading={isLoading}>
      {allVideos !== undefined && <VideoList videos={allVideos} />}
    </ContentSection>
  );
}

export default HomepageVideos;
