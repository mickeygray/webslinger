import {
  GET_REVIEWS,
  GET_REVIEW,
  SET_CURRENTREVIEW,
  CLEAR_CURRENTREVIEW,
  REVIEW_ERROR,
  DELETE_REVIEW,
  PUT_REVIEW,
  POST_REVIEW,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: action.payload,
        loading: false,
      };
    case POST_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
        loading: false,
      };
    case PUT_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
        loading: false,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENTREVIEW:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTREVIEW:
      return {
        ...state,
        current: null,
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
