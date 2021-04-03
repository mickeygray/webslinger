import {
 ADD_LEAD,
 ADD_CLICK,
 ADD_IP,
 CREATE_STATE,
 UPDATE_STATE,
 DELETE_STATE,
 ADD_APPCONTENT,
 SET_COMPONENTSTRING,
} from "../types";

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
  case ADD_APPCONTENT:
   return {
    ...state,
    content: [...state.content, action.payload],
   };
  case SET_COMPONENTSTRING:
   return {
    ...state,
    NewComponent: action.payload,
   };
  case CREATE_STATE:
   return {
    ...state,
    userState: action.payload,
   };
  case UPDATE_STATE:
   return {
    ...state,
    userState: action.payload,
   };
  case DELETE_STATE:
   return {
    ...state,
    userState: action.payload,
   };

  default:
   return state;
 }
};
