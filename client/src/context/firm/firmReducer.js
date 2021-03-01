import {
  GET_FIRMS,
  GET_FIRM,
  SET_CURRENTFIRM,
  CLEAR_CURRENTFIRM,
  FIRM_ERROR,
  DELETE_FIRM,
  PUT_FIRM,
  POST_FIRM,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_FIRMS:
      return {
        ...state,
        firms: action.payload,
        loading: false,
      };
    case GET_FIRM:
      return {
        ...state,
        firm: action.payload,
        loading: false,
      };
    case POST_FIRM:
      return {
        ...state,
        firms: [action.payload, ...state.firms],
        loading: false,
      };
    case PUT_FIRM:
      return {
        ...state,
        firms: state.firms.map((firm) =>
          firm._id === action.payload._id ? action.payload : firm
        ),
        loading: false,
      };
    case DELETE_FIRM:
      return {
        ...state,
        firms: state.firms.filter((firm) => firm._id !== action.payload),
        loading: false,
      };
    case SET_CURRENTFIRM:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTFIRM:
      return {
        ...state,
        current: null,
      };
    case FIRM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
