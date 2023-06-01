import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../api/user';
import TabTitle from '../../components/TabTitle';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import UserContent from './UserContent';
import UserDetails from './UserDetails';

function User() {
  const { userId } = useParams();
  const { data: userDetails, error, isLoading } = useUserDetails(userId!);

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {userDetails && (
          <>
            <TabTitle title={userDetails.nickname} />
            <UserDetails userDetails={userDetails} />
            <UserContent userDetails={userDetails} />
          </>
        )}
      </ContentSection>
    </PageLayout>
  );
}

export default User;
