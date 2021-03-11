import React from "react";
import { StyledSiteLinks } from "./LayoverBoxSiteLinks.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { useTheme } from "../../../state/useTheme";

const LayoverBoxSiteLinks = ({ linkText, section }) => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledSiteLinks>
        <div className='layover-box'>
          <div className='figcaption'>
            <h2>{linkText}</h2>
            {section ? <p>{section.copy}</p> : ""}
          </div>
          <a href='#'></a>
          <img src={section.img} alt='' />
        </div>
      </StyledSiteLinks>
    </ThemeProvider>
  );
};

export default LayoverBoxSiteLinks;
