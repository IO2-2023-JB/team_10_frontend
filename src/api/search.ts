import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  SearchParams,
  SearchResults,
  SortingDirections,
  SortingTypes,
} from '../types/SearchTypes';

const searchKey = 'search';

export function useSearch(searchParams: SearchParams) {
  const sortBy = searchParams.sortBy ?? SortingTypes.Popularity;

  const sortDirection = searchParams.sortDirection ?? SortingDirections.Descending;
  const startDate = searchParams.startDate ?? null;
  const endDate = searchParams.endDate ?? null;

  return useQuery<SearchResults, AxiosError>({
    queryKey: [searchKey, searchParams.query, sortBy, sortDirection, startDate, endDate],
    queryFn: async () => {
      const params = {
        query: searchParams.query,
        sortingCriterion: sortBy,
        sortingType: sortDirection,
        beginDate: startDate,
        endDate: endDate,
      };
      const { data } = await axios.get('search', {
        params,
      });
      return data;
    },
    enabled:
      searchParams.query !== undefined &&
      searchParams.query !== null &&
      searchParams.query.length > 0,
  });
}
