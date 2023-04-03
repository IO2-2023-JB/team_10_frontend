import { Stack, Typography } from '@mui/material';
import Avatar from '../../components/Avatar';
import { GetUserDetailsResponse, getUserTypeString } from '../../data/UserData';

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserDetails({ userDetails }: UserDetailsProps) {
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
        <Avatar userDetails={userDetails} size={120} />
        <Stack>
          <Typography variant='h4'>{textTop}</Typography>
          <Typography variant='h6'>{textBottom}</Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default UserDetails;
