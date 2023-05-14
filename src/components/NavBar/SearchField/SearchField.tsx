import { Autocomplete, AutocompleteInputChangeReason } from '@mui/material';
import { SyntheticEvent, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { useSearch } from '../../../api/search';
import { ROUTES } from '../../../const';
import {
  PreparedSearchResult,
  SearchResultType,
  SearchResults,
} from '../../../types/SearchTypes';
import SearchInput from './SearchInput';
import SearchSuggestion from './SearchSuggestion';

interface SearchFieldProps {
  query: string;
}

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

function getResultUrl(searchResult: PreparedSearchResult): string {
  let urlPrefix: string | undefined;

  switch (searchResult.type) {
    case SearchResultType.Video:
      urlPrefix = ROUTES.VIDEO;
      break;
    case SearchResultType.User:
      urlPrefix = ROUTES.USER;
      break;
    case SearchResultType.Playlist:
      urlPrefix = ROUTES.PLAYLIST;
      break;
  }

  return `${urlPrefix}/${searchResult.result.id}`;
}

function SearchField({ query: queryFromUrl }: SearchFieldProps) {
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>(queryFromUrl);
  const queryDebounced = useDebounce(query);
  const { data: searchResults } = useSearch({ query: queryDebounced });

  const preparedSearchResults = useMemo<PreparedSearchResult[] | undefined>(() => {
    if (searchResults === undefined) return undefined;
    return prepareSearchResults(searchResults);
  }, [searchResults]);

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: NonNullable<string | PreparedSearchResult>
  ) => {
    if (typeof value !== 'string') {
      const url = getResultUrl(value);
      navigate(url);
    }
  };

  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input') setQuery(value);
    else setQuery('');
  };

  return (
    <Autocomplete
      freeSolo
      options={preparedSearchResults ?? []}
      disableClearable
      blurOnSelect
      filterOptions={(x) => x}
      value={query}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter')
          navigate({
            pathname: ROUTES.SEARCH,
            search: createSearchParams({
              query: query,
            }).toString(),
          });
      }}
      renderOption={(props, option) => (
        <SearchSuggestion props={props} option={option} key={option.result.id} />
      )}
      renderInput={(params) => (
        <SearchInput
          params={params}
          showButton={query.length > 0}
          onSubmit={() => {
            // redirect to search results
          }}
        />
      )}
      ListboxProps={{
        sx: { maxHeight: 1000 },
      }}
      sx={{
        flex: '0 1 500px',
      }}
    />
  );
}

export default SearchField;
