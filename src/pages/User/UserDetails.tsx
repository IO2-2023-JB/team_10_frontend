import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import FormDialog from '../../components/layout/FormDialog';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import {
  AccountType,
  GetUserDetailsResponse,
  getUserTypeString,
} from '../../types/UserTypes';
import Avatar from './../../components/Avatar';
import { userDetailsState } from './../../data/UserData';
import SubscribeButton from '../../components/SubscribeButton';
import UserDetailsEditForm from './UserDetailsEditForm';
import DonateButton from '../../components/donate/DonateButton';
import WithdrawButton from '../../components/donate/WithdrawButton';

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserDetails({ userDetails }: UserDetailsProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);

  const [dialogOpen, setDialogOpen] = useState(false);

  const textTop = `${userDetails.name} ${userDetails.surname} (@${userDetails.nickname})`;

  let textBottom = getUserTypeString(userDetails);
  if (userDetails.subscriptionsCount !== null)
    textBottom += ` · ${getNumberWithLabel(
      userDetails.subscriptionsCount,
      NumberDeclinedNoun.Subscription
    )}`;
  if (userDetails.accountBalance !== null)
    textBottom += ` · stan konta: ${getNumberWithLabel(
      userDetails.accountBalance,
      NumberDeclinedNoun.Eurogombka,
      true
    )}`;

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
        {userDetails.id === loggedUserDetails?.id && (
          <Stack direction='row' spacing={1} sx={{ marginInlineStart: 'auto' }}>
            <Button
              onClick={handleDialogOpen}
              sx={{ marginInlineStart: 'auto' }}
              variant='contained'
            >
              Edytuj profil
            </Button>
            {userDetails.userType === AccountType.Creator && (
              <WithdrawButton creator={userDetails} />
            )}
          </Stack>
        )}
        {userDetails.id !== loggedUserDetails?.id &&
          userDetails.userType === AccountType.Creator && (
            <Stack direction='row' spacing={1} sx={{ marginInlineStart: 'auto' }}>
              <SubscribeButton creatorId={userDetails.id} />
              <DonateButton creator={userDetails} />
            </Stack>
          )}
      </Stack>
      <FormDialog open={dialogOpen} onClose={handleDialogClose}>
        <UserDetailsEditForm closeDialog={handleDialogClose} userDetails={userDetails} />
      </FormDialog>
    </>
  );
}

export default UserDetails;
