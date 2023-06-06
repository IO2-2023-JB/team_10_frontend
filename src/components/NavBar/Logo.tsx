import { Box, Stack, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../const';
import { useMobileLayout } from '../../theme';

interface LogoProps {
  sx?: SxProps;
}
function Logo({ sx }: LogoProps) {
  const { isMobile } = useMobileLayout();

  const size = isMobile ? 0.7 : 1;

  return (
    <Stack
      direction='row'
      sx={{
        gap: `${size * 0.5}rem`,
        alignItems: 'baseline',
        fontSize: `${size * 2}rem`,
        fontWeight: 900,
        textDecoration: 'none',
        color: 'inherit',
        ...sx,
      }}
      component={Link}
      to={ROUTES.HOMEPAGE}
    >
      <Box
        sx={{
          color: 'text.primary',
        }}
      >
        Moje
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'background.light',
          padding: `${size * 0.1}rem ${size * 0.4}rem`,
          borderRadius: `${size * 0.3}rem`,
        }}
      >
        Wideło
      </Box>
    </Stack>
  );
}

export default Logo;
