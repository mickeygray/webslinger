import React from "react";
import { StyledButton } from "./Button.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../../context/site/hooks/globals";
import { useTheme } from "../../../../context/site/hooks/useTheme";

const Button1 = () => {
 const { theme } = useTheme();
 return (
  <ThemeProvider theme={theme}>
   <GlobalStyles />
   <StyledButton>
    <div class='btn-1'>
     <p>Button 1: </p>
     <a href=''>
      <span>Hover over me</span>
     </a>
    </div>
   </StyledButton>
  </ThemeProvider>
 );
};

export default Button1;
