import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { usePostReaction, useReaction } from '../../api/video';
import { useMobileLayout } from '../../theme';
import { ReactionType } from '../../types/VideoTypes';

interface ReactionProps {
  videoId: string;
}

function Reaction({ videoId }: ReactionProps) {
  const { mutate } = usePostReaction(videoId);
  const { data } = useReaction(videoId);

  const { isMobile } = useMobileLayout();

  const handleReaction = (reaction: ReactionType) => {
    data?.currentUserReaction === reaction
      ? mutate({ reactionType: ReactionType.None })
      : mutate({ reactionType: reaction });
  };

  const fontSize = isMobile ? 'medium' : 'large';
  const size = isMobile ? 'small' : 'medium';

  return (
    <Box sx={{ alignItems: 'center', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          sx={{ color: 'primary.main' }}
          size={size}
          onClick={() => handleReaction(ReactionType.Positive)}
        >
          {data?.currentUserReaction === ReactionType.Positive ? (
            <ThumbUpAlt fontSize={fontSize} />
          ) : (
            <ThumbUpOffAlt fontSize={fontSize} />
          )}
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          sx={{ color: 'primary.main' }}
          size={size}
          onClick={() => {
            handleReaction(ReactionType.Negative);
          }}
        >
          {data?.currentUserReaction === ReactionType.Negative ? (
            <ThumbDownAlt fontSize={fontSize} />
          ) : (
            <ThumbDownOffAlt fontSize={fontSize} />
          )}
        </IconButton>
      </Box>
      <Box>
        <Typography textAlign='center'>{data?.positiveCount}</Typography>
      </Box>
      <Box>
        <Typography textAlign='center'>{data?.negativeCount}</Typography>
      </Box>
    </Box>
  );
}

export default Reaction;
