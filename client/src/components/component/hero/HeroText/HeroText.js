import React from "react";
import { StyledHeroText } from "./HeroText.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";

const SiteName = ({ textStyle, heroText, selectedTheme }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledHeroText>
        {textStyle === "halfhalf" ? (
          <div className='text-box halfhalf'>
            <h1>{heroText}</h1>
            <h1>{heroText}</h1>
          </div>
        ) : (
          ""
        )}
        {textStyle === "vertical" ? (
          <div className='vertical'>
            <h2 className='rotate'>{heroText}</h2>
            <h2>{heroText}</h2>
          </div>
        ) : (
          ""
        )}
        {textStyle === "halfhalf-animated" ? (
          <div className='main'>
            <span>
              <p>{heroText}</p>
            </span>
          </div>
        ) : (
          ""
        )}

        {textStyle === "rainbowshadow" ? (
          <div className='rainbowshadow'>{heroText}</div>
        ) : (
          ""
        )}

        {textStyle === `dimension-${selectedTheme}` ? (
          <div className={`dimension-${selectedTheme}`}>{heroText}</div>
        ) : (
          ""
        )}

        {textStyle === `textinacircle-${selectedTheme}` ? (
          <div className={`textinacircle-${selectedTheme}`}>
            {Array.from(heroText).map((char) => (
              <span>{char}</span>
            ))}
          </div>
        ) : (
          ""
        )}

        {textStyle === `deconstructed-${selectedTheme}` ? (
          <div className='deconstructed'>
            {heroText}
            <div className={`${selectedTheme}`}>{heroText}</div>
            <div className={`${selectedTheme}`}>{heroText}</div>
            <div className={`${selectedTheme}`}>{heroText}</div>
            <div className={`${selectedTheme}`}>{heroText}</div>
          </div>
        ) : (
          ""
        )}

        {textStyle === `textreveal` ? (
          <div className='textreveal'>
            <h1 class='home-title'>
              <span>{heroText}</span>
            </h1>
          </div>
        ) : (
          ""
        )}

        {textStyle === `shortbounce` ? (
          <div id='wrapper'>
            <div id='container'>
              <h1>{heroText}</h1>
            </div>
          </div>
        ) : (
          ""
        )}
      </StyledHeroText>
    </ThemeProvider>
  );
};

export default SiteName;
