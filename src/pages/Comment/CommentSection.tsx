import { Stack, TextField, Button } from '@mui/material';
import { useComment, usePostComment } from './../../api/comment';
import Comment from './Comment';
import { useState } from 'react';

interface CommentSectionProps {
  videoId: string;
}

function CommentSection({ videoId }: CommentSectionProps) {
  const { data } = useComment(videoId);
  const { mutate } = usePostComment(videoId);
  const [commentContent, setCommentContent] = useState<string>('');

  const handleSubmit = () => {
    mutate(commentContent);
    setCommentContent('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentContent(e.target.value ? e.target.value : '');
  };

  return (
    <Stack sx={{ marginX: 3, width: 'auto' }} spacing={2}>
      {data?.map((x, id) => (
        <Comment key={id} comment={x} videoId={videoId} />
      ))}
      <Stack marginTop={2} alignItems='flex-end'>
        <TextField
          onChange={handleChange}
          autoComplete='off'
          fullWidth
          value={commentContent}
          placeholder='Dodaj komentarz'
        />
        <Button
          disabled={commentContent === ''}
          type='submit'
          onClick={handleSubmit}
          sx={{ margin: 1, maxWidth: '10%' }}
          variant='contained'
        >
          Opublikuj
        </Button>
      </Stack>
    </Stack>
  );
}

export default CommentSection;
