import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { GetVideoMetadataResponse } from '../data/VideoMetadata';

const videoMetadataKey = 'video-metadata';

export function useVideoMetadata(id: string) {
  return useQuery<GetVideoMetadataResponse, AxiosError>({
    queryKey: [videoMetadataKey, id],
    queryFn: async () => (await axios.get('video-metadata', { params: { id } })).data,
  });
}
