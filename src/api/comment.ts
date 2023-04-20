import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CommentValues } from './../types/CommentTypes';

const commentKey = 'comment';

export function useComment(id: string) {
  return useQuery<CommentValues[], AxiosError>({
    queryKey: [commentKey, id],
    queryFn: async () => (await axios.get('comment', { params: { id } })).data,
  });
}

export function usePostComment(id: string) {
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

export function useDeleteComment(id: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: async (id: string) =>
      await axios.delete('comment', {
        params: { id },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [commentKey, id] });
    },
  });
}
