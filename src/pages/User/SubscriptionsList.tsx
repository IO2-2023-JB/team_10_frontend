import { Alert, ListItem, Stack } from '@mui/material';
import { Subscription } from '../../data/Subscription';
import { useUserDetails } from '../../api/user';
import CreatorInfo from '../Video/CreatorInfo';

interface SubscriptionsListProps {
  subscriptions: Subscription[];
}

function SubscriptionsList({ subscriptions }: SubscriptionsListProps) {
  if (subscriptions.length === 0) {
    return <Alert severity='info'>Brak subskrybowanych twórców</Alert>;
  }

  return (
    <Stack>
      {subscriptions.map((sub) => {
        const { data: userDetails } = useUserDetails(sub.id);
        return (
          <ListItem key={sub.id}>
            <CreatorInfo isAuthor={false} userDetails={userDetails} width='100%' />
          </ListItem>
        );
      })}
    </Stack>
  );
}

export default SubscriptionsList;
