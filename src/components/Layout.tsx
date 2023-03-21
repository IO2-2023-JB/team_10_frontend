import { Box } from '@mui/material';
import { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Box component='main'>{children}</Box>
    </>
  );
}

export default Layout;
