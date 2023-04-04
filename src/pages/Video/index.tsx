import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Metadata from './Metadata';
import Player from './Player';
import ContentSection from '../../components/ContentSection';
import { useVideoMetadata } from '../../api/video';

function Video() {
  const { videoId } = useParams();
  const { data: videoMetadata, error, isLoading } = useVideoMetadata(videoId!);

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        <>
          <Player videoId={videoId!} />
          {videoMetadata && <Metadata videoMetadata={videoMetadata} />}
        </>
      </ContentSection>
    </PageLayout>
  );
}

export default Video;
