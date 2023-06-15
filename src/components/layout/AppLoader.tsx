import { Alert, AlertTitle, Box, Button, CircularProgress, Stack } from '@mui/material';
import { ReactNode, useEffect, useRef } from 'react';
import { useLoggedInUserDetails } from '../../api/user';
import { getErrorMessage } from '../../utils/utils';
import { useRecoilState } from 'recoil';
import { AppMode, appModeState } from '../../data/AppStateData';
import { MODE_INTERVAL_FREQUENCY } from '../../const';
import { useInterval } from 'usehooks-ts';

interface AppLoaderProps {
  children: ReactNode;
}

function AppLoader({ children }: AppLoaderProps) {
  const { isLoading, error, reload, logOut, showLoading } = useLoggedInUserDetails();
  const [appModeData, setAppModeData] = useRecoilState(appModeState);
  const audioRef = useRef<HTMLAudioElement>(null);

  useInterval(() => {
    const now = new Date();
    if (appModeData.appMode !== AppMode.Standard) return;
    if (now.getHours() === 21 && now.getMinutes() === 37)
      setAppModeData({ appMode: AppMode.Papiesz, timeout: null });
    if (now.getHours() === 16 && now.getMinutes() === 20)
      setAppModeData({ appMode: AppMode.Green, timeout: null });
  }, MODE_INTERVAL_FREQUENCY);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (appModeData.appMode === AppMode.Papiesz) {
        audioRef.current.src = '/wapiesz.mp3';
        audioRef.current?.play();
      } else if (appModeData.appMode === AppMode.Green) {
        audioRef.current.src = '/snoop.mp3';
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }
  }, [appModeData.appMode]);

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
      <audio ref={audioRef} />
      {children}
    </>
  );
}

export default AppLoader;
