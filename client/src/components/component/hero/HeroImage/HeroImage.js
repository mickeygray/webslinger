import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";
import { StyledHeroImage } from "./HeroImage.styled";

const HeroImage = ({ img, img2, heroText, heroStyle }) => {
  const dualImage = [];
  for (i = 0; i < 50; i++) {
    dualImage.push(<div className='i'></div>);
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledHeroImage>
        {heroStyle === "dualImage" ? (
          <div className='w'>
            {dualImage.map((dual) => dual)}
            <div className='h'>
              <h1>{heroText}</h1>
            </div>
          </div>
        ) : (
          ""
        )}
        {heroStyle === "dualImage" ? (
          <div className='layover-fade'>
            <a href='#' target='_blank'>
              <img src={img} alt='hero' />{" "}
            </a>
            <div class='box-text'>
              <h1>{heroHeading}</h1>
              <p>{heroSubHeading} </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </StyledHeroImage>
    </ThemeProvider>
  );
};

export default HeroImage;
