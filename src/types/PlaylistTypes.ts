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
