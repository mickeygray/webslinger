import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../../context/site/hooks/globals";
import { useTheme } from "../../../../context/site/hooks/useTheme";

import { StyledHeroImage } from "./HeroImage.styled";

const HeroImage = ({ section, compStyle, img, img2 }) => {
 const { theme } = useTheme();
 const dualImage = [];

 for (let i = 0; i < 50; i++) {
  dualImage.push(
   <div
    className='i'
    style={{
     background: `rgba(#424242, 0.5) url(${img}) repeat fixed`,
    }}></div>
  );
 }
 return (
  <ThemeProvider theme={theme}>
   <GlobalStyles />
   <StyledHeroImage>
    {compStyle === "dualImage" ? (
     <div
      className='w'
      style={{
       background: `rgba(#424242, 0.5) url(${img2}) repeat fixed`,
      }}>
      {dualImage.map((dual) => dual)}
      <div className='h'>
       <h1>{section.heading}</h1>
      </div>
     </div>
    ) : (
     ""
    )}
    {compStyle === "layoverfade" ? (
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

    {compStyle === "focusedlayover" ? (
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
