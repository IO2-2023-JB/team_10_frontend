import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { pageNotificationState } from '../data/VideoData';
import {
  GetUserVideosResponse,
  GetVideoMetadataResponse,
  ProcessingProgress,
  ReactionCounts,
  UploadVideo,
} from '../types/VideoTypes';
import { PostReaction, UploadVideoMetadata } from '../types/VideoTypes';

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
  return useMutation<void, AxiosError, UploadVideoMetadata>({
    mutationFn: (body) => axios.put('video-metadata', body, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey] });
    },
  });
}

export function useDeleteVideo(id: string) {
  return useMutation<void, AxiosError, void>({
    mutationFn: () => axios.delete('video', { params: { id } }),
  });
}

export function usePostReaction(id: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, PostReaction>({
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

export function useVideoUpload() {
  const navigate = useNavigate();
  const setNotif = useSetRecoilState(pageNotificationState);

  return useMutation<void, AxiosError, UploadVideo>({
    mutationFn: async (body) => {
      const { videoFile, ...others } = body;
      const metadata = (
        await axios.post<GetVideoMetadataResponse>('video-metadata', others)
      ).data;
      setNotif({
        open: true,
        message: 'Dane filmu wysłane.',
        status: ProcessingProgress.MetadataRecordCreated,
        videoId: metadata.id,
      });
      await axios.post(`video/${metadata.id}`, videoFile);
    },
    onSuccess: () => {
      navigate('/');
    },
  });
}

export function useAllVideos() {
  return useQuery<GetVideoMetadataResponse[], AxiosError>({
    queryKey: [videoMetadataKey],
    queryFn: async () => (await axios.get('getAllVideos')).data,
  });
}

export function useUserVideos(id: string) {
  return useQuery<GetUserVideosResponse, AxiosError>({
    queryKey: [videoMetadataKey, 'user', id],
    queryFn: async () => (await axios.get('user/videos', { params: { id } })).data,
  });
}
