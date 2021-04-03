import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
primary: ${({ theme }) => theme.primary};
light: ${({ theme }) => theme.light};
dark: ${({ theme }) => theme.dark};
danger: ${({ theme }) => theme.danger};
success: ${({ theme }) => theme.success};
text: ${({ theme }) => theme.text};
mobile: ${({ theme }) => theme.mobile};
  html, body {
    margin: 0;
    padding: 0;
    height: 100vh;
    height: 100vh;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
`;
