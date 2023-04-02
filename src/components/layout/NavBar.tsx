import { AccountCircle } from '@mui/icons-material';
import { IconButton, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useRecoilState } from 'recoil';
import { userDetailsState } from '../../data/UserData';

function NavBar() {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const navigate = useNavigate();

  const onLogout = () => {
    setUserDetails(null);
    navigate('/login');
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
      <Logo sx={{ marginInlineEnd: 'auto' }} />
      {userDetails !== null && (
        <>
          <Button onClick={onLogout}>Wyloguj się</Button>
          <IconButton color='inherit' component={Link} to={'/login'}>
            <AccountCircle fontSize='large' />
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default NavBar;
