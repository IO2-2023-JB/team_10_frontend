import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import AppLayout from './components/layout/AppLayout';
import AppLoader from './components/layout/AppLoader';
import AuthGate from './components/layout/AuthGate';
import BackendSwitcher from './components/layout/BackendSwitcher';
import LinearProgress from './components/layout/LinearProgress';
import { DEFAULT_BACKEND_URL, ROUTES } from './const';
import { appModeState } from './data/AppStateData';
import getTheme from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

axios.defaults.baseURL = DEFAULT_BACKEND_URL;

const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Upload = lazy(() => import('./pages/Upload'));
const User = lazy(() => import('./pages/User'));
const Video = lazy(() => import('./pages/Video'));
const Playlist = lazy(() => import('./pages/Playlist'));
const Search = lazy(() => import('./pages/Search'));
const Ticket = lazy(() => import('./pages/Ticket'));

function App() {
  const appModeData = useRecoilValue(appModeState);
  const theme = useMemo(() => createTheme(getTheme(appModeData.appMode)), [appModeData]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <BackendSwitcher>
            <AppLoader>
              <AuthGate>
                <AppLayout>
                  <Suspense fallback={<LinearProgress />}>
                    <Routes>
                      <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
                      <Route path={`${ROUTES.HOMEPAGE}/*`} element={<Homepage />} />
                      <Route path={ROUTES.LOGIN} element={<Login />} />
                      <Route path={ROUTES.REGISTER} element={<Register />} />
                      <Route path={ROUTES.UPLOAD} element={<Upload />} />
                      <Route path={`${ROUTES.USER}/:userId/*`} element={<User />} />
                      <Route path={`${ROUTES.VIDEO}/:videoId`} element={<Video />} />
                      <Route
                        path={`${ROUTES.PLAYLIST}/:playlistId`}
                        element={<Playlist />}
                      />
                      <Route path={`${ROUTES.SEARCH}/*`} element={<Search />} />
                      <Route path={`${ROUTES.TICKETS}`} element={<Ticket />} />
                    </Routes>
                  </Suspense>
                </AppLayout>
              </AuthGate>
            </AppLoader>
          </BackendSwitcher>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
