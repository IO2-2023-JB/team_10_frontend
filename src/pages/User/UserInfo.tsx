import { Skeleton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import SubscribeButton from '../../components/SubscribeButton';
import DonateButton from '../../components/donate/DonateButton';
import { ROUTES } from '../../const';
import { AccountType, GetUserDetailsResponse } from '../../types/UserTypes';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';

const avatarSize = 60;

interface UserInfoProps {
  userDetails?: GetUserDetailsResponse;
  isSelf: boolean;
  width?: string;
}

function UserInfo({ userDetails, isSelf: isAuthor, width }: UserInfoProps) {
  const isCreator = userDetails?.userType === AccountType.Creator;

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
          {isCreator && (
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
          )}
        </Stack>
      </Stack>
      {!isAuthor && userDetails && isCreator && (
        <Stack direction='row' spacing={2} sx={{ marginInlineStart: 'auto' }}>
          <SubscribeButton creatorId={userDetails.id} />
          <DonateButton creator={userDetails} />
        </Stack>
      )}
    </Stack>
  );
}

export default UserInfo;
