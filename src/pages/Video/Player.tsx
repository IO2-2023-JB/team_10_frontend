import { Box } from '@mui/material';
import { BACKEND_URL } from '../../const';

interface PlayerProps {
  videoId: string;
}

function Player({ videoId }: PlayerProps) {
  return (
    <Box
      sx={{
        '& > video': {
          width: '100%',
          aspectRatio: '16 / 9',
        },
      }}
    >
      <video controls src={`${BACKEND_URL}/video/${videoId}`} />
    </Box>
  );
}

export default Player;
