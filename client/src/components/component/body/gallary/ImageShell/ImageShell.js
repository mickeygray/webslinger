import React from "react";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { useTheme } from "../../../state/useTheme";
import { StyledImageShell } from "./ImageShell.styled";

const ImageShell = ({ img, imgStyle }) => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledImageShell>
        {imgStyle === "logostack" ? (
          <div className='logostack'>
            <div className='logostack-container'>
              <img src={img} />
              <img src={img} />
              <img src={img} />
              <img src={img} />
            </div>
          </div>
        ) : (
          ""
        )}
        {imgStyle === "horizontalimg" ? (
          <div class='horizontalimg'>
            <div class='image'>
              <img src={img} className='img' alt='' />
            </div>
          </div>
        ) : (
          ""
        )}

        {imgStyle === "reflexive" ? (
          <div class='reflection-container'>
            <div class='reflection-content'>
              {" "}
              <img src={img} className='img' alt='' />
            </div>
          </div>
        ) : (
          ""
        )}

        {imgStyle === "expandingcircle" ? (
          <div class='container'>
            <div class='container__image'>
              <div class='container__info container__author'>
                <h3>Photo by </h3>
                <a class='link' href='#' target='_blank'>
                  Silvia Diaconescu
                </a>
              </div>
              <div class='container__info container__location'>
                <p> Geneva Lake Switzerland </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {imgStyle === "imagesselector" ? (
          <div className='images-selector'>
            <input type='radio' id={img} name={img} value={img} />
            <label htmlFor={img} className='img-card'>
              <img src={img} className='img' alt='' />
            </label>
          </div>
        ) : (
          ""
        )}
        {imgStyle === "imageexpander" ? (
          <div class='image-expander'>
            <div class='box'>
              <img src={img} />
            </div>
          </div>
        ) : (
          ""
        )}
      </StyledImageShell>
    </ThemeProvider>
  );
};

export default ImageShell;
