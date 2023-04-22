import { ListItem } from '@mui/material';
import CreatorInfo from '../Video/CreatorInfo';
import { useUserDetails } from '../../api/user';

interface SubscriptionsListItemProps {
  userId: string;
}

function SubscriptionsListItem({ userId }: SubscriptionsListItemProps) {
  const { data: userDetails } = useUserDetails(userId);

  return (
    <ListItem key={userId}>
      <CreatorInfo isAuthor={false} userDetails={userDetails} width='100%' />
    </ListItem>
  );
}

export default SubscriptionsListItem;
