import { Box, Card, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import {
  ButtonType,
  GetTicket,
  TicketStatus,
  TicketTargetType,
} from '../../types/TicketTypes';
import { transitionLong } from '../../theme';
import { useRef, useState } from 'react';
import { useMaxLines } from '../../utils/hooks';
import { useUserDetails } from '../../api/user';
import UserInfo from '../User/UserInfo';
import TicketButton from '../../components/TicketButton';
import TypographyLink from '../../components/TypographyLink';
import { ROUTES } from '../../const';
import { translateTicketStatus, translateTicketTargetType } from '../../utils/utils';
import { useCommentById } from '../../api/comment';
import Comment from '../Video/Comment/Comment';
interface TicketListItemProps {
  ticket: GetTicket;
  isAdmin: boolean;
}

function TicketListItem({ ticket, isAdmin }: TicketListItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const reasonRef = useRef<HTMLParagraphElement>(null);
  const { isEllipsisActive, style: reasonMaxLinesStyle } = useMaxLines(1, reasonRef);
  const { data: submitterDetails, isLoading: isSubmitterDetailsLoading } = useUserDetails(
    ticket.submitterId
  );
  const {
    data: commentDetails,
    isLoading: isCommentDetailsLoading,
    error: commentError,
  } = useCommentById(
    ticket.targetType === TicketTargetType.Comment ? ticket.targetId : undefined
  );
  const {
    data: commentResponseDetails,
    isLoading: isCommentResponseDetailsLoading,
    error: commentResponseError,
  } = useCommentById(
    ticket.targetType === TicketTargetType.CommentResponse ? ticket.targetId : undefined
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const link =
    ticket.targetType === TicketTargetType.Video
      ? `${ROUTES.VIDEO}/${ticket.targetId}`
      : ticket.targetType === TicketTargetType.User
      ? `${ROUTES.USER}/${ticket.targetId}`
      : ticket.targetType === TicketTargetType.Playlist
      ? `${ROUTES.PLAYLIST}/${ticket.targetId}`
      : undefined;

  const isSubmitterLoading = isSubmitterDetailsLoading && isAdmin;

  const isCommentDeleted =
    commentError?.code === 'ERR_BAD_REQUEST' ||
    commentResponseError?.code === 'ERR_BAD_REQUEST'
      ? true
      : false;

  const isCommentLoading =
    isCommentDetailsLoading &&
    ticket.targetType === TicketTargetType.Comment &&
    !isCommentDeleted;

  const isCommentResponseLoading =
    isCommentResponseDetailsLoading &&
    ticket.targetType === TicketTargetType.CommentResponse &&
    !isCommentDeleted;

  //if (isCommentDeleted) isCommentLoading = isCommentResponseLoading = false;

  const isChildComponentDataLoading =
    isSubmitterLoading || isCommentLoading || isCommentResponseLoading;

  return (
    <ListItem>
      {isChildComponentDataLoading && (
        <Skeleton variant='rounded' sx={{ width: '100%', height: 250 }} />
      )}
      {!isChildComponentDataLoading && (
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
            <Stack direction='row' sx={{ paddingBottom: 2 }}>
              {submitterDetails && <UserInfo userDetails={submitterDetails} isSelf />}
              {ticket.status !== TicketStatus.Resolved && (
                <TicketButton
                  buttonType={ButtonType.Standard}
                  targetId={ticket.ticketId}
                  targetNameInTitle='zgłoszenie'
                  isResponse
                />
              )}
            </Stack>
          )}
          <Typography>{`Status: ${translateTicketStatus(ticket.status)} ${
            ticket.status === TicketStatus.Submitted ? '🟡' : '🟢'
          }`}</Typography>
          <TypographyLink to={link}>{`Zgłaszany obiekt: ${translateTicketTargetType(
            ticket.targetType
          )}`}</TypographyLink>
          <Typography color='error' sx={{ marginTop: 1 }}>
            {isCommentDeleted ? 'Komentarz został usunięty' : null}
          </Typography>
          {!isCommentDeleted && (commentDetails || commentResponseDetails) && (
            <Box sx={{ marginY: 2 }}>
              <Comment
                comment={commentDetails ?? commentResponseDetails!}
                originId={ticket.targetId}
                isOpen={false}
                isResponse={commentDetails !== null ? false : true}
                open={() => null}
                isOnTicketList
              />
            </Box>
          )}
          <Stack marginTop={1} spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>Uzasadnienie:</Typography>
            <Typography ref={reasonRef} sx={!expanded ? reasonMaxLinesStyle : null}>
              {ticket.reason}
            </Typography>
            {expanded && ticket.status === TicketStatus.Resolved && (
              <>
                <Typography sx={{ fontWeight: 'bold' }}>Odpowiedź:</Typography>
                <Typography>{ticket.response}</Typography>
              </>
            )}
            {(isEllipsisActive ||
              expanded ||
              ticket.status === TicketStatus.Resolved) && (
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
      )}
    </ListItem>
  );
}

export default TicketListItem;
