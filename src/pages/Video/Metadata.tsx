import { GetVideoMetadataResponse } from '../../data/VideoMetadata';
import { Stack, Typography } from '@mui/material';
import VideoDescription from './VideoDescription';
import VideoTags from './VideoTags';
import CreatorInfo from './CreatorInfo';

interface VideoMetadataProps {
  videoMetadata: GetVideoMetadataResponse;
  authorAvatar?: string | null;
  authorSubscriptionsCount: number;
}

function Metadata({
  videoMetadata,
  authorAvatar,
  authorSubscriptionsCount,
}: VideoMetadataProps) {
  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{
        marginY: 2,
      }}
    >
      <Typography variant='h5' fontWeight={600}>
        {videoMetadata.title}
      </Typography>

      <VideoTags tags={videoMetadata.tags}></VideoTags>

      <CreatorInfo
        authorAvatar={authorAvatar!}
        subscriptionsCount={authorSubscriptionsCount}
        authorNickname={videoMetadata.authorNickname}
      ></CreatorInfo>

      <VideoDescription
        viewCount={videoMetadata.viewCount}
        uploadDate={videoMetadata.uploadDate}
        videoDescription={videoMetadata.description}
      ></VideoDescription>
    </Stack>
  );
}

export default Metadata;
