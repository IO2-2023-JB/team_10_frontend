import { Alert, Stack } from '@mui/material';
import { Subscription } from '../../../types/SubscriptionTypes';
import UsersListItem from '../UsersListItem';

interface SubscriptionsListProps {
  subscriptions: Subscription[];
}

function SubscriptionsList({ subscriptions }: SubscriptionsListProps) {
  if (subscriptions.length === 0) {
    return <Alert severity='info'>Brak subskrybowanych twórców</Alert>;
  }

  return (
    <Stack>
      {subscriptions.map((sub) => (
        <UsersListItem key={sub.id} userId={sub.id} />
      ))}
    </Stack>
  );
}

export default SubscriptionsList;
