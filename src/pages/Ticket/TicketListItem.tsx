import { Card, ListItem, Stack, Typography } from '@mui/material';
import { GetTicket, TicketStatus } from '../../types/TicketTypes';
import { transitionLong } from '../../theme';
import { useRef, useState } from 'react';
import { useMaxLines } from '../../utils/hooks';

interface TicketListItemProps {
  ticket: GetTicket;
}

function TicketListItem({ ticket }: TicketListItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const reasonRef = useRef<HTMLParagraphElement>(null);
  const { isEllipsisActive, style: reasonMaxLinesStyle } = useMaxLines(1, reasonRef);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
        <Typography>Status:{` ${ticket.status.status}`}</Typography>
        <Typography>{`Target ID: ${ticket.targetId}`}</Typography>
        <Stack marginTop={1} spacing={1}>
          <Typography>Reason:</Typography>
          <Typography ref={reasonRef} sx={!expanded ? reasonMaxLinesStyle : null}>
            {ticket.reason}
          </Typography>
          {expanded && ticket.status.status === TicketStatus.Resolved && (
            <>
              <Typography>Response:</Typography>
              <Typography>{ticket.response}</Typography>
            </>
          )}
          {(isEllipsisActive ||
            expanded ||
            ticket.status.status === TicketStatus.Resolved) && (
            <Typography
              onClick={handleExpandClick}
              sx={{
                opacity: '60%',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              {!expanded ? 'Rozwiń' : 'Zwiń'}
            </Typography>
          )}
        </Stack>
      </Card>
    </ListItem>
  );
}

export default TicketListItem;
