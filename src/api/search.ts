import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SearchResults, SortingDirections, SortingTypes } from '../types/SearchTypes';

const searchKey = 'search';

export function useSearch(query: string) {
  return useQuery<SearchResults, AxiosError>({
    queryKey: [searchKey, query, SortingTypes.Popularity, SortingDirections.Descending],
    queryFn: async () => {
      const params = {
        query,
        sortingCriterion: SortingTypes.Popularity,
        sortingType: SortingDirections.Descending,
      };
      const { data } = await axios.get('search', {
        params,
      });
      return data;
    },
    enabled: query.length > 0,
  });
}
