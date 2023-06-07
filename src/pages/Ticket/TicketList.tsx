import { Alert, Stack, Typography } from '@mui/material';
import { GetTicket } from '../../types/TicketTypes';

interface TicketListProps {
  tickets: GetTicket[];
}

function TicketList({ tickets }: TicketListProps) {
  if (tickets.length === 0) {
    return <Alert severity='info'>Brak zgłoszeń do wyświetlenia</Alert>;
  }

  return (
    <Stack>
      {tickets.map((ticket) => (
        <Typography key={ticket.submitterId}>{ticket.reason}</Typography>
      ))}
    </Stack>
  );
}

export default TicketList;
