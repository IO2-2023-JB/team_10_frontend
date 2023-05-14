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

export enum SearchResultType {
  Video,
  User,
  Playlist,
}

export interface PreparedSearchResult {
  type: SearchResultType;
  label: string;
  result: GetVideoMetadataResponse | GetUserDetailsResponse | PlaylistBase;
}

export interface SearchParams {
  query?: string | null;
  sortBy?: string | null;
  sortAsc?: boolean;
  startDate?: string | null;
  endDate?: string | null;
}
