import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { GetComment } from './../types/CommentTypes';

const commentKey = 'comment';
const commentResponseKey = 'commentResponse';

export function useComment(id: string | undefined, isResponse: boolean) {
  const key = isResponse ? commentResponseKey : commentKey;
  const address = isResponse ? 'comment/response' : 'comment';
  return useQuery<GetComment, AxiosError>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [key, id],
    enabled: id !== undefined,
    queryFn: async () => (await axios.get(address, { params: { id } })).data,
  });
}

export function usePostComment(id: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: async (commentContent) =>
      await axios.post('comment', commentContent, {
        headers: {
          'Content-Type': 'text/plain',
        },
        params: { id },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [commentKey, id] });
    },
  });
}

export function useDeleteComment(originId: string | undefined, commentId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: async () =>
      await axios.delete('comment', {
        params: { id: commentId },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [commentKey, originId] });
      queryClient.invalidateQueries({ queryKey: [commentResponseKey, originId] });
    },
  });
}

export function usePostCommentResponse(id: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: async (commentContent) => {
      await axios.post('comment/response', commentContent, {
        headers: {
          'Content-Type': 'text/plain',
        },
        params: { id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [commentResponseKey, id] });
    },
  });
}
