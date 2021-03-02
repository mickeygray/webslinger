import React from "react";
import { StyledQuizBackdrop } from "./QuizBackdrop.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { theme } from "../../../state/theme";

const QuizBackdrop = ({ section, quizStyle }) => {
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
