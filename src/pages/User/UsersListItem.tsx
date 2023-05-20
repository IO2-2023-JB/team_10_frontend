import { ListItem } from '@mui/material';
import { useUserDetails } from '../../api/user';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../data/UserData';
import UserInfo from './UserInfo';

interface UsersListItemProps {
  userId: string;
}

function UsersListItem({ userId }: UsersListItemProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const { data: userDetails } = useUserDetails(userId);

  return (
    <ListItem>
      <UserInfo
        isSelf={loggedUserDetails?.id === userId}
        userDetails={userDetails}
        width='100%'
      />
    </ListItem>
  );
}

export default UsersListItem;
