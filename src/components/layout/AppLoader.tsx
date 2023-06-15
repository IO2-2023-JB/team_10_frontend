import { Alert, AlertTitle, Box, Button, CircularProgress, Stack } from '@mui/material';
import { ReactNode, useRef } from 'react';
import { useLoggedInUserDetails } from '../../api/user';
import { getErrorMessage } from '../../utils/utils';
import { useRecoilState } from 'recoil';
import { AppMode, appModeState, isBarkaPlaying } from '../../data/AppStateData';
import { MODE_DURATION, MODE_INTERVAL_FREQUENCY } from '../../const';
import { useInterval } from 'usehooks-ts';

interface AppLoaderProps {
  children: ReactNode;
}

function AppLoader({ children }: AppLoaderProps) {
  const { isLoading, error, reload, logOut, showLoading } = useLoggedInUserDetails();
  const [appMode, setAppMode] = useRecoilState(appModeState);
  const [isPlaying, setIsPlaying] = useRecoilState(isBarkaPlaying);
  const audioRef = useRef<HTMLAudioElement>(null);

  useInterval(() => {
    const now = new Date();
    if (!isPlaying && appMode === AppMode.Papiesz) {
      audioRef.current?.play();
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
      }, MODE_DURATION);
    }
    if (appMode !== AppMode.Standard) return;
    if (now.getHours() === 21 && now.getMinutes() === 37) setAppMode(AppMode.Papiesz);
    if (now.getHours() === 16 && now.getMinutes() === 20) setAppMode(AppMode.Green);
  }, MODE_INTERVAL_FREQUENCY);

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
