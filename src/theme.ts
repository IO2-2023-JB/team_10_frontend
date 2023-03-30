import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF9000',
    },
    background: {
      paper: '#0E0E0E'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});

export default theme;
