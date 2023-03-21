import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#F7971D',
    },
  },
});

export default theme;
