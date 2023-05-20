import { Alert, Stack } from '@mui/material';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import VideoListItem from './VideoListItem';

interface VideoListProps {
  videos: GetVideoMetadataResponse[];
  disableAuthorLink?: boolean;
  playlistId?: string;
}

function VideoList({ videos, disableAuthorLink = false, playlistId }: VideoListProps) {
  if (videos.length === 0) {
    return <Alert severity='info'>Brak filmów do wyświetlenia</Alert>;
  }

  return (
    <Stack spacing={2}>
      {videos.map((videoData) => (
        <VideoListItem
          key={videoData.id}
          videoMetadata={videoData}
          disableAuthorLink={disableAuthorLink}
          playlistId={playlistId}
        />
      ))}
    </Stack>
  );
}

export default VideoList;
