import { Autocomplete } from '@mui/material';
import { useMemo, useState } from 'react';
import { useSearch } from '../../../api/search';
import {
  PreparedSearchResult,
  SearchResultType,
  SearchResults,
} from '../../../types/SearchTypes';
import SearchInput from './SearchInput';
import SearchSuggestion from './SearchSuggestion';

function prepareSearchResults(searchResults: SearchResults): PreparedSearchResult[] {
  const topVideos = searchResults.videos.slice(0, 3).map((result) => ({
    type: SearchResultType.Video,
    label: result.title,
    result,
  }));
  const topUsers = searchResults.users.slice(0, 3).map((result) => ({
    type: SearchResultType.User,
    label: result.nickname,
    result,
  }));
  const topPlaylists = searchResults.playlists.slice(0, 3).map((result) => ({
    type: SearchResultType.Playlist,
    label: result.name,
    result,
  }));

  return [...topVideos, ...topUsers, ...topPlaylists];
}

function SearchField() {
  const [query, setQuery] = useState<string>('');
  // TODO add useDebounce
  const { data: searchResults } = useSearch(query);

  const preparedSearchResults = useMemo<PreparedSearchResult[] | undefined>(() => {
    if (searchResults === undefined) return undefined;
    return prepareSearchResults(searchResults);
  }, [searchResults]);

  return (
    <Autocomplete
      freeSolo
      options={preparedSearchResults ?? []}
      disableClearable
      blurOnSelect
      value={query}
      onInputChange={(_, value, reason) => {
        if (reason === 'input') setQuery(value);
        else setQuery('');
      }}
      renderOption={(props, option) => (
        <SearchSuggestion props={props} option={option} key={option.result.id} />
      )}
      renderInput={(params) => <SearchInput params={params} />}
      ListboxProps={{
        sx: { maxHeight: 1000 },
      }}
    />
  );
}

export default SearchField;
