import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const';
import { transitionShort, useMobileLayout } from '../../theme';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import VideoListItemDetails from './VideoListItemDetails';
import VideoListItemMenu from './VideoListItemMenu';
import VideoThumbnail from './VideoThumbnail';

interface VideoListItemProps {
  videoMetadata: GetVideoMetadataResponse;
  disableAuthorLink: boolean;
  playlistId?: string;
  isPlaylistOwner?: boolean;
}

function VideoListItem({
  videoMetadata,
  disableAuthorLink,
  playlistId,
  isPlaylistOwner,
}: VideoListItemProps) {
  const navigate = useNavigate();

  const { mobileQuery } = useMobileLayout();

  const videoUrl = `${ROUTES.VIDEO}/${videoMetadata.id}`;

  return (
    <Grid item xs={12} vs={6} sm={4} md={12}>
      <Stack
        onClick={() => navigate(videoUrl)}
        sx={{
          flexDirection: 'row',
          gap: 1,

          cursor: 'pointer',
          color: 'inherit',
          textDecoration: 'none',
          borderRadius: 2,
          transition: transitionShort('background-color'),
          '&:hover': {
            backgroundColor: 'background.light',
          },

          [mobileQuery]: {
            flexDirection: 'column',
            flex: 1,
          },
        }}
      >
        <VideoThumbnail videoMetadata={videoMetadata} />
        <Stack direction='row' flex={1}>
          <VideoListItemDetails
            videoUrl={videoUrl}
            disableAuthorLink={disableAuthorLink}
            videoMetadata={videoMetadata}
          />
          <VideoListItemMenu
            playlistId={playlistId}
            videoMetadata={videoMetadata}
            isPlaylistOwner={isPlaylistOwner}
          />
        </Stack>
      </Stack>
    </Grid>
  );
}

export default VideoListItem;
