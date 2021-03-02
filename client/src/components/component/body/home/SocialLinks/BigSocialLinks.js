import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { StyledSocialLinks } from "./BigSocialLinks.styled";
import { GlobalStyles } from "../../../state/globals";
import { theme } from "../../../state/theme";

const BigSocialLinks = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <StyledSocialLinks>
          <div>
            <ul>
              <li>
                <a href='#'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class='fa fa-facebook'></span>
                </a>
              </li>
              <li>
                <a href='#'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class='fa fa-twitter'></span>
                </a>
              </li>
              <li>
                <a href='#'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class='fa fa-instagram'></span>
                </a>
              </li>
              <li>
                <a href='#'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class='fa fa-linkedin'></span>
                </a>
              </li>
            </ul>
          </div>{" "}
        </StyledSocialLinks>
      </>
    </ThemeProvider>
  );
};
export default BigSocialLinks;
