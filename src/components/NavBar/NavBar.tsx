import { Button, IconButton, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import { ROUTES } from '../../const';
import { userDetailsState } from '../../data/UserData';
import { videoNotificationState } from '../../data/VideoData';
import { AccountType } from '../../types/UserTypes';
import Avatar from '../Avatar';
import LinearProgress from '../layout/LinearProgress';
import Logo from './Logo';
import SearchField from './SearchField/SearchField';

function NavBar() {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const { data: userDetailsFull } = useUserDetails(userDetails?.id);
  const notif = useRecoilValue(videoNotificationState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserDetails(null);
    navigate('/login');
  };

  const handleClickUpload = () => {
    navigate('/upload');
  };

  return (
    <Stack>
      <Stack
        component='header'
        direction='row'
        spacing={2}
        justifyContent='space-between'
        alignItems='center'
        sx={{
          paddingY: 2,
          paddingX: 4,
          color: 'primary.main',
          backgroundColor: 'background.light',
        }}
      >
        <Stack spacing={5} direction='row' sx={{ alignItems: 'center' }}>
          <Logo />
          <Stack sx={{ flexShrink: 0 }} direction='row' spacing={3}>
            {userDetailsFull?.userType === AccountType.Creator && (
              <Button disabled={notif.open} onClick={handleClickUpload}>
                Publikuj
              </Button>
            )}
          </Stack>
        </Stack>
        {userDetails !== null && (
          <>
            <SearchField />
            <Stack direction='row' spacing={2} alignItems='center'>
              <Button sx={{ flexShrink: 0 }} onClick={handleLogout}>
                Wyloguj się
              </Button>
              <IconButton
                color='inherit'
                component={Link}
                to={`${ROUTES.USER}/${userDetails.id}`}
                aria-label='twój profil'
              >
                <Avatar userDetails={userDetailsFull} size={40} />
              </IconButton>
            </Stack>
          </>
        )}
      </Stack>
      <LinearProgress
        sx={{
          visibility: notif.open ? 'visible' : 'hidden',
        }}
      />
    </Stack>
  );
}

export default NavBar;
