import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useTheme } from "../../context/site/hooks/useTheme";

export default (props) => {
 const { themes, setColors } = useTheme();

 /*
  const themeSwitcher = (selectedTheme) => {
    console.log(selectedTheme);
    setMode(selectedTheme);
    props.setter(selectedTheme);
  };

  useEffect(() => {
    props.newTheme && updateThemeCard(props.newTheme);
  }, [props.newTheme]);

  const updateThemeCard = (theme) => {
    const key = _.keys(theme)[0];
    const updated = { ...data, [key]: theme[key] };
    setData(updated);
  };


       <ThemedButton onClick={(theme) => themeSwitcher(props.theme)}>
          {props.theme.name}
        </ThemedButton>
  */

 const [theme, setTheme] = useState(null);

 return (
  <div style={{ margin: "0px !important" }}>
   <h3 style={{ margin: "0px !important" }} className='text-primary'>
    Select a color pallet
   </h3>
   <div style={{ margin: "0px !important" }}>
    <div className='text-center' style={{ margin: "0px" }}>
     <select
      name='theme'
      onChange={(e) => {
       setTheme(themes.filter((theme) => theme.name === e.target.value)[0]);
       setColors(themes.filter((theme) => theme.name === e.target.value)[0]);
      }}
      id=''>
      <option></option>
      {themes.length > 0 &&
       themes.map((theme, i) => (
        <option value={theme.name}>{theme.name}</option>
       ))}
     </select>
    </div>
    <div style={{ margin: "0px", width: "300px" }}>
     <ul>
      {" "}
      {theme && (
       <li>
        <span>
         <span
          style={{
           display: "inline-block",
           height: "20px",
           width: "51px",
           fontSize: ".8rem",
          }}>
          Primary:
         </span>
         <span
          style={{
           display: "inline-block",
           backgroundColor: theme.primary,
           height: "20px",
           width: "20px",
          }}></span>
        </span>
       </li>
      )}
      {theme && (
       <li>
        <span>
         <span
          style={{
           display: "inline-block",
           height: "20px",
           width: "51px",
           fontSize: ".8rem",
          }}>
          Light:
         </span>
         <span
          style={{
           display: "inline-block",
           backgroundColor: theme.light,
           height: "20px",
           width: "20px",
          }}></span>
        </span>
       </li>
      )}
      {theme && (
       <li>
        <span>
         <span
          style={{
           display: "inline-block",
           height: "20px",
           width: "51px",
           fontSize: ".8rem",
          }}>
          Dark:
         </span>
         <span
          style={{
           display: "inline-block",
           backgroundColor: theme.dark,
           height: "20px",
           width: "20px",
          }}></span>
        </span>
       </li>
      )}
      {theme && (
       <li>
        <span>
         <span
          style={{
           display: "inline-block",
           height: "20px",
           width: "51px",
           fontSize: ".8rem",
          }}>
          Success:
         </span>
         <span
          style={{
           display: "inline-block",
           backgroundColor: theme.success,
           height: "20px",
           width: "20px",
          }}></span>
        </span>
       </li>
      )}
      {theme && (
       <li>
        <span>
         <span
          style={{
           display: "inline-block",
           height: "20px",
           width: "51px",
           fontSize: ".8rem",
          }}>
          Danger:
         </span>
         <span
          style={{
           display: "inline-block",
           backgroundColor: theme.danger,
           height: "20px",
           width: "20px",
          }}></span>
        </span>
       </li>
      )}
     </ul>
    </div>
   </div>
  </div>
 );
};
