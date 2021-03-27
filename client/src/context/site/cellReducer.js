import {
 UPDATE_CELL,
 UPDATE_SUBCELL,
 UPDATE_BODYCELL,
 SET_CELLS,
 DELETE_GRID,
 UPDATE_GRID,
 UPDATE_BODYGRID,
 UPDATE_SUBGRID,
 UPDATE_SUBSTRUCTURE,
 UPDATE_BODYSTRUCTURE,
 UPDATE_CELLSTRUCTURE,
} from "../types";

export default (state, action) => {
 switch (action.type) {
  case UPDATE_CELL:
   return {
    ...state,
    cells: action.payload.cells,
   };
  case UPDATE_SUBCELL:
   return {
    ...state,
    subCells: action.payload.subCells,
   };
  case UPDATE_SUBGRID:
   return {
    ...state,
    subGrids: action.payload.subGrids,
   };
  case UPDATE_BODYGRID:
   return {
    ...state,
    bodyGrids: action.payload.bodyGrids,
   };

  case UPDATE_SUBSTRUCTURE:
   return {
    ...state,
    subGrids: action.payload,
   };

  case UPDATE_CELLSTRUCTURE:
   return {
    ...state,
    cells: action.payload,
   };
  case UPDATE_BODYSTRUCTURE:
   return {
    ...state,
    bodyGrids: action.payload,
   };
  case UPDATE_GRID:
   return {
    ...state,
    grid: action.payload.grid,
   };
  case DELETE_GRID:
   return {
    ...state,
    grid: action.payload,
   };
  case UPDATE_BODYCELL:
   return {
    ...state,
    bodyCells: action.payload.bodyCells,
   };
  case SET_CELLS:
   return {
    ...state,
    cellStructure: action.payload.cellStructure,
   };
  default:
   return state;
 }
};
