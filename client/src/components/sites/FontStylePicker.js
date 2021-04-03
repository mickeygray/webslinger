import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useTheme } from "../../context/site/hooks/useTheme";

export default (props) => {
 const { themes, setFontType } = useTheme();

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
  <div>
   <h3 className='text-primary'>Select a font style</h3>
   <div>
    <div className='text-center'>
     <select
      name='theme'
      onChange={(e) => {
       setTheme(themes.filter((theme) => theme.font === e.target.value)[0]);
       setFontType(themes.filter((theme) => theme.font === e.target.value)[0]);
      }}
      id=''>
      <option></option>
      {themes.length > 0 &&
       themes.map((theme, i) => (
        <option value={theme.font}>{theme.font}</option>
       ))}
     </select>
    </div>
    <div>
     {theme && (
      <div style={{ fontFamily: theme.font }}>
       The Quick Brown Fox Jumped Over The Lazy Dog.
      </div>
     )}
    </div>
   </div>
  </div>
 );
};
