import { Alert, Stack } from '@mui/material';
import UsersListItem from './UsersListItem';
import { GetUserDetailsResponse } from '../../types/UserTypes';

interface UsersListProps {
  users: GetUserDetailsResponse[];
}

function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return <Alert severity='info'>Brak użytkowników do wyświetlenia</Alert>;
  }

  return (
    <Stack>
      {users.map((user) => (
        <UsersListItem key={user.id} userId={user.id} />
      ))}
    </Stack>
  );
}

export default UsersList;
