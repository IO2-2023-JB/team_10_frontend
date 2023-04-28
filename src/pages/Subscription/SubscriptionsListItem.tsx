import { ListItem } from '@mui/material';
import CreatorInfo from '../Video/CreatorInfo';
import { useUserDetails } from '../../api/user';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../data/UserData';

interface SubscriptionsListItemProps {
  userId: string;
}

function SubscriptionsListItem({ userId }: SubscriptionsListItemProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const { data: userDetails } = useUserDetails(userId);

  return (
    <ListItem key={userId}>
      <CreatorInfo
        isSelf={loggedUserDetails?.id === userId}
        userDetails={userDetails}
        width='100%'
      />
    </ListItem>
  );
}

export default SubscriptionsListItem;
