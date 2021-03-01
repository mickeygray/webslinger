import React, { Fragment, useContext } from "react";
import QuizContext from "../../context/quiz/quizContext";
import Spinner from "../layout/Spinner";
import QuizForm from "./QuizForm";

const QuizItem = ({ quiz }) => {
  const { title, date, vertical, _id } = quiz;
  const { getQuiz, clearCurrentQuiz, deleteQuiz, current } = useContext(
    QuizContext
  );
  return (
    <Fragment>
      {current && current._id === quiz._id ? (
        <QuizForm setForm={clearCurrentQuiz} />
      ) : (
        <div className='grid-2 bg-secondary card m-2 lead'>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-dark'
              onClick={current ? () => clearCurrentQuiz() : () => getQuiz(_id)}>
              {current ? `Clear ${title} update` : `Edit ${title}`}
            </button>
          </div>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteQuiz(_id)}>
              Delete {title}
            </button>
          </div>
          <div>
            A{" "}
            {vertical.slice(0, 1).toUpperCase() +
              vertical.slice(1, vertical.length)}{" "}
            Quiz From {date}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default QuizItem;
