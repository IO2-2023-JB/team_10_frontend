import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, Stack } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAdmin } from '../../api/user';
import SubscribeButton from '../../components/SubscribeButton';
import TicketButton from '../../components/TicketButton';
import DonateButton from '../../components/donate/DonateButton';
import { userDetailsState } from '../../data/UserData';
import { ButtonType } from '../../types/TicketTypes';
import { GetUserDetailsResponse } from '../../types/UserTypes';

interface UserInfoButtonsProps {
  userDetails: GetUserDetailsResponse;
  asMenu: boolean;
  fullWidth?: boolean;
}

function UserInfoButtons({ userDetails, asMenu, fullWidth }: UserInfoButtonsProps) {
  const loggedInUser = useRecoilValue(userDetailsState);
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
  const isAdmin = useAdmin();
  const isOpen = menuAnchorElement !== null;

  if (asMenu) {
    return (
      <>
        <IconButton
          sx={{ marginInlineStart: 'auto' }}
          onClick={(event) => {
            setMenuAnchorElement(event.currentTarget);
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          open={isOpen}
          anchorEl={menuAnchorElement}
          onClose={() => setMenuAnchorElement(null)}
        >
          <SubscribeButton creatorId={userDetails.id} asMenuItem />
          <DonateButton creator={userDetails} asMenuItem />
          {!isAdmin && loggedInUser?.id !== userDetails.id && (
            <TicketButton
              targetId={userDetails.id}
              buttonType={ButtonType.MenuItem}
              targetNameInTitle='użytkownika'
            />
          )}
        </Menu>
      </>
    );
  }

  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{ marginInlineStart: fullWidth ? 'auto' : 'none' }}
    >
      <SubscribeButton creatorId={userDetails.id} />
      <DonateButton creator={userDetails} />
      {!isAdmin && loggedInUser?.id !== userDetails.id && (
        <TicketButton
          targetId={userDetails.id}
          buttonType={ButtonType.Icon}
          targetNameInTitle='użytkownika'
        />
      )}
    </Stack>
  );
}

export default UserInfoButtons;
