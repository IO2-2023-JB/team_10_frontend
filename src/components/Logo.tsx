import { Box, SxProps, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

interface LogoProps {
  sx?: SxProps;
}
function Logo({ sx }: LogoProps) {
  return (
    <Stack
      direction='row'
      sx={{
        gap: '0.5rem',
        alignItems: 'baseline',
        fontSize: '2rem',
        fontWeight: 900,
        textDecoration: 'none',
        color: 'inherit',
        ...sx,
      }}
      component={Link}
      to='/'
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
          color: 'background.default',
          padding: '0.1rem 0.4rem',
          borderRadius: '0.3rem',
        }}
      >
        Wideło
      </Box>
    </Stack>
  );
}

export default Logo;
