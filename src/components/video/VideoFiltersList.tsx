import { FilterList } from '@mui/icons-material';
import { Box, Button, CircularProgress, Collapse, Stack } from '@mui/material';
import { useState } from 'react';
import SearchFilters from '../../pages/Search/SearchFilters';
import { useMobileLayout } from '../../theme';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import VideoList from './VideoList';

interface VideoFiltersListProps {
  videos: GetVideoMetadataResponse[];
  isLoading: boolean;
}

function VideoFiltersList({ videos, isLoading }: VideoFiltersListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isMobile } = useMobileLayout();

  return (
    <Stack spacing={2}>
      {isMobile && (
        <Button
          onClick={() => setIsOpen((oldValue) => !oldValue)}
          startIcon={<FilterList />}
        >
          {isOpen ? 'Ukryj filtry' : 'Pokaż filtry'}
        </Button>
      )}
      <Collapse in={!isMobile || isOpen}>
        <SearchFilters />
      </Collapse>
      {isLoading ? (
        <Box sx={{ display: 'grid', placeItems: 'center', padding: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <VideoList videos={videos} />
      )}
    </Stack>
  );
}

export default VideoFiltersList;
