import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import NavBar from './NavBar';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <Stack height='100%'>
      <NavBar />
      {children}
    </Stack>
  );
}

export default AppLayout;
