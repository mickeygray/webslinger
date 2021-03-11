import React from "react";
import { StyledHeroText } from "./HeroText.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { useTheme } from "../../state/useTheme";

const SiteName = ({ textStyle, heroText, selectedTheme }) => {
  const { theme } = useTheme();
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
          <div className='rainbowshadow'>
            <p>{heroText}</p>
          </div>
        ) : (
          ""
        )}

        {textStyle === `dimension-${selectedTheme}` ? (
          <div className={`dimension-${selectedTheme}`}>
            <p>{heroText}</p>
          </div>
        ) : (
          ""
        )}

        {textStyle === `textinacircle-${selectedTheme}` ? (
          <div className={`textinacircle-${selectedTheme}`}>
            <p>
              {Array.from(heroText).map((char) => (
                <span>{char}</span>
              ))}
            </p>
          </div>
        ) : (
          ""
        )}

        {textStyle === `deconstructed-${selectedTheme}` ? (
          <div className='deconstructed'>
            <p>{heroText}</p>
            <div className={`${selectedTheme}`}>
              <p>{heroText}</p>
            </div>
            <div className={`${selectedTheme}`}>
              <p>{heroText}</p>
            </div>
            <div className={`${selectedTheme}`}>
              <p>{heroText}</p>
            </div>
            <div className={`${selectedTheme}`}>
              <p>{heroText}</p>
            </div>
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
