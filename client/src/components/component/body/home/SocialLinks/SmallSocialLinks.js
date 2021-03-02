import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { StyledSocialLinks } from "./SmallSocialLinks.styled";
import { GlobalStyles } from "../../../state/globals";
import { theme } from "../../../state/theme";

const SocialLinks = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <StyledSocialLinks>
          <div class='share-button'>
            <span>Our Social Media</span>
            <a href='#'>
              <i class='fab fa-facebook-f'></i>
            </a>
            <a href='#'>
              <i class='fab fa-twitter'></i>
            </a>
            <a href='#'>
              <i class='fab fa-instagram'></i>
            </a>
            <a href='#'>
              <i class='fab fa-linkedin-in'></i>
            </a>
          </div>
        </StyledSocialLinks>
      </>
    </ThemeProvider>
  );
};
export default SocialLinks;
