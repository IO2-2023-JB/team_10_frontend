import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import FormDialog from '../../components/layout/FormDialog';
import { getUserTypeString, GetUserDetailsResponse } from '../../types/UserTypes';
import Avatar from './../../components/Avatar';
import { userDetailsState } from './../../data/UserData';
import UserDetailsEditForm from './UserDetailsEditForm';
interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserDetails({ userDetails }: UserDetailsProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const [dialogOpen, setDialogOpen] = useState(false);

  const textTop = `${userDetails.name} ${userDetails.surname} (@${userDetails.nickname})`;

  let textBottom = getUserTypeString(userDetails);
  if (userDetails.subscriptionsCount !== null)
    textBottom += ` · ${userDetails.subscriptionsCount} subskrypcji`;
  if (userDetails.accountBalance !== null)
    textBottom += ` · stan konta: ${userDetails.accountBalance} zł`;

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Stack direction='row' alignItems='center'>
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
            <Typography variant='h3'>{textTop}</Typography>
            <Typography variant='h5'>{textBottom}</Typography>
          </Stack>
        </Stack>

        {userDetails.id === loggedUserDetails?.id ? (
          <Button
            onClick={handleDialogOpen}
            sx={{ marginInlineStart: 'auto' }}
            variant='contained'
          >
            Edytuj profil
          </Button>
        ) : (
          <Button onClick={() => {}} variant='contained'>
            Subskrybuj
          </Button>
        )}
      </Stack>
      <FormDialog open={dialogOpen} onClose={handleDialogClose}>
        <UserDetailsEditForm closeDialog={handleDialogClose} userDetails={userDetails} />
      </FormDialog>
    </>
  );
}

export default UserDetails;
