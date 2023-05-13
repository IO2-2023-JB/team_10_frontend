import { PlaylistBase } from './PlaylistTypes';
import { GetUserDetailsResponse } from './UserTypes';
import { GetVideoMetadataResponse } from './VideoTypes';

export enum SortingDirections {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

export enum SortingTypes {
  PublishDate = 'PublishDate',
  Alphabetical = 'Alphabetical',
  Popularity = 'Popularity',
}

export interface SearchResults {
  videos: GetVideoMetadataResponse[];
  users: GetUserDetailsResponse[];
  playlists: PlaylistBase[];
}
