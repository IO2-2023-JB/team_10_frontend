import { ListItem } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import UserInfo from './UserInfo';

interface UsersListItemProps {
  userId: string;
}

function UsersListItem({ userId }: UsersListItemProps) {
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const { data: userDetails } = useUserDetails(userId);

  return (
    <ListItem disablePadding>
      <UserInfo
        isSelf={loggedUserDetails?.id === userId}
        userDetails={userDetails}
        fullWidth
      />
    </ListItem>
  );
}

export default UsersListItem;
