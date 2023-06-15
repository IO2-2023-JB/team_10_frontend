import { Alert, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useUserDetails } from '../../api/user';
import { userDetailsState } from '../../data/UserData';
import { GetTicket } from '../../types/TicketTypes';
import { AccountType } from '../../types/UserTypes';
import TicketListItem from './TicketListItem';

interface TicketListProps {
  tickets: GetTicket[];
}

function TicketList({ tickets }: TicketListProps) {
  const loggedInUser = useRecoilValue(userDetailsState);
  const { data: userDetails } = useUserDetails(loggedInUser?.id);

  if (tickets.length === 0) {
    return <Alert severity='info'>Brak zgłoszeń do wyświetlenia</Alert>;
  }

  if (!userDetails) return null;

  return (
    <Stack>
      {tickets.map((ticket) => (
        <TicketListItem
          key={ticket.ticketId}
          ticket={ticket}
          isAdmin={userDetails?.userType === AccountType.Administrator}
        />
      ))}
    </Stack>
  );
}

export default TicketList;
