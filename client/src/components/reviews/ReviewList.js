import React, { useContext, useEffect } from "react";
import ReviewContext from "../../context/review/reviewContext";
import ReviewItem from "./ReviewItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const ReviewList = () => {
  const reviewContext = useContext(ReviewContext);
  const { reviews, loading, getReviews } = reviewContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  useEffect(() => {
    if (user) {
      getReviews(_id);
    }
  }, [user, authContext]);

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
