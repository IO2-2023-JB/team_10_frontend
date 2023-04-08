import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Reaction from './../components/Reaction';
import {
  GetVideoMetadataResponse,
  ReactionCounts,
  UploadVideo,
} from '../data/VideoMetadata';

const videoMetadataKey = 'video-metadata';
const reactionKey = 'video-reaction';

export function useVideoMetadata(id: string) {
  return useQuery<GetVideoMetadataResponse, AxiosError>({
    queryKey: [videoMetadataKey, id],
    queryFn: async () => (await axios.get('video-metadata', { params: { id } })).data,
  });
}

export function useEditVideoMetadata(id: string) {
  const queryClient = useQueryClient();
  return useMutation<null, AxiosError, UploadVideo>({
    mutationFn: (body) => axios.put(`video-metadata?id=${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey, id] });
    },
  });
}

export function useDeleteVideo(id: string) {
  return useMutation<null, AxiosError, null>({
    mutationFn: () => axios.delete(`video?id=${id}`),
  });
}

export function usePostReaction(id: string) {
  const queryClient = useQueryClient();
  return useMutation<null, AxiosError, Reaction>({
    mutationFn: (body: Reaction) => axios.post(`video-reaction?id=${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [reactionKey, id]});
    }
  });
}

export function useReaction(id: string) {
  return useQuery<ReactionCounts, AxiosError>({
    queryKey: [reactionKey, id],
    queryFn: async () => await (await axios.get(`video-reaction?id=${id}`)).data,
  });
}
