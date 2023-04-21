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
        width: '100%',
        maxWidth: maxWidth ?? 'lg',
        marginX: 'auto',
        paddingX: 4,
        paddingY: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default PageLayout;
