import {
  GET_VERTICALS,
  GET_VERTICAL,
  SET_CURRENTVERTICAL,
  CLEAR_CURRENTVERTICAL,
  VERTICAL_ERROR,
  DELETE_VERTICAL,
  PUT_VERTICAL,
  POST_VERTICAL,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_VERTICALS:
      return {
        ...state,
        verticals: action.payload,
        loading: false,
      };
    case GET_VERTICAL:
      return {
        ...state,
        vertical: action.payload,
        loading: false,
      };
    case POST_VERTICAL:
      return {
        ...state,
        verticals: [action.payload, ...state.verticals],
        loading: false,
      };
    case PUT_VERTICAL:
      return {
        ...state,
        verticals: state.verticals.map((vertical) =>
          vertical._id === action.payload._id ? action.payload : vertical
        ),
        loading: false,
      };
    case DELETE_VERTICAL:
      return {
        ...state,
        verticals: state.verticals.filter(
          (vertical) => vertical._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENTVERTICAL:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTVERTICAL:
      return {
        ...state,
        current: null,
      };
    case VERTICAL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
