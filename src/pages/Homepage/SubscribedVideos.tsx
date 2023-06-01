import { useSubscribedVideos } from '../../api/subscription';
import TabTitle from '../../components/TabTitle';
import ContentSection from '../../components/layout/ContentSection';
import VideoList from '../../components/video/VideoList';
import { TabTitles } from '../../const/tab_titles';

function SubscribedVideos() {
  const { data: subscribedVideos, error, isLoading } = useSubscribedVideos();

  return (
    <>
      <TabTitle title={TabTitles.Subscriptions} />
      <ContentSection error={error} isLoading={isLoading}>
        {subscribedVideos && <VideoList videos={subscribedVideos.videos} />}
      </ContentSection>
    </>
  );
}

export default SubscribedVideos;
