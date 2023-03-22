import { AccountCircle } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';
import Logo from './Logo';

function NavBar() {
  return (
    <Paper
      component='header'
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        paddingY: 2,
        paddingX: 4,
        color: 'primary.main',
      }}
    >
      <Logo sx={{ marginInlineEnd: 'auto' }} />
      <IconButton color='inherit' href='/login'>
        <AccountCircle fontSize='large' />
      </IconButton>
    </Paper>
  );
}

export default NavBar;
