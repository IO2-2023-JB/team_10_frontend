import { Search } from '@mui/icons-material';
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useSearch } from '../../api/search';
import { SearchResults } from '../../types/SearchTypes';
import { GetVideoMetadataResponse } from '../../types/VideoTypes';
import { GetUserDetailsResponse } from '../../types/UserTypes';
import { PlaylistBase } from '../../types/PlaylistTypes';

enum SearchResultType {
  Video,
  User,
  Playlist,
}

interface PreparedSearchResult {
  type: SearchResultType;
  label: string;
  result: GetVideoMetadataResponse | GetUserDetailsResponse | PlaylistBase;
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
      value={query}
      onInputChange={(_, value) => setQuery(value)}
      renderOption={(props, option) => {
        return (
          <Box component='li' {...props} key={option.result.id}>
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          placeholder='Szukaj filmów, użytkowników, playlist…'
          InputProps={{
            ...params.InputProps,
            sx: {
              width: 350,
              backgroundColor: 'rgba(255, 255, 255, 0.09)',
              '&:not(.Mui-focused)': {
                borderColor: 'transparent',
                '& fieldset': { borderColor: 'transparent' },
              },
            },
            startAdornment: (
              <InputAdornment position='start' sx={{ marginLeft: 1 }}>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default SearchField;
