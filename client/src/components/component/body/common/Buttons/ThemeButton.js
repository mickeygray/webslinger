import React from "react";
import { StyledButton } from "./ThemeButton.styled";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";

import { useTheme } from "../../../state/useTheme";
const ThemeButton = ({ themeColor, faIcon, faIconPosition }) => {
  const { theme } = useTheme();

  const Button = styled.button(
    ({ primary, round, shadow }) => `
    background: ${primary ? "#6495ED" : "#2b2b2b"};
    border-radius: ${round ? "4px" : "0"};
    box-shadow: ${shadow ? "2px 2px 2px rgba(0, 0, 0, 0.5)" : "none"};
    color: white;
    font-size: 24px;
    padding: 12px;
    cursor: pointer;
  `
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledButton>
        <div>
          {faIconPosition === "top" ? (
            <div className='text-center'>
              <i className={faIcon}></i>
            </div>
          ) : (
            ""
          )}
          <button className={`btn-${themeColor}`}>
            {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
            Button {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
          </button>
          {faIconPosition === "bottom" ? (
            <div className='text-center'>
              <i className={faIcon}></i>
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
