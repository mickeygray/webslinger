import React, { useReducer } from "react";
import axios from "axios";
import ReviewContext from "./reviewContext";
import reviewReducer from "./reviewReducer";

import {
  GET_REVIEWS,
  REVIEW_ERROR,
  GET_REVIEW,
  SET_CURRENTREVIEW,
  CLEAR_CURRENTREVIEW,
  DELETE_REVIEW,
  POST_REVIEW,
  PUT_REVIEW,
} from "../types";

const ReviewState = (props) => {
  const initialState = {
    current: null,
    reviews: null,
    error: null,
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);

  const getReviews = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/reviews", config);

      dispatch({
        type: GET_REVIEWS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentReview = () => {
    dispatch({ type: CLEAR_CURRENTREVIEW });
  };

  const getReview = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/reviews/${_id}`, config);

      dispatch({
        type: GET_REVIEW,
        payload: res.data,
      });
      setCurrentReview(res.data);
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentReview = (current) => {
    dispatch({
      type: SET_CURRENTREVIEW,
      payload: current,
    });
  };

  const postReview = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/reviews/", formData, config);
      dispatch({
        type: POST_REVIEW,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putReview = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/reviews/${_id}`, formData, config);
      dispatch({
        type: PUT_REVIEW,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteReview = async (_id) => {
    try {
      await axios.delete(`/api/reviews/${_id}`);

      dispatch({
        type: DELETE_REVIEW,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        current: state.current,
        reviews: state.reviews,
        error: state.error,
        getReviews,
        getReview,
        setCurrentReview,
        clearCurrentReview,
        deleteReview,
        postReview,
        putReview,
      }}>
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
