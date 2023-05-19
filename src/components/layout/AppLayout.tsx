import { Alert, LinearProgress, Snackbar, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { videoNotificationState } from '../../data/VideoData';
import { ProcessingProgress } from '../../types/VideoTypes';
import NavBar from '../NavBar/NavBar';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const notif = useRecoilValue(videoNotificationState);

  return (
    <Stack sx={{ height: '100%' }}>
      <NavBar />
      <LinearProgress
        sx={{
          height: 1.2,
          visibility: notif.open ? 'visible' : 'hidden',
          color: 'primary.main',
        }}
      />
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
