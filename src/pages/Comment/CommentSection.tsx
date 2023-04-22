import { Stack, TextField, Button, Typography } from '@mui/material';
import {
  useComment,
  useCommentResponse,
  usePostComment,
  usePostCommentResponse,
} from './../../api/comment';
import Comment from './Comment';
import { useState, KeyboardEvent } from 'react';
import ContentSection from '../../components/layout/ContentSection';
import Avatar from './../../components/Avatar';
import { useUserDetails } from './../../api/user';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from './../../data/UserData';
import { CommentValues } from './../../types/CommentTypes';
import { AxiosError } from 'axios';

interface CommentSectionProps {
  originId: string;
  isResponse: boolean;
}

function CommentSection({ originId, isResponse }: CommentSectionProps) {
  const [commentContent, setCommentContent] = useState<string>('');
  // POSSIBLE MOVE TO RECOIL STATE, CURRENTLY IT'S A BIT MORE COMPLICATED, PROBABLY WORKS BETTER THOUGH
  const [openCommentId, setOpenCommentId] = useState<string>('');
  const user = useRecoilValue(userDetailsState);

  const videoId = isResponse ? '' : originId;
  const commentId = isResponse ? originId : '';
  const commentQuery = useComment(videoId);
  const responseQuery = useCommentResponse(commentId);

  let commentData: CommentValues[] | undefined,
    commentError: AxiosError | null,
    isCommentLoading: boolean | undefined;
  commentError = null;
  if (!commentQuery.isLoading || !responseQuery.isLoading)
    isResponse
      ? ({
          data: commentData,
          error: commentError,
          isLoading: isCommentLoading,
        } = responseQuery)
      : ({
          data: commentData,
          error: commentError,
          isLoading: isCommentLoading,
        } = commentQuery);
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useUserDetails(user?.id);

  const { mutate: mutateComment } = usePostComment(videoId);
  const { mutate: mutateResponse } = usePostCommentResponse(commentId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value ? e.target.value : '';
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
      <Stack sx={{ marginY: 3, marginX: 3 }} spacing={2}>
        {commentData && commentData.length === 0 && !isResponse && (
          <Typography variant='h5'>
            Jeszcze nikt nie dodał komentarza, bądź pierwszy!
          </Typography>
        )}
        {commentData &&
          commentData.map((x: CommentValues) => (
            <Comment
              key={x.id}
              comment={x}
              originId={originId}
              openCommentId={openCommentId}
              setOpenCommentId={setOpenCommentId}
              isResponse={isResponse}
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
            sx={{ alignSelf: 'stretch', marginLeft: 2, width: '20%' }}
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
