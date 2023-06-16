import { Skeleton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { ROUTES } from '../../const';
import { useMobileLayout } from '../../theme';
import { AccountType, GetUserDetailsResponse } from '../../types/UserTypes';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import UserInfoButtons from './UserInfoButtons';

const avatarSize = 60;

interface UserInfoProps {
  userDetails?: GetUserDetailsResponse;
  isSelf: boolean;
  fullWidth?: boolean;
}

function UserInfo({ userDetails, isSelf: isAuthor, fullWidth }: UserInfoProps) {
  const isCreator = userDetails?.userType === AccountType.Creator;

  const { isMobile } = useMobileLayout();

  return (
    <Stack direction='row' alignItems='center' flex={1}>
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
        <Stack sx={{ marginX: 2 }}>
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
        <UserInfoButtons
          userDetails={userDetails}
          asMenu={isMobile}
          fullWidth={fullWidth}
        />
      )}
    </Stack>
  );
}

export default UserInfo;
