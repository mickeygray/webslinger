import React from "react";
import { StyledImageShell } from "./ImageShell.styled.styled.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";
import { StyledImageShell } from "./ImageShell.styled";

const ImageShell = ({ img, imgStyle }) => {
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
            <div class='reflection-content'>{img}</div>
          </div>
        ) : (
          ""
        )}

        {imgStyle === "expandingcircle" ? (
          <div class='container'>
            <div class='container__image'>
              <div class='container__info container__author'>
                Photo by{" "}
                <a class='link' href='#' target='_blank'>
                  Silvia Diaconescu
                </a>
              </div>
              <div class='container__info container__location'>
                Geneva Lake Switzerland{" "}
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
              {img}
            </label>
          </div>
        ) : (
          ""
        )}
        {imgStyle === "imageexpander" ? (
          <div class='image-expander'>
            <div class='box'>
              <img src={img} />
              <span>STUFF</span>
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
