import { Box, Skeleton } from '@mui/material';
import { useState } from 'react';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';

interface VideoThumbnailProps {
  videoMetadata: GetVideoMetadataResponse;
}

function VideoThumbnail({ videoMetadata }: VideoThumbnailProps) {
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16 / 9',
        height: 150,
      }}
    >
      <Box
        component='img'
        src={videoMetadata.thumbnail ?? '/placeholder_image.webp'}
        onLoad={() => setIsSkeleton(false)}
        sx={{
          display: 'block',
          objectFit: 'cover',
          aspectRatio: '16 / 9',
          height: '100%',
          width: '100%',
          borderRadius: 2,
          visibility: isSkeleton ? 'hidden' : null,
        }}
      />
      {isSkeleton && (
        <Skeleton
          animation={isSkeleton ? 'pulse' : false}
          sx={{ transform: 'none', position: 'absolute', inset: 0 }}
        />
      )}
      {videoMetadata.duration !== null && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            backgroundColor: 'rgb(0 0 0 / 70%)',
            borderRadius: 1,
            padding: '3px',
            lineHeight: '100%',
            fontSize: '0.8rem',
          }}
        >
          {videoMetadata.duration}
        </Box>
      )}
    </Box>
  );
}

export default VideoThumbnail;
