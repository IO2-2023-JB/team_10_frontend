import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, Stack } from '@mui/material';
import { useState } from 'react';
import { useAdmin } from '../../api/user';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import MetadataForm from './MetadataForm';
import VideoDelete from './VideoDelete';

interface MetadataButtonsProps {
  videoMetadata: GetVideoMetadataResponse;
  asMenu: boolean;
  isAuthor: boolean;
}

function MetadataButtons({ videoMetadata, asMenu, isAuthor }: MetadataButtonsProps) {
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
  const isAdmin = useAdmin();
  const isOpen = menuAnchorElement !== null;

  if (asMenu) {
    return (
      <>
        <IconButton
          sx={{ marginInlineStart: 'auto' }}
          onClick={(event) => {
            setMenuAnchorElement(event.currentTarget);
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          open={isOpen}
          anchorEl={menuAnchorElement}
          onClose={() => setMenuAnchorElement(null)}
        >
          {isAuthor && <MetadataForm videoMetadata={videoMetadata} asMenuItem />}
          {(isAdmin || isAuthor) && <VideoDelete videoId={videoMetadata.id} asMenuItem />}
        </Menu>
      </>
    );
  }

  return (
    <Stack direction='row' spacing={1} sx={{ marginInlineStart: 'auto' }}>
      {isAuthor && <MetadataForm videoMetadata={videoMetadata} />}
      {(isAdmin || isAuthor) && <VideoDelete videoId={videoMetadata.id} />}
    </Stack>
  );
}

export default MetadataButtons;
