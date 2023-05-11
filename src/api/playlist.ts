import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';
import {
  CreatePlaylist,
  CreatePlaylistResponse,
  Playlist,
  PlaylistBase,
} from '../types/PlaylistTypes';

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

export function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const loggedInUser = useRecoilValue(userDetailsState);

  const userId = loggedInUser?.id;

  return useMutation<CreatePlaylistResponse, AxiosError, CreatePlaylist>({
    mutationFn: async (body) => (await axios.post('playlist/details', body)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [playlistKey, userId] });
    },
  });
}
