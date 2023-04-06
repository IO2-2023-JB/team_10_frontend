import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  GetVideoMetadataResponse,
  ReactionCounts,
  UploadVideo,
} from '../data/VideoMetadata';
import { PostReaction } from './../data/VideoMetadata';
import { UploadVideoMetadata } from './../data/VideoMetadata';

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
  return useMutation<null, AxiosError, UploadVideoMetadata>({
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
  return useMutation<null, AxiosError, UploadVideo>({
    mutationFn: async (body) => {
      const { video, ...others } = body;
      console.log(others);
      const metadata = (
        await axios.post<GetVideoMetadataResponse>('video-metadata', others)
      ).data;
      return (await axios.post(`video/${metadata.id}`, video)).data;
    },
  });
}

export function useVideoUpload(id: string) {
  return useMutation<null, AxiosError, FormData>({
    mutationFn: async () => (await axios.post('video', { params: { id } })).data,
  });
}
