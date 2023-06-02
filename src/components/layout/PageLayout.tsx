import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { useMobileLayout } from '../../theme';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: string | number;
}

function PageLayout({ children, maxWidth }: PageLayoutProps) {
  const { mobileQuery } = useMobileLayout();

  return (
    <Box
      component='main'
      sx={{
        width: '100%',
        maxWidth: maxWidth ?? 'lg',
        marginX: 'auto',
        paddingX: 4,
        paddingY: 2,
        flex: 1,

        [mobileQuery]: {
          paddingX: 2,
          paddingY: 1,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default PageLayout;
