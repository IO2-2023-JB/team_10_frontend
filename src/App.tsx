import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import Homepage from './pages/Homepage';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
