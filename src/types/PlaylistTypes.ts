import { GetVideoMetadataResponse } from './VideoTypes';

export enum PlaylistVisibility {
  Private = 'Private',
  Public = 'Public',
}

export interface PlaylistBase {
  name: string;
  id: string;
  visibility: PlaylistVisibility;
}

export type Playlist = Omit<PlaylistBase, 'id'> & {
  authorId: string;
  authorNickname: string;
  videos: GetVideoMetadataResponse[];
};

export type CreatePlaylist = Omit<PlaylistBase, 'id'>;
export type CreatePlaylistResponse = Pick<PlaylistBase, 'id'>;

export type EditPlaylist = CreatePlaylist;
