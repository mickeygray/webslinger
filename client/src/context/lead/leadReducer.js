import {
  GET_LEADS,
  GET_LEAD,
  SET_CURRENTLEAD,
  CLEAR_CURRENTLEAD,
  LEAD_ERROR,
  DELETE_LEAD,
  PUT_LEAD,
  POST_LEAD,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
        loading: false,
      };
    case GET_LEAD:
      return {
        ...state,
        lead: action.payload,
        loading: false,
      };
    case POST_LEAD:
      return {
        ...state,
        leads: [action.payload, ...state.leads],
        loading: false,
      };
    case PUT_LEAD:
      return {
        ...state,
        leads: state.leads.map((lead) =>
          lead._id === action.payload._id ? action.payload : lead
        ),
        loading: false,
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead._id !== action.payload),
        loading: false,
      };
    case SET_CURRENTLEAD:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTLEAD:
      return {
        ...state,
        current: null,
      };
    case LEAD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
