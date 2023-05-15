import { Stack } from '@mui/material';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import VideoList from './VideoList';
import SearchFilters from '../../pages/Search/SearchFilters';

interface VideoFiltersListProps {
  videos: GetVideoMetadataResponse[];
}

function VideoFiltersList({ videos }: VideoFiltersListProps) {
  return (
    <Stack spacing={2}>
      <SearchFilters />
      <VideoList videos={videos} />
    </Stack>
  );
}

export default VideoFiltersList;
