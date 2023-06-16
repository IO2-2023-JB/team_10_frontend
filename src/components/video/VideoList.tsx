import { Alert, Box, Grid } from '@mui/material';
import { useMobileLayout } from '../../theme';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import VideoListItem from './VideoListItem';

interface VideoListProps {
  videos: GetVideoMetadataResponse[];
  disableAuthorLink?: boolean;
  playlistId?: string;
  isPlaylistOwner?: boolean;
}

function VideoList({
  videos,
  disableAuthorLink = false,
  playlistId,
  isPlaylistOwner,
}: VideoListProps) {
  const { isMobile } = useMobileLayout();

  if (videos.length === 0) {
    return <Alert severity='info'>Brak filmów do wyświetlenia</Alert>;
  }

  return (
    <Box>
      <Grid container spacing={2} rowSpacing={isMobile ? 3 : undefined}>
        {videos.map((videoData) => (
          <VideoListItem
            key={videoData.id}
            videoMetadata={videoData}
            disableAuthorLink={disableAuthorLink}
            playlistId={playlistId}
            isPlaylistOwner={isPlaylistOwner}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default VideoList;
