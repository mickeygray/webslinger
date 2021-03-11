import React, { useState, useEffect } from "react";
import { StyledSiteName } from "./SiteName.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../state/globals";
import { useTheme } from "../../state/useTheme";
import { uniq } from "lodash";

const SiteName = ({ p, h, pallet, compStyle }) => {
  const { themes } = useTheme();

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [colorPack, setColorPack] = useState(null);
  const [theme, setTheme] = useState({
    primary: "",
    dark: "",
    light: "",
    danger: "",
    text: "",
    success: "",
    mobile: "576px",
  });
  useEffect(() => {
    if (selectedTheme != null) {
      setTheme({
        ...colorPack,
        primary: "",
        dark: "",
        light: "",
        danger: "",
        success: "",
        mobile: "",
      });

      const themeKeys = uniq(Object.keys(theme));

      const reducedTheme = themeKeys
        .map((k) => {
          let obj = {
            ...colorPack,
            mobile: "576px",
          };
          return obj;
        })
        .filter((theme) => Object.keys(theme).includes(selectedTheme));

      setTheme(reducedTheme[0]);
    } else {
      setTheme({
        primary: "",
        dark: "",
        light: "",
        danger: "",
        success: "",
        text: "",
        mobile: "",
      });
    }
  }, [selectedTheme]);

  useEffect(() => {
    if (h.length > 0) {
      h.map(({ color, text }) => {
        if (color.includes("#")) {
          const themeName = themes
            .filter((theme) => Object.values(theme).includes(color))
            .map((theme) => {
              const key = Object.keys(theme)
                .filter((key) => theme[key] === color)
                .toString();
              return key;
            });

          setSelectedTheme(themeName[0]);

          const obj = {
            [selectedTheme]: color,
            text: text,
          };

          setColorPack(obj);
        }
      });
    }
  }, [h, p]);

  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledSiteName>
        {compStyle === "halfhalf" ? (
          <div className='text-box halfhalf'>
            <h1>
              {
                h.filter(
                  (h) =>
                    h.componentName === "Site Name" &&
                    h.compStyle === "halfhalf"
                )[0].text
              }
            </h1>
            <p>
              {
                p.filter(
                  (h) =>
                    h.componentName === "Site Name" &&
                    h.compStyle === "halfhalf"
                )[0].text
              }
            </p>
          </div>
        ) : (
          ""
        )}
        {compStyle === "vertical" ? (
          <div className='vertical'>
            <h2 className='rotate'>
              {
                h.filter(
                  (h) =>
                    h.componentName === "Site Name" &&
                    h.compStyle === "vertical"
                )[0].text
              }
            </h2>
            <h2>
              {" "}
              {
                h.filter(
                  (h) =>
                    h.componentName === "Site Name" &&
                    h.compStyle === "vertical"
                )[1].text
              }
            </h2>
          </div>
        ) : (
          ""
        )}
        {compStyle === "halfhalf-animated" ? (
          <div className='main'>
            <span>
              <p>
                {" "}
                {
                  p.filter(
                    (h) =>
                      h.componentName === "Site Name" &&
                      h.compStyle === "halfhalf-animated"
                  )[0].text
                }
              </p>
            </span>
          </div>
        ) : (
          ""
        )}

        {compStyle === "rainbowshadow" ? (
          <div className='rainbowshadow'>
            <p>
              {" "}
              {
                p.filter(
                  (h) =>
                    h.componentName === "Site Name" &&
                    h.compStyle === "rainbowshadow"
                )[0].text
              }
            </p>
          </div>
        ) : (
          ""
        )}

        {selectedTheme && compStyle === `dimension-${selectedTheme}` ? (
          <div className={`dimension-${selectedTheme}`}>
            <p>
              {" "}
              {
                p.filter(
                  (h) =>
                    h.componentName === "Site Name" &&
                    h.compStyle === `dimension-${selectedTheme}`
                )[0].text
              }
            </p>
          </div>
        ) : (
          ""
        )}

        {selectedTheme && compStyle === `textinacircle-${selectedTheme}` ? (
          <div className={`textinacircle-${selectedTheme}`}>
            {Array.from(
              p.filter(
                (h) =>
                  h.componentName === "Site Name" &&
                  h.compStyle === `textinacircle-${selectedTheme}`
              )[0].text
            ).map((char) => (
              <span>{char}</span>
            ))}
          </div>
        ) : (
          ""
        )}

        {selectedTheme && compStyle === `deconstructed-${selectedTheme}` ? (
          <div className='deconstructed'>
            <p>
              {" "}
              {
                p.filter(
                  (h) =>
                    h.componentName === "Site Name" &&
                    h.compStyle === `deconstructed-${selectedTheme}`
                )[0].text
              }
            </p>
            <div className={`${selectedTheme}`}>
              <p>
                {" "}
                {
                  p.filter(
                    (h) =>
                      h.componentName === "Site Name" &&
                      h.compStyle === `deconstructed-${selectedTheme}`
                  )[1].text
                }
              </p>
            </div>
            <div className={`${selectedTheme}`}>
              <p>
                {" "}
                {
                  p.filter(
                    (h) =>
                      h.componentName === "Site Name" &&
                      h.compStyle === `deconstructed-${selectedTheme}`
                  )[2].text
                }
              </p>
            </div>
            <div className={`${selectedTheme}`}>
              <p>
                {" "}
                {
                  p.filter(
                    (h) =>
                      h.componentName === "Site Name" &&
                      h.compStyle === `deconstructed-${selectedTheme}`
                  )[3].text
                }
              </p>
            </div>
            <div className={`${selectedTheme}`}>
              <p>
                {" "}
                {
                  p.filter(
                    (h) =>
                      h.componentName === "Site Name" &&
                      h.compStyle === `deconstructed-${selectedTheme}`
                  )[0].text
                }
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {selectedTheme && compStyle === `threeD` ? (
          <div className='threeD'>
            <p>
              {" "}
              {
                p.filter(
                  (h) =>
                    h.componentName === "Site Name" && h.compStyle === "threeD"
                )[0].text
              }
            </p>
          </div>
        ) : (
          ""
        )}
      </StyledSiteName>
    </ThemeProvider>
  );
};

export default SiteName;
