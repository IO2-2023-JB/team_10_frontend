import { LockOutlined, Public } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { PlaylistVisibility } from '../../types/PlaylistTypes';

interface PlaylistVisibilityLabelProps {
  visibility: PlaylistVisibility;
  scale?: number;
}
function PlaylistVisibilityLabel({
  visibility,
  scale = 1.0,
}: PlaylistVisibilityLabelProps) {
  const iconSize = `${scale * 1.35}rem`;
  const textSize = `${scale * 0.875}rem`;
  const spacing = scale * 0.8;

  return (
    <Stack
      direction='row'
      sx={{
        color: 'text.disabled',
        alignItems: 'center',
        '& > .MuiSvgIcon-root': {
          fontSize: iconSize,
        },
      }}
    >
      {visibility === PlaylistVisibility.Public ? <Public /> : <LockOutlined />}
      <Typography fontSize={textSize} marginLeft={spacing}>
        {visibility === PlaylistVisibility.Public ? 'Publiczna' : 'Prywatna'}
      </Typography>
    </Stack>
  );
}

export default PlaylistVisibilityLabel;
