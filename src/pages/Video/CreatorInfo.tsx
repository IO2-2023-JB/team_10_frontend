import { Button, Skeleton, Stack, Typography } from '@mui/material';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';
import { GetUserDetailsResponse } from './../../types/UserTypes';
import {
  useDeleteSubscription,
  useIsSubscribed,
  usePostSubscription,
} from '../../api/subscription';

const avatarSize = 60;

interface CreatorInfoProps {
  userDetails?: GetUserDetailsResponse;
  isAuthor: boolean;
}

function CreatorInfo({ userDetails, isAuthor }: CreatorInfoProps) {
  const isSubscribed = useIsSubscribed(userDetails?.id);
  const { mutate: mutateSubscribe } = usePostSubscription(userDetails?.id);
  const { mutate: mutateUnsubscribe } = useDeleteSubscription(userDetails?.id);

  const handleSubscribe = () => {
    isSubscribed ? mutateUnsubscribe() : mutateSubscribe();
  };

  return (
    <Stack direction='row' alignItems='center'>
      <Stack
        direction='row'
        color='inherit'
        sx={{
          textDecoration: 'inherit',
        }}
        component={Link}
        to={userDetails ? `/user/${userDetails?.id}` : '.'}
      >
        {userDetails ? (
          <Avatar userDetails={userDetails} size={avatarSize} />
        ) : (
          <Skeleton variant='circular' width={avatarSize} height={avatarSize} />
        )}
        <Stack
          sx={{
            marginX: 2,
          }}
        >
          <Typography variant='h6'>
            {userDetails ? userDetails.nickname : <Skeleton width={150} />}
          </Typography>
          <Typography variant='subtitle2'>
            {userDetails ? `${userDetails.subscriptionsCount} subskrypcji` : <Skeleton />}{' '}
          </Typography>
        </Stack>
      </Stack>
      {!isAuthor && (
        <Button
          variant={isSubscribed ? 'contained' : 'outlined'}
          size='large'
          onClick={() => {
            handleSubscribe();
          }}
        >
          {userDetails ? isSubscribed ? 'Subskrybujesz' : 'Subskrybuj' : <Skeleton />}
        </Button>
      )}
    </Stack>
  );
}

export default CreatorInfo;
