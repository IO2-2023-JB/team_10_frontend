import { Card, ListItem, Stack, Typography } from '@mui/material';
import { ButtonType, GetTicket, TicketStatus } from '../../types/TicketTypes';
import { transitionLong } from '../../theme';
import { useRef, useState } from 'react';
import { useMaxLines } from '../../utils/hooks';
import { useUserDetails } from '../../api/user';
import UserInfo from '../User/UserInfo';
import TicketButton from '../../components/TicketButton';
interface TicketListItemProps {
  ticket: GetTicket;
  isAdmin: boolean;
}

function TicketListItem({ ticket, isAdmin }: TicketListItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const reasonRef = useRef<HTMLParagraphElement>(null);
  const { isEllipsisActive, style: reasonMaxLinesStyle } = useMaxLines(1, reasonRef);
  const { data: submitterDetails } = useUserDetails(ticket.submitterId);

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
        {isAdmin && (
          <Stack direction='row'>
            {submitterDetails && <UserInfo userDetails={submitterDetails} isSelf />}
            {ticket.status.status !== TicketStatus.Resolved && (
              <TicketButton
                buttonType={ButtonType.Standard}
                targetId={ticket.ticketId}
                targetNameInTitle='zgłoszenie'
                isResponse
              />
            )}
          </Stack>
        )}
        <Typography>{`Status: ${ticket.status.status}`}</Typography>
        <Typography>{`Typ zgłaszanego obiektu: ${ticket.targetType}`}</Typography>
        <Stack marginTop={1} spacing={1}>
          <Typography>Uzasadnienie:</Typography>
          <Typography ref={reasonRef} sx={!expanded ? reasonMaxLinesStyle : null}>
            {ticket.reason}
          </Typography>
          {expanded && ticket.status.status === TicketStatus.Resolved && (
            <>
              <Typography>Odpowiedź:</Typography>
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
