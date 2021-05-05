import {
 ADD_LEAD,
 ADD_CLICK,
 ADD_IP,
 CREATE_STATE,
 UPDATE_STATE,
 DELETE_STATE,
 ADD_APPCONTENT,
 SET_COMPONENTSTRING,
 WRITE_USERSTATE,
 WRITE_LEAD,
 TOGGLE_QUIZPAGE,
 SET_SUBMISSION,
 BUILD_QUIZ,
 CLEAR_QUIZ,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case TOGGLE_QUIZPAGE:
   return {
    ...state,
    builtQuiz: action.payload,
   };
  case SET_SUBMISSION:
   return {
    ...state,
    builtQuiz: action.payload,
   };
  case BUILD_QUIZ:
   return {
    ...state,
    builtQuiz: action.payload,
   };
  case CLEAR_QUIZ:
   return {
    ...state,
    builtQuiz: null,
   };
  case ADD_LEAD:
   return {
    ...state,
    leads: action.payload,
   };
  case WRITE_LEAD:
   return {
    ...state,
    lead: action.payload,
   };
  case WRITE_USERSTATE:
   return {
    ...state,
    userState: action.payload,
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
