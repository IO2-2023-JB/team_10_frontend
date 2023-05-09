export enum PlaylistVisibility {
  Private = 'Private',
  Public = 'Public',
}

export interface Playlist {
  name: string;
  id: string;
  visibility: PlaylistVisibility;
}
