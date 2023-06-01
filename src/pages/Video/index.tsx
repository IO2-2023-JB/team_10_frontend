import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useVideoMetadata } from '../../api/video';
import TabTitle from '../../components/TabTitle';
import ContentSection from '../../components/layout/ContentSection';
import { baseTitle } from '../../const/tab_titles';
import { videoMetadataKey } from './../../api/video';
import PageLayout from './../../components/layout/PageLayout';
import { videoNotificationState } from './../../data/VideoData';
import CommentSection from './Comment/CommentSection';
import Metadata from './Metadata';
import Player from './Player';

function Video() {
  const { videoId } = useParams();
  const { data: videoMetadata, error, isLoading } = useVideoMetadata(videoId!);
  const queryClient = useQueryClient();
  const processingNotification = useRecoilValue(videoNotificationState);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [videoMetadataKey, videoId] });
  }, [processingNotification.status, queryClient, videoId]);

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {videoMetadata && (
          <>
            <TabTitle title={`${videoMetadata.title}${baseTitle}`} />
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
