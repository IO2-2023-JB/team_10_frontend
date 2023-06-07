import { Card, ListItem, Stack, Typography } from '@mui/material';
import { GetTicket } from '../../types/TicketTypes';
import { transitionLong } from '../../theme';
import { useState } from 'react';

interface TicketListItemProps {
  ticket: GetTicket;
}

function TicketListItem({ ticket }: TicketListItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleExpandClick = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <ListItem>
      <Card
        sx={{
          padding: 2,
          backgroundColor: 'rgba(80,80,80,0.3)',
          borderRadius: 3,
          width: '100%',
          '&:hover': {
            transition: transitionLong('background-color'),
            backgroundColor: 'rgba(80,80,80,0.5)',
          },
        }}
      >
        <Typography>{`Target ID: ${ticket.targetId}`}</Typography>
        <Stack marginTop={1} spacing={1}>
          <Typography>{ticket.reason}</Typography>
          {expanded && (
            <Typography
              onClick={handleExpandClick}
              sx={{
                opacity: '60%',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              {expanded ? 'Pokaż mniej' : 'Pokaż więcej'}
            </Typography>
          )}
        </Stack>
      </Card>
    </ListItem>
  );
}

export default TicketListItem;
