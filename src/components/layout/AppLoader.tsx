import { Alert, AlertTitle, Box, Button, CircularProgress, Stack } from '@mui/material';
import { ReactNode, useEffect, useRef } from 'react';
import { useLoggedInUserDetails } from '../../api/user';
import { getErrorMessage } from '../../utils/utils';
import { useRecoilState } from 'recoil';
import { AppModes, appModeState } from '../../data/AppStateData';
import theme from '../../theme';
import { MODE_DURATION } from '../../const';

interface AppLoaderProps {
  children: ReactNode;
}

function AppLoader({ children }: AppLoaderProps) {
  const { isLoading, error, reload, logOut, showLoading } = useLoggedInUserDetails();
  const [appMode, setAppMode] = useRecoilState(appModeState);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setInterval(() => {
      const now = new Date(Date.now());
      if (now.getMinutes() === 37 && now.getHours() === 21) {
        setAppMode(AppModes.Papiesz);
        audioRef.current?.play();
        setTimeout(() => {
          audioRef.current?.pause();
        }, MODE_DURATION);
      }
      if (now.getMinutes() === 20 && now.getHours() === 4) setAppMode(AppModes.Green);
    }, MODE_DURATION);
  }, [setAppMode]);

  useEffect(() => {
    switch (appMode) {
      case AppModes.Papiesz:
        theme.palette.primary.main = '#ffc603';
        break;
      case AppModes.Green:
        theme.palette.primary.main = '#00FF00';
        break;
      default:
        theme.palette.primary.main = '#FF9000';
        break;
    }
  }, [appMode]);

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
