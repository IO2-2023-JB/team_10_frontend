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
import { BACKEND_URL } from './const';
import Upload from './pages/Upload/index';

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
            <CssBaseline />
            <AppLoader>
              <AuthGate>
                <AppLayout>
                  <Routes>
                    // do poprawy
                    {/* <Route path='*' element={<PageNotFound />} /> */}
                    <Route path='/*' element={<Homepage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/upload' element={<Upload />} />
                    <Route path='/user/:userId/*' element={<User />} />
                    <Route path='/video/:videoId' element={<Video />} />
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
