import { Box } from '@mui/material';
import { BACKEND_URL } from '../../const';

interface PlayerProps {
  videoId: string;
}

function Player({ videoId }: PlayerProps) {
  const videoUrl = `${BACKEND_URL}/video/${videoId}?access_token=${localStorage.getItem(
    'bearerToken'
  )}`;

  return (
    <Box
      sx={{
        '& > video': {
          width: '100%',
          aspectRatio: '16 / 9',
        },
      }}
    >
      <video controls src={videoUrl} />
    </Box>
  );
}

export default Player;
