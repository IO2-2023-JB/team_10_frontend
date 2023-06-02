import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { METADATA_REFETCH_INTERVAL, ROUTES } from '../const';
import { userDetailsState } from '../data/UserData';
import { uploadProgressState, uploadingVideoState } from '../data/VideoData';
import {
  GetReactionCounts,
  GetUserVideosResponse,
  GetVideoMetadataResponse,
  PostVideo,
} from '../types/VideoTypes';

export const videoMetadataKey = 'video-metadata';
const reactionKey = 'video-reaction';

export function useVideoMetadata(id?: string, interval?: boolean) {
  return useQuery<GetVideoMetadataResponse, AxiosError>({
    queryKey: [videoMetadataKey, id],
    queryFn: async () => (await axios.get('video-metadata', { params: { id } })).data,
    enabled: id !== undefined,
    refetchInterval: interval ? METADATA_REFETCH_INTERVAL : undefined,
  });
}

export function useEditVideoMetadata(id: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, PutVideoMetadata>({
    mutationFn: (body) => axios.put('video-metadata', body, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey, id] });
    },
  });
}

export function useDeleteVideo(id: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, void>({
    mutationFn: () => axios.delete('video', { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey] });
    },
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
  return useQuery<GetReactionCounts, AxiosError>({
    queryKey: [reactionKey, id],
    queryFn: async () => (await axios.get('video-reaction', { params: { id } })).data,
  });
}

export function useVideoUpload() {
  const setUploadingVideo = useSetRecoilState(uploadingVideoState);
  const loggedUserDetails = useRecoilValue(userDetailsState);
  const setUploadProgress = useSetRecoilState(uploadProgressState);
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, PostVideo>({
    mutationFn: async (body) => {
      const { videoFile, ...others } = body;

      setUploadingVideo({ id: null, state: VideoUploadState.UploadingMetadata });
      const { id } = (
        await axios.post<GetVideoMetadataResponse>('video-metadata', others)
      ).data;
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey] });

      setUploadingVideo({ id, state: VideoUploadState.UploadingVideo });
      await axios.post(`video/${id}`, videoFile, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.progress) setUploadProgress(progressEvent.progress);
        },
      });

      setUploadProgress(null);
      setUploadingVideo({ id, state: VideoUploadState.Processing });
      return id;
    },
    onSuccess: () => {
      navigate(`${ROUTES.USER}/${loggedUserDetails?.id}`);
      queryClient.invalidateQueries({ queryKey: [videoMetadataKey, id] });
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
