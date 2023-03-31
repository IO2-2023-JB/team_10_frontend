import { CircularProgressProps, CircularProgress, Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

type SpinningButtonProps = {
  children: ReactNode;
  isLoading: boolean;
} & ButtonProps;

function SpinningButton({ isLoading, children, ...others }: SpinningButtonProps) {
  const circularProgressConfig: CircularProgressProps = {
    size: '1.53rem',
    sx: {
      color: 'inherit',
    },
  };
  return (
    <Button {...others}>
      {isLoading ? <CircularProgress {...circularProgressConfig} /> : children}
    </Button>
  );
}

export default SpinningButton;
