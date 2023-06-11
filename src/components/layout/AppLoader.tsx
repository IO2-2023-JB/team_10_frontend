import { Alert, AlertTitle, Box, Button, CircularProgress, Stack } from '@mui/material';
import { ReactNode, useEffect, useRef } from 'react';
import { useLoggedInUserDetails } from '../../api/user';
import { getErrorMessage } from '../../utils/utils';
import { useSetRecoilState } from 'recoil';
import { AppMode, appModeState } from '../../data/AppStateData';
import { MODE_DURATION } from '../../const';

interface AppLoaderProps {
  children: ReactNode;
}

function AppLoader({ children }: AppLoaderProps) {
  const { isLoading, error, reload, logOut, showLoading } = useLoggedInUserDetails();
  const setAppMode = useSetRecoilState(appModeState);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setInterval(() => {
      const now = new Date(Date.now());
      if (now.getHours() === 21 && now.getMinutes() === 37) {
        setAppMode(AppMode.Papiesz);
        audioRef.current?.play();
        setTimeout(() => {
          audioRef.current?.pause();
        }, MODE_DURATION);
      }
      if (now.getHours() === 4 && now.getMinutes() === 20) setAppMode(AppMode.Green);
    }, MODE_DURATION);
  }, [setAppMode]);

  if (showLoading && (isLoading || error)) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {error ? (
          <Stack>
            <Alert severity='error' variant='filled' sx={{ marginBottom: 1 }}>
              <AlertTitle>Wystąpił błąd!</AlertTitle>
              {getErrorMessage(error)}
            </Alert>
            <Button onClick={() => reload()}>Spróbuj ponownie</Button>
            <Button onClick={() => logOut()}>Wyloguj się</Button>
          </Stack>
        ) : (
          <CircularProgress size='clamp(50px, 10vmin, 150px)' />
        )}
      </Box>
    );
  }

  return (
    <>
      <audio ref={audioRef} src='/barka.mp3' />
      {children}
    </>
  );
}

export default AppLoader;
