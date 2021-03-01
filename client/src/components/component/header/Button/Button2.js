import React from "react";
import { StyledButton } from "./Button.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";

const Button2 = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledButton>
        <div class='btn-2'>
          <p>Button 2: </p>
          <a href=''>
            <span>Hover over me</span>
          </a>
        </div>
      </StyledButton>
    </ThemeProvider>
  );
};

export default Button2;
