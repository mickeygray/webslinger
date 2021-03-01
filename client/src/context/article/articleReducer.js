import {
  GET_ARTICLES,
  GET_ARTICLE,
  SET_CURRENTARTICLE,
  CLEAR_CURRENTARTICLE,
  ARTICLE_ERROR,
  DELETE_ARTICLE,
  PUT_ARTICLE,
  POST_ARTICLE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false,
      };
    case POST_ARTICLE:
      return {
        ...state,
        articles: [action.payload, ...state.articles],
        loading: false,
      };
    case PUT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === action.payload._id ? action.payload : article
        ),
        loading: false,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENTARTICLE:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTARTICLE:
      return {
        ...state,
        current: null,
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
