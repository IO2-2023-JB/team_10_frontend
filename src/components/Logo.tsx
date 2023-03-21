import { Box } from '@mui/material';

function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'baseline',
        fontSize: '2rem',
        fontWeight: 900,
      }}
    >
      <Box>Moje</Box>
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
