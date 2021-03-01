import { createGlobalStyle } from "styled-components";

export const SiteStyles = createGlobalStyle`
background: ${({ theme }) => theme.background};
light: ${({ theme }) => theme.light};
background: ${({ theme }) => theme.background};
light: ${({ theme }) => theme.light};
dark: ${({ theme }) => theme.dark};
danger: ${({ theme }) => theme.danger};
success: ${({ theme }) => theme.success};
hover: ${({ theme }) => theme.hover};
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    align-items: center;
    background: #0D0C1D;
    color: #EFFFFA;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100vh;
    justify-content: center;
    text-rendering: optimizeLegibility;
  }`;
