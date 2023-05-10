import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AppLoader from './components/layout/AppLoader';
import AuthGate from './components/layout/AuthGate';
import AppLayout from './components/layout/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import User from './pages/User';
import Video from './pages/Video';
import theme from './theme';
import axios from 'axios';
import { BACKEND_URL, ROUTES } from './const';
import Upload from './pages/Upload/index';
import Playlist from './pages/Playlist';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
axios.defaults.baseURL = BACKEND_URL;

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
                  </Routes>
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
