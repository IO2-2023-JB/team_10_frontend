import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AppLayout from './components/layout/AppLayout';
import AppLoader from './components/layout/AppLoader';
import AuthGate from './components/layout/AuthGate';
import LinearProgress from './components/layout/LinearProgress';
import { BACKEND_URL, ROUTES } from './const';
import theme from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
axios.defaults.baseURL = BACKEND_URL;

const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Upload = lazy(() => import('./pages/Upload'));
const User = lazy(() => import('./pages/User'));
const Video = lazy(() => import('./pages/Video'));
const Playlist = lazy(() => import('./pages/Playlist'));
const Search = lazy(() => import('./pages/Search'));

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
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
                    </Routes>
                  </Suspense>
                </AppLayout>
              </AuthGate>
            </AppLoader>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
