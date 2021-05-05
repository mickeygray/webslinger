import {
 GET_SITES,
 GET_SITE,
 SET_CURRENTSITE,
 CLEAR_CURRENTSITE,
 SET_CURRENTSECTION,
 CLEAR_CURRENTSECTION,
 SITE_ERROR,
 DELETE_SITE,
 SET_CURRENTCONTENT,
 CLEAR_CURRENTCONTENT,
 PUT_SITE,
 POST_SITE,
 SET_CURRENTFONT,
 SET_CELLSTRUCTURE,
 CLEAR_CONTENT,
 SET_CURRENTPALLET,
 GET_VERTICALSSEARCHED,
 GET_FIRMSSEARCHED,
 GET_REVIEWSSEARCHED,
 GET_BLOGSSEARCHED,
 GET_QUIZSSEARCHED,
 GET_ARTICLESSEARCHED,
 GET_COMPONENTS,
 FILTER_CSS,
 CLEAR_FILTER,
 SET_LOADEDCOMPONENTS,
 CLEAR_COMPONENTCONTENT,
 GET_COMPONENT,
 GET_COMPONENTCONTENT,
 ADD_COMPONENT,
 ADD_PAGE,
 GET_FORM,
 GET_FORMS,
 PUT_FORM,
 POST_FORM,
 DELETE_FORM,
 SET_CURRENTFORM,
 SET_CURRENTUSERSTATE,
 GET_USERSTATES,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case GET_COMPONENTCONTENT:
   return {
    ...state,
    componentContent: action.payload,
   };

  case GET_COMPONENT:
   return {
    ...state,
    MyComponent: action.payload,
   };
  case ADD_COMPONENT:
   return {
    ...state,
    pages: action.payload,
   };

  case ADD_PAGE:
   return {
    ...state,
    pages: action.payload,
   };
  case SET_LOADEDCOMPONENTS:
   return {
    ...state,
    pages: Array.from(new Set(action.payload)),
   };

  case CLEAR_COMPONENTCONTENT:
   return {
    ...state,
    componentContent: null,
    MyComponent: null,
   };
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
  case FILTER_CSS:
   return {
    ...state,
    filtered: action.payload,
   };
  case CLEAR_FILTER:
   return {
    ...state,
    filtered: {},
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

  case SET_CURRENTUSERSTATE:
   return {
    ...state,
    currentUserState: action.payload,
   };

  case GET_USERSTATES:
   return {
    ...state,
    userStates: action.payload,
   };
  case SET_CELLSTRUCTURE:
   return {
    ...state,
    cellStructure: action.payload,
   };
  case SET_CURRENTSECTION:
   return {
    ...state,
    currentSection: action.payload,
   };
  case GET_VERTICALSSEARCHED:
   return {
    ...state,
    content: [...state.content, action.payload]
     .flat()
     .filter((v, i, a) => a.indexOf(v) === i),
   };
  case GET_REVIEWSSEARCHED:
   return {
    ...state,
    content: [...state.content, action.payload]
     .flat()
     .filter((v, i, a) => a.indexOf(v) === i),
   };
  case GET_QUIZSSEARCHED:
   return {
    ...state,
    content: [...state.content, action.payload]
     .flat()
     .filter((v, i, a) => a.indexOf(v) === i),
   };
  case GET_FIRMSSEARCHED:
   return {
    ...state,
    content: [...state.content, action.payload]
     .flat()
     .filter((v, i, a) => a.indexOf(v) === i),
   };
  case GET_ARTICLESSEARCHED:
   return {
    ...state,
    content: [...state.content, action.payload]
     .flat()
     .filter((v, i, a) => a.indexOf(v) === i),
   };

  case GET_BLOGSSEARCHED:
   return {
    ...state,
    content: [...state.content, action.payload]
     .flat()
     .filter((v, i, a) => a.indexOf(v) === i),
   };

  case GET_COMPONENTS:
   return {
    ...state,
    myComponents: action.payload,
   };

  case CLEAR_CURRENTSECTION:
   return {
    ...state,
    currentSection: null,
   };
  case CLEAR_CURRENTCONTENT:
   return {
    ...state,
    currentContent: null,
   };

  case SET_CURRENTCONTENT:
   return {
    ...state,
    currentContent: action.payload,
   };
  case CLEAR_CONTENT:
   return {
    ...state,
    content: state.markUp.content.splice(0, state.markUp.content.length),
   };
  case SET_CURRENTFONT:
   return {
    ...state,
    font: action.payload,
   };
  case SET_CURRENTPALLET:
   return {
    ...state,
    pallet: action.payload,
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
  case GET_FORM:
   return {
    ...state,
    form: action.payload,
   };
  case SET_CURRENTFORM:
   return {
    ...state,
    currentForm: action.payload,
   };
  case GET_FORMS:
   return {
    ...state,
    form: action.payload,
   };
  case PUT_FORM:
   return {
    ...state,
    form: action.payload,
   };
  case POST_FORM:
   return {
    ...state,
    form: action.payload,
   };
  case DELETE_FORM:
   return {
    ...state,
    form: state.form.filter((form) => form._id !== action.payload),
    loading: false,
   };
  default:
   return state;
 }
};
