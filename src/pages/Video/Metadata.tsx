import { Box, Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import { useMobileLayout } from '../../theme';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import UserInfo from '../User/UserInfo';
import AddToPlaylist from './AddToPlaylist';
import MetadataButtons from './MetadataButtons';
import Reaction from './Reaction';
import VideoDescription from './VideoDescription';
import VideoTags from './VideoTags';
import TicketButton from '../../components/TicketButton';
import { ButtonType } from '../../types/TicketTypes';

interface VideoMetadataProps {
  videoMetadata: GetVideoMetadataResponse;
}

function Metadata({ videoMetadata }: VideoMetadataProps) {
  const { data: userDetails } = useUserDetails(videoMetadata.authorId);
  const loggedInUserDetails = useRecoilValue(userDetailsState);
  const isAuthor = loggedInUserDetails?.id === videoMetadata.authorId;

  const { isMobile } = useMobileLayout();

  return (
    <Stack spacing={2}>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Stack sx={{ marginInlineEnd: 'auto' }} spacing={1}>
          <Typography variant='h5' fontWeight={600}>
            {videoMetadata.title}
          </Typography>
          <VideoTags tags={videoMetadata.tags} />
        </Stack>
        <Stack direction='row' alignItems='start' sx={{ flexShrink: 0 }}>
          {!isAuthor && (
            <TicketButton
              targetId={videoMetadata.id}
              buttonType={ButtonType.Icon}
              targetNameInTitle='wideło'
            />
          )}
          <AddToPlaylist videoId={videoMetadata.id} />
          <Reaction videoId={videoMetadata.id} />
        </Stack>
      </Stack>
      <Stack direction='row' alignItems='center'>
        <UserInfo userDetails={userDetails} isSelf={isAuthor} />
        <Box sx={{ marginInlineStart: 'auto' }}>
          {isAuthor && (
            <MetadataButtons videoMetadata={videoMetadata} asMenu={isMobile} />
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
