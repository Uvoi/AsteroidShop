import { createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a0121', // Dark background color
      paper: '#1C0F24', // Paper background color
    },
    header: {
      primary: '#0c000f'
    },
    primary: {
      main: '#6325cf',
    },
    secondary: {
      main: '#D1A3FF',
    },
    text: {
      ultra:"#fff",
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
    divider: '#3D2A40',
    error: {
      main: '#FF6666',
    },
    warning: {
      main: '#FFCC66',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FAF3E0', // Light background color
      paper: '#f7e9c1', // Paper background color
    },
    header: {
      primary: '#743882',
    },
    primary: {
      main: '#5C33FF',
    },
    secondary: {
      main: '#8A63FF',
    },
    text: {
      ultra:"#000",
      primary: '#333333',
      secondary: '#666666',
    },
    divider: '#D9D0B8',
    error: {
      main: '#FF6666',
    },
    warning: {
      main: '#FFCC66',
    },
  },
});

export { darkTheme, lightTheme };
