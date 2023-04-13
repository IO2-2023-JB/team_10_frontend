import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { pageNotification, ProcessingProgress } from '../data/VideoData';
import {
  GetVideoMetadataResponse,
  ReactionCounts,
  UploadVideo,
} from '../data/VideoMetadata';
import { PostReaction, UploadVideoMetadata } from './../data/VideoMetadata';

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
    mutationFn: (body) => axios.put(`video-metadata`, body, { params: { id } }),
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
  const navigate = useNavigate();
  const setNotif = useSetRecoilState(pageNotification);

  return useMutation<null, AxiosError, UploadVideo>({
    mutationFn: async (body) => {
      const { videoFile, ...others } = body;
      const metadata = (
        await axios.post<GetVideoMetadataResponse>('video-metadata', others)
      ).data;
      setNotif({
        message: 'Video data has been sent!',
        status: ProcessingProgress.MetadataRecordCreated,
        videoId: metadata.id,
      });
      return (await axios.post(`video/${metadata.id}`, videoFile)).data;
    },
    onSuccess: () => {
      navigate('/');
    },
  });
}

export function useAllVideos() {
  return useQuery<GetVideoMetadataResponse[], AxiosError>({
    queryKey: [videoMetadataKey],
    queryFn: async () => (await axios.get(`getAllVideos`)).data,
  });
}
