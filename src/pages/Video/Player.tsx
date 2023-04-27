import { Box, Typography, Stack } from '@mui/material';
import { BACKEND_URL } from '../../const';
import { HourglassFull } from '@mui/icons-material';
import { ProcessingProgress } from '../../types/VideoTypes';
import { useRecoilValue } from 'recoil';
import { videoNotificationState } from './../../data/VideoData';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { videoMetadataKey } from './../../api/video';

interface PlayerProps {
  videoId: string;
  processingState: ProcessingProgress;
}

function Player({ videoId, processingState }: PlayerProps) {
  const queryClient = useQueryClient();
  const processingNotification = useRecoilValue(videoNotificationState);
  const videoUrl = `${BACKEND_URL}/video/${videoId}?access_token=${localStorage.getItem(
    'bearerToken'
  )}`;

  useEffect(() => {
    if (processingNotification.videoId === videoId)
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey, videoId] });
  }, [processingNotification, queryClient, videoId]);

  return (
    <Box
      sx={{
        '& > *': {
          width: '100%',
          aspectRatio: '16 / 9',
        },
      }}
    >
      {processingState !== ProcessingProgress.Ready ? (
        <Stack
          sx={{
            backgroundColor: 'background.light',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            '& > .MuiSvgIcon-root': {
              fontSize: 60,
            },
          }}
          spacing={2}
          direction='column'
        >
          <HourglassFull sx={{ color: 'primary.main' }} />
          <Typography variant='h5'>
            Jesteśmy w trakcie przetwarzania tego filmu
          </Typography>
        </Stack>
      ) : (
        <Box component='video' src={videoUrl} controls />
      )}
    </Box>
  );
}

export default Player;
