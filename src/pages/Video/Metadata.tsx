import { Box, Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import CreatorInfo from './CreatorInfo';
import MetadataForm from './MetadataForm';
import Reaction from './Reaction';
import VideoDelete from './VideoDelete';
import VideoDescription from './VideoDescription';
import VideoTags from './VideoTags';
import { GetVideoMetadataResponse } from './../../data/VideoTypes';

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
        paddingY: 3,
      }}
    >
      <Stack
        direction='row'
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ marginInlineEnd: 'auto' }} variant='h5' fontWeight={600}>
          {videoMetadata.title}
        </Typography>
        <Box sx={{ marginRight: 2 }}>
          <Reaction videoId={videoMetadata.id} />
        </Box>
      </Stack>
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
