import React, { useReducer, useEffect, createContext, useContext } from "react";
import axios from "axios";

import ReactDOMServer from "react-dom/server";
import SiteContext from "./siteContext";
import siteReducer from "./siteReducer";
import pageReducer from "./pageReducer";
import cellReducer from "./cellReducer";
import appReducer from "./appReducer";
import produce from "immer";
import parse from "html-react-parser";
import _ from "lodash";
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
 FILTER_CSS,
 CLEAR_FILTER,
 UPDATE_CELLSTRUCTURE,
 DELETE_GRID,
 ADD_CLICK,
 ADD_IP,
 ADD_LEAD,
 CREATE_STATE,
 UPDATE_STATE,
 DELETE_STATE,
 ADD_APPCONTENT,
 GET_COMPONENTCONTENT,
 SET_COMPONENTSTRING,
 CLEAR_COMPONENTCONTENT,
 SET_LOADEDCOMPONENTS,
 ADD_COMPONENT,
} from "../types";
const AppContext = createContext();
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
   filtered: {},
   content: [],
   cellStructure: null,
   myComponents: null,

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
  page: {
   pages: [],
   LoadedComponents: [],
   MyComponent: null,
   componentContent: null,
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

 const cssObj = {
  id: "",
  marginTop: "",
  marginLeft: "",
  width: "",
  height: "",
  marginBottom: "",
  marginRight: "",
  borderLeftStyle: "",
  borderLeftColor: "",
  borderLeftWidth: "",
  borderRightStyle: "",
  borderRightColor: "",
  borderRightWidth: "",
  borderTopStyle: "",
  borderTopColor: "",
  borderTopWidth: "",
  borderBottomStyle: "",
  borderBottomColor: "",
  borderBottomWidth: "",
  borderTopLeftRadius: "0",
  borderTopRightRadius: "0",
  borderBottomLeftRadius: "0",
  borderBottomRightRadius: "0",
  boxShadowHoriz: "",
  boxShadowVert: "",
  boxShadowBlur: "",
  boxShadowSpread: "",
  boxShadowColor: "",
  boxShadowInset: "",
  fontSize: "",
  lineHeight: "",
  fontWeight: "",
  zIndex: "",
  display: "",
  textIndent: "",
  transition: [],
  transform: [],

  transformProp: {
   skewX: 0,
   skewY: 0,
   rotateX: 0,
   rotateY: 0,
   rotateZ: 0,
   scaleY: 1,
   scaleX: 1,
   translateX: 0,
   translateY: 0,
  },
  animation: [],
  textAlign: "",
  textShadowSize: "",
  textShadowColor: "",
  textDecorationLine: "",
  textDecorationThickness: "",
  textDecorationStyle: "",
  textDecorationColor: "",
  pos: "",
  top: "",
  left: "",
  bottom: "",
  right: "",
  paddingTop: "",
  paddingLeft: "",
  paddingRight: "",
  paddingBottom: "",
  backgroundRepeat: "",
  backgroundPosition: "",
  backgroundSize: "",
  opacity: "100%",
  overflowX: "",
  overflowY: "",
 };

 const newAnimation = {
  animationName: "",
  animationDuration: 0,
  animationTimingFunction: "",
  cubicNs: { 0: 0, 1: 0, 2: 0, 3: 0 },
  steps: { n: 0, v: "" },
  animationDelay: "",
  animationIterationCount: "",
  animationDirection: "",
  animationFillMode: "",
  animationPlayState: "",
  keyframes: [],
 };

 const newKeyframeProperty = {
  propName: "",
  propValue: "",
  shadowValues: {
   verticalShadow: "",
   horizontalShadow: "",
   blurShadow: "",
   spreadShadow: "",
   shadowDirection: "",
   shadowColor: "",
  },
  transValues: {
   skewX: 0,
   skewY: 0,
   rotateX: 0,
   rotateY: 0,
   rotateZ: 0,
   scaleY: 1,
   scaleX: 1,
   translateX: 0,
   translateY: 0,
  },
 };

 const newKeyframe = {
  completionPercent: 0,
  properties: [],
 };

 const newTransition = {
  property: "",
  duration: 0,
  timingFunction: "",
  cubicNs: { 0: 0, 1: 0, 2: 0, 3: 0 },
  delay: "",
 };
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
  level: "cell",
  id: "",
  name: "",
  subCells: [],
  viewToggle: "close",
  viewState: false,
  rowSpan: 0,
  left: 0,
  columnSpan: 0,
  css: {
   width: "0",
   height: "0",
   marginTop: "",
   marginLeft: "",
   marginBottom: "",
   marginRight: "",
   borderLeftStyle: "",
   borderLeftColor: "",
   borderLeftWidth: "",
   borderRightStyle: "",
   borderRightColor: "",
   borderRightWidth: "",
   borderTopStyle: "",
   borderTopColor: "",
   borderTopWidth: "",
   lineHeight: "",
   borderBottomStyle: "",
   borderBottomColor: "",
   borderBottomWidth: "",
   borderTopLeftRadius: "0",
   borderTopRightRadius: "0",
   borderBottomLeftRadius: "0",
   borderBottomRightRadius: "0",
   boxShadowHoriz: "",
   boxShadowVert: "",
   boxShadowBlur: "",
   boxShadowSpread: "",
   boxShadowColor: "",
   boxShadowInset: "",
   fontSize: "",
   fontWeight: "",
   zIndex: "",
   display: "",
   textIndent: "",
   transition: [],
   transform: [],

   transformProp: {
    skewX: 0,
    skewY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleY: 1,
    scaleX: 1,
    translateX: 0,
    translateY: 0,
   },
   animation: [],
   textAlign: "",
   textShadowSize: "",
   textShadowColor: "",
   textDecorationLine: "",
   textDecorationThickness: "",
   textDecorationStyle: "",
   textDecorationColor: "",
   pos: "",
   top: "",
   left: "",
   bottom: "",
   right: "",
   paddingTop: "",
   paddingLeft: "",
   paddingRight: "",
   paddingBottom: "",
   backgroundRepeat: "",
   backgroundPosition: "",
   backgroundSize: "",
   opacity: "100%",
   overflowX: "",
   overflowY: "",
  },
  background: "",
  position: "",
  code: "",
  content: [],
  contentCss: [],
 };
 const subCell = {
  level: "subcell",
  left: 0,
  background: "",
  position: "",
  columnSpan: 0,
  rowSpan: 0,
  top: 0,
  bodyCells: [],
  id: "",
  code: "",
  css: {
   width: "0",
   height: "0",
   marginTop: "",
   marginLeft: "",
   marginBottom: "",
   marginRight: "",
   borderLeftStyle: "",
   borderLeftColor: "",
   borderLeftWidth: "",
   borderRightStyle: "",
   borderRightColor: "",
   borderRightWidth: "",
   borderTopStyle: "",
   lineHeight: "",
   borderTopColor: "",
   borderTopWidth: "",
   borderBottomStyle: "",
   borderBottomColor: "",
   borderBottomWidth: "",
   borderTopLeftRadius: "0",
   borderTopRightRadius: "0",
   borderBottomLeftRadius: "0",
   borderBottomRightRadius: "0",
   boxShadowHoriz: "",
   boxShadowVert: "",
   boxShadowBlur: "",
   boxShadowSpread: "",
   boxShadowColor: "",
   boxShadowInset: "",
   fontSize: "",
   fontWeight: "",
   zIndex: "",
   display: "",
   textIndent: "",
   transition: [],
   transform: [],

   transformProp: {
    skewX: 0,
    skewY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleY: 1,
    scaleX: 1,
    translateX: 0,
    translateY: 0,
   },
   animation: [],
   textAlign: "",
   textShadowSize: "",
   textShadowColor: "",
   textDecorationLine: "",
   textDecorationThickness: "",
   textDecorationStyle: "",
   textDecorationColor: "",
   pos: "",
   top: "",
   left: "",
   bottom: "",
   right: "",
   paddingTop: "",
   paddingLeft: "",
   paddingRight: "",
   paddingBottom: "",
   backgroundRepeat: "",
   backgroundPosition: "",
   backgroundSize: "",
   opacity: "100%",
   overflowX: "",
   overflowY: "",
  },
  content: [],
  contentCss: [],
  name: "",
  viewToggle: "close",
  subViewState: false,
 };
 const bodyCell = {
  rowSpan: 0,
  left: 0,
  level: "bodycell",
  columnSpan: 0,
  background: "",
  position: "",
  code: "",
  css: {
   width: "0",
   height: "0",
   marginTop: "",
   marginLeft: "",
   marginBottom: "",
   marginRight: "",
   borderLeftStyle: "",
   borderLeftColor: "",
   lineHeight: "",
   borderLeftWidth: "",
   borderRightStyle: "",
   borderRightColor: "",
   borderRightWidth: "",
   borderTopStyle: "",
   borderTopColor: "",
   borderTopWidth: "",
   borderBottomStyle: "",
   borderBottomColor: "",
   borderBottomWidth: "",
   borderTopLeftRadius: "0",
   borderTopRightRadius: "0",
   borderBottomLeftRadius: "0",
   borderBottomRightRadius: "0",
   boxShadowHoriz: "",
   boxShadowVert: "",
   boxShadowBlur: "",
   boxShadowSpread: "",
   boxShadowColor: "",
   boxShadowInset: "",
   fontSize: "",
   fontWeight: "",
   zIndex: "",
   display: "",
   textIndent: "",
   transition: [],

   transform: [],
   transformProp: {
    skewX: 0,
    skewY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleY: 1,
    scaleX: 1,
    translateX: 0,
    translateY: 0,
   },

   animation: [],
   textAlign: "",
   textShadowSize: "",
   textShadowColor: "",
   textDecorationLine: "",
   textDecorationThickness: "",
   textDecorationStyle: "",
   textDecorationColor: "",
   pos: "",
   top: "",
   left: "",
   bottom: "",
   right: "",
   paddingTop: "",
   paddingLeft: "",
   paddingRight: "",
   paddingBottom: "",
   backgroundRepeat: "",
   backgroundPosition: "",
   backgroundSize: "",
   opacity: "100%",
   overflowX: "",
   overflowY: "",
  },
  content: [],
  contentCss: [],
  top: 0,
  id: "",
  grandParent: "",
  name: "",
  viewToggle: "close",
  bodyViewState: false,
 };

 const page = {
  url: "",
  route: "",
  layout: "",
  pageGrid: {
   key: uuidV4(),
   rows: [],
   columns: [],
   rowString: "",
   columnString: "",
   direction: "row",
   verticalAlignment: "start",
   horizontalAlignment: "start",
  },
  name: "",
  head: {
   metaTags: [{ tag: "", content: "" }],
   title: "",
  },
  nav: {
   navSections: [],
   navCells: [],
   layout: "",
   navGrid: {
    key: uuidV4(),
    rows: [],
    columns: [],
    rowString: "",
    columnString: "",
    direction: "row",
    verticalAlignment: "start",
    horizontalAlignment: "start",
   },
  },
  header: {
   headerSections: [],
   headerCells: [],
   layout: "",
   navGrid: {
    key: uuidV4(),
    rows: [],
    columns: [],
    rowString: "",
    columnString: "",
    direction: "row",
    verticalAlignment: "start",
    horizontalAlignment: "start",
   },
   navStyles: {},
  },
  article: {
   articleSections: [],
   articleCells: [],
   layout: "",
   articleGrid: {
    key: uuidV4(),
    rows: [],
    columns: [],
    rowString: "",
    columnString: "",
    direction: "row",
    verticalAlignment: "start",
    horizontalAlignment: "start",
   },
   articleStyles: {},
  },
  main: {
   mainSections: [],
   mainCells: [],
   layout: "",
   mainGrid: {
    key: uuidV4(),
    rows: [],
    columns: [],
    rowString: "",
    columnString: "",
    direction: "row",
    verticalAlignment: "start",
    horizontalAlignment: "start",
   },
   mainStyles: {},
  },
  footer: {
   foooterSections: [],
   footerCells: [],
   layout: "",
   footerGrid: {
    key: uuidV4(),
    rows: [],
    columns: [],
    rowString: "",
    columnString: "",
    direction: "row",
    verticalAlignment: "start",
    horizontalAlignment: "start",
   },
   footerStyles: {},
  },
  css: {
   width: "0",
   height: "0",
   marginTop: "",
   marginLeft: "",
   marginBottom: "",
   marginRight: "",
   borderLeftStyle: "",
   borderLeftColor: "",
   lineHeight: "",
   borderLeftWidth: "",
   borderRightStyle: "",
   borderRightColor: "",
   borderRightWidth: "",
   borderTopStyle: "",
   borderTopColor: "",
   borderTopWidth: "",
   borderBottomStyle: "",
   borderBottomColor: "",
   borderBottomWidth: "",
   borderTopLeftRadius: "0",
   borderTopRightRadius: "0",
   borderBottomLeftRadius: "0",
   borderBottomRightRadius: "0",
   boxShadowHoriz: "",
   boxShadowVert: "",
   boxShadowBlur: "",
   boxShadowSpread: "",
   boxShadowColor: "",
   boxShadowInset: "",
   fontSize: "",
   fontWeight: "",
   zIndex: "",
   display: "",
   textIndent: "",
   transition: [],

   transform: [],
   transformProp: {
    skewX: 0,
    skewY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleY: 1,
    scaleX: 1,
    translateX: 0,
    translateY: 0,
   },

   animation: [],
   textAlign: "",
   textShadowSize: "",
   textShadowColor: "",
   textDecorationLine: "",
   textDecorationThickness: "",
   textDecorationStyle: "",
   textDecorationColor: "",
   pos: "",
   top: "",
   left: "",
   bottom: "",
   right: "",
   paddingTop: "",
   paddingLeft: "",
   paddingRight: "",
   paddingBottom: "",
   backgroundRepeat: "",
   backgroundPosition: "",
   backgroundSize: "",
   opacity: "100%",
   overflowX: "",
   overflowY: "",
  },
 };

 const [state, dispatch] = useReducer(
  combineReducers({
   body: cellReducer,
   markUp: siteReducer,
   page: pageReducer,
  }),
  initialState
 );

 //HELPERS

 const filterByCount = (array, count) => {
  return array.filter(function (value) {
   return (
    array.filter(function (v) {
     return v === value;
    }).length === count
   );
  });
 };

 //EDIT THE CSS AND CELL OBJECT ON THE PAGE LEVEL

 const getComponentContent = async (MyComponent, userid) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const content = MyComponent.content;

  const sendObj = { content, userid };

  const res = await axios.get(
   `/api/sites/content?q=${JSON.stringify(sendObj)}`,
   config
  );
  dispatch({
   type: GET_COMPONENTCONTENT,
   payload: res.data,
  });

  console.log(res);
 };

 const getComponent = async (_id) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/sites/components/${_id}`, config);

   console.log(res.data);

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

 const setLoadedComponents = (components) => {
  dispatch({
   type: SET_LOADEDCOMPONENTS,
   payload: components,
  });
 };

 const addComponent = (func) => {
  dispatch({
   type: ADD_COMPONENT,
   payload: func,
  });
 };

 const addPageCell = () => {};
 const addAreaStyle = () => {};
 const addPageCellStyle = () => {};
 const setAreaLayout = () => {};
 const setPageLayout = () => {};

 //delete components
 //gridstyles
 //cellstyles
 //navlinks
 //combineComponentStates
 //pageMapping
 //siteMapping

 //EDIT THE CSS AND CELL OBJECT ON THE COMPONENT LEVEL

 const {
  cells,
  subCells,
  bodyCells,
  grid,
  subGrids,
  bodyGrids,
  cellStructure,
 } = state.body;

 const filterCss = (text, level, i, ind) => {
  if (level === "cell") {
   const matchKeys = Object.keys(cells[i]["css"]).filter((css) => {
    const regex = new RegExp(`${text}`, "gi");
    return css.match(regex);
   });

   const filtered = {};

   for (const key of matchKeys) {
    filtered[key] = cells[i].css[key];
   }

   dispatch({ type: FILTER_CSS, payload: filtered });
  } else if (level === "cellChild") {
   const matchKeys = Object.keys(cells[i]["contentCss"][ind]).filter((css) => {
    const regex = new RegExp(`${text}`, "gi");
    return css.match(regex);
   });

   const filtered = {};

   for (const key of matchKeys) {
    filtered[key] = cells[i].css[key];
   }

   dispatch({ type: FILTER_CSS, payload: filtered });
  }
 };

 const clearComponentContent = () => {
  dispatch({
   type: CLEAR_COMPONENTCONTENT,
  });
 };

 // Clear Filter
 const clearFilter = () => {
  dispatch({ type: CLEAR_FILTER });
 };

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

 const setNewCells = async (cells, elements) => {
  const newCells = cells.map((cell, i) => {
   if (elements) {
    let contents = elements.filter((piece) =>
     piece.props && piece.source != null
      ? piece.props.sectionArea === cell.id
      : piece.sectionArea === cell.id
    );

    let blankCSS = [];
    if (contents.length > cells[i].contentCss.length) {
     const newObjNo = contents.length - cells[i].contentCss.length;

     for (let i = 0; i < newObjNo; i++) {
      blankCSS.push({ ...cssObj, id: uuidV4() });
     }
    }

    let obj = {
     ...cells[i],
     content: contents,
     contentCss: [...cells[i].contentCss, ...blankCSS],
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

 const addCellTransition = (i) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["css"]["transition"].push({ ...newTransition });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };

 const addCellChildTransition = (i, index) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["contentCss"][index]["transition"].push({ ...newTransition });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };

 const addCellAnimation = (i) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["css"]["animation"].push({ ...newAnimation });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };

 const addCellChildAnimation = (i, index) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["contentCss"][index]["animation"].push({ ...newAnimation });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };

 const addCellAnimationKeyframe = (i, index) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["css"]["animation"][index]["keyframes"].push({ ...newKeyframe });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };

 const addCellChildAnimationKeyframe = (i, index, ind) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["contentCss"][index]["animation"][ind]["keyframes"].push({
    ...newKeyframe,
   });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };

 const addCellAnimationKeyframeProperty = (i, index, ind) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["css"]["animation"][index]["keyframes"][ind]["properties"].push({
    ...newKeyframeProperty,
   });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };

 const addCellChildAnimationKeyframeProperty = (i, index, ind, indy) => {
  const pushColumns = produce(cells, (draft) => {
   draft[i]["contentCss"][index]["animation"][ind]["keyframes"][indy][
    "properties"
   ].push({ ...newKeyframeProperty });
  });

  dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
 };
 const addSubCellTransition = (i) => {};
 const addBodyCellTransition = (i) => {};

 const onChangeCell = (i, e, check, slider, n, n1, n2, n3, n4) => {
  let value;
  let name;

  if (e.currentTarget) {
   value = e.currentTarget.value;
   name = e.currentTarget.name;
  }

  if (check === "transform") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["transform"].push(value);
    draft[i]["css"]["transform"] = filterByCount(
     draft[i]["css"]["transform"],
     1
    );
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "conttransform") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["transform"].push(value);
    draft[i]["contentCss"][slider]["transform"] = filterByCount(
     draft[i]["contentCss"][slider]["transform"],
     1
    );
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "transition") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["transition"][slider] = {
     ...draft[i]["css"]["transition"][slider],
     [name]: value,
    };
   });
   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "cubicNs") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["transition"][slider]["cubicNs"][n] = e;
   });
   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "css") {
   let newResults = [...cells];

   newResults[i] = {
    ...newResults[i],
    css: { ...newResults[i].css, [name]: value.toString() },
   };

   const nextState = produce(state, (draft) => {
    draft.cells = newResults;
   });

   dispatch({ type: UPDATE_CELL, payload: nextState });
  } else if (check === "contcubicNs") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["transition"][n]["cubicNs"][n1] = e;
   });
   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "animation") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["animation"][slider][name] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "animationkey") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["animation"][slider]["keyframes"][n][name] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "animationkeyprop" && !n2 && !n3) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["animation"][slider]["keyframes"][n]["properties"][n1][
     name
    ] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (
   check === "animationkeyprop" &&
   n2 &&
   n2 != "font" &&
   n2 != "boxshadow" &&
   !n3
  ) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["animation"][slider]["keyframes"][n]["properties"][n1][
     "transValues"
    ][n2] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "animationkeyprop" && n2 && n2 === "font" && n3) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["animation"][slider]["keyframes"][n]["properties"][n1][
     name
    ] = n3;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "animationkeyprop" && n2 && n2 === "boxshadow") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["animation"][slider]["keyframes"][n]["properties"][n1][
     "shadowValues"
    ][name] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (
   check === "animationkeyprop" &&
   n2 &&
   n2 != "font" &&
   n2 != "boxshadow" &&
   n3
  ) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["css"]["animation"][slider]["keyframes"][n]["properties"][n1][
     "transValues"
    ][n2] = e;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "contanimation") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["animation"][n][name] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "contanimationkey") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["animation"][n]["keyframes"][n1][
     name
    ] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "contanimationkeyprop" && !n3 && !n4) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["animation"][n]["keyframes"][n1][
     "properties"
    ][n2][name] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (
   check === "contanimationkeyprop" &&
   n3 &&
   n3 != "font" &&
   n3 != "boxshadow" &&
   !n4
  ) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["animation"][n]["keyframes"][n1][
     "properties"
    ][n2]["transValues"][name] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "contanimationkeyprop" && n3 && n3 === "font" && n4) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["animation"][n]["keyframes"][n1][
     "properties"
    ][n2][name] = n4;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "contanimationkeyprop" && n3 && n3 === "boxshadow") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["animation"][n]["keyframes"][n1][
     "properties"
    ][n2]["shadowValues"][name] = value;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (
   check === "contanimationkeyprop" &&
   n3 &&
   n3 != "font" &&
   n3 != "boxshadow" &&
   n4
  ) {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["animation"][n]["keyframes"][n1][
     "properties"
    ][n2]["transValues"][n3] = e;
   });

   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "contentCss") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider][name] = value;
   });
   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (slider === "contentslider") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][n][check] = e;
   });
   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (check === "conttransition") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][slider]["transition"][n][name] = value;
   });
   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (slider === "conttransformProp") {
   const pushColumns = produce(cells, (draft) => {
    draft[i]["contentCss"][n]["transformProp"][check] = e;
   });
   dispatch({ type: UPDATE_CELLSTRUCTURE, payload: pushColumns });
  } else if (slider === "slider") {
   let newResults = [...cells];

   newResults[i] = {
    ...newResults[i],
    css: { ...newResults[i].css, [check]: e },
   };
   const nextState = produce(state, (draft) => {
    draft.cells = newResults;
   });

   dispatch({ type: UPDATE_CELL, payload: nextState });
  } else if (slider === "transformProp") {
   let newResults = [...cells];

   newResults[i] = {
    ...newResults[i],
    css: {
     ...newResults[i].css,
     transformProp: { ...newResults[i].css.transformProp, [check]: e },
    },
   };
   const nextState = produce(state, (draft) => {
    draft.cells = newResults;
   });

   dispatch({ type: UPDATE_CELL, payload: nextState });
  } else if (value === "close") {
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

 //HTML ELEMENTS AND MY GETS AND POSTS

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
    filtered: state.markUp.filtered,
    cells: state.body.cells,
    bodyCells: state.body.bodyCells,
    subCells: state.body.subCells,
    cellStructure: state.body.cellStructure,
    grid: state.body.grid,
    bodyGrids: state.body.bodyGrids,
    subGrids: state.body.subGrids,
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
    sites: state.markUp.sites,
    pages: state.page.pages,
    MyComponent: state.page.MyComponent,
    componentContent: state.page.componentContent,
    areas: state.page.areas,
    pages: state.page.pages,
    pageCells: state.page.pageCells,
    componentContent: state.page.componentContent,
    LoadedComponents: state.page.LoadedComponents,
    areas: state.page.areas,
    pageGrid: state.pageGrid,
    areaGrids: state.areaGrids,
    layouts: state.page.layouts,
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
    getComponents,
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
    setLoadedComponents,
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
    filterCss,
    clearFilter,
    addCellTransition,
    addCellChildTransition,
    addComponent,
    addSubCellTransition,
    addBodyCellTransition,
    addCellAnimation,
    addCellChildAnimation,
    addCellAnimationKeyframe,
    addCellChildAnimationKeyframe,
    addCellAnimationKeyframeProperty,
    addCellChildAnimationKeyframeProperty,
    getComponentContent,
    clearComponentContent,
   }}>
   {props.children}
  </SiteContext.Provider>
 );
};

export default SiteState;

export function AppWrapper({ children }) {
 const initialState = {
  leads: [],
  ip: [],
  clicks: [],
  content: [],
  userState: null,
  NewComponent: null,
 };
 const [state, dispatch] = useReducer(appReducer, initialState);
 const addClick = (click) => {
  if (sessionStorage.getItem("click") !== null) {
   const existingLead = JSON.parse(sessionStorage.getItem("click"));
   let clicks;
   if (typeof existingLead === "object" && existingLead !== null) {
    clicks = JSON.stringify([click, existingLead]);
   } else {
    clicks = JSON.stringify([click, ...existingLead]);
   }
   sessionStorage.setItem("click", clicks);
  } else {
   sessionStorage.setItem("click", JSON.stringify(click));
  }
  dispatch({
   type: ADD_CLICK,
   payload: click,
  });
 };

 const addLead = (lead) => {
  if (sessionStorage.getItem("lead") !== null) {
   const existingLead = JSON.parse(sessionStorage.getItem("lead"));
   let lead;
   if (typeof existingLead === "object" && existingLead !== null) {
    lead = JSON.stringify([lead, existingLead]);
   } else {
    lead = JSON.stringify([lead, ...existingLead]);
   }
   sessionStorage.setItem("lead", lead);
  } else {
   sessionStorage.setItem("lead", JSON.stringify(lead));
  }

  dispatch({
   type: ADD_LEAD,
   payload: lead,
  });
 };

 const addIp = (ip) => {
  sessionStorage.setItem("ip", JSON.stringify(ip));
  dispatch({
   type: ADD_IP,
   payload: ip,
  });
 };

 const createUserState = (state) => {
  dispatch({
   type: CREATE_STATE,
   payload: state,
  });
 };

 const setComponentString = (str, styles) => {
  state.content.forEach((content) => {
   if (content.key.includes("img")) {
    str = str
     .split(" ")
     .filter((s) => !s.includes("blob"))
     .join(" ");

    str = str.replaceAll("alt=", "src=");
   }

   console.log(content.content);
   console.log(content.key);
   str = str.replace(content.content, `\${props.${content.key}}`);
  });

  styles.forEach((style) => {
   const st = JSON.stringify(style)
    .replace('{"', "")
    .replace("{", "{\n")
    .replace('":', "")
    .replaceAll('"', "")
    .replaceAll(",", ";\n")
    .replace("}}", ";}\n")
    .replace(/^/, ".")
    .replace(/(?!^)[A-Z]/g, (m) => "-" + m.toLowerCase())
    .replace(".-g", ".G")
    .replace(".-c", ".C");
   String.prototype.insert = function (index, string) {
    if (index > 0) {
     return this.substring(0, index) + string + this.substr(index);
    }

    return string + this;
   };

   str = str.insert(str.indexOf("</style>"), st);
  });

  let NewComponent = {
   html: str,
   userState: state.userState,
   content: state.content,
  };

  dispatch({
   type: SET_COMPONENTSTRING,
   payload: NewComponent,
  });
 };

 const getStateContent = (content) => {
  let key = null;
  let parentKey = null;
  let typeofParent = null;
  let stateEntry = null;

  if (content.key.includes(".")) {
   key = content.key.substring(
    content.key.indexOf(".") + 1,
    content.key.length
   );
   parentKey = content.key.substring(0, content.key.indexOf("."));
   typeofParent = parentKey === "socialLinks" ? "object" : "array";
  } else {
   key = content.key;
  }

  let value;

  if (typeof content["content"] === "string") {
   value = "";
  } else if (typeof content["content"] === "number") {
   value = 0;
  } else if (content[key] === "img") {
   value = "code";
  }

  if (parentKey != null) {
   if (state.userState && state.userState[parentKey]) {
    stateEntry =
     typeofParent === "object"
      ? { [parentKey]: { ...state.userState[parentKey], [key]: value } }
      : {
         [parentKey]: [
          ...state.userState[parentKey],
          { ...state.userState[parentKey][0], [key]: value },
         ].slice(-1),
        };
   } else {
    stateEntry =
     typeofParent === "object"
      ? { [parentKey]: { [key]: value } }
      : { [parentKey]: [{ [key]: value }] };
   }
  } else {
   stateEntry = { [key]: value };
  }

  const newState = Object.assign({}, state.userState, stateEntry);

  dispatch({
   type: CREATE_STATE,
   payload: newState,
  });

  dispatch({
   type: ADD_APPCONTENT,
   payload: content,
  });
 };

 const readUserState = () => {};
 const writeUserState = () => {};

 const updateUserState = (state) => {
  dispatch({
   type: UPDATE_STATE,
   payload: state,
  });
 };
 const deleteUserState = (i) => {
  const key = Object.keys(state.userState)[i];

  delete state.userState[key];

  dispatch({
   type: DELETE_STATE,
   payload: state.userState,
  });
 };

 const contextProps = {
  createUserState,
  readUserState,
  writeUserState,
  updateUserState,
  deleteUserState,
  getStateContent,
  setComponentString,
  addIp,
  addLead,
  addClick,
  clicks: state.clicks,
  leads: state.leads,
  NewComponent: state.NewComponent,
  ip: state.ip,
  userState: state.userState,
 };
 return (
  <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
 );
}

export function useAppContext() {
 return useContext(AppContext);
}
