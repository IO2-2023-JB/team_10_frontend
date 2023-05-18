import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { transitionShort } from '../theme';

interface TypographyLinkProps {
  to?: string;
  children: ReactNode;
}

function TypographyLink({ to, children }: TypographyLinkProps) {
  if (to === undefined) {
    return <Box component='span'>{children}</Box>;
  }

  return (
    <Box
      onClick={(event) => event.stopPropagation()}
      component={Link}
      to={to}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        transition: transitionShort('color'),
        '&:hover': { color: 'primary.main' },
      }}
    >
      {children}
    </Box>
  );
}

export default TypographyLink;
