import React, { useContext } from "react";
import QuizList from "../quizs/QuizList";
import QuizCreator from "../quizs/QuizCreator";

const Quizzes = () => {
  return (
    <div>
      <QuizCreator />
      <QuizList />
    </div>
  );
};

export default Quizzes;
