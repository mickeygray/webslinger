import {
 GET_MYARTICLES,
 GET_MYBLOGS,
 GET_MYREVIEWS,
 GET_MYQUIZS,
 GET_MYVERTICALS,
 GET_MYFIRMS,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case GET_MYARTICLES:
   return {
    ...state,
    articles: action.payload,
   };
  case GET_MYBLOGS:
   return {
    ...state,
    blogs: action.payload,
   };
  case GET_MYREVIEWS:
   return {
    ...state,
    reviews: action.payload,
   };
  case GET_MYQUIZS:
   return {
    ...state,
    quizs: action.payload,
   };

  case GET_MYVERTICALS:
   return {
    ...state,
    verticals: action.payload,
   };
  case GET_MYFIRMS:
   return {
    ...state,
    firms: action.payload,
   };
  default:
   return state;
 }
};
