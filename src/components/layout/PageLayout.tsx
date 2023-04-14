import { Alert, Box, Snackbar } from '@mui/material';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { pageNotificationState } from '../../data/VideoData';
import { ProcessingProgress } from '../../data/VideoTypes';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: string | number;
}

function PageLayout({ children, maxWidth }: PageLayoutProps) {
  const notif = useRecoilValue(pageNotificationState);

  return (
    <Box
      component='main'
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: maxWidth ?? 'lg',
        marginX: 'auto',
        paddingX: 4,
        paddingY: 2,
      }}
    >
      <Snackbar
        open={notif !== null}
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
    </Box>
  );
}

export default PageLayout;
