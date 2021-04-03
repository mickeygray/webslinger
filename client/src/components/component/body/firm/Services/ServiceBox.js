import React from "react";
import { StyledServiceBox } from "./ServiceBox.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../../../context/site/hooks/globals";
import { useTheme } from "../../../../../context/site/hooks/useTheme";

const ServiceBox = ({ section, compStyle }) => {
 const { theme } = useTheme;
 return (
  <ThemeProvider theme={theme}>
   <GlobalStyles />
   <StyledServiceBox>
    {compStyle === "simplelayover" ? (
     <div className='simple-layover'>
      <div className='figcaption'>
       <h3>{section.h3}</h3>
       {section ? <p>{section.copy}</p> : ""}
      </div>
      <a href='#'></a>
      <img src={section.img} alt='' />
     </div>
    ) : (
     " "
    )}
    {compStyle === "layovercollapse" ? (
     <div className='layover-collapse'>
      <img src={section.img} alt='' />
      <div className='figcaption'>
       <h3>{section.h3}</h3>
       <p>{section.p}</p>
       <a href={section.a.url} class='read-more'>
        {section.a.aTag}
       </a>
      </div>
     </div>
    ) : (
     " "
    )}
    {compStyle === "imageopen" ? (
     <div className='image-open'>
      <img src={section.img} alt='' />
      <div className='figcaption'>
       <h3>{section.h3}</h3>
       <p>{section.p}</p>
      </div>
      <a href={section.a.url}>{section.a.aTag}</a>
     </div>
    ) : (
     " "
    )}
    ;
   </StyledServiceBox>
  </ThemeProvider>
 );
};

export default ServiceBox;
