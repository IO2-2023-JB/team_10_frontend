import { Box, CircularProgress, Stack } from '@mui/material';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import VideoList from './VideoList';
import SearchFilters from '../../pages/Search/SearchFilters';

interface VideoFiltersListProps {
  videos: GetVideoMetadataResponse[];
  isLoading: boolean;
}

function VideoFiltersList({ videos, isLoading }: VideoFiltersListProps) {
  return (
    <Stack spacing={2}>
      <SearchFilters />
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
