import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Playlist, PlaylistBase } from '../types/PlaylistTypes';

const playlistKey = 'playlist';
const playlistVideoKey = 'playlist-content';

export function useUserPlaylists(userId: string) {
  return useQuery<PlaylistBase[], AxiosError>({
    queryKey: [playlistKey, userId],
    queryFn: async () =>
      (await axios.get('playlist/user', { params: { id: userId } })).data,
  });
}

export function usePlaylistVideos(playlistId: string) {
  return useQuery<Playlist, AxiosError>({
    queryKey: [playlistVideoKey, playlistId],
    queryFn: async () =>
      (await axios.get('playlist/video', { params: { id: playlistId } })).data,
  });
}
