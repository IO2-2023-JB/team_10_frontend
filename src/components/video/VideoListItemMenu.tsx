import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAdmin } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import MetadataForm from '../../pages/Video/MetadataForm';
import VideoDelete from '../../pages/Video/VideoDelete';
import { useMobileLayout } from '../../theme';
import { ButtonType } from '../../types/TicketTypes';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import TicketButton from '../TicketButton';
import RemoveVideoFromPlaylist from './RemoveVideoFromPlaylist';

interface VideoListItemMenuProps {
  playlistId?: string;
  videoMetadata: GetVideoMetadataResponse;
  isPlaylistOwner?: boolean;
}

function VideoListItemMenu({
  playlistId,
  videoMetadata,
  isPlaylistOwner,
}: VideoListItemMenuProps) {
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
  const isMenuOpen = menuAnchorElement !== null;

  const { desktopQuery } = useMobileLayout();
  const isAdmin = useAdmin();
  const loggedInUser = useRecoilValue(userDetailsState);
  const isAuthor = videoMetadata.authorId === loggedInUser?.id;

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
        {playlistId && isPlaylistOwner && (
          <RemoveVideoFromPlaylist videoId={videoMetadata.id} playlistId={playlistId} />
        )}
        {isAuthor && [
          <MetadataForm key='MetadataForm' videoMetadata={videoMetadata} asMenuItem />,
        ]}
        {(isAdmin || isAuthor) && (
          <VideoDelete key='VideoDelete' videoId={videoMetadata.id} asMenuItem />
        )}
        {!isAdmin && !isAuthor && (
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
