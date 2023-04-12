import {
  ThumbDownAlt,
  ThumbDownOffAlt, ThumbUpAlt,
  ThumbUpOffAlt
} from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { usePostReaction, useReaction } from '../../api/video';
import { ReactionType } from '../../data/VideoMetadata';

interface ReactionProps {
  videoId: string;
}

export interface PostReaction {
  reactionType: ReactionType;
}

function Reaction({ videoId }: ReactionProps) {
  const { mutate } = usePostReaction(videoId);
  const { data } = useReaction(videoId);

  const handlePositiveReaction = () => {
    data?.currentUserReaction === ReactionType.Positive
      ? mutate({ reactionType: ReactionType.None })
      : mutate({ reactionType: ReactionType.Positive });
  };

  const handleNegativeReaction = () => {
    data?.currentUserReaction === ReactionType.Negative
      ? mutate({ reactionType: ReactionType.None })
      : mutate({ reactionType: ReactionType.Negative });
  };

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handlePositiveReaction}>
          {data?.currentUserReaction === ReactionType.Positive ? (
            <ThumbUpAlt fontSize='large' />
          ) : (
            <ThumbUpOffAlt fontSize='large' />
          )}
        </Button>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={6}>
        <Button onClick={handleNegativeReaction}>
          {data?.currentUserReaction === ReactionType.Negative ? (
            <ThumbDownAlt fontSize='large' />
          ) : (
            <ThumbDownOffAlt fontSize='large' />
          )}
        </Button>
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
