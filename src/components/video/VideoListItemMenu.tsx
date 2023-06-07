import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../data/UserData';
import MetadataForm from '../../pages/Video/MetadataForm';
import VideoDelete from '../../pages/Video/VideoDelete';
import { useMobileLayout } from '../../theme';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import RemoveVideoFromPlaylist from './RemoveVideoFromPlaylist';
import { ButtonType } from '../../types/TicketTypes';
import TicketButton from '../TicketButton';

interface VideoListItemMenuProps {
  playlistId?: string;
  videoMetadata: GetVideoMetadataResponse;
}

function VideoListItemMenu({ playlistId, videoMetadata }: VideoListItemMenuProps) {
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
  const isMenuOpen = menuAnchorElement !== null;

  const { desktopQuery } = useMobileLayout();

  const loggedInUser = useRecoilValue(userDetailsState);
  const isAuthor = videoMetadata.authorId === loggedInUser?.id;
  const showMenu = Boolean(isAuthor || playlistId);

  if (!showMenu) return null;

  return (
    <>
      <Box
        sx={{
          alignSelf: 'center',
          [desktopQuery]: {
            paddingInlineEnd: 1,
          },
        }}
      >
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            setMenuAnchorElement(event.currentTarget);
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>
      <Menu
        open={isMenuOpen}
        anchorEl={menuAnchorElement}
        onClick={(event) => event.stopPropagation()}
        onClose={() => setMenuAnchorElement(null)}
      >
        {playlistId && (
          <RemoveVideoFromPlaylist videoId={videoMetadata.id} playlistId={playlistId} />
        )}
        {isAuthor && [
          <MetadataForm key='MetadataForm' videoMetadata={videoMetadata} asMenuItem />,
          <VideoDelete key='VideoDelete' videoId={videoMetadata.id} asMenuItem />,
        ]}
        {!isAuthor && (
          <TicketButton
            targetId={videoMetadata.id}
            buttonType={ButtonType.MenuItem}
            targetNameInTitle='wideło'
          />
        )}
      </Menu>
    </>
  );
}

export default VideoListItemMenu;
