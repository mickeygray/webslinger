import {
  GET_SITES,
  GET_SITE,
  SET_CURRENTSITE,
  CLEAR_CURRENTSITE,
  SITE_ERROR,
  DELETE_SITE,
  PUT_SITE,
  POST_SITE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_SITES:
      return {
        ...state,
        sites: action.payload,
        loading: false,
      };
    case GET_SITE:
      return {
        ...state,
        site: action.payload,
        loading: false,
      };
    case POST_SITE:
      return {
        ...state,
        sites: [action.payload, ...state.sites],
        loading: false,
      };
    case PUT_SITE:
      return {
        ...state,
        sites: state.sites.map((site) =>
          site._id === action.payload._id ? action.payload : site
        ),
        loading: false,
      };
    case DELETE_SITE:
      return {
        ...state,
        sites: state.sites.filter((site) => site._id !== action.payload),
        loading: false,
      };
    case SET_CURRENTSITE:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTSITE:
      return {
        ...state,
        current: null,
      };
    case SITE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
