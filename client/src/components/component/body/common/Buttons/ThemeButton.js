import React from "react";
import { StyledButton } from "./ThemeButton.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { theme } from "../../../state/theme";

const ThemeButton = ({ themeColor, faIcon, faIconPosition }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledButton>
        <div>
          {faIconPosition === "top" ? (
            <div className='text-center'>
              <i class={faIcon}></i>
            </div>
          ) : (
            ""
          )}
          <a class={`btn-${themeColor}`}>
            {faIconPosition === "front" ? <i class={faIcon}></i> : ""} Button{" "}
            {faIconPosition === "back" ? <i class={faIcon}></i> : ""}
          </a>
          {faIconPosition === "bottom" ? (
            <div className='text-center'>
              <i class={faIcon}></i>
            </div>
          ) : (
            ""
          )}
        </div>
      </StyledButton>
    </ThemeProvider>
  );
};

export default ThemeButton;
