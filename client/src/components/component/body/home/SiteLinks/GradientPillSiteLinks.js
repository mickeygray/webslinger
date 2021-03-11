import React from "react";
import { StyledSiteLinks } from "./GradientPillSiteLinks.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { useTheme } from "../../../state/useTheme";

const GradientPillSiteLinks = ({ themeColor, faIcon, faIconPosition }) => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledSiteLinks>
        <div>
          {faIconPosition === "top" ? (
            <div className='text-center'>
              <i class={faIcon}></i>
            </div>
          ) : (
            ""
          )}
          <button class={`btn-${themeColor}`}>
            {faIconPosition === "front" ? <i class={faIcon}></i> : ""} Button{" "}
            {faIconPosition === "back" ? <i class={faIcon}></i> : ""}
          </button>
          {faIconPosition === "bottom" ? (
            <div className='text-center'>
              <i class={faIcon}></i>
            </div>
          ) : (
            ""
          )}
        </div>
      </StyledSiteLinks>
    </ThemeProvider>
  );
};

export default GradientPillSiteLinks;
