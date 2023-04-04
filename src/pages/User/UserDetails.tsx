import { Avatar, Button, Stack, Typography, Grid, Dialog, Paper } from '@mui/material';
import {
  getInitials,
  GetUserDetailsResponse,
  getUserTypeString,
} from '../../data/UserData';
import UserDetailsEditForm from './UserDetailsEditForm';
import { useState } from 'react';

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserDetails({ userDetails }: UserDetailsProps) {
  const initials = getInitials(userDetails);
  const [dialogOpen, setDialogOpen] = useState(false);
  const textTop = `${userDetails.name} ${userDetails.surname} (@${userDetails.nickname})`;

  let textBottom = getUserTypeString(userDetails);
  if (userDetails.subscriptionsCount !== null)
    textBottom += ` · ${userDetails.subscriptionsCount} subskrypcji`;
  if (userDetails.accountBalance !== null)
    textBottom += ` · stan konta: ${userDetails.accountBalance} zł`;

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => setDialogOpen(false);

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
        </Grid>
        <Grid item xs={2} sx={{ alignSelf: 'center' }}>
          <Grid item container sx={{ justifyContent: 'right' }}>
            <Button onClick={handleDialogOpen} variant='contained'>
              Edytuj profil
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          <UserDetailsEditForm
            closeDialog={handleDialogClose}
            userDetails={userDetails}
          />
        </Paper>
      </Dialog>
    </>
  );
}

export default UserDetails;
