import { Alert, Stack } from '@mui/material';
import { GetTicket } from '../../types/TicketTypes';
import TicketListItem from './TicketListItem';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import { AccountType } from '../../types/UserTypes';

interface TicketListProps {
  tickets: GetTicket[];
}

function TicketList({ tickets }: TicketListProps) {
  const loggedInUser = useRecoilValue(userDetailsState);
  const { data: userDetails } = useUserDetails(loggedInUser?.id);

  if (tickets.length === 0) {
    return <Alert severity='info'>Brak zgłoszeń do wyświetlenia</Alert>;
  }

  return (
    <Stack>
      {tickets.map((ticket, index) => (
        <TicketListItem
          key={index}
          ticket={ticket}
          isAdmin={userDetails?.userType === AccountType.Administrator}
        />
      ))}
    </Stack>
  );
}

export default TicketList;
