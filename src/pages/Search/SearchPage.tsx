import { useLocation } from 'react-router-dom';
import { ROUTES, SEARCH_PARAMS } from '../../const';
import { useSearch } from '../../api/search';
import { SearchParams } from '../../types/SearchTypes';
import PageLayout from '../../components/layout/PageLayout';
import TabRouter from '../../components/TabRouter';
import VideoList from '../../components/video/VideoList';
import ContentSection from '../../components/layout/ContentSection';
import UsersList from '../User/UsersList';
import PlaylistList from '../User/Playlists/PlaylistList';
import { Stack, Typography } from '@mui/material';
import SearchFilters from './SearchFilters';

function GetParams(params: URLSearchParams): SearchParams {
  return {
    query: params.get(SEARCH_PARAMS.QUERY),
    sortBy: params.get(SEARCH_PARAMS.SORT_BY),
    sortAsc: params.get(SEARCH_PARAMS.SORT_ASC) === 'true',
    startDate: params.get(SEARCH_PARAMS.START_DATE),
    endDate: params.get(SEARCH_PARAMS.END_DATE),
  };
}

enum SearchResultsTabs {
  Videos = '',
  Users = 'users',
  Playlists = 'playlists',
}

function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { data: searchResults, isLoading, error } = useSearch(GetParams(params));

  const header = `Wyniki wyszukiwania "${params.get(SEARCH_PARAMS.QUERY)}":`;

  return (
    <PageLayout>
      <Stack spacing={2}>
        <Stack direction='row' spacing='stretch'>
          <Typography width='100%' variant='h5'>
            {header}
          </Typography>
          <SearchFilters />
        </Stack>
        <ContentSection isLoading={isLoading} error={error}>
          {searchResults && (
            <TabRouter
              rootPath={ROUTES.SEARCH}
              query={location.search}
              defaultTab={SearchResultsTabs.Videos}
              tabs={[
                {
                  index: true,
                  path: SearchResultsTabs.Videos,
                  label: 'Filmy',
                  element: <VideoList videos={searchResults?.videos} />,
                },
                {
                  path: SearchResultsTabs.Users,
                  label: 'Użytkownicy',
                  element: <UsersList users={searchResults.users} />,
                },
                {
                  path: SearchResultsTabs.Playlists,
                  label: 'Playlisty',
                  element: (
                    <PlaylistList playlists={searchResults.playlists} isOwn={false} />
                  ),
                },
              ]}
            />
          )}
        </ContentSection>
      </Stack>
    </PageLayout>
  );
}

export default SearchPage;
