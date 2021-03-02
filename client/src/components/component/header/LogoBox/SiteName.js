import React from "react";
import { StyledSiteName } from "./SiteName.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";

const SiteName = ({ textStyle, name, selectedTheme }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledSiteName>
        {textStyle === "halfhalf" ? (
          <div className='text-box halfhalf'>
            <h1>{name}</h1>
            <h1>{name}</h1>
          </div>
        ) : (
          ""
        )}
        {textStyle === "vertical" ? (
          <div className='vertical'>
            <h2 className='rotate'>{name}</h2>
            <h2>{name}</h2>
          </div>
        ) : (
          ""
        )}
        {textStyle === "halfhalf-animated" ? (
          <div className='main'>
            <span>
              <p>{name}</p>
            </span>
          </div>
        ) : (
          ""
        )}

        {textStyle === "rainbowshadow" ? (
          <div className='rainbowshadow'>{name}</div>
        ) : (
          ""
        )}

        {textStyle === `dimension-${selectedTheme}` ? (
          <div className={`dimension-${selectedTheme}`}>{name}</div>
        ) : (
          ""
        )}

        {textStyle === `textinacircle-${selectedTheme}` ? (
          <div className={`textinacircle-${selectedTheme}`}>
            {Array.from(name).map((char) => (
              <span>{char}</span>
            ))}
          </div>
        ) : (
          ""
        )}

        {textStyle === `deconstructed-${selectedTheme}` ? (
          <div className='deconstructed'>
            {name}
            <div className={`${selectedTheme}`}>{name}</div>
            <div className={`${selectedTheme}`}>{name}</div>
            <div className={`${selectedTheme}`}>{name}</div>
            <div className={`${selectedTheme}`}>{name}</div>
          </div>
        ) : (
          ""
        )}

        {textStyle === `threeD` ? (
          <div className={`deconstructed text-${selectedTheme}`}>{name}</div>
        ) : (
          ""
        )}
      </StyledSiteName>
    </ThemeProvider>
  );
};

export default SiteName;
