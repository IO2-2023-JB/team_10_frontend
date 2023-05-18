import { Stack, TextField, Button, Typography } from '@mui/material';
import { useComment, usePostComment, usePostCommentResponse } from '../../../api/comment';
import Comment from './Comment';
import { useState, KeyboardEvent, ChangeEvent } from 'react';
import ContentSection from '../../../components/layout/ContentSection';
import Avatar from '../../../components/Avatar';
import { useUserDetails } from '../../../api/user';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../../../data/UserData';
import { CommentValues } from '../../../types/CommentTypes';

interface CommentSectionProps {
  videoId?: string;
  commentId?: string;
  isResponse?: boolean;
}

function CommentSection({ videoId, commentId, isResponse = false }: CommentSectionProps) {
  const [commentContent, setCommentContent] = useState<string>('');
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const user = useRecoilValue(userDetailsState);

  const query = useComment(videoId ?? commentId, isResponse);
  const { data: commentData, error: commentError, isLoading: isCommentLoading } = query;

  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useUserDetails(user?.id);

  const { mutate: mutateComment } = usePostComment(videoId);
  const { mutate: mutateResponse } = usePostCommentResponse(commentId);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setCommentContent(value);
  };

  const handleSubmit = () => {
    if (commentContent !== '')
      isResponse ? mutateResponse(commentContent) : mutateComment(commentContent);
    setCommentContent('');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') handleSubmit();
  };

  return (
    <ContentSection
      error={commentError || userError}
      isLoading={isCommentLoading || isUserLoading}
    >
      <Stack sx={{ margin: 3 }} spacing={2}>
        {commentData && commentData.length === 0 && !isResponse && (
          <Typography variant='h5'>
            Jeszcze nikt nie dodał komentarza, dodaj pierwszy!
          </Typography>
        )}
        {commentData &&
          commentData.map((comment: CommentValues) => (
            <Comment
              key={comment.id}
              comment={comment}
              originId={videoId ?? commentId}
              isResponse={isResponse}
              isOpen={comment.id === openCommentId}
              open={setOpenCommentId}
            />
          ))}

        <Stack spacing={2} alignItems='center' direction='row' marginTop={2}>
          <Avatar userDetails={userData} size={45} />
          <TextField
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            autoComplete='off'
            fullWidth
            value={commentContent}
            placeholder={`Dodaj ${isResponse ? 'odpowiedź' : 'komentarz'} ${
              userData?.nickname
            }`}
          />
          <Button
            disabled={commentContent === ''}
            type='submit'
            onClick={handleSubmit}
            sx={{ alignSelf: 'stretch', marginLeft: 2 }}
            variant='contained'
          >
            Opublikuj
          </Button>
        </Stack>
      </Stack>
    </ContentSection>
  );
}

export default CommentSection;
