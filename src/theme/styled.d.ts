import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      background: {
        primary: string;
        activeCell: string;
        onCellHover: string;
        range: string;
        rangeStartCell: string;
        rangeEndCell: string;
      };
      red: {
        main: string;
        light: string;
        dark: string;
      };
      text: {
        primary: string;
        secondary: string;
        placeholder: string;
      };
    };
    breakpoint: {
      mobile: string;
      tablet: string;
      laptop: string;
      laptopL: string;
    };
    spacing: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontSize: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
      small: string;
    };
    fontWeight: {
      small: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    fontFamily: {
      primary: string;
    };
    letterSpacing: {
      sm: string;
      md: string;
      lg: string;
    };
    borderThickness: {
      thin: string;
      medium: string;
      bold: string;
    };

    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
