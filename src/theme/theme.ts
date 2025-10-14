import { DefaultTheme } from 'styled-components';

const baseTheme: DefaultTheme = {
  color: {
    background: {
      primary: '#ffffff',
      activeCell: '#2F80ED',
      onCellHover: '#F1F1F1',
      range: '#2F80ED1A',
      rangeStartCell: '#2F80ED99',
      rangeEndCell: '#2F80ED',
    },
    red: {
      main: '#FF3333',
      light: '#FF6666',
      dark: '#AA0000',
    },
    text: {
      primary: '#000000',
      secondary: '#444444',
      placeholder: '#888888',
    },
  },
  breakpoint: {
    mobile: '(max-width: 640px)',
    tablet: '(max-width: 1024px)',
    laptop: '(max-width: 1439px)',
    laptopL: '(min-width: 1440)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    base: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  },
  fontSize: {
    h1: '32px',
    h2: '24px',
    h3: '20px',
    h4: '18px',
    h5: '16px',
    h6: '14px',
    small: '10px',
  },
  fontWeight: {
    small: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontFamily: {
    primary: 'Arial, sans-serif',
  },
  letterSpacing: {
    sm: '1px',
    md: '2px',
    lg: '3px',
  },
  borderThickness: {
    thin: '1px',
    medium: '2px',
    bold: '3px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  color: {
    ...baseTheme.color,
    background: {
      primary: '#131313',
      activeCell: '#2F80ED',
      onCellHover: '#696868',
      range: '#2F80ED1A',
      rangeStartCell: '#2F80ED99',
      rangeEndCell: '#2F80ED',
    },
    text: {
      primary: '#ffffff',
      secondary: '#666666',
      placeholder: '#888888',
    },
  },
};
