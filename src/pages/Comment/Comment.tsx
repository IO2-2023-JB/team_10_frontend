import { Paper, Typography, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { CommentValues } from '../../types/CommentTypes';
import { Link } from 'react-router-dom';
import { useUserDetails } from './../../api/user';
import Avatar from './../../components/Avatar';
import { useDeleteComment } from './../../api/comment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CommentSection from './CommentSection';
import { useState } from 'react';

interface CommentProps {
  comment: CommentValues;
  videoId: string;
  openCommentId: string;
  setOpenCommentId: (id: string) => void;
}

function Comment({ comment, videoId, openCommentId, setOpenCommentId }: CommentProps) {
  const { authorId, content, hasResponses } = comment;
  const { data: authorDetails } = useUserDetails(authorId);
  const { mutate } = useDeleteComment(videoId);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    mutate(comment.id);
  };

  const hover = hasResponses
    ? {
        '&:hover': {
          transition: 'background-color ease-in-out 200ms',
          backgroundColor: 'background.light',
        },
      }
    : {};

  const handleClick = () => {
    if (open) {
      setOpen(false);
      setOpenCommentId('');
    } else {
      setOpen(true);
      setOpenCommentId(comment.id);
    }
  };

  return (
    <Stack>
      <Paper
        onClick={hasResponses ? handleClick : undefined}
        sx={{
          alignSelf: 'flex-start',
          padding: 1,
          backgroundColor: 'background.default',
          borderRadius: 3,
          ...hover,
        }}
      >
        <Stack spacing={2} direction='row'>
          <IconButton color='inherit' component={Link} to={`/user/${authorId}`}>
            <Avatar userDetails={authorDetails} size={45} />
          </IconButton>
          <Stack width='100%' spacing={0.5}>
            <Typography
              color='primary.main'
              textOverflow='hidden'
              variant='h6'
              sx={{ wordWrap: 'normal' }}
            >
              {authorDetails?.nickname}
            </Typography>
            <Typography sx={{ wordWrap: 'anywhere' }}>{content}</Typography>
            {hasResponses && !open && (
              <Typography fontSize={13} color='primary.main'>
                Click to view responses
              </Typography>
            )}
          </Stack>
          {authorDetails?.id === authorId && (
            <IconButton onClick={handleDelete} sx={{ color: 'grey.800' }}>
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </Stack>
      </Paper>
      {openCommentId === comment.id && (
        <CommentSection originId={comment.id} isResponse={true} />
      )}
    </Stack>
  );
}

export default Comment;
