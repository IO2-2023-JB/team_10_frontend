import { Paper, Typography, IconButton, Collapse, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import { GetComment } from '../../../types/CommentTypes';
import { Link } from 'react-router-dom';
import { useUserDetails } from '../../../api/user';
import Avatar from '../../../components/Avatar';
import { useDeleteComment } from '../../../api/comment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CommentSection from './CommentSection';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../../data/UserData';
import { transitionLong } from '../../../theme';

interface CommentProps {
  comment: GetComment;
  originId: string | undefined;
  open: (id: string | null) => void;
  isResponse: boolean;
  isOpen: boolean;
}

function Comment({ comment, originId, isResponse, isOpen, open }: CommentProps) {
  const { authorId, content, hasResponses, id: commentId } = comment;
  const user = useRecoilValue(userDetailsState);
  const { data: authorDetails } = useUserDetails(authorId);
  const { mutate } = useDeleteComment(originId, commentId);

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
            <Typography fontSize={12} color='text.secondary'>
              {message}
            </Typography>
          </Stack>
          {user?.id === authorId && (
            <IconButton
              onClick={handleDelete}
              sx={{ alignSelf: 'center', color: 'grey.800' }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </Stack>
      </Paper>
      <Collapse in={isOpen} timeout='auto'>
        {isOpen && <CommentSection commentId={comment.id} isResponse />}
      </Collapse>
    </Stack>
  );
}

export default Comment;
