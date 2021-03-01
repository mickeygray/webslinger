import {
  GET_QUIZS,
  GET_QUIZ,
  SET_CURRENTQUIZ,
  CLEAR_CURRENTQUIZ,
  QUIZ_ERROR,
  DELETE_QUIZ,
  PUT_QUIZ,
  POST_QUIZ,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_QUIZS:
      return {
        ...state,
        quizs: action.payload,
        loading: false,
      };
    case GET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
        loading: false,
      };
    case POST_QUIZ:
      return {
        ...state,
        quizs: [action.payload, ...state.quizs],
        loading: false,
      };
    case PUT_QUIZ:
      return {
        ...state,
        quizs: state.quizs.map((quiz) =>
          quiz._id === action.payload._id ? action.payload : quiz
        ),
        loading: false,
      };
    case DELETE_QUIZ:
      return {
        ...state,
        quizs: state.quizs.filter((quiz) => quiz._id !== action.payload),
        loading: false,
      };
    case SET_CURRENTQUIZ:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTQUIZ:
      return {
        ...state,
        current: null,
      };
    case QUIZ_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
