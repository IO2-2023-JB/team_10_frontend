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
      light: '#0E0E0E',
      default: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface TypeBackground {
    light: string;
  }
}

export default theme;
