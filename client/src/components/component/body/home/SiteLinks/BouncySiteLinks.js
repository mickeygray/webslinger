import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { theme } from "../../../state/theme";
import { StyledSiteLinks } from "./SlidingSiteLinks.styled";
const BouncySiteLinks = ({ section }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <StyledSiteLinks>
          <div class='multi-btn btn'>
            {section.faIconPosition === "top" ? (
              <div className='text-center'>
                <i class={section.faIcon}></i>
              </div>
            ) : (
              ""
            )}
            <a class={`btn-${section.themeColor}`}>
              {section.faIconPosition === "front" ? (
                <i class={section.faIcon}></i>
              ) : (
                ""
              )}{" "}
              Button{" "}
              {section.faIconPosition === "back" ? (
                <i class={section.faIcon}></i>
              ) : (
                ""
              )}
            </a>
            {section.faIconPosition === "bottom" ? (
              <div className='text-center'>
                <i class={section.faIcon}></i>
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
export default BouncySiteLinks;
