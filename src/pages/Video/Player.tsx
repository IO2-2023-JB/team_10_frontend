import { HourglassFull } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { backendUrlState } from '../../data/UrlData';
import { ProcessingProgress } from '../../types/VideoTypes';

interface PlayerProps {
  videoId: string;
  processingState: ProcessingProgress;
}

function Player({ videoId, processingState }: PlayerProps) {
  const backendUrl = useRecoilValue(backendUrlState);

  const videoUrl = `${backendUrl}/video/${videoId}?access_token=${localStorage.getItem(
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
            padding: 3,
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
          <Typography variant='h5' textAlign='center'>
            Jesteśmy w trakcie przetwarzania tego filmu
          </Typography>
        </Stack>
      ) : (
        <Box component='video' src={videoUrl} controls display='block' />
      )}
    </Box>
  );
}

export default Player;
