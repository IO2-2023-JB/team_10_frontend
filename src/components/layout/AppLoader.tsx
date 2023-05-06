import { Alert, AlertTitle, Box, Button, CircularProgress, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { useLoggedInUserDetails } from '../../api/user';
import { getErrorMessage } from '../../utils/utils';

interface AppLoaderProps {
  children: ReactNode;
}

function AppLoader({ children }: AppLoaderProps) {
  const { isLoading, error, reload, logOut } = useLoggedInUserDetails();

  if (isLoading || error) {
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

  return <>{children}</>;
}

export default AppLoader;
