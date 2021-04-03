import React from "react";
import styled from "styled-components";
import { StyledVerticalNavlink } from "./VerticalNavlinks.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../../context/site/hooks/globals";
import { useTheme } from "../../../../context/site/hooks/useTheme";

const VerticalNavlinks = () => {
 const { theme } = useTheme();

 return (
  <ThemeProvider theme={theme}>
   <GlobalStyles />
   <StyledVerticalNavlink>
    <div>
     <ul>
      <li>
       <span>home</span>
      </li>
      <li>
       <span>products</span>
      </li>
      <li>
       <span>services</span>
      </li>
      <li>
       <span>contact</span>
      </li>
     </ul>
    </div>
   </StyledVerticalNavlink>
  </ThemeProvider>
 );
};

export default VerticalNavlinks;
