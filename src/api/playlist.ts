import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';
import {
  PostPlaylist,
  PostPlaylistResponse,
  PutPlaylist,
  GetPlaylist,
  GetPlaylistBase,
} from '../types/PlaylistTypes';

const playlistKey = 'playlist';
const playlistVideoKey = 'playlist-content';

export function useUserPlaylists(userId?: string) {
  return useQuery<GetPlaylistBase[], AxiosError>({
    queryKey: [playlistKey, userId],
    queryFn: async () =>
      (await axios.get('playlist/user', { params: { id: userId } })).data,
    enabled: userId !== undefined,
  });
}

export function usePlaylistVideos(playlistId: string) {
  return useQuery<GetPlaylist, AxiosError>({
    queryKey: [playlistVideoKey, playlistId],
    queryFn: async () =>
      (await axios.get('playlist/video', { params: { id: playlistId } })).data,
  });
}

export function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const loggedInUser = useRecoilValue(userDetailsState);

  const userId = loggedInUser?.id;

  return useMutation<PostPlaylistResponse, AxiosError, PostPlaylist>({
    mutationFn: async (body) => (await axios.post('playlist/details', body)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [playlistKey, userId] });
    },
  });
}

export function useEditPlaylist(playlistId: string, ownerId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, PutPlaylist>({
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

export function useAddVideoToPlaylist(videoId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: async (playlistId) =>
      await axios.post(`playlist/${playlistId}/${videoId}`),
    onSuccess: (_, playlistId) =>
      queryClient.invalidateQueries({ queryKey: [playlistVideoKey, playlistId] }),
  });
}

export function useRemoveVideoFromPlaylist(videoId: string, playlistId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: async () => await axios.delete(`playlist/${playlistId}/${videoId}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [playlistVideoKey, playlistId] }),
  });
}
