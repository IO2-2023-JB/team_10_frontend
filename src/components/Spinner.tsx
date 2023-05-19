import { Box, CircularProgress } from '@mui/material';

function Spinner() {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', padding: 5 }}>
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
