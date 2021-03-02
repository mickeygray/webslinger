import { ADD_LEAD, ADD_CLICK, ADD_IP, SET_SECTION } from "./types";

export default (state, action) => {
  switch (action.type) {
    case ADD_LEAD:
      return {
        ...state,
        lead: action.payload,
      };
    case ADD_CLICK:
      return {
        ...state,
        click: action.payload,
      };
    case ADD_IP:
      return {
        ...state,
        ip: action.payload,
      };
    case SET_SECTION:
      return {
        ...state,
        section: action.payload,
      };

    default:
      return state;
  }
};
