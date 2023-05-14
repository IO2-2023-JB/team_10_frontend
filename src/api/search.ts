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
  const sortBy: SortingTypes = searchParams.sortBy
    ? SortingTypes[searchParams.sortBy as keyof typeof SortingTypes]
    : SortingTypes.Popularity;

  const sortType = searchParams.sortAsc
    ? SortingDirections.Ascending
    : SortingDirections.Descending;
  const startDate = searchParams.startDate ? new Date(searchParams.startDate) : null;
  const endDate = searchParams.endDate ? new Date(searchParams.endDate) : null;

  return useQuery<SearchResults, AxiosError>({
    queryKey: [searchKey, searchParams.query, sortBy, sortType, startDate, endDate],
    queryFn: async () => {
      const params = {
        query: searchParams.query,
        sortingCriterion: sortBy,
        sortingType: sortType,
        beginDate: startDate,
        endDate: endDate,
      };
      const { data } = await axios.get('search', {
        params,
      });
      return data;
    },
    enabled: searchParams.query != null && searchParams.query.length > 0,
  });
}
