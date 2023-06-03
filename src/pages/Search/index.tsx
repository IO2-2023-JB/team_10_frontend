import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSearch } from '../../api/search';
import Spinner from '../../components/Spinner';
import TabRouter from '../../components/TabRouter';
import TabTitle from '../../components/TabTitle';
import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import VideoFiltersList from '../../components/video/VideoFiltersList';
import { ROUTES, SEARCH_PARAMS } from '../../const';
import { getSearchParams } from '../../types/SearchTypes';
import PlaylistList from '../User/Playlists/PlaylistList';
import UsersList from '../User/UsersList';

enum SearchResultsTabs {
  Videos = '',
  Users = 'users',
  Playlists = 'playlists',
}

function Search() {
  const location = useLocation();
  const [params] = useSearchParams();
  const { data: searchResults, isLoading, error } = useSearch(getSearchParams(params));

  const query = params.get(SEARCH_PARAMS.QUERY);

  return (
    <PageLayout>
      {query && <TabTitle title={query} />}
      <Stack spacing={2}>
        <Typography width='100%' variant='h5'>
          Wyniki wyszukiwania{' '}
          <Box fontWeight={600} component='span'>
            {query}
          </Box>
        </Typography>
        <ContentSection isLoading={false} error={error}>
          <TabRouter
            rootPath={ROUTES.SEARCH}
            query={location.search}
            defaultTab={SearchResultsTabs.Videos}
            tabs={[
              {
                index: true,
                path: SearchResultsTabs.Videos,
                label: 'Filmy',
                element: (
                  <VideoFiltersList
                    videos={searchResults?.videos ?? []}
                    isLoading={isLoading}
                  />
                ),
              },
              {
                path: SearchResultsTabs.Users,
                label: 'Użytkownicy',
                element: isLoading ? (
                  <Spinner />
                ) : (
                  <UsersList users={searchResults?.users ?? []} />
                ),
              },
              {
                path: SearchResultsTabs.Playlists,
                label: 'Playlisty',
                element: isLoading ? (
                  <Spinner />
                ) : (
                  <PlaylistList
                    playlists={searchResults?.playlists ?? []}
                    isOwn={false}
                    showAuthor
                  />
                ),
              },
            ]}
          />
        </ContentSection>
      </Stack>
    </PageLayout>
  );
}

export default Search;
