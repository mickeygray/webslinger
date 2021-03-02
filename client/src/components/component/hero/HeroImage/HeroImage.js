import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";
import { StyledHeroImage } from "./HeroImage.styled";

const HeroImage = ({ section, heroStyle }) => {
  const dualImage = [];
  for (let i = 0; i < 50; i++) {
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
              <h1>{section.heading}</h1>
            </div>
          </div>
        ) : (
          ""
        )}
        {heroStyle === "layoverfade" ? (
          <div className='layover-fade'>
            <a href='#' target='_blank'>
              <img src={section.img} alt='hero' />{" "}
            </a>
            <div class='box-text'>
              <h1>{section.heading}</h1>
              <p>{section.copy} </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {heroStyle === "focusedlayover" ? (
          <div className='focused-layover'>
            <img src={section.img} alt='' />
            <div className='figcaption'>
              <div className='square'>
                <div></div>
              </div>
              <h2>
                {section.h2}
                <span> {section.focused}</span>
              </h2>
              <p>{section.p}</p>
            </div>
            <a href='#'></a>
          </div>
        ) : (
          ""
        )}
      </StyledHeroImage>
    </ThemeProvider>
  );
};

export default HeroImage;
