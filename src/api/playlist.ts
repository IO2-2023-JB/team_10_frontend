import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';
import {
  CreatePlaylist,
  CreatePlaylistResponse,
  EditPlaylist,
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

export function useEditPlaylist(playlistId: string, ownerId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, EditPlaylist>({
    mutationFn: async (body) =>
      await axios.put('playlist/details', body, { params: { id: playlistId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [playlistKey, ownerId] });
      queryClient.invalidateQueries({ queryKey: [playlistVideoKey, playlistId] });
    },
  });
}

export function useDeletePlaylist(playlistId: string, ownerId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: async () =>
      await axios.delete('playlist/details', { params: { id: playlistId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [playlistKey, ownerId] }),
  });
}