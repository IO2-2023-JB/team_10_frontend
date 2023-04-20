import { Paper, Typography, IconButton, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { CommentValues } from '../../types/CommentTypes';
import { Link } from 'react-router-dom';
import { useUserDetails } from './../../api/user';
import Avatar from './../../components/Avatar';
import { useDeleteComment } from './../../api/comment';

interface CommentProps {
  comment: CommentValues;
  videoId: string;
}

function Comment({ comment, videoId }: CommentProps) {
  const { authorId, content, hasResponse } = comment;
  const { data: authorDetails } = useUserDetails(authorId);
  const { mutate } = useDeleteComment(videoId);

  const handleDelete = () => {
    mutate(comment.id);
  };

  let hover = {};
  if (hasResponse)
    hover = {
      '&:hover': {
        transition: 'background-color ease-in-out 200ms',
        backgroundColor: 'background.light',
      },
    };

  return (
    <Paper
      sx={{
        width: 'fit-content',
        float: 'left',
        padding: 1,
        backgroundColor: 'background.default',
        borderRadius: 3,
        hover,
      }}
    >
      <Stack spacing={2} direction='row'>
        <IconButton color='inherit' component={Link} to={`/user/${authorId}`}>
          <Avatar userDetails={authorDetails} size={30} />
        </IconButton>
        <Stack width='100%' spacing={0.3}>
          <Typography textOverflow='hidden' fontSize={16} sx={{ wordWrap: 'normal' }}>
            {'@' + authorDetails?.nickname}
          </Typography>
          <Typography fontSize={14} sx={{ marginLeft: 5, wordWrap: 'anywhere' }}>
            {content}
          </Typography>
          {hasResponse && (
            <Typography fontSize={13} color='primary.main' textAlign='right'>
              Click to view responses
            </Typography>
          )}
        </Stack>
        {authorDetails?.id === authorId && (
          <Button onClick={handleDelete} color='error'>
            Usuń
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

export default Comment;
