import React, { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import SiteContext from "./siteContext";
import siteReducer from "./siteReducer";
import cellReducer from "./cellReducer";
import produce from "immer";
import { set } from "lodash";
import { v4 as uuidV4 } from "uuid";

import {
 GET_SITES,
 SITE_ERROR,
 GET_SITE,
 SET_CURRENTSITE,
 CLEAR_CURRENTSITE,
 SET_CURRENTPAGE,
 CLEAR_CURRENTPAGE,
 SET_CURRENTCOMPONENT,
 CLEAR_CURRENTCOMPONENT,
 CLEAR_CURRENTCONTENT,
 DELETE_SITE,
 DELETE_AREA,
 POST_SITE,
 PUT_SITE,
 DELETE_PAGE,
 POST_PAGES,
 PUT_PAGES,
 GET_PAGES,
 GET_PAGE,
 PUT_COMPONENT,
 POST_COMPONENT,
 DELETE_COMPONENT,
 GET_COMPONENT,
 GET_COMPONENTS,
 GET_REVIEWSSEARCHED,
 GET_VERTICALSSEARCHED,
 GET_FIRMSSEARCHED,
 GET_BLOGSSEARCHED,
 GET_QUIZSSEARCHED,
 CLEAR_SITELAYOUT,
 GET_ARTICLESSEARCHED,
 SET_CURRENTFONT,
 SET_CURRENTPALLET,
 SET_CURRENTCONTENT,
 SET_CONTENT,
 CLEAR_CONTENT,
 SET_CELLS,
 UPDATE_BODYCELL,
 UPDATE_GRID,
 UPDATE_CELL,
 UPDATE_SUBCELL,
 UPDATE_SUBGRID,
 UPDATE_BODYGRID,
 UPDATE_SUBSTRUCTURE,
 UPDATE_BODYSTRUCTURE,
 DELETE_GRID,
} from "../types";

const SiteState = (props) => {
 const initialState = {
  markUp: {
   error: null,
   layout: null,
   currentContent: null,
   currentPage: null,
   currentSite: null,
   currentComponent: null,
   font: null,
   pallet: null,
   content: [],
   cellStructure: null,
   myComponents: null,
   pages: null,
   sites: null,
  },
  body: {
   grid: {
    key: uuidV4(),
    rows: [],
    columns: [],
    rowString: "",
    columnString: "",
    direction: "row",
    verticalAlignment: "start",
    horizontalAlignment: "start",
   },
   subGrids: [],
   bodyGrids: [],
   cells: [],
   subCells: [],
   bodyCells: [],
   cellStructure: [],
  },
 };

 function combineReducers(reducers) {
  return (state = {}, action) => {
   const newState = {};
   for (let key in reducers) {
    newState[key] = reducers[key](state[key], action);
   }
   return newState;
  };
 }

 const innerGrid = {
  parent: "",
  key: uuidV4(),
  rows: [],
  columns: [],
  rowString: "",
  columnString: "",
  direction: "row",
  verticalAlign: "start",
  horizontalAlign: "start",
 };
 const cellDimm = {
  id: "",
  size: "",
  unit: "",
 };
 const cell = {
  top: 0,
  id: "",
  name: "",
  subCells: [],
  viewToggle: "close",
  viewState: false,
  height: 0,
  left: 0,
  width: 0,
  background: "",
  position: "",
  code: "",
  content: [],
 };
 const subCell = {
  height: 0,
  left: 0,
  background: "",
  position: "",
  width: 0,
  top: 0,
  bodyCells: [],
  id: "",
  code: "",
  content: [],
  name: "",
  viewToggle: "close",
  subViewState: false,
 };
 const bodyCell = {
  height: 0,
  left: 0,
  width: 0,
  background: "",
  position: "",
  code: "",
  content: [],
  top: 0,
  id: "",
  grandParent: "",
  name: "",
  viewToggle: "close",
  bodyViewState: false,
 };
 const [state, dispatch] = useReducer(
  combineReducers({
   body: cellReducer,
   markUp: siteReducer,
  }),
  initialState
 );

 const {
  cells,
  subCells,
  bodyCells,
  grid,
  subGrids,
  bodyGrids,
  cellStructure,
 } = state.body;

 console.log(subCells);
 const addColumn = () => {
  const columns = grid.columns;
  const newResults = [...columns, { ...cellDimm, id: uuidV4() }];

  const newGrid = { ...grid, columns: newResults };
  const nextGridState = produce(state, (draft) => {
   draft.grid = newGrid;
  });
  dispatch({ type: UPDATE_GRID, payload: nextGridState });
 };

 const addRow = () => {
  const rows = grid.rows;
  const newResults = [...rows, { ...cellDimm, id: uuidV4() }];

  const newGrid = { ...grid, rows: newResults };
  const nextGridState = produce(state, (draft) => {
   draft.grid = newGrid;
  });
  dispatch({ type: UPDATE_GRID, payload: nextGridState });
 };

 const addSubGrid = (parent) => {
  const newResults = [
   ...state.body.subGrids,
   { ...innerGrid, parent: parent, key: uuidV4() },
  ];
  const nextSubGridState = produce(state, (draft) => {
   draft.subGrids = newResults;
  });
  dispatch({ type: UPDATE_SUBGRID, payload: nextSubGridState });
  setCells();
 };

 const addBodyGrid = (parent) => {
  const newResults = [
   ...state.body.bodyGrids,
   { ...innerGrid, parent: parent, key: uuidV4() },
  ];
  const nextBodyGridState = produce(state, (draft) => {
   draft.bodyGrids = newResults;
  });
  dispatch({ type: UPDATE_BODYGRID, payload: nextBodyGridState });
  setCells();
 };
 const addSubColumn = (id) => {
  const i = subGrids.findIndex((x) => x.parent === id);
  const pushColumns = produce(subGrids, (draft) => {
   draft[i]["columns"].push({ ...cellDimm, id: uuidV4() });
  });

  dispatch({ type: UPDATE_SUBSTRUCTURE, payload: pushColumns });
  setCells();
 };

 const updateSubColumn = (e, id, i) => {
  const { name, value } = e.currentTarget;
  const index = subGrids.findIndex((x) => x.parent === id);

  const pushColumns = produce(subGrids, (draft) => {
   draft[index]["columns"][i] = {
    ...draft[index]["columns"][i],
    [name]: value,
   };
   const sizeStrings = draft[index]["columns"].map(({ size, unit }) => {
    const sizeString = size + unit;
    return sizeString;
   });

   const gridRow = sizeStrings.toString().replaceAll(",", " ");
   draft[index] = {
    ...draft[index],
    ["columnString"]: gridRow,
   };
  });
  dispatch({ type: UPDATE_SUBSTRUCTURE, payload: pushColumns });

  setCells();
 };

 const updateSubRow = (e, id, i) => {
  const { name, value } = e.currentTarget;
  const index = subGrids.findIndex((x) => x.parent === id);
  const pushColumns = produce(subGrids, (draft) => {
   draft[index]["rows"][i] = {
    ...draft[index]["rows"][i],
    [name]: value,
   };
  });
  dispatch({ type: UPDATE_SUBSTRUCTURE, payload: pushColumns });
  setCells();
 };

 const addSubRow = (id) => {
  const i = subGrids.findIndex((x) => x.parent === id);
  const pushRows = produce(subGrids, (draft) => {
   draft[i]["rows"].push({ ...cellDimm, id: uuidV4() });
  });

  dispatch({ type: UPDATE_SUBSTRUCTURE, payload: pushRows });
  setCells();
 };

 const addBodyColumn = (id) => {
  const i = bodyGrids.findIndex((x) => x.parent === id);
  const pushColumns = produce(bodyGrids, (draft) => {
   draft[i]["columns"].push({ ...cellDimm, id: uuidV4() });
  });

  dispatch({ type: UPDATE_BODYSTRUCTURE, payload: pushColumns });
  setCells();
 };

 const addBodyRow = (id) => {
  const i = bodyGrids.findIndex((x) => x.parent === id);
  const pushRows = produce(bodyGrids, (draft) => {
   draft[i]["rows"].push({ ...cellDimm, id: uuidV4() });
  });

  dispatch({ type: UPDATE_BODYSTRUCTURE, payload: pushRows });
  setCells();
 };

 const deleteColumn = (i) => {
  const pushColumns = produce(grid, (draft) => {
   draft["columns"].splice(i, 1);
  });
  dispatch({ type: DELETE_GRID, payload: pushColumns });
  setCells();
 };

 const deleteRow = (i) => {
  const pushColumns = produce(grid, (draft) => {
   draft["rows"].splice(i, 1);
  });
  dispatch({ type: DELETE_GRID, payload: pushColumns });
  setCells();
 };

 const deleteBodyRow = (id, index) => {
  const pushColumns = produce(bodyGrids, (draft) => {
   draft[draft.findIndex((x) => x.parent === id)]["rows"].splice(index, 1);
  });
  dispatch({ type: UPDATE_BODYSTRUCTURE, payload: pushColumns });
 };
 const deleteBodyColumn = (id, index) => {
  const pushColumns = produce(bodyGrids, (draft) => {
   draft[draft.findIndex((x) => x.parent === id)]["columns"].splice(index, 1);
  });
  dispatch({ type: UPDATE_BODYSTRUCTURE, payload: pushColumns });
 };
 const deleteSubRow = (id, index) => {
  const pushColumns = produce(subGrids, (draft) => {
   draft[draft.findIndex((x) => x.parent === id)]["rows"].splice(index, 1);
  });
  dispatch({ type: UPDATE_SUBSTRUCTURE, payload: pushColumns });
 };
 const deleteSubColumn = (id, index) => {
  const pushColumns = produce(subGrids, (draft) => {
   draft[draft.findIndex((x) => x.parent === id)]["columns"].splice(index, 1);
  });
  dispatch({ type: UPDATE_SUBSTRUCTURE, payload: pushColumns });
 };

 const updateBodyColumn = (e, id, i) => {
  const { name, value } = e.currentTarget;
  const index = bodyGrids.findIndex((x) => x.parent === id);
  const pushColumns = produce(bodyGrids, (draft) => {
   draft[index]["columns"][i] = {
    ...draft[index]["columns"][i],
    [name]: value,
   };
  });
  dispatch({ type: UPDATE_BODYSTRUCTURE, payload: pushColumns });
  setCells();
 };

 const updateBodyRow = (e, id, i) => {
  const { name, value } = e.currentTarget;
  const index = bodyGrids.findIndex((x) => x.parent === id);
  const pushColumns = produce(bodyGrids, (draft) => {
   draft[index]["rows"][i] = {
    ...draft[index]["rows"][i],
    [name]: value,
   };
  });
  dispatch({ type: UPDATE_BODYSTRUCTURE, payload: pushColumns });
  setCells();
 };
 const setNewCells = (cells, elements) => {
  const newCells = cells.map((cell, i) => {
   if (elements) {
    let contents = elements.filter((piece) =>
     piece.props
      ? piece.props.sectionArea === cell.id
      : piece.sectionArea === cell.id
    );
    let obj = {
     ...cells[i],
     content: contents,
    };

    return obj;
   } else {
    return [...cells][0];
   }
  });
  const nextCellState = produce(state, (draft) => {
   draft.cells = newCells;
  });
  dispatch({ type: UPDATE_CELL, payload: nextCellState });
  setCells();
 };
 const setNewSubCells = (subCells, elements) => {
  const newSubCells = subCells.map((cell, i) => {
   if (elements) {
    let contents = elements.filter((piece) =>
     piece.props
      ? piece.props.sectionArea === cell.id
      : piece.sectionArea === cell.id
    );

    let obj = {
     ...subCells[i],
     content: contents,
    };

    return obj;
   } else {
    return [...subCells][0];
   }
  });
  const nextSubCellState = produce(state, (draft) => {
   draft.subCells = newSubCells;
  });
  dispatch({ type: UPDATE_SUBCELL, payload: nextSubCellState });
  setCells();
 };
 const setNewBodyCells = (bodyCells, elements) => {
  const newBodyCells = bodyCells.map((cell, i) => {
   if (elements) {
    let contents = elements.filter((piece) =>
     piece.props
      ? piece.props.sectionArea === cell.id
      : piece.sectionArea === cell.id
    );
    let obj = {
     ...bodyCells[i],
     content: contents,
    };

    return obj;
   } else {
    return [...bodyCells][0];
   }
  });
  const nextBodyCellState = produce(state, (draft) => {
   draft.bodyCells = newBodyCells;
  });
  dispatch({ type: UPDATE_BODYCELL, payload: nextBodyCellState });
  setCells();
 };

 const setGrid = (e, check, i) => {
  const { value, name } = e.currentTarget;

  if (check === "column") {
   const columns = [...state.body.grid.columns];

   columns[i] = {
    ...columns[i],
    [name]: value,
   };

   const sizeStrings = columns.map(({ size, unit }) => {
    const sizeString = size + unit;
    return sizeString;
   });

   const gridRow = sizeStrings.toString().replaceAll(",", " ");
   const grid = {
    ...state.body.grid,
    columns: columns,
    columnString: gridRow,
   };

   const nextGridState = produce(state, (draft) => {
    draft.grid = grid;
   });
   dispatch({ type: UPDATE_GRID, payload: nextGridState });
  }

  if (check === "row") {
   const rows = [...state.body.grid.rows];

   rows[i] = {
    ...rows[i],
    [name]: value,
   };

   const sizeStrings = rows.map(({ size, unit }) => {
    const sizeString = size + unit;
    return sizeString;
   });

   const gridRow = sizeStrings.toString().replaceAll(",", " ");
   const grid = { ...state.body.grid, rows: rows, rowString: gridRow };

   const nextGridState = produce(state, (draft) => {
    draft.grid = grid;
   });
   dispatch({ type: UPDATE_GRID, payload: nextGridState });
  }

  if (
   name === "verticalAlignment" ||
   name === "horizontalAlignment" ||
   name === "direction"
  ) {
   const grid = { ...state.body.grid, [name]: value };

   const nextGridState = produce(state, (draft) => {
    draft.grid = grid;
   });
   dispatch({ type: UPDATE_GRID, payload: nextGridState });
  }
 };

 const onChangeCell = (i, e, check, index) => {
  const { value, name } = e.currentTarget;

  if (value === "close") {
   let newResults = [...cells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
    ["viewState"]: false,
   };

   const nextState = produce(state, (draft) => {
    draft.cells = newResults;
   });
   dispatch({ type: UPDATE_CELL, payload: nextState });
  } else if (value === "open") {
   let newResults = [...cells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
    ["viewState"]: true,
   };

   const nextState = produce(state, (draft) => {
    draft.cells = newResults;
   });

   dispatch({ type: UPDATE_CELL, payload: nextState });
  } else if (value === "delete") {
   let newResults = [...cells];
   if (newResults.length === 1) {
    let newResults = [...cells];
    newResults.splice(0, 1);
   } else {
    newResults.splice(i, 1);
   }
   const nextState = produce(state, (draft) => {
    draft.cells = newResults;
   });
   dispatch({ type: UPDATE_CELL, payload: nextState });
  } else {
   let newResults = [...cells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };

   const nextState = produce(state, (draft) => {
    draft.cells = newResults;
   });

   dispatch({ type: UPDATE_CELL, payload: nextState });
  }
  setCells();
 };

 const onChangeSubCell = (i, e, check, index) => {
  const { value, name } = e.currentTarget;

  if (value === "close") {
   let newResults = [...subCells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
    ["subViewState"]: false,
   };

   const nextState = produce(state, (draft) => {
    draft.subCells = newResults;
   });
   dispatch({ type: UPDATE_SUBCELL, payload: nextState });
  } else if (value === "open") {
   let newResults = [...subCells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
    ["subViewState"]: true,
   };

   const nextState = produce(state, (draft) => {
    draft.subCells = newResults;
   });

   dispatch({ type: UPDATE_SUBCELL, payload: nextState });
  } else if (value === "delete") {
   let newResults = [...subCells];
   if (newResults.length === 1) {
    newResults.splice(0, 1);
   } else {
    newResults.splice(i, 1);
   }
   const nextState = produce(state, (draft) => {
    draft.subCells = newResults;
   });
   dispatch({ type: UPDATE_SUBCELL, payload: nextState });
   setCells();
  } else {
   let newResults = [...subCells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };

   const nextState = produce(state, (draft) => {
    draft.subCells = newResults;
   });
   dispatch({ type: UPDATE_SUBCELL, payload: nextState });
   setCells();
  }
 };

 const onChangeBodyCell = (i, e, check, index) => {
  const { value, name } = e.currentTarget;

  if (value === "close") {
   let newResults = [...bodyCells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
    ["bodyViewState"]: false,
   };

   const nextState = produce(state, (draft) => {
    draft.bodyCells = newResults;
   });
   dispatch({ type: UPDATE_BODYCELL, payload: nextState });
  } else if (value === "open") {
   let newResults = [...bodyCells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
    ["bodyViewState"]: true,
   };

   const nextState = produce(state, (draft) => {
    draft.bodyCells = newResults;
   });

   dispatch({ type: UPDATE_BODYCELL, payload: nextState });
  } else if (value === "delete") {
   let newResults = [...bodyCells];
   if (newResults.length === 1) {
    newResults.splice(0, 1);
   } else {
    newResults.splice(i, 1);
   }
   const nextState = produce(state, (draft) => {
    draft.bodyCells = newResults;
   });
   dispatch({ type: UPDATE_BODYCELL, payload: nextState });
   setCells();
  } else {
   let newResults = [...bodyCells];

   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
   const nextState = produce(state, (draft) => {
    draft.bodyCells = newResults;
   });
   dispatch({ type: UPDATE_BODYCELL, payload: nextState });
   setCells();
  }
 };

 const addCell = () => {
  const newCell = [
   ...cells,
   {
    ...cell,
    id: uuidV4(),
    name: "Cell" + " " + (cells.length + 1),
   },
  ];

  const nextState = produce(state, (draft) => {
   draft.cells = newCell;
  });
  dispatch({ type: UPDATE_CELL, payload: nextState });
  setCells();
 };

 const addSubCell = (id) => {
  const newCell = [
   ...subCells,
   {
    ...subCell,
    id: uuidV4(),
    grandParent: id,
    name: "Sub Cell" + " " + (subCells.length + 1),
   },
  ];

  const nextState = produce(state, (draft) => {
   draft.subCells = newCell;
  });
  dispatch({ type: UPDATE_SUBCELL, payload: nextState });
  setCells();
 };

 const addBodyCell = (id) => {
  const newCell = [
   ...bodyCells,
   {
    ...bodyCell,
    id: uuidV4(),
    parent: id,
    name: "Body Cell" + " " + (bodyCells.length + 1),
   },
  ];

  const nextState = produce(state, (draft) => {
   draft.bodyCells = newCell;
  });
  dispatch({ type: UPDATE_BODYCELL, payload: nextState });
  setCells();
 };

 const deleteBodyCell = (id) => {
  let newResults = [...bodyCells];
  const i = bodyCells.findIndex((x) => x.id === id);
  if (newResults.length === 1) {
   newResults.splice(0, 1);
  } else {
   newResults.splice(i, 1);
  }
  const nextState = produce(state, (draft) => {
   draft.bodyCells = newResults;
  });
  dispatch({ type: UPDATE_BODYCELL, payload: nextState });
  setCells();
 };

 const setCells = () => {
  const structure = cells.map(({ id, name }) => {
   const children = subCells
    .filter((e) => e.grandParent === id)
    .map(({ id, name }) => {
     const child = {
      id,
      name,

      bodyCells: bodyCells
       .filter((e) => e.parent === id)
       .map(({ name, id }) => {
        const grandChild = {
         name,
         id,
        };

        return grandChild;
       }),
     };

     return child;
    });

   const family = {
    id,
    name,
    children,
   };

   return family;
  });
  const nextState = produce(state, (draft) => {
   draft.cellStructure = structure;
  });
  dispatch({ type: SET_CELLS, payload: nextState });
 };

 const getSites = async (userid) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/sites/sites?q=${userid}`, config);

   dispatch({
    type: GET_SITES,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const clearCurrentSite = () => {
  dispatch({ type: CLEAR_CURRENTSITE });
 };

 const setCurrentSite = (site) => {
  dispatch({ type: SET_CURRENTSITE, payload: site });
 };

 const getSite = async (_id) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/sites/sites/${_id}`, config);

   dispatch({
    type: GET_SITE,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const setCurrentFont = (font) => {
  dispatch({
   type: SET_CURRENTFONT,
   payload: font,
  });
 };

 const setCurrentPallet = (pallet) => {
  dispatch({
   type: SET_CURRENTPALLET,
   payload: pallet,
  });
 };

 const postSite = async (site) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  try {
   const res = await axios.post("/api/sites/sites", site, config);
   dispatch({
    type: POST_SITE,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const putSite = async (site, _id) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  try {
   const res = await axios.put(`/api/sites/sites/${_id}`, site, config);
   dispatch({
    type: PUT_SITE,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const deleteSite = async (_id) => {
  try {
   await axios.delete(`/api/sites/sites/${_id}`);

   dispatch({
    type: DELETE_SITE,
    payload: _id,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const deleteArea = async (_id, area) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   await axios.put(`/api/sites/pages/${_id}/areas`, area, config);

   dispatch({
    type: DELETE_AREA,
    payload: _id,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const deleteComponent = async (_id) => {
  try {
   await axios.delete(`/api/sites/components/${_id}`);

   dispatch({
    type: DELETE_COMPONENT,
    payload: _id,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };
 const getPages = async (userid) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/sites/pages?q=${userid}`, config);

   dispatch({
    type: GET_PAGES,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const getPage = async (_id) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/sites/pages/${_id}`, config);

   dispatch({
    type: GET_PAGE,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const postPage = async (page) => {
  const config = {
   headers: {
    "Content-Type": "appplication/json",
   },
  };
  try {
   const res = await axios.post("/api/sites/pages", page, config);
   dispatch({
    type: POST_PAGES,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const putPage = async (page) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  try {
   const res = await axios.put(`/api/sites/pages/${page._id}`, page, config);
   dispatch({
    type: PUT_PAGES,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const deletePage = async (_id) => {
  try {
   await axios.delete(`/api/sites/pages/${_id}`);

   dispatch({
    type: DELETE_PAGE,
    payload: _id,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const getComponents = async (userid) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/sites/components?q=${userid}`, config);

   dispatch({
    type: GET_COMPONENTS,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const getComponent = async (_id) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/sites/components/${_id}`, config);

   dispatch({
    type: GET_COMPONENT,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const postComponent = async (component) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.post(`/api/sites/components/`, component, config);

   dispatch({
    type: POST_COMPONENT,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const putComponent = async (component) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.post(
    `/api/sites/components/${component._id}`,
    component,
    config
   );

   dispatch({
    type: PUT_COMPONENT,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: SITE_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const clearSiteLayout = () => {
  dispatch({ type: CLEAR_SITELAYOUT });
 };

 const setSiteLayout = (layout) => {
  dispatch({
   type: SET_CURRENTSITE,
   payload: layout,
  });
 };

 const setContent = (content) => {
  dispatch({
   type: SET_CONTENT,
   payload: content,
  });
 };
 const clearContent = () => {
  dispatch({
   type: CLEAR_CONTENT,
  });
 };

 const setCurrentComponent = (component) => {
  dispatch({
   type: SET_CURRENTCOMPONENT,
   payload: component,
  });
 };
 const clearCurrentComponent = () => {
  dispatch({
   type: CLEAR_CURRENTCOMPONENT,
  });
 };

 const setCurrentPage = (page) => {
  dispatch({
   type: SET_CURRENTPAGE,
   payload: page,
  });
 };
 const clearCurrentPage = () => {
  dispatch({
   type: CLEAR_CURRENTPAGE,
  });
 };

 const setCurrentContent = (content) => {
  dispatch({ type: SET_CURRENTCONTENT, payload: content });
 };

 const clearCurrentContent = () => {
  dispatch({ type: CLEAR_CURRENTCONTENT });
 };

 const getFirms = async (_id) => {
  const res = await axios.get(`/api/firms?q=${_id}`);
  res.data.forEach((piece) => {
   piece.contentType = "firm";
  });

  dispatch({ type: GET_FIRMSSEARCHED, payload: res.data });
 };
 const getReviews = async (_id) => {
  const res = await axios.get(`/api/reviews?q=${_id}`);
  res.data.forEach((piece) => {
   piece.contentType = "review";
  });

  dispatch({ type: GET_REVIEWSSEARCHED, payload: res.data });
 };

 const getArticles = async (_id) => {
  const res = await axios.get(`/api/articles?q=${_id}`);
  res.data.forEach((piece) => {
   piece.contentType = "article";
  });

  dispatch({ type: GET_ARTICLESSEARCHED, payload: res.data });
 };

 const getBlogs = async (_id) => {
  const res = await axios.get(`/api/blogs?q=${_id}`);
  res.data.forEach((piece) => {
   piece.contentType = "blog";
  });

  dispatch({ type: GET_BLOGSSEARCHED, payload: res.data });
 };

 const getQuizs = async (_id) => {
  const res = await axios.get(`/api/quizs?q=${_id}`);
  res.data.forEach((piece) => {
   piece.contentType = "quiz";
  });

  dispatch({ type: GET_QUIZSSEARCHED, payload: res.data });
 };

 const getVerticals = async (_id) => {
  const res = await axios.get(`/api/verticals?q=${_id}`);

  res.data.forEach((piece) => {
   piece.contentType = "vertical";
  });

  dispatch({ type: GET_VERTICALSSEARCHED, payload: res.data });
 };

 return (
  <SiteContext.Provider
   value={{
    cells: state.body.cells,
    bodyCells: state.body.bodyCells,
    subCells: state.body.subCells,
    cellStructure: state.body.cellStructure,
    grid: state.body.grid,
    error: state.markUp.error,
    layout: state.markUp.layout,
    currentContent: state.markUp.currentContent,
    currentPage: state.markUp.currentPage,
    currentSite: state.markUp.currentSite,
    currentComponent: state.markUp.currentComponent,
    font: state.markUp.font,
    pallet: state.markUp.pallet,
    content: state.markUp.content,
    myComponents: state.markUp.myComponents,
    pages: state.markUp.pages,
    sites: state.markUp.sites,
    bodyGrids: state.body.bodyGrids,
    subGrids: state.body.subGrids,
    setCurrentFont,
    setCurrentPallet,
    addColumn,
    addRow,
    addSubRow,
    addSubColumn,
    addBodyRow,
    addBodyColumn,
    deleteColumn,
    deleteRow,
    deleteSubRow,
    deleteSubColumn,
    deleteBodyRow,
    deleteBodyColumn,
    getSite,
    deleteSite,
    postSite,
    putSite,
    setCurrentContent,
    setContent,
    clearContent,
    postComponent,
    getComponent,
    putComponent,
    deleteComponent,
    deleteArea,
    setCurrentComponent,
    clearCurrentComponent,
    deletePage,
    postPage,
    getPage,
    addBodyGrid,
    addSubGrid,
    putPage,
    setCurrentPage,
    clearCurrentPage,
    deletePage,
    getFirms,
    getVerticals,
    getBlogs,
    getArticles,
    setGrid,
    getQuizs,
    getReviews,
    clearCurrentContent,
    addCell,
    addSubCell,
    addBodyCell,
    onChangeCell,
    updateSubColumn,
    updateSubRow,
    updateBodyColumn,
    updateBodyRow,
    onChangeSubCell,
    deleteBodyCell,
    setNewCells,
    setNewSubCells,
    setNewBodyCells,
    onChangeBodyCell,
    setCells,
   }}>
   {props.children}
  </SiteContext.Provider>
 );
};

export default SiteState;
