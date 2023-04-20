import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../api/user';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import UserDetails from './UserDetails';
import UserContent from './UserContent';

function User() {
  const { userId } = useParams();
  const { data: userDetails, error, isLoading } = useUserDetails(userId!);

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {userDetails && (
          <>
            <UserDetails userDetails={userDetails} />
            <UserContent userDetails={userDetails} />
          </>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default User;
