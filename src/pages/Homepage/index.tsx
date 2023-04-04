import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import ContentSection from '../../components/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import { userDetailsState } from '../../data/UserData';

function Homepage() {
  const { id: userId } = useRecoilValue(userDetailsState)!;
  const { data: userDetails, error, isLoading } = useUserDetails(userId);

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {userDetails && (
          <Typography fontSize={30}>Witaj {userDetails!.nickname}!</Typography>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default Homepage;
