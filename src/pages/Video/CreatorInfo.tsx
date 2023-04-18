import { Skeleton, Stack, Typography } from '@mui/material';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';
import { GetUserDetailsResponse } from './../../types/UserTypes';

const avatarSize = 60;

interface CreatorInfoProps {
  userDetails?: GetUserDetailsResponse;
}

function CreatorInfo({ userDetails }: CreatorInfoProps) {
  return (
    <Stack
      direction='row'
      alignItems='center'
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
  );
}

export default CreatorInfo;
