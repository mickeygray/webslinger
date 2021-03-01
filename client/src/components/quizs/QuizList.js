import React, { useContext, useEffect } from "react";
import QuizContext from "../../context/quiz/quizContext";
import QuizItem from "./QuizItem";
import Spinner from "../layout/Spinner";

const QuizList = () => {
  const quizContext = useContext(QuizContext);
  const { quizs, loading, getQuizs } = quizContext;

  useEffect(() => {
    getQuizs();
  }, []);

  return (
    <div>
      {quizs !== null && !loading ? (
        quizs.map((quiz) => <QuizItem quiz={quiz} key={quiz._id} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default QuizList;
