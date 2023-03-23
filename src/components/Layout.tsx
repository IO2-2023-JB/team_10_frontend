import { Box } from '@mui/material';
import { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <NavBar />
      <Box component='main' flex={1}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
