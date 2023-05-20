import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import NavBar from '../NavBar/NavBar';
import UploadStatusSnackbar from './UploadStatusSnackbar';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Stack sx={{ height: '100%' }}>
        <NavBar />
        {children}
      </Stack>
      <UploadStatusSnackbar />
    </>
  );
}

export default AppLayout;
