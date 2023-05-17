import { Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { getErrorMessage } from '../../utils/utils';

interface ContentSectionProps {
  isLoading: boolean;
  error: AxiosError | null;
  children: ReactNode;
}

function ContentSection({ isLoading, error, children }: ContentSectionProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', padding: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error !== null) {
    return (
      <Alert
        severity='error'
        variant='filled'
        sx={{
          width: '100%',
        }}
      >
        <AlertTitle>Nie udało się załadować danych</AlertTitle>
        {getErrorMessage(error)}
      </Alert>
    );
  }

  return <>{children}</>;
}

export default ContentSection;
