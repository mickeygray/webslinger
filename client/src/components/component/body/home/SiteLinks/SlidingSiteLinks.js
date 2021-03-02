import React from "react";
import { StyledSiteLinks } from "./SlidingSiteLinks.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { theme } from "../../../state/theme";

const SlidingSiteLinks = ({ themeColor, faIcon, faIconPosition }) => {
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
      </StyledSiteLinks>
    </ThemeProvider>
  );
};

export default SlidingSiteLinks;
