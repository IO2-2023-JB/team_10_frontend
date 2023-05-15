import { useLocation, useSearchParams } from 'react-router-dom';
import { ROUTES, SEARCH_PARAMS } from '../../const';
import { useSearch } from '../../api/search';
import PageLayout from '../../components/layout/PageLayout';
import TabRouter from '../../components/TabRouter';
import ContentSection from '../../components/layout/ContentSection';
import UsersList from '../User/UsersList';
import PlaylistList from '../User/Playlists/PlaylistList';
import { Stack, Typography } from '@mui/material';
import VideoFiltersList from '../../components/video/VideoFiltersList';
import { GetSearchParams } from '../../types/SearchTypes';

enum SearchResultsTabs {
  Videos = '',
  Users = 'users',
  Playlists = 'playlists',
}

function SearchPage() {
  const location = useLocation();
  const [params] = useSearchParams();
  const { data: searchResults, isLoading, error } = useSearch(GetSearchParams(params));

  const header = `Wyniki wyszukiwania "${params.get(SEARCH_PARAMS.QUERY)}":`;

  return (
    <PageLayout>
      <Stack spacing={2}>
        <Typography width='100%' variant='h5'>
          {header}
        </Typography>
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
                  element: <VideoFiltersList videos={searchResults?.videos} />,
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
