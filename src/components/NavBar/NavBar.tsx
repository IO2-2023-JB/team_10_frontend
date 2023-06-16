import { Close, Logout, Publish, Report, Search } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useUserDetails } from '../../api/user';
import { ROUTES } from '../../const';
import { snackbarState } from '../../data/SnackbarData';
import { userDetailsState } from '../../data/UserData';
import { uploadProgressState, uploadingVideoState } from '../../data/VideoData';
import { useMobileLayout } from '../../theme';
import { AccountType } from '../../types/UserTypes';
import Avatar from '../Avatar';
import ResponsiveButton from '../ResponsiveButton';
import LinearProgress from '../layout/LinearProgress';
import Logo from './Logo';
import SearchField from './SearchField/SearchField';

function NavBar() {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const setSnackbarState = useSetRecoilState(snackbarState);
  const { data: userDetailsFull } = useUserDetails(userDetails?.id);
  const uploadingVideo = useRecoilValue(uploadingVideoState);
  const uploadProgress = useRecoilValue(uploadProgressState);
  const navigate = useNavigate();

  const { mobileQuery, isMobile, isDesktop } = useMobileLayout();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobile) setIsSearchOpen(false);
  }, [isMobile]);

  const isUploading = uploadingVideo !== null;

  const handleLogout = () => {
    setSnackbarState(null);
    setUserDetails(null);
    navigate(ROUTES.LOGIN);
  };

  const handleClickUpload = () => {
    navigate(ROUTES.UPLOAD);
  };

  const handleClickTickets = () => {
    navigate(ROUTES.TICKETS);
  };

  let content;

  if (isSearchOpen) {
    content = (
      <>
        <SearchField
          sx={{ marginY: 0.5, flex: 1 }}
          onClick={() => setIsSearchOpen(false)}
        />
        <IconButton onClick={() => setIsSearchOpen(false)}>
          <Close />
        </IconButton>
      </>
    );
  } else {
    content = (
      <>
        <Logo
          sx={{
            [mobileQuery]: {
              marginInlineEnd: 'auto',
            },
          }}
        />
        {userDetailsFull?.userType === AccountType.Creator && (
          <ResponsiveButton
            icon={<Publish />}
            label='Publikuj'
            disabled={isUploading}
            onClick={handleClickUpload}
          />
        )}
        <ResponsiveButton
          icon={<Report />}
          label='Zgłoszenia'
          onClick={handleClickTickets}
        />
        {userDetails !== null && (
          <>
            {isDesktop ? (
              <SearchField
                sx={{
                  marginX: 'auto',
                }}
              />
            ) : (
              <IconButton size='small' onClick={() => setIsSearchOpen(true)}>
                <Search sx={{ color: 'primary.main' }} />
              </IconButton>
            )}
            <ResponsiveButton
              label='Wyloguj się'
              icon={<Logout />}
              onClick={handleLogout}
            />
            <IconButton
              color='inherit'
              component={Link}
              to={`${ROUTES.USER}/${userDetails.id}`}
              aria-label='twój profil'
            >
              <Avatar userDetails={userDetailsFull} size={isMobile ? 32 : 40} />
            </IconButton>
          </>
        )}
      </>
    );
  }

  return (
    <Stack>
      <Stack
        component='header'
        direction='row'
        alignItems='center'
        sx={{
          gap: 2,
          paddingY: 2,
          paddingX: 4,
          color: 'primary.main',
          backgroundColor: 'background.light',

          [mobileQuery]: {
            gap: 0,
            paddingY: 1,
            paddingX: 2,
            paddingInlineEnd: 1,
          },
        }}
      >
        {content}
      </Stack>
      <LinearProgress
        variant={uploadProgress ? 'determinate' : 'indeterminate'}
        value={uploadProgress ? uploadProgress * 100 : undefined}
        sx={{
          visibility: isUploading ? 'visible' : 'hidden',
        }}
      />
    </Stack>
  );
}

export default NavBar;
