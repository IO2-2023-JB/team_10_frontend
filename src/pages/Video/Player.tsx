import { Box, Typography, Stack } from '@mui/material';
import { BACKEND_URL } from '../../const';
import { HourglassFull } from '@mui/icons-material';
import { ProcessingProgress } from '../../types/VideoTypes';

interface PlayerProps {
  videoId: string;
  processingState: ProcessingProgress;
}

function Player({ videoId, processingState }: PlayerProps) {
  const videoUrl = `${BACKEND_URL}/video/${videoId}?access_token=${localStorage.getItem(
    'bearerToken'
  )}`;

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
