import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: string | number;
}

function PageLayout({ children, maxWidth }: PageLayoutProps) {
  return (
    <Box
      component='main'
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: maxWidth ?? 'lg',
        marginX: 'auto',
        paddingX: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default PageLayout;
