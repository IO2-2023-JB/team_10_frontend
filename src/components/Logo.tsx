import { Box, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';

interface LogoProps {
  sx?: SxProps;
}
function Logo({ sx }: LogoProps) {
  return (
    <Box
      sx={{
        display: 'flex',
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
          borderRadius: '1rem',
        }}
      >
        Wideło
      </Box>
    </Box>
  );
}

export default Logo;
