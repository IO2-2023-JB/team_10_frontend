import { Alert, AlertTitle } from '@mui/material';
import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { getErrorMessage } from '../../utils/utils';
import Spinner from '../Spinner';

interface ContentSectionProps {
  isLoading: boolean;
  error: AxiosError | null;
  children: ReactNode;
}

function ContentSection({ isLoading, error, children }: ContentSectionProps) {
  if (isLoading) {
    return <Spinner />;
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
