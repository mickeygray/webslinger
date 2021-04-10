import {
 UPDATE_CELL,
 UPDATE_AREA,
 UPDATE_PAGE,
 SET_LOADEDCOMPONENTS,
 CLEAR_COMPONENTCONTENT,
 UPDATE_AREASTRUCTURE,
 UPDATE_PAGESTRUCTURE,
 UPDATE_CELLSTRUCTURE,
 UPDATE_PAGEGRID,
 UPDATE_AREAGRID,
 GET_COMPONENT,
 GET_COMPONENTCONTENT,
 ADD_COMPONENT,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case UPDATE_CELL:
   return {
    ...state,
    pages: action.payload.pages,
   };
  case UPDATE_AREA:
   return {
    ...state,
    pages: action.payload.pages,
   };
  case UPDATE_PAGE:
   return {
    ...state,
    pages: action.payload.pages,
   };
  case UPDATE_AREASTRUCTURE:
   return {
    ...state,
    pages: action.payload,
   };

  case UPDATE_PAGESTRUCTURE:
   return {
    ...state,
    pages: action.payload,
   };
  case GET_COMPONENTCONTENT:
   return {
    ...state,
    componentContent: action.payload,
   };

  case UPDATE_AREAGRID:
   return {
    ...state,
    areas: action.payload.areas,
   };

  case UPDATE_PAGEGRID:
   return {
    ...state,
    subGrids: action.payload,
   };

  case UPDATE_CELLSTRUCTURE:
   return {
    ...state,
    cells: action.payload,
   };

  case GET_COMPONENT:
   return {
    ...state,
    MyComponent: action.payload,
   };
  case ADD_COMPONENT:
   return {
    ...state,
    LoadedComponents: [...state.LoadedComponents, action.payload],
   };
  case SET_LOADEDCOMPONENTS:
   return {
    ...state,
    LoadedComponents: action.payload,
   };

  case CLEAR_COMPONENTCONTENT:
   return {
    ...state,
    componentContent: null,
    MyComponent: null,
   };
  default:
   return state;
 }
};
