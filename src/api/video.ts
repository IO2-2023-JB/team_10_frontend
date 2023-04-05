import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { GetVideoMetadataResponse, UploadVideo } from '../data/VideoMetadata';

const videoMetadataKey = 'video-metadata';

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
