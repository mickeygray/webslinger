import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { StyledSocialLinks } from "./BigSocialLinks.styled";
import { GlobalStyles } from "../../../state/globals";
import { useTheme } from "../../../state/useTheme";

const BigSocialLinks = () => {
  const { theme } = useTheme();
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
                  <i className='fa fa-facebook'></i>
                </a>
              </li>
              <li>
                <a href='#'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <i class='fa fa-twitter'></i>
                </a>
              </li>
              <li>
                <a href='#'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <i class='fa fa-instagram'></i>
                </a>
              </li>
              <li>
                <a href='#'>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <i class='fa fa-linkedin'></i>
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
