import { Typography, Stack } from '@mui/material';
import { useUserDetails } from '../../api/user';

function Homepage() {
  const { data } = useUserDetails('6425e41e090e1eb5988d692a');
  return (
    <Stack sx={{ alignItems: 'center', marginY: 2 }}>
      <Typography fontSize={30}>Witaj {data?.nickname}!</Typography>
    </Stack>
  );
}

export default Homepage;
