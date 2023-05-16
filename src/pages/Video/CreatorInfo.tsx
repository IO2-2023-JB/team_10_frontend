import { Skeleton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import SubscribeButton from '../User/SubscribeButton';
import { GetUserDetailsResponse } from './../../types/UserTypes';

const avatarSize = 60;

interface CreatorInfoProps {
  userDetails?: GetUserDetailsResponse;
  isAuthor: boolean;
}

function CreatorInfo({ userDetails, isAuthor }: CreatorInfoProps) {
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
            {userDetails ? (
              getNumberWithLabel(
                userDetails.subscriptionsCount!,
                NumberDeclinedNoun.Subscription
              )
            ) : (
              <Skeleton />
            )}
          </Typography>
        </Stack>
      </Stack>
      {!isAuthor && userDetails && <SubscribeButton creatorId={userDetails.id} />}
    </Stack>
  );
}

export default CreatorInfo;
