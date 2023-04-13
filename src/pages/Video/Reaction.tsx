import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { usePostReaction, useReaction } from '../../api/video';
import { ReactionType } from '../../data/VideoMetadata';

interface ReactionProps {
  videoId: string;
}

function Reaction({ videoId }: ReactionProps) {
  const { mutate } = usePostReaction(videoId);
  const { data } = useReaction(videoId);

  const handleReaction = (reaction: ReactionType) => {
    data?.currentUserReaction === reaction
      ? mutate({ reactionType: ReactionType.None })
      : mutate({ reactionType: reaction });
  };

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          sx={{ color: 'primary.main' }}
          onClick={() => handleReaction(ReactionType.Positive)}
        >
          {data?.currentUserReaction === ReactionType.Positive ? (
            <ThumbUpAlt fontSize='large' />
          ) : (
            <ThumbUpOffAlt fontSize='large' />
          )}
        </IconButton>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={6}>
        <IconButton
          sx={{ color: 'primary.main' }}
          onClick={() => {
            handleReaction(ReactionType.Negative);
          }}
        >
          {data?.currentUserReaction === ReactionType.Negative ? (
            <ThumbDownAlt fontSize='large' />
          ) : (
            <ThumbDownOffAlt fontSize='large' />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <Typography textAlign='center'>{data?.positiveCount}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography textAlign='center'>{data?.negativeCount}</Typography>
      </Grid>
    </Grid>
  );
}

export default Reaction;
