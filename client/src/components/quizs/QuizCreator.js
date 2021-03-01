import React, { Fragment, useContext, useState, useCallback } from "react";
import QuizForm from "./QuizForm";
import QuizContext from "../../context/quiz/quizContext";
const QuizCreator = () => {
  const [newQuiz, setNewQuiz] = useState(false);
  const quizContext = useContext(QuizContext);
  const { clearCurrentQuiz, current } = quizContext;

  const setForm = useCallback(() => {
    setNewQuiz((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      <div
        className={current !== null ? "grid-2 bg-light card" : "bg-light card"}>
        <button
          onClick={
            current !== null
              ? () => {
                  clearCurrentQuiz();
                  setNewQuiz((prevState) => !prevState);
                }
              : () => setNewQuiz((prevState) => !prevState)
          }
          className='btn btn-block btn-primary'>
          {newQuiz === false ? "Create New Quiz" : "Clear New Quiz"}
        </button>
        {current !== null ? (
          <button
            onClick={() => clearCurrentQuiz()}
            className='btn btn-block btn-primary'>
            Clear Loaded Quiz
          </button>
        ) : (
          ""
        )}
      </div>
      <div>{newQuiz === true ? <QuizForm setForm={setForm} /> : ""}</div>
    </Fragment>
  );
};

export default QuizCreator;
