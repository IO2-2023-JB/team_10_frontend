import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Collapse, IconButton, Paper, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useDeleteComment } from '../../../api/comment';
import { useAdmin, useUserDetails } from '../../../api/user';
import Avatar from '../../../components/Avatar';
import TicketButton from '../../../components/TicketButton';
import { userDetailsState } from '../../../data/UserData';
import { transitionLong } from '../../../theme';
import { CommentValues } from '../../../types/CommentTypes';
import { ButtonType } from '../../../types/TicketTypes';
import CommentSection from './CommentSection';

interface CommentProps {
  comment: CommentValues;
  originId: string | undefined;
  open: (id: string | null) => void;
  isResponse: boolean;
  isOpen: boolean;
  isOnTicketList?: boolean;
}

function Comment({
  comment,
  originId,
  isResponse,
  isOpen,
  open,
  isOnTicketList = false,
}: CommentProps) {
  const { authorId, content, hasResponses, id: commentId } = comment;
  const user = useRecoilValue(userDetailsState);
  const { data: authorDetails } = useUserDetails(authorId);
  const { mutate } = useDeleteComment(originId, commentId);
  const isAdmin = useAdmin();

  const handleDelete = () => {
    mutate();
  };

  const handleClick = () => {
    if (!isResponse)
      if (isOpen) {
        open(null);
      } else {
        open(comment.id);
      }
  };

  const hover = !isResponse
    ? {
        '&:hover': {
          transition: transitionLong('background-color'),
          backgroundColor: 'background.light',
        },
      }
    : undefined;

  let message = null;
  if (!isResponse) {
    if (isOpen) {
      if (hasResponses) message = 'Schowaj odpowiedzi';
      else message = 'Schowaj edytor';
    } else {
      if (hasResponses) message = 'Pokaż odpowiedzi';
      else message = 'Dodaj odpowiedź';
    }
  }

  return (
    <Stack
      sx={
        isOpen
          ? {
              borderLeft: '3px solid',
              borderColor: 'primary.main',
              borderRadius: '16px',
            }
          : null
      }
    >
      <Paper
        onClick={handleClick}
        sx={{
          alignSelf: 'flex-start',
          padding: 1,
          paddingRight: 2,
          backgroundColor: 'background.default',
          borderRadius: 3,
          ...hover,
        }}
      >
        <Stack spacing={2} direction='row'>
          <IconButton
            sx={{ alignSelf: 'center' }}
            color='inherit'
            component={Link}
            to={`/user/${authorId}`}
          >
            {user ? (
              <Avatar userDetails={authorDetails} size={45} />
            ) : (
              <Skeleton variant='circular' width={45} height={45} />
            )}
          </IconButton>
          <Stack spacing={0.5}>
            {user ? (
              <Typography
                color='primary.main'
                textOverflow='hidden'
                variant='h6'
                sx={{ wordWrap: 'normal' }}
              >
                {authorDetails?.nickname}
              </Typography>
            ) : (
              <Skeleton width={120} variant='rectangular' />
            )}
            <Typography sx={{ wordWrap: 'anywhere' }}>{content}</Typography>
            {!isOnTicketList && (
              <Typography fontSize={12} color='text.secondary'>
                {message}
              </Typography>
            )}
          </Stack>
          {(isAdmin || user?.id === authorId) && (
            <IconButton
              onClick={handleDelete}
              sx={{ alignSelf: 'center', color: 'grey.800' }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}
          {!isAdmin && user?.id !== authorId && !isOnTicketList && (
            <TicketButton
              targetId={commentId}
              buttonType={ButtonType.Icon}
              targetNameInTitle='komentarz'
            />
          )}
        </Stack>
      </Paper>
      <Collapse in={isOpen} timeout='auto'>
        {isOpen && (
          <Box marginX={2}>
            <CommentSection commentId={comment.id} isResponse />
          </Box>
        )}
      </Collapse>
    </Stack>
  );
}

export default Comment;
