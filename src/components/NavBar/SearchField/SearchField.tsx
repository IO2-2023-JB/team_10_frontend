import { Autocomplete, AutocompleteInputChangeReason, SxProps } from '@mui/material';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { useSearch } from '../../../api/search';
import { ROUTES, SEARCH_PARAMS } from '../../../const';
import {
  GetSearchResults,
  PreparedSearchResult,
  SearchResultType,
} from '../../../types/SearchTypes';
import SearchInput from './SearchInput';
import SearchSuggestion from './SearchSuggestion';
import { useRecoilState } from 'recoil';
import { AppMode, appModeState } from '../../../data/AppStateData';

function prepareSearchResults(searchResults: GetSearchResults): PreparedSearchResult[] {
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

interface SearchFieldProps {
  sx?: SxProps;
  onClick?: () => void;
}

function SearchField({ sx, onClick }: SearchFieldProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [query, setQuery] = useState<string>('');
  const queryDebounced = useDebounce(query);
  const { data: searchResults } = useSearch({ query: queryDebounced });
  const [appMode, setAppMode] = useRecoilState(appModeState);

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
    else setQuery(defaultQuery);

    if (value === '2137' && appMode !== AppMode.Papiesz) setAppMode(AppMode.Papiesz);
    if (value === '420' && appMode !== AppMode.Green) setAppMode(AppMode.Green);
  };

  const defaultQuery = location.pathname.startsWith(ROUTES.SEARCH)
    ? searchParams.get(SEARCH_PARAMS.QUERY) ?? ''
    : '';

  useEffect(() => setQuery(defaultQuery), [defaultQuery, location, searchParams]);

  const handleRedirect = () => {
    if (query) {
      onClick?.();
      navigate({
        pathname: ROUTES.SEARCH,
        search: createSearchParams({
          query: query,
        }).toString(),
      });
    }
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
        if (event.key === 'Enter') handleRedirect();
      }}
      renderOption={(props, option) => (
        <SearchSuggestion
          props={{ ...props, onClick }}
          option={option}
          key={option.result.id}
        />
      )}
      renderInput={(params) => (
        <SearchInput
          params={params}
          showButton={query.length > 0}
          onSubmit={() => handleRedirect()}
        />
      )}
      ListboxProps={{
        sx: { maxHeight: 1000 },
      }}
      sx={{
        flex: '0 1 500px',
        ...sx,
      }}
    />
  );
}

export default SearchField;
