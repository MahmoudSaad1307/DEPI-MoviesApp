import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.12rem;

  }
`;

export default GlobalStyle;
