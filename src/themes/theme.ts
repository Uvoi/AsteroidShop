import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    ultra?: string;
  }

  interface SimplePaletteColorOptions {
    ultra?: string;
  }
  interface TypeText {
    ultra?: string;
  }
  

  interface Palette {
    header: {
      primary: string;
    };
  }

  interface PaletteOptions {
    header: {
      primary: string;
    };
  }

  interface TypeBackground {
    paper2: string;
  }

  interface PaletteBackgroundOptions {
    paper2: string;
  }
}


function createCustomPaletteColor(main: string, ultra: string) {
  return {
    main,
    ultra,
  };
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a0121',
      paper: '#1C0F24',
      paper2: '#261430',
    },
    header: {
      primary: '#0c000f',
    },
    primary: createCustomPaletteColor('#6325cf', '#5312aa'),
    secondary: {
      main: '#D1A3FF',
    },
    success: createCustomPaletteColor('#4BB543', '#22b317'),
    error: createCustomPaletteColor('#FF6666', '#ff2424'),
    text: {
      primary: "#E0E0E0",
      secondary: '#B0B0B0',
      ultra: '#fff',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FAF3E0',
      paper: '#f7e9c1',
      paper2: '#ebdfbe',
    },
    header: {
      primary: '#a479b8',
    },
    primary: createCustomPaletteColor('#5C33FF', '#422478'),
    secondary: {
      main: '#8A63FF',
    },
    success: createCustomPaletteColor('#4BB543', '#22b317'),
    error: createCustomPaletteColor('#FF6666', '#ff2424'),
    text: {
      primary: "#333333",
      secondary: '#4f4f4f',
      ultra: '#000',
    },
  },
});

export { darkTheme, lightTheme };
