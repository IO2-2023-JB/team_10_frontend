import { Typography } from '@mui/material';
import { useUserDetails } from '../../api/user';
import PageLayout from '../../components/layout/PageLayout';

function Homepage() {
  const { data } = useUserDetails('6425e41e090e1eb5988d692a');

  return (
    <PageLayout>
      <Typography fontSize={30}>Witaj {data?.nickname}!</Typography>
    </PageLayout>
  );
}

export default Homepage;
