import { Stack, Typography } from '@mui/material';
import Avatar from '../../components/Avatar';
import { GetUserDetailsResponse } from '../../data/UserData';
import { Link } from 'react-router-dom';

const avatarSize = 60;

interface CreatorInfoProps {
  userDetails: GetUserDetailsResponse;
}

function CreatorInfo({ userDetails }: CreatorInfoProps) {
  const subscriptionsText = `${userDetails.subscriptionsCount} subskrypcji`;

  return (
    <Stack
      direction='row'
      alignItems='center'
      color='inherit'
      sx={{
        textDecoration: 'inherit',
      }}
      component={Link}
      to={`/user/${userDetails.id}`}
    >
      <Avatar userDetails={userDetails} size={avatarSize} />
      <Stack
        sx={{
          marginX: 2,
        }}
      >
        <Typography variant='h6'>{userDetails.nickname}</Typography>
        <Typography variant='subtitle2'>{subscriptionsText}</Typography>
      </Stack>
    </Stack>
  );
}

export default CreatorInfo;
