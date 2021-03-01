import React, { Fragment, useContext } from "react";
import ReviewContext from "../../context/review/reviewContext";
import Spinner from "../layout/Spinner";
import ReviewForm from "./ReviewForm";

const ReviewItem = ({ review }) => {
  const { reviewName, date, vertical, _id } = review;
  const { getReview, clearCurrentReview, deleteReview, current } = useContext(
    ReviewContext
  );
  return (
    <Fragment>
      {current && current._id === review._id ? (
        <ReviewForm setForm={clearCurrentReview} />
      ) : (
        <div className='grid-2 bg-secondary card m-2 lead'>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-dark'
              onClick={
                current ? () => clearCurrentReview() : () => getReview(_id)
              }>
              {current ? `Clear ${reviewName} update` : `Edit ${reviewName}`}
            </button>
          </div>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteReview(_id)}>
              Delete {reviewName}
            </button>
          </div>
          <div>
            A{" "}
            {vertical.slice(0, 1).toUpperCase() +
              vertical.slice(1, vertical.length)}{" "}
            Review From {date}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ReviewItem;
