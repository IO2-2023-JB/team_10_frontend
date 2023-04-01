import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import PageLayout from '../../components/layout/PageLayout';
import { userDetailsState } from '../../data/UserData';

function Homepage() {
  const userDetails = useRecoilValue(userDetailsState);

  return (
    <PageLayout>
      <Typography fontSize={30}>Witaj {userDetails?.nickname}!</Typography>
    </PageLayout>
  );
}

export default Homepage;
