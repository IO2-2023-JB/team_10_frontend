import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  GetComment,
  GetCommentById,
  GetCommentResponseById,
} from './../types/CommentTypes';

const commentKey = 'comment';
const commentResponseKey = 'commentResponse';
const commentByIdKey = 'commentById';
const commentResponseByIdKey = 'commentResponseById';

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
      queryClient.invalidateQueries({ queryKey: [commentByIdKey, originId] });
      queryClient.invalidateQueries({ queryKey: [commentResponseByIdKey, originId] });
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

export function useCommentById(id: string | undefined) {
  return useQuery<GetCommentById, AxiosError>({
    queryKey: [commentByIdKey, id],
    enabled: id !== undefined,
    queryFn: async () =>
      (await axios.get('comment/commentById', { params: { id } })).data,
  });
}

export function useCommentResponseById(id: string | undefined) {
  return useQuery<GetCommentResponseById, AxiosError>({
    queryKey: [commentResponseByIdKey, id],
    enabled: id !== undefined,
    queryFn: async () =>
      (await axios.get('comment/commentResponseById', { params: { id } })).data,
  });
}
