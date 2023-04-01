import { Avatar, Stack, Typography } from '@mui/material';
import {
  getInitials,
  GetUserDetailsResponse,
  getUserTypeString,
} from '../../data/UserData';

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserDetails({ userDetails }: UserDetailsProps) {
  const initials = getInitials(userDetails);
  const textTop = `${userDetails.name} ${userDetails.surname} (@${userDetails.nickname})`;

  let textBottom = getUserTypeString(userDetails);
  if (userDetails.subscriptionsCount !== null)
    textBottom += ` · ${userDetails.subscriptionsCount} subskrypcji`;
  if (userDetails.accountBalance !== null)
    textBottom += ` · stan konta: ${userDetails.accountBalance} zł`;

  return (
    <>
      <Stack
        direction='row'
        spacing={4}
        sx={{
          alignItems: 'center',
          marginY: 5,
        }}
      >
        <Avatar
          src={userDetails.avatarImage}
          sx={{
            width: 150,
            height: 150,
            fontSize: '5rem',
            fontWeight: 700,
            backgroundColor: 'primary.main',
          }}
        >
          {initials}
        </Avatar>
        <Stack>
          <Typography variant='h3'>{textTop}</Typography>
          <Typography variant='h5'>{textBottom}</Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default UserDetails;
