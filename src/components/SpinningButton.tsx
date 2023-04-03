import { CircularProgress, Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

type SpinningButtonProps = {
  children: ReactNode;
  isLoading: boolean;
} & ButtonProps;

function SpinningButton({ isLoading, children, ...others }: SpinningButtonProps) {
  return (
    <Button {...others}>
      {isLoading ? (
        <CircularProgress size='1.53rem' sx={{ color: 'inherit' }} />
      ) : (
        children
      )}
    </Button>
  );
}

export default SpinningButton;
