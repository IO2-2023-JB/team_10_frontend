import { Stack, Typography } from '@mui/material';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { getNumberWithLabel } from '../../utils/words';
import VideoThumbnail from './VideoThumbnail';
import { Link } from 'react-router-dom';
import { getTextSummary } from '../../utils/utils';

interface VideoListItemProps {
  videoMetadata: GetVideoMetadataResponse;
}

function VideoListItem({ videoMetadata }: VideoListItemProps) {
  const descriptionSummary = getTextSummary(videoMetadata.description, 30, 200);

  return (
    <Stack
      direction='row'
      spacing={2}
      component={Link}
      to={`/video/${videoMetadata.id}`}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <VideoThumbnail videoMetadata={videoMetadata} />
      <Stack spacing={1}>
        <Typography variant='h5' fontWeight={600}>
          {videoMetadata.title}
        </Typography>
        <Typography>{`${videoMetadata.authorNickname} · ${getNumberWithLabel(
          videoMetadata.viewCount,
          'wyświetlenie'
        )}`}</Typography>
        <Typography>{descriptionSummary}</Typography>
      </Stack>
    </Stack>
  );
}

export default VideoListItem;
