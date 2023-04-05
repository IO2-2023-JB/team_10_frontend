import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../api/user';
import ContentSection from '../../components/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import UserDetails from './UserDetails';

function User() {
  const { userId } = useParams();
  const { data: userDetails, error, isLoading } = useUserDetails(userId!);

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {userDetails && <UserDetails userDetails={userDetails} />}
      </ContentSection>
    </PageLayout>
  );
}

export default User;
