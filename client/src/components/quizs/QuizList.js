import React, { useContext, useEffect } from "react";
import QuizContext from "../../context/quiz/quizContext";
import QuizItem from "./QuizItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const QuizList = () => {
  const quizContext = useContext(QuizContext);
  const { quizs, loading, getQuizs } = quizContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  useEffect(() => {
    if (user) {
      getQuizs(_id);
    }
  }, [user, authContext]);

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
