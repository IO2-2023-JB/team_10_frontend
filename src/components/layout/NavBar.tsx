import { Box, Button, IconButton, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import { pageNotificationState } from '../../data/VideoData';
import { AccountType } from '../../types/UserTypes';
import Avatar from '../Avatar';
import Logo from './Logo';

function NavBar() {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const { data: userDetailsFull } = useUserDetails(userDetails?.id);
  const notif = useRecoilValue(pageNotificationState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserDetails(null);
    navigate('/login');
  };

  const handleClickUpload = () => {
    navigate('/upload');
  };

  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        paddingY: 2,
        paddingX: 4,
        color: 'primary.main',
        backgroundColor: 'background.light',
      }}
    >
      <Stack
        spacing={5}
        direction='row'
        sx={{ marginInlineEnd: 'auto', alignItems: 'center' }}
      >
        <Logo />
        <Stack sx={{ flexShrink: 0 }} direction='row' spacing={3}>
          {userDetailsFull?.userType === AccountType.Creator && (
            <Button disabled={notif.open} onClick={handleClickUpload}>
              Publikuj wideło
            </Button>
          )}
        </Stack>
      </Stack>
      {userDetails !== null && (
        <>
          <Button sx={{ flexShrink: 0 }} onClick={handleLogout}>
            Wyloguj się
          </Button>
          <IconButton color='inherit' component={Link} to={`/user/${userDetails.id}`}>
            <Avatar userDetails={userDetailsFull} size={40} />
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default NavBar;
