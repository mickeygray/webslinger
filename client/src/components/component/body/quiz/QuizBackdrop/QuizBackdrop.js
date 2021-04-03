import React from "react";
import { StyledQuizBackdrop } from "./QuizBackdrop.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../../../context/site/hooks/globals";

import { useTheme } from "../../../../../context/site/hooks/useTheme";

const QuizBackdrop = ({ section, quizStyle }) => {
 const { theme } = useTheme();
 return (
  <ThemeProvider theme={theme}>
   <GlobalStyles />
   <StyledQuizBackdrop>
    {quizStyle === "curlreveal" ? (
     <div class='curl-reveal'>
      <img src={section.img} alt='' />

      <div>
       <i className='ion-ios-arrow-thin-right'></i>
       <div className='curl'></div>
       <a href='#'></a>
      </div>
     </div>
    ) : (
     ""
    )}
   </StyledQuizBackdrop>
  </ThemeProvider>
 );
};

export default QuizBackdrop;
