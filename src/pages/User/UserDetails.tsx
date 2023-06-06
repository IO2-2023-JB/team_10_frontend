import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useUserDetailsEdit } from '../../api/user';
import StatusSnackbar from '../../components/StatusSnackbar';
import SubscribeButton from '../../components/SubscribeButton';
import DonateButton from '../../components/donate/DonateButton';
import WithdrawButton from '../../components/donate/WithdrawButton';
import FormDialog from '../../components/layout/FormDialog';
import { useMobileLayout } from '../../theme';
import {
  AccountType,
  GetUserDetailsResponse,
  getUserTypeString,
} from '../../types/UserTypes';
import { NumberDeclinedNoun, getNumberWithLabel } from '../../utils/numberDeclinedNouns';
import Avatar from './../../components/Avatar';
import { userDetailsState } from './../../data/UserData';
import UserDetailsEditForm from './UserDetailsEditForm';
import TicketButton from '../../components/TicketButton';
import { ButtonType } from '../../types/DonateTypes';

interface UserDetailsProps {
  userDetails: GetUserDetailsResponse;
}

function UserDetails({ userDetails }: UserDetailsProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const mutationResult = useUserDetailsEdit();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mobileQuery, desktopQuery, isMobile, isDesktop } = useMobileLayout();

  const textTop = `${userDetails.name} ${userDetails.surname}`;

  let textBottom = getUserTypeString(userDetails);
  if (userDetails.subscriptionsCount !== null) {
    textBottom += ` · ${getNumberWithLabel(
      userDetails.subscriptionsCount,
      NumberDeclinedNoun.Subscription
    )}`;
  }

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Stack
        sx={{
          flexDirection: 'row',
          [mobileQuery]: {
            flexDirection: 'column',
            gap: 2,
          },
          marginY: 2,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 4,
            [mobileQuery]: {
              flexDirection: 'column',
              gap: 2,
            },
          }}
        >
          <Stack
            direction='row'
            spacing={3}
            sx={{
              alignItems: 'center',
            }}
          >
            <Avatar userDetails={userDetails} size={isMobile ? 100 : 120} />
            {isMobile && <Typography variant='h3'>{userDetails.nickname}</Typography>}
          </Stack>
          <Stack spacing={1}>
            {isDesktop && <Typography variant='h3'>{userDetails.nickname}</Typography>}
            <Typography variant='h4'>{textTop}</Typography>
            <Typography variant='h5'>{textBottom}</Typography>
            {userDetails.accountBalance !== null && (
              <Typography variant='h5'>
                Stan konta:{' '}
                {getNumberWithLabel(
                  userDetails.accountBalance,
                  NumberDeclinedNoun.Eurogombka,
                  true
                )}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack
          alignItems='center'
          direction='row'
          spacing={1}
          sx={{ [desktopQuery]: { marginInlineStart: 'auto' } }}
        >
          {userDetails.id === loggedUserDetails?.id && (
            <>
              <Button onClick={handleDialogOpen} variant='contained'>
                Edytuj profil
              </Button>
              {userDetails.userType === AccountType.Creator && (
                <WithdrawButton creator={userDetails} />
              )}
            </>
          )}
          {userDetails.id !== loggedUserDetails?.id && (
            <>
              {userDetails.userType === AccountType.Creator && (
                <>
                  <DonateButton creator={userDetails} />
                  <SubscribeButton creatorId={userDetails.id} />
                </>
              )}
              <TicketButton
                targetId={userDetails.id}
                buttonType={ButtonType.Icon}
                targetNameInTitle='konto'
              />
            </>
          )}
        </Stack>
      </Stack>
      <FormDialog open={dialogOpen} onClose={handleDialogClose}>
        <UserDetailsEditForm
          closeDialog={handleDialogClose}
          userDetails={userDetails}
          mutation={mutationResult}
        />
      </FormDialog>
      <StatusSnackbar
        successMessage={`Pomyślnie edytowano dane użytkownika ${userDetails.nickname}!`}
        isSuccess={mutationResult.isSuccess}
        reset={mutationResult.reset}
      />
    </>
  );
}

export default UserDetails;
