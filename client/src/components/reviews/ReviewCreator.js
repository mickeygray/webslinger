import React, { Fragment, useContext, useState, useCallback } from "react";
import ReviewForm from "./ReviewForm";
import ReviewContext from "../../context/review/reviewContext";
import { set } from "mongoose";
const ReviewCreator = () => {
  const [newReview, setNewReview] = useState(false);
  const reviewContext = useContext(ReviewContext);
  const { clearCurrentReview, current } = reviewContext;
  const setForm = useCallback(() => {
    setNewReview((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      <div
        className={current !== null ? "grid-2 bg-light card" : "bg-light card"}>
        <button
          onClick={
            current !== null
              ? () => {
                  clearCurrentReview();
                  setNewReview((prevState) => !prevState);
                }
              : () => setNewReview((prevState) => !prevState)
          }
          className='btn btn-block btn-primary'>
          {newReview === false ? "Create New Review" : "Clear New Review"}
        </button>
        {current !== null ? (
          <button
            onClick={() => clearCurrentReview()}
            className='btn btn-block btn-primary'>
            Clear Loaded Review
          </button>
        ) : (
          ""
        )}
      </div>
      <div>{newReview === true ? <ReviewForm setForm={setForm} /> : ""}</div>
    </Fragment>
  );
};

export default ReviewCreator;
