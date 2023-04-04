import { Button, Stack, Typography, Grid, Dialog, Paper } from '@mui/material';
import {
  getInitials,
  GetUserDetailsResponse,
  getUserTypeString,
} from '../../data/UserData';
import UserDetailsEditForm from './UserDetailsEditForm';
import { useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from './../../data/UserData';
import Avatar from './../../components/Avatar';

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
  reload: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<GetUserDetailsResponse>>;
  // reload: <TPageData>(
  //   options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  // ) => QueryObserverRefetchErrorResult<GetUserDetailsResponse, AxiosError<unknown, any>>;
}

function UserDetails({ userDetails, reload }: UserDetailsProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const [dialogOpen, setDialogOpen] = useState(false);

  const textTop = `${userDetails.name} ${userDetails.surname} (@${userDetails.nickname})`;

  let textBottom = getUserTypeString(userDetails);
  if (userDetails.subscriptionsCount !== null)
    textBottom += ` · ${userDetails.subscriptionsCount} subskrypcji`;
  if (userDetails.accountBalance !== null)
    textBottom += ` · stan konta: ${userDetails.accountBalance} zł`;

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = async () => {
    // TBD: DZIWNE - RELOAD ZA PIERWSZYM RAZEM ZAWSZE ZWRACA DANE BEZ UPDATU, ZA DRUGIM JUŻ DZIAŁA XD
    ( reload().then(() => reload()));
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
