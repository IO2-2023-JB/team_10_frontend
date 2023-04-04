import { Button, Dialog, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GetUserDetailsResponse, getUserTypeString } from '../../data/UserData';
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
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs={10}>
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
        </Grid>
        <Grid item xs={2} sx={{ alignSelf: 'center' }}>
          <Grid item container sx={{ justifyContent: 'right' }}>
            {userDetails.id === loggedUserDetails?.id ? (
              <Button onClick={handleDialogOpen} variant='contained'>
                Edytuj profil
              </Button>
            ) : (
              // SUBSCRIPTION BUTTON PLACEHOLDER
              <Button onClick={() => {}} variant='contained'>
                Subskrybuj
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        PaperProps={{
          sx: {
            padding: 3,
            borderRadius: 3,
            backgroundColor: 'background.default',
          },
        }}
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <UserDetailsEditForm closeDialog={handleDialogClose} userDetails={userDetails} />
      </Dialog>
    </>
  );
}

export default UserDetails;
