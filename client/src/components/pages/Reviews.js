import React, { useContext } from "react";
import ReviewList from "../reviews/ReviewList";
import ReviewCreator from "../reviews/ReviewCreator";

const Reviews = () => {
  return (
    <div>
      <ReviewCreator />
      <ReviewList />
    </div>
  );
};

export default Reviews;
