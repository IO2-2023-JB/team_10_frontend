import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF9000',
    },
    background: {
      lighter: '#272727',
      light: '#0E0E0E',
      default: '#000000',
      semiTransparent: 'rgb(255 255 255 / 9%)',
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

export const transitionShort = (property: string): string =>
  `${property} ease-in-out 100ms`;

export const transitionLong = (property: string): string =>
  `${property} ease-in-out 200ms`;

declare module '@mui/material/styles' {
  interface TypeBackground {
    lighter: string;
    light: string;
    semiTransparent: string;
  }
}

export default theme;
