import React from "react";
import { StyledAnimatedLogo } from "./AnimatedLogo.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";

const AnimatedLogo = ({ logo, logoStyle }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAnimatedLogo>
        {logoStyle === "logostack" ? (
          <div className='logostack'>
            <div className='logostack-container'>
              <img src={logo} />
              <img src={logo} />
              <img src={logo} />
              <img src={logo} />
            </div>
          </div>
        ) : (
          ""
        )}

        {logoStyle === "imageset" ? (
          <div className='imageset'>
            <a href='#' className='imageset'>
              <img src={logo} />
              <div class='glow-wrap'>
                <i class='glow'></i>
              </div>
            </a>
          </div>
        ) : (
          ""
        )}
      </StyledAnimatedLogo>
    </ThemeProvider>
  );
};

export default AnimatedLogo;
