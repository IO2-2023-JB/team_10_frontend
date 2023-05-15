import { SEARCH_PARAMS } from '../const';
import { removeEmptySearchParams } from '../utils/utils';
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
  sortAsc?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export function GetSearchParams(params: URLSearchParams): SearchParams {
  params = removeEmptySearchParams(params);
  return {
    query: params.get(SEARCH_PARAMS.QUERY),
    sortBy: params.get(SEARCH_PARAMS.SORT_BY),
    sortAsc: params.get(SEARCH_PARAMS.SORT_ASC),
    startDate: params.get(SEARCH_PARAMS.START_DATE),
    endDate: params.get(SEARCH_PARAMS.END_DATE),
  };
}

export function getSortingTypeString(sortingType: SortingTypes): string {
  switch (sortingType) {
    case SortingTypes.Alphabetical:
      return 'Alfabetycznie';
    case SortingTypes.Popularity:
      return 'Popularność';
    case SortingTypes.PublishDate:
      return 'Data publikacji';
  }
}

export function getSortingDirectionString(sortingDirection: SortingDirections): string {
  switch (sortingDirection) {
    case SortingDirections.Ascending:
      return 'Rosnąco';
    case SortingDirections.Descending:
      return 'Malejąco';
  }
}
