import React, { useContext, useEffect } from "react";
import ReviewContext from "../../context/review/reviewContext";
import ReviewItem from "./ReviewItem";
import Spinner from "../layout/Spinner";

const ReviewList = () => {
  const reviewContext = useContext(ReviewContext);
  const { reviews, loading, getReviews } = reviewContext;

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      {reviews !== null && !loading ? (
        reviews.map((review) => <ReviewItem review={review} key={review._id} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ReviewList;
