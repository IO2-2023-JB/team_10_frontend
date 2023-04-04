import { GetVideoMetadataResponse } from '../../data/VideoMetadata';
import { Stack, Typography } from '@mui/material';
import VideoDescription from './VideoDescription';
import VideoTags from './VideoTags';
import CreatorInfo from './CreatorInfo';
import { useUserDetails } from '../../api/user';

interface VideoMetadataProps {
  videoMetadata: GetVideoMetadataResponse;
}

function Metadata({ videoMetadata }: VideoMetadataProps) {
  const { data: userDetails } = useUserDetails(videoMetadata.authorId);

  return (
    <Stack
      spacing={2}
      sx={{
        marginY: 2,
      }}
    >
      <Typography variant='h5' fontWeight={600}>
        {videoMetadata.title}
      </Typography>
      <VideoTags tags={videoMetadata.tags} />
      {userDetails && <CreatorInfo userDetails={userDetails!} />}
      <VideoDescription
        viewCount={videoMetadata.viewCount}
        uploadDate={videoMetadata.uploadDate}
        videoDescription={videoMetadata.description}
      />
    </Stack>
  );
}

export default Metadata;
