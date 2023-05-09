import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Playlist } from '../types/PlaylistTypes';

const playlistKey = 'playlist';

export function useUserPlaylists(userId: string) {
  return useQuery<Playlist[], AxiosError>({
    queryKey: [playlistKey, userId],
    queryFn: async () =>
      (await axios.get('playlist/user', { params: { id: userId } })).data,
  });
}
