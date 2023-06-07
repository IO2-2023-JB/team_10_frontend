import { Alert, Stack } from '@mui/material';
import { GetTicket } from '../../types/TicketTypes';
import TicketListItem from './TicketListItem';

interface TicketListProps {
  tickets: GetTicket[];
}

function TicketList({ tickets }: TicketListProps) {
  if (tickets.length === 0) {
    return <Alert severity='info'>Brak zgłoszeń do wyświetlenia</Alert>;
  }

  return (
    <Stack>
      {tickets.map((ticket, index) => (
        <TicketListItem key={index} ticket={ticket} />
      ))}
    </Stack>
  );
}

export default TicketList;
