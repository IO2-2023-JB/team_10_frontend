import { Skeleton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import SubscribeButton from '../../components/SubscribeButton';
import { GetUserDetailsResponse } from './../../types/UserTypes';
import { ROUTES } from '../../const';

const avatarSize = 60;

interface CreatorInfoProps {
  userDetails?: GetUserDetailsResponse;
  isSelf: boolean;
  width?: string;
}

function CreatorInfo({ userDetails, isSelf: isAuthor, width }: CreatorInfoProps) {
  return (
    <Stack direction='row' alignItems='center' width={width}>
      <Stack
        direction='row'
        color='inherit'
        sx={{
          padding: 1,
          borderRadius: 2,
          textDecoration: 'inherit',
          '&:hover': {
            backgroundColor: 'background.light',
          },
        }}
        component={Link}
        to={userDetails ? `${ROUTES.USER}/${userDetails?.id}` : '.'}
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
