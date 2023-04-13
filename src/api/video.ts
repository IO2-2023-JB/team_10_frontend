import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
<<<<<<< HEAD
import {
  GetVideoMetadataResponse,
  ReactionCounts,
  UploadVideo,
} from '../data/VideoMetadata';
import { PostReaction } from './../data/VideoMetadata';
=======
import { GetVideoMetadataResponse } from '../data/VideoMetadata';
import { UploadVideo } from './../data/VideoMetadata';
>>>>>>> 6ef99ed (Initial video upload draft)

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
  return useMutation<null, AxiosError, PostReaction>({
    mutationFn: (body: PostReaction) =>
      axios.post('video-reaction', body, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [reactionKey, id] });
    },
  });
}

export function useReaction(id: string) {
  return useQuery<ReactionCounts, AxiosError>({
    queryKey: [reactionKey, id],
    queryFn: async () => (await axios.get('video-reaction', { params: { id } })).data,
  });
}

export function useVideoMetadataUpload() {
  return useMutation<GetVideoMetadataResponse, AxiosError, UploadVideo, any>({
    mutationFn: async () => (await axios.post('video-metadata')).data,
  });
}

export function useVideoUpload(id: string) {
  return useMutation<null, AxiosError, FormData>({
    mutationFn: async () => (await axios.post('video', { params: { id } })).data,
  });
}
