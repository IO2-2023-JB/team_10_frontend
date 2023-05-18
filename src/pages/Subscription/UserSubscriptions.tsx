import { useSubscriptions } from '../../api/subscription';
import ContentSection from '../../components/layout/ContentSection';
import SubscriptionsList from './SubscriptionsList';

interface UserSubscriptionsProps {
  userId: string;
}

function UserSubscriptions({ userId }: UserSubscriptionsProps) {
  const { data, isLoading, error } = useSubscriptions(userId);
  return (
    <ContentSection error={error} isLoading={isLoading}>
      {data && <SubscriptionsList subscriptions={data.subscriptions} />}
    </ContentSection>
  );
}

export default UserSubscriptions;
