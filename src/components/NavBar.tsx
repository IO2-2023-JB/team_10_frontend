import { Paper } from '@mui/material';
import Logo from './Logo';

function NavBar() {
  return (
    <Paper
      component='header'
      sx={{
        display: 'flex',
        padding: 2,
      }}
    >
      <Logo />
    </Paper>
  );
}

export default NavBar;
