import { GetVideoMetadataResponse } from './VideoTypes';

export enum PlaylistVisibility {
  Private = 'Private',
  Public = 'Public',
}

export interface GetPlaylistBase {
  name: string;
  id: string;
  visibility: PlaylistVisibility;
}

export type GetPlaylist = Omit<GetPlaylistBase, 'id'> & {
  authorId: string;
  authorNickname: string;
  videos: GetVideoMetadataResponse[];
};

export type PostPlaylist = Omit<GetPlaylistBase, 'id'>;
export type PostPlaylistResponse = Pick<GetPlaylistBase, 'id'>;

export type PutPlaylist = PostPlaylist;
