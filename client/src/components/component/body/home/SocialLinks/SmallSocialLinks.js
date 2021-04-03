import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { StyledSocialLinks } from "./SmallSocialLinks.styled";
import { GlobalStyles } from "../../../../../context/site/hooks/globals";
import { useTheme } from "../../../../../context/site/hooks/useTheme";

const SocialLinks = () => {
 const { theme } = useTheme();
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
