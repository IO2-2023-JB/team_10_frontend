import { Box, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useUserDetails } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import Avatar from '../Avatar';
import Logo from './Logo';

function NavBar() {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const { data: userDetailsFull } = useUserDetails(userDetails?.id);
  const navigate = useNavigate();

  const handleLogout = () => {
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
          <Button onClick={handleLogout}>Wyloguj się</Button>
          <IconButton color='inherit' component={Link} to={`/user/${userDetails.id}`}>
            <Avatar userDetails={userDetailsFull} size={40} />
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default NavBar;
