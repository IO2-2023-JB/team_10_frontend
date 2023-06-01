import { SEARCH_PARAMS } from '../const';
import { removeEmptySearchParams } from '../utils/utils';
import { GetPlaylistBase } from './PlaylistTypes';
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

export interface GetSearchResults {
  videos: GetVideoMetadataResponse[];
  users: GetUserDetailsResponse[];
  playlists: GetPlaylistBase[];
}

export enum SearchResultType {
  Video,
  User,
  Playlist,
}

export interface PreparedSearchResult {
  type: SearchResultType;
  label: string;
  result: GetVideoMetadataResponse | GetUserDetailsResponse | GetPlaylistBase;
}

export interface SearchParams {
  query?: string | null;
  sortBy?: SortingTypes;
  sortDirection?: SortingDirections;
  startDate?: string | null;
  endDate?: string | null;
}

export function getSearchParams(params: URLSearchParams): SearchParams {
  params = removeEmptySearchParams(params);
  return {
    query: params.get(SEARCH_PARAMS.QUERY),
    sortBy: SortingTypes[params.get(SEARCH_PARAMS.SORT_BY) as keyof typeof SortingTypes],
    sortDirection:
      SortingDirections[
        params.get(SEARCH_PARAMS.SORT_DIRECTION) as keyof typeof SortingDirections
      ],
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
