import {
  GET_BLOGS,
  GET_BLOG,
  SET_CURRENTBLOG,
  CLEAR_CURRENTBLOG,
  BLOG_ERROR,
  DELETE_BLOG,
  PUT_BLOG,
  POST_BLOG,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case GET_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false,
      };
    case POST_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading: false,
      };
    case PUT_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        loading: false,
      };
    case SET_CURRENTBLOG:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTBLOG:
      return {
        ...state,
        current: null,
      };
    case BLOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
