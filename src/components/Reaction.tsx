import { Grid, Button, Typography } from '@mui/material';
import { usePostReaction, useReaction } from './../api/video';
import {
  FavoriteBorder,
  Favorite,
  ThumbDownAlt,
  ThumbDownOffAlt,
} from '@mui/icons-material';
import { ReactionType } from '../data/VideoMetadata';

interface ReactionProps {
  videoId: string;
}

interface Reaction {
  reactionType: ReactionType;
}

function Reaction({ videoId }: ReactionProps) {
  const { mutate } = usePostReaction(videoId);
  const { data } = useReaction(videoId);

  const handlePositiveReaction = () => {
    if (data?.currentUserReaction === ReactionType.Positive)
      mutate({ reactionType: ReactionType.None });
    else mutate({ reactionType: ReactionType.Positive });
  };

  const handleNegativeReaction = () => {
    if (data?.currentUserReaction === ReactionType.Negative)
      mutate({ reactionType: ReactionType.None });
    else mutate({ reactionType: ReactionType.Negative });
  };

  return (
    <Grid container sx={{ alignItems: 'center' }}>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handlePositiveReaction}>
          {data?.currentUserReaction === ReactionType.Positive ? (
            <Favorite fontSize='large' />
          ) : (
            <FavoriteBorder fontSize='large' />
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
