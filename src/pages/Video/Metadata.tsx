import { GetVideoMetadataResponse } from '../../data/VideoMetadata';
import { Box, Stack, Typography } from '@mui/material';
import VideoDescription from './VideoDescription';
import VideoTags from './VideoTags';
import CreatorInfo from './CreatorInfo';
import { useUserDetails } from '../../api/user';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../data/UserData';
import MetadataForm from './MetadataForm';
import VideoDelete from './VideoDelete';

interface VideoMetadataProps {
  videoMetadata: GetVideoMetadataResponse;
}

function Metadata({ videoMetadata }: VideoMetadataProps) {
  const { data: userDetails } = useUserDetails(videoMetadata.authorId);
  const loggedInUserDetails = useRecoilValue(userDetailsState);
  const isAuthor = loggedInUserDetails?.id === videoMetadata.authorId;

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
      <Stack direction='row' alignItems='center'>
        <CreatorInfo userDetails={userDetails} />
        <Box sx={{ marginInlineStart: 'auto' }}>
          {isAuthor && (
            <>
              <MetadataForm videoMetadata={videoMetadata} />
              <VideoDelete videoId={videoMetadata.id} />
            </>
          )}
        </Box>
      </Stack>
      <VideoDescription
        viewCount={videoMetadata.viewCount}
        uploadDate={videoMetadata.uploadDate}
        videoDescription={videoMetadata.description}
      />
    </Stack>
  );
}

export default Metadata;
