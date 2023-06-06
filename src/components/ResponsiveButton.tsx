import { Button, ButtonProps, IconButton, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import { useMobileLayout } from '../theme';

type ResponsiveButtonProps = {
  icon: ReactNode;
  label: string;
} & ButtonProps;

function ResponsiveButton({ icon, label, ...props }: ResponsiveButtonProps) {
  const { isMobile } = useMobileLayout();

  if (isMobile) {
    return (
      <Tooltip title={label}>
        <IconButton
          {...props}
          sx={{
            '& > .MuiSvgIcon-root': {
              color: 'primary.main',
            },
            ...props.sx,
          }}
          size='small'
        >
          {icon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      {...props}
      sx={{
        flexShrink: 0,
        ...props.sx,
      }}
    >
      {label}
    </Button>
  );
}

export default ResponsiveButton;
