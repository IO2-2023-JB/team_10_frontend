import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, Stack } from '@mui/material';
import { useState } from 'react';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import MetadataForm from './MetadataForm';
import VideoDelete from './VideoDelete';

interface MetadataButtonsProps {
  videoMetadata: GetVideoMetadataResponse;
  asMenu: boolean;
}

function MetadataButtons({ videoMetadata, asMenu }: MetadataButtonsProps) {
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
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
          <MetadataForm videoMetadata={videoMetadata} asMenuItem />
          <VideoDelete videoId={videoMetadata.id} asMenuItem />
        </Menu>
      </>
    );
  }

  return (
    <Stack direction='row' spacing={1} sx={{ marginInlineStart: 'auto' }}>
      <MetadataForm videoMetadata={videoMetadata} />
      <VideoDelete videoId={videoMetadata.id} />
    </Stack>
  );
}

export default MetadataButtons;
