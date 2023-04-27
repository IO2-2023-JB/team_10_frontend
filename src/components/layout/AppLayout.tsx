import { Stack, Snackbar, Alert } from '@mui/material';
import { ReactNode } from 'react';
import { videoNotificationState } from '../../data/VideoData';
import NavBar from './NavBar';
import { useRecoilValue } from 'recoil';
import { ProcessingProgress } from '../../types/VideoTypes';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const notif = useRecoilValue(videoNotificationState);

  return (
    <Stack>
      <NavBar />
      <Snackbar
        open={notif.open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={
            notif?.status === ProcessingProgress.FailedToUpload
              ? 'error'
              : notif?.status === ProcessingProgress.Ready
              ? 'success'
              : 'info'
          }
        >
          {notif?.message}
        </Alert>
      </Snackbar>
      {children}
    </Stack>
  );
}

export default AppLayout;
