import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, Stack } from '@mui/material';
import { useState } from 'react';
import SubscribeButton from '../../components/SubscribeButton';
import DonateButton from '../../components/donate/DonateButton';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import TicketButton from '../../components/TicketButton';
import { ButtonType } from '../../types/TicketTypes';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../data/UserData';

interface UserInfoButtonsProps {
  userDetails: GetUserDetailsResponse;
  asMenu: boolean;
}

function UserInfoButtons({ userDetails, asMenu }: UserInfoButtonsProps) {
  const loggedInUser = useRecoilValue(userDetailsState);
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement | null>(null);
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
          {loggedInUser?.id !== userDetails.id && (
            <TicketButton
              targetId={userDetails.id}
              buttonType={ButtonType.MenuItem}
              targetNameInTitle='konto'
            />
          )}
        </Menu>
      </>
    );
  }

  return (
    <Stack direction='row' spacing={1} sx={{ marginInlineStart: 'auto' }}>
      <SubscribeButton creatorId={userDetails.id} />
      <DonateButton creator={userDetails} />
      {loggedInUser?.id !== userDetails.id && (
        <TicketButton
          targetId={userDetails.id}
          buttonType={ButtonType.Icon}
          targetNameInTitle='konto'
        />
      )}
    </Stack>
  );
}

export default UserInfoButtons;
