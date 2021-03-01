import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";
import { StyledSiteLinks } from "./SlidingSiteLinks.styled";
const SiteLinks = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <StyledSiteLinks>
          <div class='multi-btn btn'>
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
          </div>{" "}
        </StyledSiteLinks>
      </>
    </ThemeProvider>
  );
};
export default SiteLinks;
