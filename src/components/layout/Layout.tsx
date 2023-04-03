import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Stack
      sx={{
        height: '100%',
      }}
    >
      <NavBar />
      <Box component='main' flex={1}>
        {children}
      </Box>
    </Stack>
  );
}

export default Layout;
