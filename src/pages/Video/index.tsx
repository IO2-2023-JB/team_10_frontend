import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVideoMetadata } from '../../api/video';
import ContentSection from '../../components/layout/ContentSection';
import { ProcessingProgress } from '../../types/VideoTypes';
import PageLayout from './../../components/layout/PageLayout';
import CommentSection from './Comment/CommentSection';
import Metadata from './Metadata';
import Player from './Player';

function Video() {
  const { videoId } = useParams();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { data: videoMetadata, error, isLoading } = useVideoMetadata(videoId!, refetch);

  useEffect(() => {
    if (videoMetadata !== undefined) {
      if (videoMetadata.processingProgress !== ProcessingProgress.Ready) setRefetch(true);
      else setRefetch(false);
    }
  }, [videoMetadata]);

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {videoMetadata && (
          <>
            <Player
              videoId={videoId!}
              processingState={videoMetadata.processingProgress}
            />
            <Metadata videoMetadata={videoMetadata} />
            <CommentSection videoId={videoId} />
          </>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default Video;
