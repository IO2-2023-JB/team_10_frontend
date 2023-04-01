import { Box } from '@mui/material';
import { backendUrl } from '../../App';

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
      <video controls src={`${backendUrl}/video/${videoId}`} />
    </Box>
  );
}

export default Player;
