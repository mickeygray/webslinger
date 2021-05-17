import React, {
 Fragment,
 useReducer,
 useState,
 useEffect,
 useCallback,
 useContext,
} from "react";
import parse from "html-react-parser";
import { Grid, Cell } from "styled-css-grid";
import ImageContext from "../../context/image/imageContext";
import AuthContext from "../../context/auth/authContext";
import SiteContext from "../../context/site/siteContext";
import YouTube from "react-youtube";
import _ from "lodash";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import str from "string-template-format-tostring";
import ReactDOMServer from "react-dom/server";
import Pagination from "../layout/Pagination";
import CssFilter from "./CssFilter";
import { useAppContext } from "../../context/site/SiteState";
const SecViewer = ({
 h,
 p,
 icon,
 li,
 button,
 a,
 vid,
 img,
 font,
 pallet,
 component,
 nodeView,
 setStyleTags,
}) => {
 const authContext = useContext(AuthContext);
 const siteContext = useContext(SiteContext);
 const imageContext = useContext(ImageContext);
 const {
  setComponentString,
  lead,
  userState,
  builtQuiz,
  writeUserState,
  readUserState,
  writeLeadState,
 } = useAppContext();
 const { user } = authContext;
 const { _id } = user;
 const { getContentImage, clearCurrentImage, contentImage } = imageContext;
 const {
  addCell,
  addSubCell,
  addBodyCell,
  onChangeCell,
  onChangeSubCell,
  deleteBodyCell,
  setNewCells,
  setNewSubCells,
  setNewBodyCells,
  grid,
  cells,
  subCells,
  subGrids,
  bodyGrids,
  currentContent,
  clearCurrentContent,
  bodyCells,
  addSubColumn,
  addSubRow,
  addBodyColumn,
  addBodyRow,
  onChangeBodyCell,
  deleteSubColumn,
  deleteSubRow,
  deleteBodyRow,
  deleteBodyColumn,
  addSubGrid,
  addBodyGrid,
  updateSubColumn,
  updateSubRow,
  updateBodyColumn,
  updateBodyRow,
  addCellTransition,
  addCellChildTransition,
  addCellAnimation,
  addCellChildAnimation,
  addCellAnimationKeyframe,
  addCellChildAnimationKeyframe,
  addCellAnimationKeyframeProperty,
  addCellChildAnimationKeyframeProperty,
  addSubCellChildAnimation,
  addSubCellChildTransition,
  addSubCellChildAnimationKeyframe,
  addSubCellChildAnimationKeyframeProperty,
  addBodyCellChildAnimation,
  addBodyCellChildTransition,
  addBodyCellChildAnimationKeyframe,
  addBodyCellChildAnimationKeyframeProperty,
  addSubCellAnimation,
  addSubCellTransition,
  addSubCellAnimationKeyframe,
  addSubCellAnimationKeyframeProperty,
  addBodyCellAnimation,
  addBodyCellTransition,
  addBodyCellAnimationKeyframe,
  addBodyCellAnimationKeyframeProperty,
  filtered,
  forms,
  currentForm,
 } = siteContext;

 const [elements, setElements] = useState([]);
 const [subGridView, toggleSubGridView] = useState(false);
 const [bodyGridView, toggleBodyGridView] = useState(false);
 const [cellContentToggle, setCellContentToggle] = useState(false);
 const [subContentToggle, setSubContentToggle] = useState(false);
 const [bodyContentToggle, setBodyContentToggle] = useState(false);
 const [gridLevel, setGridLevelView] = useState(true);
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage, setPostsPerPage] = useState(1);
 const [Component, setComponent] = useState("");
 const [cellForm, setCellForm] = useState([]);
 const [subCellForm, setSubCellForm] = useState([]);
 const [bodyCellForm, setBodyCellForm] = useState([]);
 const [cellQuiz, setCellQuiz] = useState([]);
 const [subCellQuiz, setSubCellQuiz] = useState([]);
 const [bodyCellQuiz, setBodyCellQuiz] = useState([]);

 const formEntry = {
  ...(currentForm !== null && currentForm),
  cellId: "",
 };

 const stringToBoolean = (string) => {
  console.log(string);
  switch (string.toLowerCase().trim()) {
   case "true":
   case "yes":
   case "1":
    return Boolean(string);
   case "false":
   case "no":
   case "0":
   case null:
    return Boolean("");
   default:
    return Boolean(string);
  }
 };

 const addCellForm = (_id) => {
  let newForm = [...cellForm, { ...formEntry, cellId: _id }];

  setCellForm(newForm);
 };

 const addSubCellForm = (_id) => {
  let newForm = [...subCellForm, { ...formEntry, cellId: _id }];

  setSubCellForm(newForm);
 };
 const addBodyCellForm = (_id) => {
  let newForm = [...bodyCellForm, { ...formEntry, cellId: _id }];

  setBodyCellForm(newForm);
 };

 useEffect(() => {
  if (document.getElementById("render").innerHTML) {
   setComponent(document.getElementById("render").innerHTML);
   const mainGridStyles = Object.keys(grid)
    .filter(
     (k) =>
      k.includes("String") || k.includes("Alignment") || k.includes("direction")
    )
    .map((k) => {
     const gridObj = Object.assign({}, { [k]: grid[k] });
     return gridObj;
    });

   let gridStyleObj = { display: "grid" };

   for (const style of mainGridStyles) {
    const {
     direction,
     rowString,
     columnString,
     horizontalAlignment,
     verticalAlignment,
    } = style;

    let gridAutoFlow = direction && {
     ["gridAutoFlow"]: Object.values(direction).toString().replaceAll(",", ""),
    };
    let gridTemplateRows = rowString && {
     ["gridTemplateRows"]: Object.values(rowString)
      .toString()
      .replaceAll(",", ""),
    };
    let gridTemplateColumns = columnString && {
     ["gridTemplateColumns"]: Object.values(columnString)
      .toString()
      .replaceAll(",", ""),
    };
    let justifyContent = horizontalAlignment && {
     ["justifyContent"]: Object.values(horizontalAlignment)
      .toString()
      .replaceAll(",", ""),
    };
    let alignContent = verticalAlignment && {
     ["alignContent"]: Object.values(verticalAlignment)
      .toString()
      .replaceAll(",", ""),
    };

    gridStyleObj = Object.assign(
     {},
     gridStyleObj,
     gridAutoFlow != null && gridAutoFlow,
     gridTemplateColumns != null && gridTemplateColumns,
     gridTemplateRows != null && gridTemplateRows,
     justifyContent != null && justifyContent,
     alignContent != null && alignContent
    );
   }

   let gridClasses = ReactDOMServer.renderToString(
    document.getElementById("render").innerHTML
   ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

   const mainGridClass = {
    [gridClasses
     .filter((c) => c.includes(grid.key))
     .toString()
     .split(" ")[2]]: gridStyleObj,
   };

   const layoutStyles = [{ ...mainGridClass }];

   if (subGrids.length > 0) {
    subGrids.map(
     (
      {
       direction,
       rowString,
       columnString,
       horizontalAlignment,
       verticalAlignment,
       key,
       parent,
      },
      i
     ) => {
      if (
       cells[cells.findIndex((x) => x.id === parent)]["viewState"] === false
      ) {
       let styleObj = {};
       let gridAutoFlow = direction && {
        ["gridAutoFlow"]: Object.values(direction)
         .toString()
         .replaceAll(",", ""),
       };
       let gridTemplateRows = rowString && {
        ["gridTemplateRows"]: Object.values(rowString)
         .toString()
         .replaceAll(",", ""),
       };
       let gridTemplateColumns = columnString && {
        ["gridTemplateColumns"]: Object.values(columnString)
         .toString()
         .replaceAll(",", ""),
       };
       let justifyContent = horizontalAlignment && {
        ["justifyContent"]: Object.values(horizontalAlignment)
         .toString()
         .replaceAll(",", ""),
       };
       let alignContent = verticalAlignment && {
        ["alignContent"]: Object.values(verticalAlignment)
         .toString()
         .replaceAll(",", ""),
       };

       styleObj = Object.assign(
        {},
        styleObj,
        gridAutoFlow != null && gridAutoFlow,
        gridTemplateColumns != null && gridTemplateColumns,
        gridTemplateRows != null && gridTemplateRows,
        justifyContent != null && justifyContent,
        alignContent != null && alignContent
       );

       let gridClasses = ReactDOMServer.renderToString(
        document.getElementById("render").innerHTML
       ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

       for (const classn of gridClasses) {
        if (classn.includes(key)) {
         const gridClass = {
          [gridClasses
           .filter((c) => c.includes(key))
           .toString()
           .split(" ")[2]]: styleObj,
         };

         return layoutStyles.push(gridClass);
        }
       }
      }
     }
    );
   }

   if (bodyGrids.length > 0) {
    bodyGrids.map(
     (
      {
       direction,
       rowString,
       columnString,
       horizontalAlignment,
       verticalAlignment,
       key,
       parent,
      },
      i
     ) => {
      if (
       subCells[subCells.findIndex((x) => x.id === parent)] &&
       subCells[subCells.findIndex((x) => x.id === parent)]["subViewState"] ===
        false
      ) {
       let styleObj = {};
       let gridAutoFlow = direction && {
        ["gridAutoFlow"]: Object.values(direction)
         .toString()
         .replaceAll(",", ""),
       };
       let gridTemplateRows = rowString && {
        ["gridTemplateRows"]: Object.values(rowString)
         .toString()
         .replaceAll(",", ""),
       };
       let gridTemplateColumns = columnString && {
        ["gridTemplateColumns"]: Object.values(columnString)
         .toString()
         .replaceAll(",", ""),
       };
       let justifyContent = horizontalAlignment && {
        ["justifyContent"]: Object.values(horizontalAlignment)
         .toString()
         .replaceAll(",", ""),
       };
       let alignContent = verticalAlignment && {
        ["alignContent"]: Object.values(verticalAlignment)
         .toString()
         .replaceAll(",", ""),
       };

       styleObj = Object.assign(
        {},
        styleObj,
        gridAutoFlow != null && gridAutoFlow,
        gridTemplateColumns != null && gridTemplateColumns,
        gridTemplateRows != null && gridTemplateRows,
        justifyContent != null && justifyContent,
        alignContent != null && alignContent
       );

       let gridClasses = ReactDOMServer.renderToString(
        document.getElementById("render").innerHTML
       ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

       for (const classn of gridClasses) {
        if (classn.includes(key)) {
         const gridClass = {
          [gridClasses
           .filter((c) => c.includes(key))
           .toString()
           .split(" ")[2]]: styleObj,
         };

         return layoutStyles.push(gridClass);
        }
       }
      }
     }
    );
   }

   if (cells.length > 0) {
    cells.map(({ top, left, width, height, center, id }, i) => {
     let styleObj = {};
     let gridColumnStart = left && {
      ["gridColumnStart"]: Object.values(left).toString().replaceAll(",", ""),
     };
     let gridRowStart = top && {
      ["gridRowStart"]: Object.values(top).toString().replaceAll(",", ""),
     };
     let gridColumnEnd = width && {
      ["gridColumnEnd"]: `span ${Object.values(width)
       .toString()
       .replaceAll(",", "")}`,
     };
     let gridRowEnd = height && {
      ["gridRowEnd"]: `span ${Object.values(height)
       .toString()
       .replaceAll(",", "")}`,
     };
     let textAlign = center && {
      ["textAlign"]: "center",
     };

     styleObj = {
      gridColumnStart,
      gridRowStart,
      gridColumnEnd,
      gridRowEnd,
      textAlign,
     };

     let cellClasses = ReactDOMServer.renderToString(
      document.getElementById("render").innerHTML
     ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

     for (const classn of cellClasses) {
      if (classn.includes(id)) {
       const cellClass = {
        [cellClasses
         .filter((c) => c.includes(id))[0]
         .toString()
         .split(" ")[2]]: styleObj,
       };

       return layoutStyles.push(cellClass);
      }
     }
    });
   }

   if (subCells.length > 0) {
    subCells.map(({ top, left, width, height, center, id }, i) => {
     let styleObj = {};
     let gridColumnStart = left && {
      ["gridColumnStart"]: Object.values(left).toString().replaceAll(",", ""),
     };
     let gridRowStart = top && {
      ["gridRowStart"]: Object.values(top).toString().replaceAll(",", ""),
     };
     let gridColumnEnd = width && {
      ["gridColumnEnd"]: `span ${Object.values(width)
       .toString()
       .replaceAll(",", "")}`,
     };
     let gridRowEnd = height && {
      ["gridRowEnd"]: `span ${Object.values(height)
       .toString()
       .replaceAll(",", "")}`,
     };
     let textAlign = center && {
      ["textAlign"]: "center",
     };

     styleObj = {
      gridColumnStart,
      gridRowStart,
      gridColumnEnd,
      gridRowEnd,
      textAlign,
     };

     let cellClasses = ReactDOMServer.renderToString(
      document.getElementById("render").innerHTML
     ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

     for (const classn of cellClasses) {
      if (classn.includes(id)) {
       const cellClass = {
        [cellClasses
         .filter((c) => c.includes(id))[0]
         .toString()
         .split(" ")[2]]: styleObj,
       };

       return layoutStyles.push(cellClass);
      }
     }
    });
   }

   if (bodyCells.length > 0) {
    bodyCells.map(({ top, left, width, height, center, id }, i) => {
     let styleObj = {};
     let gridColumnStart = left && {
      ["gridColumnStart"]: Object.values(left).toString().replaceAll(",", ""),
     };
     let gridRowStart = top && {
      ["gridRowStart"]: Object.values(top).toString().replaceAll(",", ""),
     };
     let gridColumnEnd = width && {
      ["gridColumnEnd"]: `span ${Object.values(width)
       .toString()
       .replaceAll(",", "")}`,
     };
     let gridRowEnd = height && {
      ["gridRowEnd"]: `span ${Object.values(height)
       .toString()
       .replaceAll(",", "")}`,
     };
     let textAlign = center && {
      ["textAlign"]: "center",
     };

     styleObj = {
      gridColumnStart,
      gridRowStart,
      gridColumnEnd,
      gridRowEnd,
      textAlign,
     };

     let cellClasses = ReactDOMServer.renderToString(
      document.getElementById("render").innerHTML
     ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

     for (const classn of cellClasses) {
      if (classn.includes(id)) {
       const cellClass = {
        [cellClasses
         .filter((c) => c.includes(id))[0]
         .toString()
         .split(" ")[2]]: styleObj,
       };

       return layoutStyles.push(cellClass);
      }
     }
    });
   }

   setComponentString(Component, layoutStyles);
  }

  /*

   let gridClasses = 
   ReactDOMServer.renderToString(
    document.getElementById("render").innerHTML
   ).match(/(?<=class=&quot;G\s*).*?(?=\s*&quot;)/gs);

   let cellClasses = ReactDOMServer.renderToString(
    document.getElementById("render").innerHTML
   ).match(/(?<=class=&quot;C\s*).*?(?=\s*&quot;)/gs);

   if (gridClasses) {
    gridClasses.forEach((classn) => {
     const grid = document.getElementsByClassName(classn);

     var style = window.getComputedStyle
      ? getComputedStyle(grid[0], null)
      : grid[0].currentStyle;

     const styleKeys = Object.keys(style).filter(
      (k) => k.includes("grid") || k.includes("gap") || k.includes("display")
     );

     console.log(styleKeys);
     
  
  display: grid;
  grid-auto-flow: 
  grid-auto-rows: 
  grid-template-rows:
  grid-template-columns: 
  justify-content:
  align-content

  grid-gap: 
  column-gap: 
  row-gap:
  areas:


     grid-column-end: span width
  grid-row-end: span height
  grid-column-start: left
  grid-row-start: top
  text-align: center 


       console.log(styleKeys);
    });
   }

   if (cellClasses) {
    cellClasses = cellClasses.map((g) => "C" + g);
    cellClasses.forEach((classn) => {
     console.log(document.getElementsByClassName(classn));
    });
   }


*/
 }, [grid, subGrids, bodyGrids, cells, subCells, bodyCells]);

 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;

 const toggleGrid = useCallback(() => {
  setGridLevelView(false);
 }, []);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 useEffect(() => {
  setElements([
   ...component,
   ...li,
   ...h,
   ...p,
   ...a,
   ...icon,
   ...button,
   ...img,
   ...vid,
  ]);

  setNewCells(cells, elements, cellForm);
  setNewBodyCells(subCells, elements, bodyCellForm);
  setNewSubCells(bodyCells, elements, subCellForm);
 }, [
  component,
  h,
  li,
  p,
  a,
  icon,
  button,
  img,
  vid,
  cellForm,
  bodyCellForm,
  subCellForm,
 ]);

 useEffect(() => {
  if (
   contentImage !== null &&
   contentImage.background === true &&
   contentImage.level === "cell"
  ) {
   let newResults = [...cells];
   newResults[contentImage.imgIndex] = {
    ...newResults[contentImage.imgIndex],

    ["code"]: contentImage.code,
    ["alt"]: contentImage.name,
    ["level"]: "cell",
   };

   setNewCells(newResults);
   clearCurrentImage();
  } else if (
   contentImage !== null &&
   contentImage.background === true &&
   contentImage.level === "subCell"
  ) {
   let newResults = [...subCells];
   newResults[contentImage.imgIndex] = {
    ...newResults[contentImage.imgIndex],

    ["code"]: contentImage.code,
    ["level"]: "subCell",
    ["alt"]: contentImage.name,
   };

   setNewSubCells(newResults);
   clearCurrentImage();
  } else if (
   contentImage !== null &&
   contentImage.background === true &&
   contentImage.level === "bodyCell"
  ) {
   let newResults = [...bodyCells];
   newResults[contentImage.imgIndex] = {
    ...newResults[contentImage.imgIndex],
    ["background"]: "image",
    ["code"]: contentImage.code,
    ["alt"]: contentImage.name,
    ["level"]: "bodyCell",
   };

   setNewBodyCells(newResults);
   clearCurrentImage();
  } else if (contentImage !== null && contentImage.background === false) {
   let newResults = [...elements];

   newResults[newResults.findIndex((x) => x.name === contentImage.name)] = {
    ...newResults[newResults.findIndex((x) => x.name === contentImage.name)],
    code: contentImage.code,
   };

   setElements(newResults);
   setNewCells(cells, elements);
   setNewBodyCells(subCells, elements);
   setNewSubCells(bodyCells, elements);
  }
 }, [contentImage, imageContext]);

 return (
  <div id='render'>
   <Grid
    key={grid.key}
    columns={grid.columnString}
    rows={grid.rowString}
    flow={grid.direction}
    justifyContent={grid.horizontalAlignment}
    alignContent={grid.verticalAlignment}
    className={`G${grid.key}`}>
    {cells.map(
     (
      {
       top,
       left,
       position,
       background,
       rowSpan,
       columnSpan,
       id,
       viewState,
       content,
       code,
       css,
       contentCss,
      },
      i
     ) => {
      const flatCss = Object.assign(
       {},
       ...(function _flatten(o) {
        return [].concat(
         ...Object.keys(o).map((k) =>
          typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
         )
        );
       })(css)
      );

      const currentResults = contentCss.slice(
       indexOfFirstPost,
       indexOfLastPost
      );

      return (
       <Cell
        className={`C${id}`}
        height={rowSpan}
        width={columnSpan}
        style={{}}
        top={parseInt(top)}
        left={parseInt(left)}
        center={position === "true" ? true : false}
        key={id}>
        {viewState === true ? (
         <div>
          <div className='grid-2'>
           <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
            <button
             className='btn btn-block btn-dark'
             onClick={() => addCellForm(_id)}>
             Add Current Form To This Cell
            </button>
            <button
             className='btn btn-block btn-dark'
             onClick={() =>
              setCellQuiz([...cellQuiz, { quiz: builtQuiz, cell: _id }])
             }>
             Add Built Quiz To This Cell
            </button>
            {cellContentToggle === true ? (
             <div style={{ height: "500px", overflowY: "scroll" }}>
              <span className='lead bg-light' style={{ float: "right" }}>
               <a
                onClick={() => setCellContentToggle((prevState) => !prevState)}>
                X
               </a>
              </span>
              <h5>{gridLevel && "Grid Level"} Styles</h5>
              <button
               className='btn btn-light btn-sm'
               onClick={() => setGridLevelView(true)}>
               View Grid Level Styles
              </button>
              {gridLevel === false ? (
               <h5>
                Each Number corresponds with the section ordinality of the
                content assigned to this cell
               </h5>
              ) : (
               ""
              )}
              <CssFilter
               i={i}
               ind={contentCss.findIndex((x) => x.id === currentResults[0].id)}
               level={gridLevel === true ? "cell" : "cellChild"}
              />
              <Pagination
               postsPerPage={postsPerPage}
               totalPosts={contentCss.length}
               paginate={paginate}
               toggleGrid={toggleGrid}
              />

              {Object.keys(filtered).length > 0 &&
               Object.keys(filtered).map((key) => {
                if (key.includes("Color")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option>Set Color...</option>
                    <option value={pallet && pallet.primary}>Primary</option>
                    <option value={pallet && pallet.dark}>Dark</option>
                    <option value={pallet && pallet.light}>Light</option>
                    <option value={pallet && pallet.danger}>Danger</option>
                    <option value={pallet && pallet.success}>Success</option>
                   </select>
                  </label>
                 );
                } else if (key === "animation") {
                 return (
                  <label key={key}>
                   <div className='card'>
                    <button
                     className='btn btn-sm btn-dark'
                     onClick={() => addCellAnimation(i)}>
                     + Animation
                    </button>
                    <h5>Current Animation Order</h5>
                    <ul>
                     {css.animation.length > 0 &&
                      css.animation.map(
                       (
                        {
                         animationName,
                         animationDuration,
                         animationTimingFunction,
                         animationDelay,
                         animationIterationCount,
                         animationDirection,
                         animationFillMode,
                         cubicNs,
                         steps,
                         keyframes,
                        },
                        index
                       ) => (
                        <div>
                         <h5>Animation Name</h5>
                         <input
                          type='text'
                          name='animationName'
                          value={animationName}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         <h5>Animation Duration</h5>
                         <input
                          type='text'
                          name='animationDuration'
                          value={animationDuration}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         <h5>Animation Function</h5>
                         <select
                          name='animationTimingFunction'
                          value={animationTimingFunction}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }>
                          <option></option>
                          <option value='ease'>Ease</option>
                          <option value='ease-in'>Ease In</option>
                          <option value='ease-in-out'>Ease In Out</option>
                          <option value='step-end'>Step End</option>
                          <option value='step-start'>Step Start</option>
                          <option value='cubic-bezier'>Cubic Bezier</option>
                          <option value='steps'>Steps</option>
                          <option value='inherit'>Inherit</option>
                          <option value='initial'>Initial</option>
                         </select>
                         <h5>Animation Delay</h5>
                         <input
                          placeholder='enter a value in seconds'
                          type='text'
                          name='animationDelay'
                          value={animationDelay}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         {animationTimingFunction === "cubic-bezier" &&
                          Object.keys(cubicNs).map((n) => (
                           <div>
                            <h5>Cubic Bez (n,n,n,n)</h5>
                            <div key={n}>
                             <h5>N {parseInt(n) + 1}</h5>
                             <Slider
                              axis='x'
                              x={css["animation"][index]["cubicNs"][n]}
                              value={parseFloat(
                               css["animation"][index]["cubicNs"][n]
                              )}
                              onChange={(e) =>
                               onChangeCell(i, e, "cubicNs", index, n)
                              }
                              orientation='horizontal'
                              name={n}
                              min={0}
                              max={1}
                              step={0.01}
                             />
                            </div>
                           </div>
                          ))}
                         <h5>Animation Iteration Count</h5>
                         <input
                          placeholder='Positive Integers Only'
                          type='text'
                          name='animationIterationCount'
                          value={animationIterationCount}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         <h5>Animation Iteration Count</h5>
                         <input
                          placeholder='Positive Integers Only'
                          type='text'
                          name='animationIterationCount'
                          value={animationIterationCount}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         <h5>Animation Direction</h5>
                         <select
                          name='animationDirection'
                          value={animationDirection}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }>
                          <option></option>
                          <option value='normal'>Normal</option>
                          <option value='reverse'>Reverse</option>
                          <option value='alternate'>Alternate</option>
                          <option value='reverse'>Alternate Reverse</option>
                          <option value='inherit'>Inherit</option>
                         </select>
                         <h5>Animation Fill Mode</h5>
                         <select
                          name='animationFillMode'
                          value={animationFillMode}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }>
                          <option></option>
                          <option value='none'>None</option>
                          <option value='forward'>Forward</option>
                          <option value='backward'>Backward</option>
                          <option value='both'>Both</option>
                          <option value='inherit'>Inherit</option>
                         </select>
                         <h5>Key Frames</h5>
                         <button
                          className='btn btn-sm btn-dark'
                          onClick={() => addCellAnimationKeyframe(i, index)}>
                          + Keyframe
                         </button>
                         lineHeight:'',
                        </div>
                       )
                      )}
                    </ul>
                   </div>
                  </label>
                 );
                } else if (key === "posiition") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   ition
                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='fixed'>Fixed</option>
                    <option value='relative'>Relative</option>
                    <option value='absolute'>Absolute</option>
                   </select>
                  </label>
                 );
                } else if (key === "backgroundRepeat") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='repeatX'>Repeat X</option>
                    <option value='repeatY'>Repeat Y</option>
                    <option value='repeat'>Repeat</option>
                    <option value='space'>Space</option>
                    <option value='round'>Round</option>
                    <option value='noRepeat'>No Repeat</option>
                   </select>
                  </label>
                 );
                } else if (key === "backgroundPosition") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='center'>Center</option>
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                    <option value='top'>Top</option>
                    <option value='bottom'>Bottom</option>
                   </select>
                  </label>
                 );
                } else if (key === "backgroundSize") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='cover'>Cover</option>
                    <option value='contain'>Contain</option>
                   </select>
                  </label>
                 );
                } else if (key === "display") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='block'>Block</option>
                    <option value='inline'>Inline</option>
                    <option value='inline-block'>Inline Block</option>
                    <option value='flex'>Flex</option>
                    <option value='none'>None</option>
                   </select>
                  </label>
                 );
                } else if (key === "textDecorationLine") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='none'>None</option>
                    <option value='underline'>Underline</option>
                    <option value='overline'>Overline</option>
                    <option value='line-through'>Line Through</option>
                    <option value='blink'>Blink</option>
                   </select>
                  </label>
                 );
                } else if (key === "textDecorationStyle") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='solid'>Solid</option>
                    <option value='double'>Double</option>
                    <option value='dotted'>Dotted</option>
                    <option value='dashed'>Dashed</option>
                    <option value='wavy'>Wavy</option>
                   </select>
                  </label>
                 );
                } else if (key === "transition") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <button
                    className='btn btn-sm btn-dark'
                    onClick={() => addCellTransition(i)}>
                    + Transition
                   </button>
                   <div
                    className='card'
                    style={{ overflowY: "scroll", overflowX: "scroll" }}>
                    {css.transition.map(
                     (
                      { property, duration, timingFunction, cubicNs, delay },
                      index
                     ) => (
                      <div key={index} className='card'>
                       <h5>Transition Property</h5>
                       <select
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }
                        value={property}
                        name='property'>
                        <option value=''></option>
                        {Object.keys(flatCss)
                         .filter((e) => typeof parseInt(e) === "number")
                         .map((c, i) => (
                          <option key={i} value={c}>
                           {c}
                          </option>
                         ))}
                        <option value='color'>Color</option>
                        <option value='background-color'>
                         Background Color
                        </option>
                       </select>
                       <h5>Transition Timing</h5>
                       <input
                        type='text'
                        name='duration'
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }
                        value={duration}
                        placeholder='Enter A Value in seconds'
                       />
                       <h5>Transition Function</h5>
                       <select
                        name='timingFunction'
                        value={timingFunction}
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }>
                        <option></option>
                        <option value='ease'>Ease</option>
                        <option value='ease-in'>Ease In</option>
                        <option value='ease-in-out'>Ease In Out</option>
                        <option value='step-end'>Step End</option>
                        <option value='step-start'>Step Start</option>
                        <option value='cubic-bezier'>Cubic Bezier</option>
                        <option value='inherit'>Inherit</option>
                        <option value='initial'>Initial</option>
                       </select>
                       <h5>Transition Delay</h5>
                       <input
                        type='text'
                        name='delay'
                        value={delay}
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }
                        placeholder='Enter A Value in seconds'
                       />

                       {timingFunction === "cubic-bezier" &&
                        Object.keys(cubicNs).map((n) => (
                         <div>
                          <h5>Cubic Bez (n,n,n,n)</h5>
                          <div key={n}>
                           <h5>N {parseInt(n) + 1}</h5>
                           <Slider
                            axis='x'
                            x={css["transition"][index]["cubicNs"][n]}
                            value={parseFloat(
                             css["transition"][index]["cubicNs"][n]
                            )}
                            onChange={(e) =>
                             onChangeCell(i, e, "cubicNs", index, n)
                            }
                            orientation='horizontal'
                            name={n}
                            min={0}
                            max={1}
                            step={0.01}
                           />
                          </div>
                         </div>
                        ))}
                      </div>
                     )
                    )}
                   </div>
                  </label>
                 );
                } else if (key === "transform") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    onChange={(e) => onChangeCell(i, e, "transform")}
                    multiple>
                    <option></option>
                    <option value='rotateX'>RotateX</option>
                    <option value='rotateY'>RotateY</option>
                    <option value='skewX'>SkewX</option>
                    <option value='skewY'>SkewY</option>
                    <option value='rotateZ'>RotateZ</option>
                    <option value='scaleX'>ScaleX</option>
                    <option value='scaleY'>ScaleY</option>
                    <option value='translateX'>TranslateX</option>
                    <option value='translateY'>TranslateY</option>
                   </select>
                  </label>
                 );
                } else if (key === "transformProp") {
                 return (
                  <label key={key}>
                   <div className='card all-center'>
                    <h5>Current Transform Order</h5>
                    <ul>
                     {css.transform.map((m) => (
                      <li key={m}>{m}</li>
                     ))}
                    </ul>
                   </div>
                   {css.transform.includes("rotateZ") && (
                    <div>
                     <h5>Rotate Z Deg</h5>
                     <Slider
                      axis='x'
                      x={css["transformProp"]["rotateZ"]}
                      value={parseInt(css["transformProp"]["rotateZ"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "rotateZ", "transformProp")
                      }
                      orientation='horizontal'
                      name='rotateZ'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("rotateX") && (
                    <div>
                     <h5>Rotate X Deg</h5>
                     <Slider
                      axis='x'
                      x={css["transformProp"]["rotateX"]}
                      value={parseInt(css["transformProp"]["rotateX"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "rotateX", "transformProp")
                      }
                      orientation='horizontal'
                      name='rotateX'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("translateX") && (
                    <div>
                     <h5>Translate X Px</h5>
                     <input
                      type='text'
                      name='translateX'
                      value={css["transformProp"]["translateX"]}
                      onChange={(e) =>
                       onChangeCell(
                        i,
                        e.target.value,
                        "translateX",
                        "transformProp"
                       )
                      }
                     />
                    </div>
                   )}
                   {css.transform.includes("translateY") && (
                    <div>
                     <h5>Translate Y Px</h5>
                     <input
                      type='text'
                      name='translateY'
                      value={css["transformProp"]["translateY"]}
                      onChange={(e) =>
                       onChangeCell(
                        i,
                        e.target.value,
                        "translateY",
                        "transformProp"
                       )
                      }
                     />
                    </div>
                   )}
                   {css.transform.includes("rotateY") && (
                    <div>
                     <h5>Rotate Y Deg</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["rotateY"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "rotateY", "transformProp")
                      }
                      orientation='horizontal'
                      name='rotateY'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("skewX") && (
                    <div>
                     <h5>Skew X Deg</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["skewX"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "skewX", "transformProp")
                      }
                      orientation='horizontal'
                      name='skewX'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("skewY") && (
                    <div>
                     <h5>Skew Y Deg</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["skewY"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "skewY", "transformProp")
                      }
                      orientation='horizontal'
                      name='skewY'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("scaleX") && (
                    <div>
                     <h5>Scale X Percent</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["scaleX"]) * 10}
                      onChange={(e) =>
                       onChangeCell(i, e / 10, "scaleX", "transformProp")
                      }
                      orientation='horizontal'
                      name='scaleX'
                      min={-100}
                      max={200}
                      step={1}
                     />
                    </div>
                   )}{" "}
                   {css.transform.includes("scaleY") && (
                    <div>
                     <h5>Scale Y Percent</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["scaleY"]) * 10}
                      onChange={(e) =>
                       onChangeCell(i, e / 10, "scaleY", "transformProp")
                      }
                      orientation='horizontal'
                      name='scaleY'
                      min={-100}
                      max={200}
                      step={1}
                     />
                    </div>
                   )}
                  </label>
                 );
                } else if (key === "fontSize") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='5px'>XX Small</option>
                    <option value='7px'>X Small</option>
                    <option value='11px'>Small</option>
                    <option value='16px'>Medium</option>
                    <option value='24px'>Large</option>
                    <option value='36px'>X Large</option>
                    <option value='54px'>XX Large</option>
                   </select>
                  </label>
                 );
                } else if (key.includes("Inset")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option>Outer</option>
                    <option value='inset'>Inset</option>
                   </select>
                  </label>
                 );
                } else if (key === "fontWeight") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option value='100'>100</option>
                    <option value='200'>200</option>
                    <option value='300'>300</option>
                    <option value='400'>400</option>
                    <option value='500'>500</option>
                    <option value='600'>600</option>
                    <option value='700'>700</option>
                    <option value='800'>800</option>
                    <option value='900'>900</option>
                   </select>
                  </label>
                 );
                } else if (key === "opacity") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <Slider
                    axis='x'
                    x={css.opacity}
                    value={parseInt(css[key])}
                    onChange={(e) => onChangeCell(i, e, "opacity", "slider")}
                    orientation='horizontal'
                    min={0}
                    max={100}
                    step={1}
                   />
                  </label>
                 );
                } else if (key.includes("Radius")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <Slider
                    value={parseInt(css[key])}
                    onChange={(e) => onChangeCell(i, e, key, "slider")}
                    orientation='horizontal'
                    min={0}
                    max={50}
                    step={0.5}
                   />
                  </label>
                 );
                } else if (key === "textAlign") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>

                    <option value='start'>Start</option>
                    <option value='end'>End</option>
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                    <option value='center'>Center</option>
                    <option value='justify'>Justify</option>
                    <option value='matchParent'>Match Parent</option>
                    <option value='justifyAll'>Justify All</option>
                   </select>
                  </label>
                 );
                } else if (key.includes("border") && key.includes("Style")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='solid'>Solid</option>
                    <option value='double'>Double</option>
                    <option value='dotted'>Dotted</option>
                    <option value='dashed'>Dashed</option>
                    <option value='groove'>Groove</option>
                    <option value='none'>None</option>
                    <option value='hidden'>Hidden</option>
                    <option value='ridge'>Ridge</option>
                    <option value='inset'>Inset</option>
                    <option value='outset'>Outset</option>
                   </select>
                  </label>
                 );
                } else if (key === "textShadowSize") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='small'>2px</option>
                   </select>
                  </label>
                 );
                } else if (key.includes("overflow")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='visible'>Visible</option>
                    <option value='hidden'>Hidden</option>
                    <option value='clip'>Clip</option>
                    <option value='scroll'>Scroll</option>
                    <option value='auto'>Auto</option>
                   </select>
                  </label>
                 );
                } else {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <input
                    type='text'
                    placeholder='Enter A Value In Pixels'
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}
                    name={key}
                   />
                  </label>
                 );
                }
               })}

              {gridLevel &&
               Object.keys(filtered).length === 0 &&
               Object.keys(css).map((key) => {
                if (key.includes("Color")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option>Set Color...</option>
                    <option value={pallet && pallet.primary}>Primary</option>
                    <option value={pallet && pallet.dark}>Dark</option>
                    <option value={pallet && pallet.light}>Light</option>
                    <option value={pallet && pallet.danger}>Danger</option>
                    <option value={pallet && pallet.success}>Success</option>
                   </select>
                  </label>
                 );
                } else if (key === "position") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='fixed'>Fixed</option>
                    <option value='relative'>Relative</option>
                    <option value='absolute'>Absolute</option>
                   </select>
                  </label>
                 );
                } else if (key === "backgroundRepeat") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='repeatX'>Repeat X</option>
                    <option value='repeatY'>Repeat Y</option>
                    <option value='repeat'>Repeat</option>
                    <option value='space'>Space</option>
                    <option value='round'>Round</option>
                    <option value='noRepeat'>No Repeat</option>
                   </select>
                  </label>
                 );
                } else if (key === "backgroundPosition") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='center'>Center</option>
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                    <option value='top'>Top</option>
                    <option value='bottom'>Bottom</option>
                   </select>
                  </label>
                 );
                } else if (key === "backgroundSize") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='cover'>Cover</option>
                    <option value='contain'>Contain</option>
                   </select>
                  </label>
                 );
                } else if (key === "display") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='block'>Block</option>
                    <option value='inline'>Inline</option>
                    <option value='inline-block'>Inline Block</option>
                    <option value='flex'>Flex</option>
                    <option value='none'>None</option>
                   </select>
                  </label>
                 );
                } else if (key === "textDecorationLine") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='none'>None</option>
                    <option value='underline'>Underline</option>
                    <option value='overline'>Overline</option>
                    <option value='line-through'>Line Through</option>
                    <option value='blink'>Blink</option>
                   </select>
                  </label>
                 );
                } else if (key === "textDecorationStyle") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='solid'>Solid</option>
                    <option value='double'>Double</option>
                    <option value='dotted'>Dotted</option>
                    <option value='dashed'>Dashed</option>
                    <option value='wavy'>Wavy</option>
                   </select>
                  </label>
                 );
                } else if (key === "transition") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <button
                    className='btn btn-sm btn-dark'
                    onClick={() => addCellTransition(i)}>
                    + Transition
                   </button>
                   <div
                    className='card'
                    style={{ overflowY: "scroll", overflowX: "scroll" }}>
                    {css.transition.map(
                     (
                      { property, duration, timingFunction, cubicNs, delay },
                      index
                     ) => (
                      <div key={index} className='card'>
                       <h5>Transition Property</h5>
                       <select
                        name='property'
                        value={property}
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }>
                        <option value='translate'>Translate</option>
                        <option value='transform'>Transform</option>
                        <option value='height'>Height</option>
                        <option value='width'>Width</option>
                        <option value='border-left-color'>
                         Border Left Color
                        </option>
                        <option value='border-left-width'>
                         Border Left Width
                        </option>
                        <option value='background-color'>
                         Background Color
                        </option>
                        <option value='background-position'>
                         Background Position
                        </option>
                        <option value='background-size'>Background Size</option>
                        <option value='border-bottom-color'>
                         Border Bottom Color
                        </option>
                        <option value='border-bottom-left-radius'>
                         Border Bottom Left Radius
                        </option>
                        <option value='border-bottom-right-radius'>
                         Border Bottom Right Radius
                        </option>
                        <option value='border-bottom-width'>
                         Border Bottom Width
                        </option>
                        <option value='border-radius'>Border Radius</option>
                        <option value='border-right'>Border Right</option>
                        <option value='border-right-color'>
                         Border Right Color
                        </option>
                        <option value='border-right-width'>
                         Border Right Width
                        </option>
                        <option value='border-color'>Border Color</option>
                        <option value='border-width'>Border Width</option>
                        <option value='border-top-color'>
                         Border Top Color
                        </option>
                        <option value='border-top-left-radius'>
                         Border Top Left Radius
                        </option>
                        <option value='border-top-right-radius'>
                         Border Top Right Radius
                        </option>
                        <option value='border-top-width'>
                         Border Top Width
                        </option>
                        <option value='box-shadow'>Box Shadow</option>
                        <option value='font'>Font</option>
                        <option value='font-size'>Font Size</option>
                        <option value='flex'>Flex</option>
                        <option value='font-weight'>Font Weight</option>
                        <option value='line-height'>Line Height</option>
                        <option value='margin-bottom'>Margin Bottom</option>
                        <option value='margin'>Margin</option>
                        <option value='margin-left'>Margin Left</option>
                        <option value='margin-top'>Margin Top</option>
                        <option value='margin-right'>Margin Right</option>
                        <option value='opacity'>Opacity</option>
                        <option value='outline'>Outline</option>
                        <option value='padding-left'>Padding Left</option>
                        <option value='padding-right'>Padding Right</option>
                        <option value='padding-top'>Padding Top</option>
                        <option value='z-index'>Z Index</option>
                        <option value='padding-bottom'>Padding Bottom</option>
                        <option value='top'>Top</option>
                        <option value='left'>Left</option>
                        <option value='right'>Right</option>
                        <option value='bottom'>Bottom</option>
                       </select>
                       <h5>Transition Timing</h5>
                       <input
                        type='text'
                        name='duration'
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }
                        value={duration}
                        placeholder='Enter A Value in seconds'
                       />
                       <h5>Transition Function</h5>
                       <select
                        name='timingFunction'
                        value={timingFunction}
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }>
                        <option></option>
                        <option value='ease'>Ease</option>
                        <option value='ease-in'>Ease In</option>
                        <option value='ease-in-out'>Ease In Out</option>
                        <option value='step-end'>Step End</option>
                        <option value='step-start'>Step Start</option>
                        <option value='cubic-bezier'>Cubic Bezier</option>
                        <option value='inherit'>Inherit</option>
                        <option value='initial'>Initial</option>
                       </select>
                       <h5>Transition Delay</h5>
                       <input
                        type='text'
                        name='delay'
                        value={delay}
                        onChange={(e) =>
                         onChangeCell(i, e, "transition", index)
                        }
                        placeholder='Enter A Value in seconds'
                       />

                       {timingFunction === "cubic-bezier" &&
                        Object.keys(cubicNs).map((n) => (
                         <div>
                          <h5>Cubic Bez (n,n,n,n)</h5>
                          <div key={n}>
                           <h5>N {parseInt(n) + 1}</h5>
                           <Slider
                            axis='x'
                            x={css["transition"][index]["cubicNs"][n]}
                            value={parseFloat(
                             css["transition"][index]["cubicNs"][n]
                            )}
                            onChange={(e) =>
                             onChangeCell(i, e, "cubicNs", index, n)
                            }
                            orientation='horizontal'
                            name={n}
                            min={0}
                            max={1}
                            step={0.01}
                           />
                          </div>
                         </div>
                        ))}
                      </div>
                     )
                    )}
                   </div>
                  </label>
                 );
                } else if (key === "transform") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    onChange={(e) => onChangeCell(i, e, "transform")}
                    multiple>
                    <option></option>
                    <option value='rotateX'>RotateX</option>
                    <option value='rotateY'>RotateY</option>
                    <option value='skewX'>SkewX</option>
                    <option value='skewY'>SkewY</option>
                    <option value='rotateZ'>RotateZ</option>
                    <option value='scaleX'>ScaleX</option>
                    <option value='scaleY'>ScaleY</option>
                    <option value='translateX'>TranslateX</option>
                    <option value='translateY'>TranslateY</option>
                   </select>
                  </label>
                 );
                } else if (key === "transformProp") {
                 return (
                  <label key={key}>
                   <div className='card all-center'>
                    <h5>Current Transform Order</h5>
                    <ul>
                     {css.transform.map((m) => (
                      <li key={m}>{m}</li>
                     ))}
                    </ul>
                   </div>
                   {css.transform.includes("rotateZ") && (
                    <div>
                     <h5>Rotate Z Deg</h5>
                     <Slider
                      axis='x'
                      x={css["transformProp"]["rotateZ"]}
                      value={parseInt(css["transformProp"]["rotateZ"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "rotateZ", "transformProp")
                      }
                      orientation='horizontal'
                      name='rotateZ'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("rotateX") && (
                    <div>
                     <h5>Rotate X Deg</h5>
                     <Slider
                      axis='x'
                      x={css["transformProp"]["rotateX"]}
                      value={parseInt(css["transformProp"]["rotateX"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "rotateX", "transformProp")
                      }
                      orientation='horizontal'
                      name='rotateX'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("translateX") && (
                    <div>
                     <h5>Translate X Px</h5>
                     <input
                      type='text'
                      name='translateX'
                      value={css["transformProp"]["translateX"]}
                      onChange={(e) =>
                       onChangeCell(
                        i,
                        e.target.value,
                        "translateX",
                        "transformProp"
                       )
                      }
                     />
                    </div>
                   )}
                   {css.transform.includes("translateY") && (
                    <div>
                     <h5>Translate Y Px</h5>
                     <input
                      type='text'
                      name='translateY'
                      value={css["transformProp"]["translateY"]}
                      onChange={(e) =>
                       onChangeCell(
                        i,
                        e.target.value,
                        "translateY",
                        "transformProp"
                       )
                      }
                     />
                    </div>
                   )}
                   {css.transform.includes("rotateY") && (
                    <div>
                     <h5>Rotate Y Deg</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["rotateY"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "rotateY", "transformProp")
                      }
                      orientation='horizontal'
                      name='rotateY'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("skewX") && (
                    <div>
                     <h5>Skew X Deg</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["skewX"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "skewX", "transformProp")
                      }
                      orientation='horizontal'
                      name='skewX'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("skewY") && (
                    <div>
                     <h5>Skew Y Deg</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["skewY"])}
                      onChange={(e) =>
                       onChangeCell(i, e, "skewY", "transformProp")
                      }
                      orientation='horizontal'
                      name='skewY'
                      min={0}
                      max={360}
                      step={1}
                     />
                    </div>
                   )}
                   {css.transform.includes("scaleX") && (
                    <div>
                     <h5>Scale X Percent</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["scaleX"]) * 10}
                      onChange={(e) =>
                       onChangeCell(i, e / 10, "scaleX", "transformProp")
                      }
                      orientation='horizontal'
                      name='scaleX'
                      min={-100}
                      max={200}
                      step={1}
                     />
                    </div>
                   )}{" "}
                   {css.transform.includes("scaleY") && (
                    <div>
                     <h5>Scale Y Percent</h5>
                     <Slider
                      value={parseInt(css["transformProp"]["scaleY"]) * 10}
                      onChange={(e) =>
                       onChangeCell(i, e / 10, "scaleY", "transformProp")
                      }
                      orientation='horizontal'
                      name='scaleY'
                      min={-100}
                      max={200}
                      step={1}
                     />
                    </div>
                   )}
                  </label>
                 );
                } else if (key === "animation") {
                 return (
                  <label key={key}>
                   <div className='card'>
                    <button
                     className='btn btn-sm btn-dark'
                     onClick={() => addCellAnimation(i)}>
                     + Animation
                    </button>
                    <h5>Current Animation Order</h5>
                    <ul>
                     {css.animation.length > 0 &&
                      css.animation.map(
                       (
                        {
                         animationName,
                         animationDuration,
                         animationTimingFunction,
                         animationDelay,
                         animationIterationCount,
                         animationDirection,
                         animationFillMode,
                         cubicNs,
                         keyframes,
                        },
                        index
                       ) => (
                        <div>
                         <h5>Animation Name</h5>
                         <input
                          type='text'
                          name='animationName'
                          value={animationName}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         <h5>Animation Duration</h5>
                         <input
                          type='text'
                          name='animationDuration'
                          value={animationDuration}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         <h5>Animation Function</h5>
                         <select
                          name='animationTimingFunction'
                          value={animationTimingFunction}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }>
                          <option></option>
                          <option value='ease'>Ease</option>
                          <option value='ease-in'>Ease In</option>
                          <option value='ease-in-out'>Ease In Out</option>
                          <option value='step-end'>Step End</option>
                          <option value='step-start'>Step Start</option>
                          <option value='cubic-bezier'>Cubic Bezier</option>
                          <option value='steps'>Steps</option>
                          <option value='inherit'>Inherit</option>
                          <option value='initial'>Initial</option>
                         </select>

                         {animationTimingFunction === "cubic-bezier" &&
                          Object.keys(cubicNs).map((n) => (
                           <div>
                            <h5>Cubic Bez (n,n,n,n)</h5>
                            <div key={n}>
                             <h5>N {parseInt(n) + 1}</h5>
                             <Slider
                              axis='x'
                              x={css["animation"][index]["cubicNs"][n]}
                              value={parseFloat(
                               css["animation"][index]["cubicNs"][n]
                              )}
                              onChange={(e) =>
                               onChangeCell(
                                i,
                                e,
                                "cubicNs",
                                index,
                                n,
                                "animation"
                               )
                              }
                              orientation='horizontal'
                              name={n}
                              min={0}
                              max={1}
                              step={0.01}
                             />
                            </div>
                           </div>
                          ))}
                         <h5>Animation Delay</h5>
                         <input
                          placeholder='enter a value in seconds'
                          type='text'
                          name='animationDelay'
                          value={animationDelay}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />
                         <h5>Animation Iteration Count</h5>

                         <i style={{ fontSize: "8px" }}>
                          Typing the value "infinite" will do what you imagine
                          it does.
                         </i>
                         <input
                          placeholder='Positive Integers Only'
                          type='text'
                          name='animationIterationCount'
                          value={animationIterationCount}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }
                         />

                         <h5>Animation Direction</h5>
                         <select
                          name='animationDirection'
                          value={animationDirection}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }>
                          <option></option>
                          <option value='normal'>Normal</option>
                          <option value='reverse'>Reverse</option>
                          <option value='alternate'>Alternate</option>
                          <option value='reverse'>Alternate Reverse</option>
                          <option value='inherit'>Inherit</option>
                         </select>
                         <h5>Animation Fill Mode</h5>
                         <select
                          name='animationFillMode'
                          value={animationFillMode}
                          onChange={(e) =>
                           onChangeCell(i, e, "animation", index)
                          }>
                          <option></option>
                          <option value='none'>None</option>
                          <option value='forward'>Forward</option>
                          <option value='backward'>Backward</option>
                          <option value='both'>Both</option>
                          <option value='inherit'>Inherit</option>
                         </select>

                         <h5>Key Frames</h5>
                         <button
                          className='btn btn-sm btn-dark'
                          onClick={() => addCellAnimationKeyframe(i, index)}>
                          + Keyframe
                         </button>

                         {keyframes.map(
                          ({ completionPercent, properties }, ind) => (
                           <div>
                            <h5>Completion Percentage </h5>
                            <i style={{ fontSize: "8px" }}>
                             (all animations require a 0 and 100)
                            </i>
                            <input
                             placeholder='enter a value from 0 to 100'
                             type='text'
                             name='completionPercent'
                             value={completionPercent}
                             onChange={(e) =>
                              onChangeCell(i, e, "animationkey", index, ind)
                             }
                            />
                            <button
                             className='btn btn-sm btn-dark'
                             onClick={() =>
                              addCellAnimationKeyframeProperty(i, index, ind)
                             }>
                             + Property
                            </button>

                            {properties.map(
                             (
                              {
                               propName,
                               propValue,
                               shadowValues,
                               transValues,
                              },
                              indy
                             ) => (
                              <div>
                               <select
                                name='propName'
                                value={propName}
                                onChange={(e) =>
                                 onChangeCell(
                                  i,
                                  e,
                                  "animationkeyprop",
                                  index,
                                  ind,
                                  indy
                                 )
                                }>
                                <option value='transform'>Transform</option>
                                <option value='height'>Height</option>
                                <option value='width'>Width</option>
                                <option value='border-left-color'>
                                 Border Left Color
                                </option>
                                <option value='border-left-width'>
                                 Border Left Width
                                </option>
                                <option value='background-color'>
                                 Background Color
                                </option>
                                <option value='background-position'>
                                 Background Position
                                </option>
                                <option value='background-size'>
                                 Background Size
                                </option>
                                <option value='border-bottom-color'>
                                 Border Bottom Color
                                </option>
                                <option value='border-bottom-left-radius'>
                                 Border Bottom Left Radius
                                </option>
                                <option value='border-bottom-right-radius'>
                                 Border Bottom Right Radius
                                </option>
                                <option value='border-bottom-width'>
                                 Border Bottom Width
                                </option>
                                <option value='border-radius'>
                                 Border Radius
                                </option>
                                <option value='border-right'>
                                 Border Right
                                </option>
                                <option value='border-right-color'>
                                 Border Right Color
                                </option>
                                <option value='border-right-width'>
                                 Border Right Width
                                </option>
                                <option value='border-color'>
                                 Border Color
                                </option>
                                <option value='border-width'>
                                 Border Width
                                </option>
                                <option value='border-top-color'>
                                 Border Top Color
                                </option>
                                <option value='border-top-left-radius'>
                                 Border Top Left Radius
                                </option>
                                <option value='border-top-right-radius'>
                                 Border Top Right Radius
                                </option>
                                <option value='border-top-width'>
                                 Border Top Width
                                </option>
                                <option value='box-shadow'>Box Shadow</option>
                                <option value='font'>Font</option>
                                <option value='font-size'>Font Size</option>

                                <option value='font-weight'>Font Weight</option>
                                <option value='line-height'>Line Height</option>
                                <option value='margin-bottom'>
                                 Margin Bottom
                                </option>
                                <option value='margin'>Margin</option>
                                <option value='margin-left'>Margin Left</option>
                                <option value='margin-top'>Margin Top</option>
                                <option value='margin-right'>
                                 Margin Right
                                </option>
                                <option value='opacity'>Opacity</option>

                                <option value='padding-left'>
                                 Padding Left
                                </option>
                                <option value='padding-right'>
                                 Padding Right
                                </option>
                                <option value='padding-top'>Padding Top</option>
                                <option value='z-index'>Z Index</option>
                                <option value='padding-bottom'>
                                 Padding Bottom
                                </option>
                                <option value='top'>Top</option>
                                <option value='left'>Left</option>
                                <option value='right'>Right</option>
                                <option value='bottom'>Bottom</option>
                               </select>
                               {propName.includes("width") ||
                               propName.includes("height") ||
                               propName.includes("size") ||
                               propName.includes("weight") ||
                               propName.includes("margin") ||
                               propName.includes("padding") ||
                               propName === "top" ||
                               propName === "bottom" ||
                               propName === "left" ||
                               propName === "right" ? (
                                <input
                                 placeholder='enter a value in pixels'
                                 type='text'
                                 name='propValue'
                                 value={propValue}
                                 onChange={(e) =>
                                  onChangeCell(
                                   i,
                                   e,
                                   "animationkeyprop",
                                   index,
                                   ind,
                                   indy
                                  )
                                 }
                                />
                               ) : (
                                ""
                               )}

                               {propName === "transform" ? (
                                <div>
                                 <h5>Rotate Z Deg</h5>
                                 <Slider
                                  axis='x'
                                  x={parseInt(transValues.rotateZ)}
                                  name='rotateZ'
                                  value={parseInt(transValues.rotateZ)}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "rotateZ",
                                    "slider"
                                   )
                                  }
                                  orientation='horizontal'
                                  min={0}
                                  max={360}
                                  step={1}
                                 />

                                 <h5>Rotate X Deg</h5>
                                 <Slider
                                  axis='x'
                                  x={parseInt(transValues.rotateX)}
                                  name='rotateX'
                                  value={parseInt(transValues.rotateX)}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "rotateX",
                                    "slider"
                                   )
                                  }
                                  orientation='horizontal'
                                  min={0}
                                  max={360}
                                  step={1}
                                 />

                                 <h5>Translate X Px</h5>
                                 <input
                                  type='text'
                                  name='translateX'
                                  value={transValues.translateX}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "translateX"
                                   )
                                  }
                                 />

                                 <h5>Translate Y Px</h5>
                                 <input
                                  type='text'
                                  name='translateY'
                                  value={transValues.translateY}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "translateY"
                                   )
                                  }
                                 />

                                 <h5>Rotate Y Deg</h5>
                                 <Slider
                                  x={parseInt(transValues.rotateY)}
                                  name='rotateY'
                                  value={parseInt(transValues.rotateY)}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "rotateY",
                                    "slider"
                                   )
                                  }
                                  orientation='horizontal'
                                  min={0}
                                  max={360}
                                  step={1}
                                 />

                                 <h5>Skew X Deg</h5>
                                 <Slider
                                  x={parseInt(transValues.skewX)}
                                  name='skewX'
                                  value={parseInt(transValues.skewX)}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "skewX",
                                    "slider"
                                   )
                                  }
                                  orientation='horizontal'
                                  name='skewX'
                                  min={0}
                                  max={360}
                                  step={1}
                                 />

                                 <h5>Skew Y Deg</h5>
                                 <Slider
                                  x={parseInt(transValues.skewY)}
                                  name='skewY'
                                  value={transValues.skewY}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "skewY",
                                    "slider"
                                   )
                                  }
                                  orientation='horizontal'
                                  min={0}
                                  max={360}
                                  step={1}
                                 />

                                 <h5>Scale X Percent</h5>
                                 <Slider
                                  x={parseFloat(transValues.scaleX)}
                                  name='scaleX'
                                  value={transValues.scaleX}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "scaleX",
                                    "slider"
                                   )
                                  }
                                  orientation='horizontal'
                                  min={-1}
                                  max={2}
                                  step={0.01}
                                 />

                                 <h5>Scale Y Percent</h5>
                                 <Slider
                                  x={parseFloat(transValues.scaleY)}
                                  name='scaleY'
                                  value={transValues.scaleY}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "scaleY",
                                    "slider"
                                   )
                                  }
                                  orientation='horizontal'
                                  name='scaleY'
                                  min={-1}
                                  max={2}
                                  step={0.01}
                                 />
                                </div>
                               ) : (
                                ""
                               )}

                               {propName === "background-position" ? (
                                <select
                                 name='propValue'
                                 value={propValue}
                                 onChange={(e) =>
                                  onChangeCell(
                                   i,
                                   e,
                                   "animationkeyprop",
                                   index,
                                   ind,
                                   indy
                                  )
                                 }>
                                 <option></option>
                                 <option value='center'>Center</option>
                                 <option value='left'>Left</option>
                                 <option value='right'>Right</option>
                                 <option value='top'>Top</option>
                                 <option value='bottom'>Bottom</option>
                                </select>
                               ) : (
                                ""
                               )}

                               {propName.includes("shadow") ? (
                                <div>
                                 <h5>Horizontal Shadow</h5>
                                 <input
                                  placeholder='enter a value in pixels'
                                  type='text'
                                  name='horizontalShadow'
                                  value={shadowValues.horizontalShadow}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "boxshadow"
                                   )
                                  }
                                 />
                                 <h5>Vertical Shadow</h5>
                                 <input
                                  placeholder='enter a value in pixels'
                                  type='text'
                                  name='verticalShadow'
                                  value={shadowValues.verticalShadow}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "boxshadow"
                                   )
                                  }
                                 />
                                 <h5>Shadow Blur</h5>
                                 <input
                                  placeholder='enter a value in pixels'
                                  type='text'
                                  name='blurShadow'
                                  value={shadowValues.blurShadow}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "boxshadow"
                                   )
                                  }
                                 />
                                 <h5>Shadow Spread</h5>
                                 <input
                                  placeholder='enter a value in pixels'
                                  type='text'
                                  name='spreadShadow'
                                  value={shadowValues.spreadShadow}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "boxshadow"
                                   )
                                  }
                                 />
                                 <h5>Shadow Direction</h5>
                                 <select
                                  name='shadowDirection'
                                  value={shadowValues.shadowDirection}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "boxshadow"
                                   )
                                  }>
                                  <option></option>
                                  <option value='cover'>Inset</option>
                                  <option value='contain'>Outset</option>
                                 </select>
                                 <h5>Shadow Color</h5>
                                 <select
                                  name='shadowColor'
                                  value={shadowValues.shadowColor}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "boxshadow"
                                   )
                                  }>
                                  <option>Set Color...</option>
                                  <option value={pallet && pallet.primary}>
                                   Primary
                                  </option>
                                  <option value={pallet && pallet.dark}>
                                   Dark
                                  </option>
                                  <option value={pallet && pallet.light}>
                                   Light
                                  </option>
                                  <option value={pallet && pallet.danger}>
                                   Danger
                                  </option>
                                  <option value={pallet && pallet.success}>
                                   Success
                                  </option>
                                 </select>
                                </div>
                               ) : (
                                ""
                               )}

                               {propName === "background-size" ? (
                                <select
                                 name='propValue'
                                 value={propValue}
                                 onChange={(e) =>
                                  onChangeCell(
                                   i,
                                   e,
                                   "animationkeyprop",
                                   index,
                                   ind,
                                   indy
                                  )
                                 }>
                                 <option></option>
                                 <option value='cover'>Cover</option>
                                 <option value='contain'>Contain</option>
                                </select>
                               ) : (
                                ""
                               )}

                               {propName === "font" ? (
                                <div>
                                 <h5>Current Font</h5>
                                 <input type='text' value={propValue} />
                                 <button
                                  className='btn btn-dark btn-sm'
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    "font",
                                    font
                                   )
                                  }>
                                  Set Font
                                 </button>
                                </div>
                               ) : (
                                ""
                               )}

                               {propName.includes("opacity") ||
                               propName.includes("radius") ? (
                                <Slider
                                 axis='x'
                                 x={css["animation"][index]}
                                 value={parseFloat(css["animation"][index])}
                                 onChange={(e) =>
                                  onChangeCell(
                                   i,
                                   e,
                                   "animationkeyprop",
                                   index,
                                   ind,
                                   indy
                                  )
                                 }
                                 orientation='horizontal'
                                 name='n'
                                 min={0}
                                 max={1}
                                 step={0.01}
                                />
                               ) : (
                                ""
                               )}

                               {propName.includes("color") && (
                                <select
                                 name='propValue'
                                 value={propValue}
                                 onChange={(e) =>
                                  onChangeCell(
                                   i,
                                   e,
                                   "animationkeyprop",
                                   index,
                                   ind,
                                   indy
                                  )
                                 }>
                                 <option>Set Color...</option>
                                 <option value={pallet && pallet.primary}>
                                  Primary
                                 </option>
                                 <option value={pallet && pallet.dark}>
                                  Dark
                                 </option>
                                 <option value={pallet && pallet.light}>
                                  Light
                                 </option>
                                 <option value={pallet && pallet.danger}>
                                  Danger
                                 </option>
                                 <option value={pallet && pallet.success}>
                                  Success
                                 </option>
                                </select>
                               )}
                              </div>
                             )
                            )}
                           </div>
                          )
                         )}
                        </div>
                       )
                      )}
                    </ul>
                   </div>
                  </label>
                 );
                } else if (key === "fontSize") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='5px'>XX Small</option>
                    <option value='7px'>X Small</option>
                    <option value='11px'>Small</option>
                    <option value='16px'>Medium</option>
                    <option value='24px'>Large</option>
                    <option value='36px'>X Large</option>
                    <option value='54px'>XX Large</option>
                   </select>
                  </label>
                 );
                } else if (key.includes("Inset")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option>Outer</option>
                    <option value='inset'>Inset</option>
                   </select>
                  </label>
                 );
                } else if (key === "fontWeight") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option value='100'>100</option>
                    <option value='200'>200</option>
                    <option value='300'>300</option>
                    <option value='400'>400</option>
                    <option value='500'>500</option>
                    <option value='600'>600</option>
                    <option value='700'>700</option>
                    <option value='800'>800</option>
                    <option value='900'>900</option>
                   </select>
                  </label>
                 );
                } else if (key === "opacity") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <Slider
                    axis='x'
                    x={css.opacity}
                    value={parseInt(css[key])}
                    onChange={(e) => onChangeCell(i, e, "opacity", "slider")}
                    orientation='horizontal'
                    min={0}
                    max={100}
                    step={1}
                   />
                  </label>
                 );
                } else if (key.includes("Radius")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <Slider
                    value={parseInt(css[key])}
                    onChange={(e) => onChangeCell(i, e, key, "slider")}
                    orientation='horizontal'
                    min={0}
                    max={50}
                    step={0.5}
                   />
                  </label>
                 );
                } else if (key === "textAlign") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>

                    <option value='start'>Start</option>
                    <option value='end'>End</option>
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                    <option value='center'>Center</option>
                    <option value='justify'>Justify</option>
                    <option value='matchParent'>Match Parent</option>
                    <option value='justifyAll'>Justify All</option>
                   </select>
                  </label>
                 );
                } else if (key.includes("border") && key.includes("Style")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='solid'>Solid</option>
                    <option value='double'>Double</option>
                    <option value='dotted'>Dotted</option>
                    <option value='dashed'>Dashed</option>
                    <option value='groove'>Groove</option>
                    <option value='none'>None</option>
                    <option value='hidden'>Hidden</option>
                    <option value='ridge'>Ridge</option>
                    <option value='inset'>Inset</option>
                    <option value='outset'>Outset</option>
                   </select>
                  </label>
                 );
                } else if (key === "textShadowSize") {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='small'>2px</option>
                   </select>
                  </label>
                 );
                } else if (key.includes("overflow")) {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}

                   <select
                    name={key}
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}>
                    <option></option>
                    <option value='visible'>Visible</option>
                    <option value='hidden'>Hidden</option>
                    <option value='clip'>Clip</option>
                    <option value='scroll'>Scroll</option>
                    <option value='auto'>Auto</option>
                   </select>
                  </label>
                 );
                } else {
                 return (
                  <label key={key}>
                   {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                     return str.toUpperCase();
                    })}
                   <input
                    type='text'
                    placeholder='Enter A Value In Pixels'
                    value={css[key]}
                    onChange={(e) => onChangeCell(i, e, "css")}
                    name={key}
                   />
                  </label>
                 );
                }
               })}
              {!gridLevel &&
               Object.keys(filtered).length === 0 &&
               currentResults.map((css) =>
                Object.keys(css).map((key) => {
                 const index = contentCss.findIndex((x) => x.id === css.id);
                 if (key.includes("Color")) {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}
                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option>Set Color...</option>
                     <option value={pallet && pallet.primary}>Primary</option>
                     <option value={pallet && pallet.dark}>Dark</option>
                     <option value={pallet && pallet.light}>Light</option>
                     <option value={pallet && pallet.danger}>Danger</option>
                     <option value={pallet && pallet.success}>Success</option>
                    </select>
                   </label>
                  );
                 } else if (key === "position") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='fixed'>Fixed</option>
                     <option value='relative'>Relative</option>
                     <option value='absolute'>Absolute</option>
                    </select>
                   </label>
                  );
                 } else if (key === "backgroundRepeat") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='repeatX'>Repeat X</option>
                     <option value='repeatY'>Repeat Y</option>
                     <option value='repeat'>Repeat</option>
                     <option value='space'>Space</option>
                     <option value='round'>Round</option>
                     <option value='noRepeat'>No Repeat</option>
                    </select>
                   </label>
                  );
                 } else if (key === "backgroundPosition") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='center'>Center</option>
                     <option value='left'>Left</option>
                     <option value='right'>Right</option>
                     <option value='top'>Top</option>
                     <option value='bottom'>Bottom</option>
                    </select>
                   </label>
                  );
                 } else if (key === "backgroundSize") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='cover'>Cover</option>
                     <option value='contain'>Contain</option>
                    </select>
                   </label>
                  );
                 } else if (key === "display") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='block'>Block</option>
                     <option value='inline'>Inline</option>
                     <option value='inline-block'>Inline Block</option>
                     <option value='flex'>Flex</option>
                     <option value='none'>None</option>
                    </select>
                   </label>
                  );
                 } else if (key === "textDecorationLine") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='none'>None</option>
                     <option value='underline'>Underline</option>
                     <option value='overline'>Overline</option>
                     <option value='line-through'>Line Through</option>
                     <option value='blink'>Blink</option>
                    </select>
                   </label>
                  );
                 } else if (key === "textDecorationStyle") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='solid'>Solid</option>
                     <option value='double'>Double</option>
                     <option value='dotted'>Dotted</option>
                     <option value='dashed'>Dashed</option>
                     <option value='wavy'>Wavy</option>
                    </select>
                   </label>
                  );
                 } else if (key === "transition") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <button
                     className='btn btn-sm btn-dark'
                     onClick={() => addCellChildTransition(i, index)}>
                     + Transition
                    </button>
                    <div
                     className='card'
                     style={{ overflowY: "scroll", overflowX: "scroll" }}>
                     {css.transition.map(
                      (
                       { property, duration, timingFunction, cubicNs, delay },
                       ind
                      ) => (
                       <div key={index} className='card'>
                        <h5>Transition Property</h5>
                        <select
                         onChange={(e) =>
                          onChangeCell(i, e, "conttransition", index, ind)
                         }
                         value={property}
                         name='property'>
                         <option value=''></option>
                         {Object.keys(flatCss)
                          .filter((e) => typeof parseInt(e) === "number")
                          .map((c, i) => (
                           <option key={i} value={c}>
                            {c}
                           </option>
                          ))}
                         <option value='color'>Color</option>
                         <option value='background-color'>
                          Background Color
                         </option>
                        </select>
                        <h5>Transition Timing</h5>
                        <input
                         type='text'
                         name='duration'
                         onChange={(e) =>
                          onChangeCell(i, e, "conttransition", index, ind)
                         }
                         value={duration}
                         placeholder='Enter A Value in seconds'
                        />
                        <h5>Transition Function</h5>
                        <select
                         name='timingFunction'
                         value={timingFunction}
                         onChange={(e) =>
                          onChangeCell(i, e, "conttransition", index, ind)
                         }>
                         <option></option>
                         <option value='ease'>Ease</option>
                         <option value='ease-in'>Ease In</option>
                         <option value='ease-in-out'>Ease In Out</option>
                         <option value='step-end'>Step End</option>
                         <option value='step-start'>Step Start</option>
                         <option value='cubic-bezier'>Cubic Bezier</option>
                         <option value='inherit'>Inherit</option>
                         <option value='initial'>Initial</option>
                        </select>
                        <h5>Transition Delay</h5>
                        <input
                         type='text'
                         name='delay'
                         value={delay}
                         onChange={(e) =>
                          onChangeCell(i, e, "conttransition", index, ind)
                         }
                         placeholder='Enter A Value in seconds'
                        />

                        {timingFunction === "cubic-bezier" &&
                         Object.keys(cubicNs).map((n) => (
                          <div>
                           <h5>Cubic Bez (n,n,n,n)</h5>
                           <div key={n}>
                            <h5>N {parseInt(n) + 1}</h5>
                            <Slider
                             axis='x'
                             x={css["transition"][ind]["cubicNs"][n]}
                             value={parseFloat(
                              css["transition"][ind]["cubicNs"][n]
                             )}
                             onChange={(e) =>
                              onChangeCell(i, e, "contcubicNs", index, ind, n)
                             }
                             orientation='horizontal'
                             name={n}
                             min={0}
                             max={1}
                             step={0.01}
                            />
                           </div>
                          </div>
                         ))}
                       </div>
                      )
                     )}
                    </div>
                   </label>
                  );
                 } else if (key === "transform") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     onChange={(e) =>
                      onChangeCell(i, e, "conttransform", index)
                     }
                     multiple>
                     <option></option>
                     <option value='rotateX'>RotateX</option>
                     <option value='rotateY'>RotateY</option>
                     <option value='skewX'>SkewX</option>
                     <option value='skewY'>SkewY</option>
                     <option value='rotateZ'>RotateZ</option>
                     <option value='scaleX'>ScaleX</option>
                     <option value='scaleY'>ScaleY</option>
                     <option value='translateX'>TranslateX</option>
                     <option value='translateY'>TranslateY</option>
                    </select>
                   </label>
                  );
                 } else if (key === "transformProp") {
                  return (
                   <label key={key}>
                    <div className='card all-center'>
                     <h5>Current Transform Order</h5>
                     <ul>
                      {css.transform.map((m) => (
                       <li key={m}>{m}</li>
                      ))}
                     </ul>
                    </div>
                    {css.transform.includes("rotateZ") && (
                     <div>
                      <h5>Rotate Z Deg</h5>
                      <Slider
                       axis='x'
                       x={css["transformProp"]["rotateZ"]}
                       value={parseInt(css["transformProp"]["rotateZ"])}
                       onChange={(e) =>
                        onChangeCell(
                         i,
                         e,
                         "rotateZ",
                         "conttransformProp",
                         index
                        )
                       }
                       orientation='horizontal'
                       name='rotateZ'
                       min={0}
                       max={360}
                       step={1}
                      />
                     </div>
                    )}
                    {css.transform.includes("rotateX") && (
                     <div>
                      <h5>Rotate X Deg</h5>
                      <Slider
                       axis='x'
                       x={css["transformProp"]["rotateX"]}
                       value={parseInt(css["transformProp"]["rotateX"])}
                       onChange={(e) =>
                        onChangeCell(
                         i,
                         e,
                         "rotateX",
                         "conttransformProp",
                         index
                        )
                       }
                       orientation='horizontal'
                       name='rotateX'
                       min={0}
                       max={360}
                       step={1}
                      />
                     </div>
                    )}
                    {css.transform.includes("translateX") && (
                     <div>
                      <h5>Translate X Px</h5>
                      <input
                       type='text'
                       name='translateX'
                       value={css["transformProp"]["translateX"]}
                       onChange={(e) =>
                        onChangeCell(
                         i,
                         e.target.value,
                         "translateX",
                         "conttransformProp",
                         index
                        )
                       }
                      />
                     </div>
                    )}
                    {css.transform.includes("translateY") && (
                     <div>
                      <h5>Translate Y Px</h5>
                      <input
                       type='text'
                       name='translateY'
                       value={css["transformProp"]["translateY"]}
                       onChange={(e) =>
                        onChangeCell(
                         i,
                         e.target.value,
                         "translateY",
                         "conttransformProp",
                         index
                        )
                       }
                      />
                     </div>
                    )}
                    {css.transform.includes("rotateY") && (
                     <div>
                      <h5>Rotate Y Deg</h5>
                      <Slider
                       value={parseInt(css["transformProp"]["rotateY"])}
                       onChange={(e) =>
                        onChangeCell(
                         i,
                         e,
                         "rotateY",
                         "conttransformProp",
                         index
                        )
                       }
                       orientation='horizontal'
                       name='rotateY'
                       min={0}
                       max={360}
                       step={1}
                      />
                     </div>
                    )}
                    {css.transform.includes("skewX") && (
                     <div>
                      <h5>Skew X Deg</h5>
                      <Slider
                       value={parseInt(css["transformProp"]["skewX"])}
                       onChange={(e) =>
                        onChangeCell(i, e, "skewX", "conttransformProp", index)
                       }
                       orientation='horizontal'
                       name='skewX'
                       min={0}
                       max={360}
                       step={1}
                      />
                     </div>
                    )}
                    {css.transform.includes("skewY") && (
                     <div>
                      <h5>Skew Y Deg</h5>
                      <Slider
                       value={parseInt(css["transformProp"]["skewY"])}
                       onChange={(e) =>
                        onChangeCell(i, e, "skewY", "conttransformProp", index)
                       }
                       orientation='horizontal'
                       name='skewY'
                       min={0}
                       max={360}
                       step={1}
                      />
                     </div>
                    )}
                    {css.transform.includes("scaleX") && (
                     <div>
                      <h5>Scale X Percent</h5>
                      <Slider
                       value={parseInt(css["transformProp"]["scaleX"]) * 10}
                       onChange={(e) =>
                        onChangeCell(
                         i,
                         e / 10,
                         "scaleX",
                         "conttransformProp",
                         index
                        )
                       }
                       orientation='horizontal'
                       name='scaleX'
                       min={-100}
                       max={200}
                       step={1}
                      />
                     </div>
                    )}{" "}
                    {css.transform.includes("scaleY") && (
                     <div>
                      <h5>Scale Y Percent</h5>
                      <Slider
                       value={parseInt(css["transformProp"]["scaleY"]) * 10}
                       onChange={(e) =>
                        onChangeCell(
                         i,
                         e / 10,
                         "scaleY",
                         "conttransformProp",
                         index
                        )
                       }
                       orientation='horizontal'
                       name='scaleY'
                       min={-100}
                       max={200}
                       step={1}
                      />
                     </div>
                    )}
                   </label>
                  );
                 } else if (key === "animation") {
                  return (
                   <label key={key}>
                    <div className='card'>
                     <button
                      className='btn btn-sm btn-dark'
                      onClick={() => addCellChildAnimation(i, index)}>
                      + Animation
                     </button>
                     <h5>Current Animation Order</h5>
                     <ul>
                      {css.animation.length > 0 &&
                       css.animation.map(
                        (
                         {
                          animationName,
                          animationDuration,
                          animationTimingFunction,
                          animationDelay,
                          cubicNs,
                          steps,
                          animationIterationCount,
                          animationDirection,
                          animationFillMode,
                          keyframes,
                         },
                         ind
                        ) => (
                         <div key={ind}>
                          <h5>Animation Name</h5>
                          <input
                           type='text'
                           name='animationName'
                           value={animationName}
                           onChange={(e) =>
                            onChangeCell(i, e, "contanimation", index, ind)
                           }
                          />
                          <h5>Animation Duration</h5>
                          <input
                           type='text'
                           name='animationDuration'
                           value={animationDuration}
                           onChange={(e) =>
                            onChangeCell(i, e, "contanimation", index, ind)
                           }
                          />
                          <h5>Animation Function</h5>
                          <select
                           name='animationTimingFunction'
                           value={animationTimingFunction}
                           onChange={(e) =>
                            onChangeCell(i, e, "contanimation", index, ind)
                           }>
                           <option></option>
                           <option value='ease'>Ease</option>
                           <option value='ease-in'>Ease In</option>
                           <option value='ease-in-out'>Ease In Out</option>
                           <option value='step-end'>Step End</option>
                           <option value='step-start'>Step Start</option>
                           <option value='cubic-bezier'>Cubic Bezier</option>
                           <option value='steps'>Steps</option>
                           <option value='inherit'>Inherit</option>
                           <option value='initial'>Initial</option>
                          </select>
                          <h5>Animation Delay</h5>
                          <input
                           placeholder='enter a value in seconds'
                           type='text'
                           name='animationDelay'
                           value={animationDelay}
                           onChange={(e) =>
                            onChangeCell(i, e, "contanimation", index, ind)
                           }
                          />
                          <h5>Animation Iteration Count</h5>
                          <input
                           placeholder='Positive Integers Only'
                           type='text'
                           name='animationIterationCount'
                           value={animationIterationCount}
                           onChange={(e) =>
                            onChangeCell(i, e, "contanimation", index, ind)
                           }
                          />

                          <h5>Animation Direction</h5>
                          <select
                           name='animationDirection'
                           value={animationDirection}
                           onChange={(e) =>
                            onChangeCell(i, e, "contanimation", index, ind)
                           }>
                           <option></option>
                           <option value='normal'>Normal</option>
                           <option value='reverse'>Reverse</option>
                           <option value='alternate'>Alternate</option>
                           <option value='reverse'>Alternate Reverse</option>
                           <option value='inherit'>Inherit</option>
                          </select>
                          <h5>Animation Fill Mode</h5>
                          <select
                           name='animationFillMode'
                           value={animationFillMode}
                           onChange={(e) =>
                            onChangeCell(i, e, "contanimation", index, ind)
                           }>
                           <option></option>
                           <option value='none'>None</option>
                           <option value='forward'>Forward</option>
                           <option value='backward'>Backward</option>
                           <option value='both'>Both</option>
                           <option value='inherit'>Inherit</option>
                          </select>

                          <h5>Key Frames</h5>
                          <button
                           className='btn btn-sm btn-dark'
                           onClick={() =>
                            addCellChildAnimationKeyframe(i, index, ind)
                           }>
                           + Keyframe
                          </button>

                          {animationTimingFunction === "cubic-bezier" &&
                           Object.keys(cubicNs).map((n) => (
                            <div>
                             <h5>Cubic Bez (n,n,n,n)</h5>
                             <div key={n}>
                              <h5>N {parseInt(n) + 1}</h5>
                              <Slider
                               axis='x'
                               x={css["animation"][index]["cubicNs"][n]}
                               value={parseFloat(
                                css["animation"][index]["cubicNs"][n]
                               )}
                               onChange={(e) =>
                                onChangeCell(i, e, "cubicNs", index, n)
                               }
                               orientation='horizontal'
                               name={n}
                               min={0}
                               max={1}
                               step={0.01}
                              />
                             </div>
                            </div>
                           ))}

                          {keyframes.map(
                           ({ completionPercent, properties }, indy) => (
                            <div>
                             <h5>Completion Percentage </h5>
                             <i style={{ fontSize: "8px" }}>
                              (all animations require a 0 and 100)
                             </i>
                             <input
                              placeholder='enter a value from 0 to 100'
                              type='text'
                              name='completionPercent'
                              value={completionPercent}
                              onChange={(e) =>
                               onChangeCell(
                                i,
                                e,
                                "contanimationkey",
                                index,
                                ind,
                                indy
                               )
                              }
                             />
                             <button
                              className='btn btn-sm btn-dark'
                              onClick={() =>
                               addCellChildAnimationKeyframeProperty(
                                i,
                                index,
                                ind,
                                indy
                               )
                              }>
                              + Property
                             </button>

                             {properties.map(
                              (
                               {
                                propName,
                                propValue,
                                shadowValues,
                                transValues,
                               },
                               indo
                              ) => (
                               <div>
                                <select
                                 name='propName'
                                 value={propName}
                                 onChange={(e) =>
                                  onChangeCell(
                                   i,
                                   e,
                                   "contanimationkeyprop",
                                   index,
                                   ind,
                                   indy,
                                   indo
                                  )
                                 }>
                                 <option value='transform'>Transform</option>
                                 <option value='height'>Height</option>
                                 <option value='width'>Width</option>
                                 <option value='border-left-color'>
                                  Border Left Color
                                 </option>
                                 <option value='border-left-width'>
                                  Border Left Width
                                 </option>
                                 <option value='background-color'>
                                  Background Color
                                 </option>
                                 <option value='background-position'>
                                  Background Position
                                 </option>
                                 <option value='background-size'>
                                  Background Size
                                 </option>
                                 <option value='border-bottom-color'>
                                  Border Bottom Color
                                 </option>
                                 <option value='border-bottom-left-radius'>
                                  Border Bottom Left Radius
                                 </option>
                                 <option value='border-bottom-right-radius'>
                                  Border Bottom Right Radius
                                 </option>
                                 <option value='border-bottom-width'>
                                  Border Bottom Width
                                 </option>
                                 <option value='border-radius'>
                                  Border Radius
                                 </option>
                                 <option value='border-right'>
                                  Border Right
                                 </option>
                                 <option value='border-right-color'>
                                  Border Right Color
                                 </option>
                                 <option value='border-right-width'>
                                  Border Right Width
                                 </option>
                                 <option value='border-color'>
                                  Border Color
                                 </option>
                                 <option value='border-width'>
                                  Border Width
                                 </option>
                                 <option value='border-top-color'>
                                  Border Top Color
                                 </option>
                                 <option value='border-top-left-radius'>
                                  Border Top Left Radius
                                 </option>
                                 <option value='border-top-right-radius'>
                                  Border Top Right Radius
                                 </option>
                                 <option value='border-top-width'>
                                  Border Top Width
                                 </option>
                                 <option value='box-shadow'>Box Shadow</option>
                                 <option value='font'>Font</option>
                                 <option value='font-size'>Font Size</option>

                                 <option value='font-weight'>
                                  Font Weight
                                 </option>
                                 <option value='line-height'>
                                  Line Height
                                 </option>
                                 <option value='margin-bottom'>
                                  Margin Bottom
                                 </option>
                                 <option value='margin'>Margin</option>
                                 <option value='margin-left'>
                                  Margin Left
                                 </option>
                                 <option value='margin-top'>Margin Top</option>
                                 <option value='margin-right'>
                                  Margin Right
                                 </option>
                                 <option value='opacity'>Opacity</option>

                                 <option value='padding-left'>
                                  Padding Left
                                 </option>
                                 <option value='padding-right'>
                                  Padding Right
                                 </option>
                                 <option value='padding-top'>
                                  Padding Top
                                 </option>
                                 <option value='z-index'>Z Index</option>
                                 <option value='padding-bottom'>
                                  Padding Bottom
                                 </option>
                                 <option value='top'>Top</option>
                                 <option value='left'>Left</option>
                                 <option value='right'>Right</option>
                                 <option value='bottom'>Bottom</option>
                                </select>
                                {propName.includes("width") ||
                                propName.includes("height") ||
                                propName.includes("size") ||
                                propName.includes("weight") ||
                                propName.includes("margin") ||
                                propName.includes("padding") ||
                                propName === "top" ||
                                propName === "bottom" ||
                                propName === "left" ||
                                propName === "right" ? (
                                 <input
                                  placeholder='enter a value in pixels'
                                  type='text'
                                  name='propValue'
                                  value={propValue}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "contanimationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    indo
                                   )
                                  }
                                 />
                                ) : (
                                 ""
                                )}

                                {propName === "transform" ? (
                                 <div>
                                  <h5>Rotate Z Deg</h5>
                                  <Slider
                                   axis='x'
                                   x={parseInt(transValues.rotateZ)}
                                   name='rotateZ'
                                   value={parseInt(transValues.rotateZ)}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "rotateZ",
                                     "slider"
                                    )
                                   }
                                   orientation='horizontal'
                                   min={0}
                                   max={360}
                                   step={1}
                                  />

                                  <h5>Rotate X Deg</h5>
                                  <Slider
                                   axis='x'
                                   x={parseInt(transValues.rotateX)}
                                   name='rotateX'
                                   value={parseInt(transValues.rotateX)}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "rotateX",
                                     "slider"
                                    )
                                   }
                                   orientation='horizontal'
                                   min={0}
                                   max={360}
                                   step={1}
                                  />

                                  <h5>Translate X Px</h5>
                                  <input
                                   type='text'
                                   name='translateX'
                                   value={transValues.translateX}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "translateX"
                                    )
                                   }
                                  />

                                  <h5>Translate Y Px</h5>
                                  <input
                                   type='text'
                                   name='translateY'
                                   value={transValues.translateY}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "translateY"
                                    )
                                   }
                                  />

                                  <h5>Rotate Y Deg</h5>
                                  <Slider
                                   x={parseInt(transValues.rotateY)}
                                   name='rotateY'
                                   value={parseInt(transValues.rotateY)}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "rotateY",
                                     "slider"
                                    )
                                   }
                                   orientation='horizontal'
                                   min={0}
                                   max={360}
                                   step={1}
                                  />

                                  <h5>Skew X Deg</h5>
                                  <Slider
                                   x={parseInt(transValues.skewX)}
                                   name='skewX'
                                   value={parseInt(transValues.skewX)}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "skewX",
                                     "slider"
                                    )
                                   }
                                   orientation='horizontal'
                                   name='skewX'
                                   min={0}
                                   max={360}
                                   step={1}
                                  />

                                  <h5>Skew Y Deg</h5>
                                  <Slider
                                   x={parseInt(transValues.skewY)}
                                   name='skewY'
                                   value={transValues.skewY}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "skewY",
                                     "slider"
                                    )
                                   }
                                   orientation='horizontal'
                                   min={0}
                                   max={360}
                                   step={1}
                                  />

                                  <h5>Scale X Percent</h5>
                                  <Slider
                                   x={parseFloat(transValues.scaleX)}
                                   name='scaleX'
                                   value={transValues.scaleX}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "scaleX",
                                     "slider"
                                    )
                                   }
                                   orientation='horizontal'
                                   min={-1}
                                   max={2}
                                   step={0.01}
                                  />

                                  <h5>Scale Y Percent</h5>
                                  <Slider
                                   x={parseFloat(transValues.scaleY)}
                                   name='scaleY'
                                   value={transValues.scaleY}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "scaleY",
                                     "slider"
                                    )
                                   }
                                   orientation='horizontal'
                                   name='scaleY'
                                   min={-1}
                                   max={2}
                                   step={0.01}
                                  />
                                 </div>
                                ) : (
                                 ""
                                )}

                                {propName === "background-position" ? (
                                 <select
                                  name='propValue'
                                  value={propValue}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "contanimationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    indo
                                   )
                                  }>
                                  <option></option>
                                  <option value='center'>Center</option>
                                  <option value='left'>Left</option>
                                  <option value='right'>Right</option>
                                  <option value='top'>Top</option>
                                  <option value='bottom'>Bottom</option>
                                 </select>
                                ) : (
                                 ""
                                )}

                                {propName.includes("shadow") ? (
                                 <div>
                                  <h5>Horizontal Shadow</h5>
                                  <input
                                   placeholder='enter a value in pixels'
                                   type='text'
                                   name='horizontalShadow'
                                   value={shadowValues.horizontalShadow}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "boxshadow"
                                    )
                                   }
                                  />
                                  <h5>Vertical Shadow</h5>
                                  <input
                                   placeholder='enter a value in pixels'
                                   type='text'
                                   name='verticalShadow'
                                   value={shadowValues.verticalShadow}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "boxshadow"
                                    )
                                   }
                                  />
                                  <h5>Shadow Blur</h5>
                                  <input
                                   placeholder='enter a value in pixels'
                                   type='text'
                                   name='blurShadow'
                                   value={shadowValues.blurShadow}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "boxshadow"
                                    )
                                   }
                                  />
                                  <h5>Shadow Spread</h5>
                                  <input
                                   placeholder='enter a value in pixels'
                                   type='text'
                                   name='spreadShadow'
                                   value={shadowValues.spreadShadow}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "boxshadow"
                                    )
                                   }
                                  />
                                  <h5>Shadow Direction</h5>
                                  <select
                                   name='shadowDirection'
                                   value={shadowValues.shadowDirection}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "boxshadow"
                                    )
                                   }>
                                   <option></option>
                                   <option value='cover'>Inset</option>
                                   <option value='contain'>Outset</option>
                                  </select>
                                  <h5>Shadow Color</h5>
                                  <select
                                   name='shadowColor'
                                   value={shadowValues.shadowColor}
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "boxshadow"
                                    )
                                   }>
                                   <option>Set Color...</option>
                                   <option value={pallet && pallet.primary}>
                                    Primary
                                   </option>
                                   <option value={pallet && pallet.dark}>
                                    Dark
                                   </option>
                                   <option value={pallet && pallet.light}>
                                    Light
                                   </option>
                                   <option value={pallet && pallet.danger}>
                                    Danger
                                   </option>
                                   <option value={pallet && pallet.success}>
                                    Success
                                   </option>
                                  </select>
                                 </div>
                                ) : (
                                 ""
                                )}

                                {propName === "background-size" ? (
                                 <select
                                  name='propValue'
                                  value={propValue}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "animationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    indo
                                   )
                                  }>
                                  <option></option>
                                  <option value='cover'>Cover</option>
                                  <option value='contain'>Contain</option>
                                 </select>
                                ) : (
                                 ""
                                )}

                                {propName === "font" ? (
                                 <div>
                                  <h5>Current Font</h5>
                                  <input type='text' value={propValue} />
                                  <button
                                   className='btn btn-dark btn-sm'
                                   onChange={(e) =>
                                    onChangeCell(
                                     i,
                                     e,
                                     "contanimationkeyprop",
                                     index,
                                     ind,
                                     indy,
                                     indo,
                                     "font",
                                     font
                                    )
                                   }>
                                   Set Font
                                  </button>
                                 </div>
                                ) : (
                                 ""
                                )}

                                {propName.includes("opacity") ||
                                propName.includes("radius") ? (
                                 <Slider
                                  axis='x'
                                  x={css["animation"][index]}
                                  value={parseFloat(css["animation"][index])}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "contanimationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    indo
                                   )
                                  }
                                  orientation='horizontal'
                                  name='n'
                                  min={0}
                                  max={1}
                                  step={0.01}
                                 />
                                ) : (
                                 ""
                                )}

                                {propName.includes("color") && (
                                 <select
                                  name='propValue'
                                  value={propValue}
                                  onChange={(e) =>
                                   onChangeCell(
                                    i,
                                    e,
                                    "contanimationkeyprop",
                                    index,
                                    ind,
                                    indy,
                                    indo
                                   )
                                  }>
                                  <option>Set Color...</option>
                                  <option value={pallet && pallet.primary}>
                                   Primary
                                  </option>
                                  <option value={pallet && pallet.dark}>
                                   Dark
                                  </option>
                                  <option value={pallet && pallet.light}>
                                   Light
                                  </option>
                                  <option value={pallet && pallet.danger}>
                                   Danger
                                  </option>
                                  <option value={pallet && pallet.success}>
                                   Success
                                  </option>
                                 </select>
                                )}
                               </div>
                              )
                             )}
                            </div>
                           )
                          )}
                         </div>
                        )
                       )}
                     </ul>
                    </div>
                   </label>
                  );
                 } else if (key === "fontSize") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='5px'>XX Small</option>
                     <option value='7px'>X Small</option>
                     <option value='11px'>Small</option>
                     <option value='16px'>Medium</option>
                     <option value='24px'>Large</option>
                     <option value='36px'>X Large</option>
                     <option value='54px'>XX Large</option>
                    </select>
                   </label>
                  );
                 } else if (key.includes("Inset")) {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option>Outer</option>
                     <option value='inset'>Inset</option>
                    </select>
                   </label>
                  );
                 } else if (key === "fontWeight") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option value='100'>100</option>
                     <option value='200'>200</option>
                     <option value='300'>300</option>
                     <option value='400'>400</option>
                     <option value='500'>500</option>
                     <option value='600'>600</option>
                     <option value='700'>700</option>
                     <option value='800'>800</option>
                     <option value='900'>900</option>
                    </select>
                   </label>
                  );
                 } else if (key === "opacity") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}
                    <Slider
                     axis='x'
                     x={css.opacity}
                     value={parseInt(css[key])}
                     onChange={(e) =>
                      onChangeCell(i, e, "opacity", "contentslider", index)
                     }
                     orientation='horizontal'
                     min={0}
                     max={100}
                     step={1}
                    />
                   </label>
                  );
                 } else if (key.includes("Radius")) {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}
                    <Slider
                     value={parseInt(css[key])}
                     onChange={(e) =>
                      onChangeCell(i, e, key, "contentslider", index)
                     }
                     orientation='horizontal'
                     min={0}
                     max={50}
                     step={0.5}
                    />
                   </label>
                  );
                 } else if (key === "textAlign") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>

                     <option value='start'>Start</option>
                     <option value='end'>End</option>
                     <option value='left'>Left</option>
                     <option value='right'>Right</option>
                     <option value='center'>Center</option>
                     <option value='justify'>Justify</option>
                     <option value='matchParent'>Match Parent</option>
                     <option value='justifyAll'>Justify All</option>
                    </select>
                   </label>
                  );
                 } else if (key.includes("border") && key.includes("Style")) {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='solid'>Solid</option>
                     <option value='double'>Double</option>
                     <option value='dotted'>Dotted</option>
                     <option value='dashed'>Dashed</option>
                     <option value='groove'>Groove</option>
                     <option value='none'>None</option>
                     <option value='hidden'>Hidden</option>
                     <option value='ridge'>Ridge</option>
                     <option value='inset'>Inset</option>
                     <option value='outset'>Outset</option>
                    </select>
                   </label>
                  );
                 } else if (key === "textShadowSize") {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='small'>2px</option>
                    </select>
                   </label>
                  );
                 } else if (key.includes("overflow")) {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}

                    <select
                     name={key}
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}>
                     <option></option>
                     <option value='visible'>Visible</option>
                     <option value='hidden'>Hidden</option>
                     <option value='clip'>Clip</option>
                     <option value='scroll'>Scroll</option>
                     <option value='auto'>Auto</option>
                    </select>
                   </label>
                  );
                 } else {
                  return (
                   <label key={key}>
                    {key
                     .replace(/([A-Z])/g, " $1")
                     .replace(/^./, function (str) {
                      return str.toUpperCase();
                     })}
                    <input
                     type='text'
                     placeholder='Enter A Value In Pixels'
                     value={css[key]}
                     onChange={(e) => onChangeCell(i, e, "contentCss", index)}
                     name={key}
                    />
                   </label>
                  );
                 }
                })
               )}
             </div>
            ) : (
             <div>
              <button
               className='btn btn-sm btn-dark'
               onClick={() => setCellContentToggle((prevState) => !prevState)}>
               Show CSS
              </button>
              <h5>Cell Settings</h5>
              <select
               name='background'
               onChange={(e) => {
                onChangeCell(i, e);
                {
                 currentContent &&
                  getContentImage(
                   currentContent.content,
                   i,
                   "background",
                   "cell"
                  );
                }
                {
                 currentContent && clearCurrentContent();
                }
               }}>
               <option>Background</option>
               <option value={pallet && pallet.primary}>Primary</option>
               <option value={pallet && pallet.dark}>Dark</option>
               <option value={pallet && pallet.light}>Light</option>
               <option value={pallet && pallet.danger}>Danger</option>
               <option value={pallet && pallet.success}>Success</option>
               {currentContent && (
                <option value={currentContent.content}>Set Image</option>
               )}
              </select>
              <label>Row Span</label>
              <input
               placeholder='Row Span'
               type='text'
               name='rowSpan'
               value={rowSpan}
               onChange={(e) => onChangeCell(i, e)}
              />
              <label>Column Span</label>
              <input
               placeholder='Column Span'
               type='text'
               name='columnSpan'
               value={columnSpan}
               onChange={(e) => onChangeCell(i, e)}
              />
              <label>Row Start</label>
              <input
               placeholder='top'
               type='text'
               name='top'
               value={top}
               onChange={(e) => onChangeCell(i, e)}
              />
              <label>Column Start</label>
              <input
               placeholder='left'
               type='text'
               name='left'
               value={left}
               onChange={(e) => onChangeCell(i, e)}
              />
              <div className='grid-2'>
               <div>
                {" "}
                <input
                 type='radio'
                 name='position'
                 value='false'
                 checked={position === "false"}
                 onChange={(e) => onChangeCell(i, e)}
                />
                Left
               </div>
               <div>
                {" "}
                <input
                 type='radio'
                 name='position'
                 value='true'
                 checked={position === "true"}
                 onChange={(e) => onChangeCell(i, e)}
                />
                Center{" "}
               </div>
              </div>
             </div>
            )}
           </div>
           <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
            {subGridView === false ? (
             <div>
              <h5>SUB GRID SETTINGS</h5>
              <button
               className='btn btn-dark btn-sm'
               onClick={() => addSubGrid(id)}>
               Add Grid
              </button>
              <button
               className='btn btn-dark btn-sm'
               onClick={() => addSubColumn(id)}>
               Add Column
              </button>
              <button
               className='btn btn-dark btn-sm'
               onClick={() => addSubRow(id)}>
               Add Row
              </button>
              <button
               className='btn btn-sm btn-dark'
               onClick={() => addSubCell(id)}>
               Add Cell
              </button>
              <button
               className='btn btn-sm btn-dark'
               onClick={() => toggleSubGridView((prevState) => !prevState)}>
               View Grid
              </button>
              <select
               name='verticalAlignment'
               onChange={(e) => onChangeCell(i, e)}>
               <option>Vertical</option>
               <option value='start'>Start</option>
               <option value='end'>End</option>
               <option value='center'>Center</option>
               <option value='space-between'>Between</option>
               <option value='space-around'>Around</option>
               <option value='space-evenly'>Evenly</option>
               <option value='stretch'>Stretch</option>
              </select>
              <select
               name='horitzontalAlignment'
               onChange={(e) => onChangeCell(i, e)}>
               <option>Horizontal</option>
               <option value='start'>Start</option>
               <option value='end'>End</option>
               <option value='center'>Center</option>
               <option value='space-between'>Between</option>
               <option value='space-around'>Around</option>
               <option value='space-evenly'>Evenly</option>
              </select>
              <select name='layout' onChange={(e) => onChangeCell(i, e)}>
               <option>Layout</option>
               <option value='row'>Row</option>
               <option value='column'>Column</option>
               <option value='row dense'>Row Dense</option>
              </select>
             </div>
            ) : (
             <div>
              {" "}
              <button
               onClick={() => toggleSubGridView((prevState) => !prevState)}>
               Hide Grid
              </button>
              <div className='grid-2'>
               <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
                {subGrids[subGrids.findIndex((x) => x.parent === id)] &&
                 subGrids[
                  subGrids.findIndex((x) => x.parent === id)
                 ].columns.map(({ size, unit }, index) => (
                  <div>
                   <div>
                    <input
                     placeholder='Column Size...'
                     type='text'
                     name='size'
                     value={size}
                     onChange={(e) => updateSubColumn(e, id, index)}
                    />
                    <select
                     name='unit'
                     value={unit}
                     onChange={(e) => updateSubColumn(e, id, index)}>
                     <option></option>
                     <option value='px'>Pixels</option>
                     <option value='fr'>Fractions</option>
                     <option value='repeat(auto-fit,minmax(120px,1fr))'>
                      Responsive
                     </option>
                    </select>
                    <span
                     style={{ float: "right" }}
                     className='color-background lead'
                     onClick={() => deleteSubColumn(id, index)}>
                     <a>X</a>
                    </span>
                   </div>
                  </div>
                 ))}
               </div>
               <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
                {subGrids[subGrids.findIndex((x) => x.parent === id)] &&
                 subGrids[subGrids.findIndex((x) => x.parent === id)].rows.map(
                  ({ size, unit }, index) => (
                   <div>
                    <input
                     placeholder='Row Size...'
                     type='text'
                     name='size'
                     onChange={(e) => updateSubRow(e, id, index)}
                    />
                    <select
                     name='unit'
                     onChange={(e) => updateSubRow(e, id, index)}>
                     <option></option>
                     <option value='px'>Pixels</option>
                     <option value='fr'>Fractions</option>
                    </select>
                    <span
                     style={{ float: "right" }}
                     className='color-background lead'
                     onClick={() => deleteSubRow(id, index)}>
                     <a>X</a>
                    </span>
                   </div>
                  )
                 )}
               </div>
              </div>
             </div>
            )}
           </div>
          </div>

          <select
           name='viewToggle'
           style={{ height: "20px", width: "75px" }}
           className='btn btn-block'
           onChange={(e) => onChangeCell(i, e)}>
           <option value=''></option>
           <option value='delete'>Delete Cell</option>
           <option value='close'>Close</option>
          </select>
         </div>
        ) : (
         <>
          <Fragment>
           {nodeView === true ? (
            <div
             style={{
              height: "5px",
              width: "5px",
              float: "left",
              padding: 0,
              background: "#f4f4f4",
              position: "absolute",
              zIndex: 9999999,
             }}>
             {" "}
             <select
              name='viewToggle'
              style={{
               height: "5px",
               width: "5px",
               WebkitAppearance: "none",
               MozAppearance: "none",
               zIndex: 9999999,
              }}
              onChange={(e) => onChangeCell(i, e)}>
              <option value=''>M</option>
              <option value='open'>Open</option>
             </select>
            </div>
           ) : (
            ""
           )}

           <div className={"a" + cells[i].id}>
            {content
             .slice()
             .sort((a, b) => {
              return a.sectionOrdinality - b.sectionOrdinality;
             })
             .map(
              (
               {
                formName,
                keyName,
                parentObj,
                parentState,
                parentKey,
                checkedValue,
                isBool,
                onChange,
                options,
                type,
                label,
                legend,
                step,
                n,
                rangeMin,
                rangeMax,
                displayDate,
                text,
                props,
                font,
                fontStyle,
                buttonStyle,
                faIcon,
                faIconPosition,
                headingSize,
                action,
                background,
                color,
                top,
                name,
                left,
                code,
                height,
                width,
                url,
                autoplay,
               },
               i
              ) => {
               if (content[i].hasOwnProperty("props")) {
                const VariableComponent = content[i];

                return VariableComponent;
               } else if (cellQuiz[0]) {
                const Quiz = cellQuiz
                 .filter((q) => q.id === cells[i].id)
                 .map(({ quiz }) => {
                  return quiz;
                 });

                return Quiz;
               } else if (type === "text") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <input
                     type='text'
                     name={keyName}
                     value={
                      lead && parentObj === "lead"
                       ? lead[keyName]
                       : userState && userState[keyName]
                     }
                     onChange={(e) => {
                      parentObj === "lead"
                       ? writeLeadState(onChange, e)
                       : writeUserState(
                          onChange,
                          e,
                          parentObj,
                          n,
                          parentState,
                          parentKey,
                          i
                         );
                     }}
                    />
                   </label>
                  );
                 });
                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <input
                    type='text'
                    name={keyName}
                    value={
                     lead && parentObj === "lead"
                      ? lead[keyName]
                      : userState && userState[keyName]
                    }
                    onChange={(e) => {
                     parentObj === "lead"
                      ? writeLeadState(onChange, e)
                      : writeUserState(
                         onChange,
                         e,
                         parentObj,
                         n,
                         parentState,
                         parentKey
                        );
                    }}
                   />
                  </label>
                 );
                }
               } else if (type === "textarea") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <textarea
                     type='text'
                     name={keyName}
                     value={lead && lead[keyName]}
                     onChange={(e) =>
                      writeUserState(
                       onChange,
                       e,
                       parentObj,
                       n,
                       parentState,
                       parentKey,
                       i
                      )
                     }
                    />
                   </label>
                  );
                 });
                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <textarea
                    type='text'
                    name={keyName}
                    value={lead && lead[keyName]}
                    onChange={(e) =>
                     writeUserState(
                      onChange,
                      e,
                      parentObj,
                      n,
                      parentState,
                      parentKey,
                      Array.from(userState[parentState][parentKey]).findIndex(
                       (x) => Object.values(x).includes(e.target.value)
                      )
                     )
                    }
                   />
                  </label>
                 );
                }
               } else if (type === "radio") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <input
                     type='radio'
                     name={keyName}
                     value={
                      isBool === "true" || isBool === "false"
                       ? stringToBoolean(isBool)
                       : checkedValue
                     }
                     onClick={(e) =>
                      writeUserState(
                       onChange,
                       e,
                       parentObj,
                       n,
                       parentState,
                       parentKey,
                       i
                      )
                     }
                    />
                   </label>
                  );
                 });
                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <input
                    type='radio'
                    name={keyName}
                    value={
                     isBool === "true" || isBool === "false"
                      ? stringToBoolean(isBool)
                      : checkedValue
                    }
                    onClick={(e) =>
                     writeUserState(
                      onChange,
                      e,
                      parentObj,
                      n,
                      parentState,
                      parentKey
                     )
                    }
                   />
                  </label>
                 );
                }
               } else if (type === "checkbox") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <input
                     type='checkbox'
                     name={keyName}
                     checked={
                      isBool === true || isBool === false
                       ? keyName === isBool
                       : checkedValue
                     }
                     onChange={(e) =>
                      writeUserState(
                       onChange,
                       e,
                       parentObj,
                       n,
                       parentState,
                       parentKey,
                       i
                      )
                     }
                    />
                   </label>
                  );
                 });

                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <input
                    type='checkbox'
                    name={keyName}
                    checked={
                     isBool === true || isBool === false
                      ? keyName === isBool
                      : checkedValue
                    }
                    onChange={(e) =>
                     writeUserState(
                      onChange,
                      e,
                      parentObj,
                      n,
                      parentState,
                      parentKey
                     )
                    }
                   />
                  </label>
                 );
                }
               } else if (type === "select") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <select
                     name={keyName}
                     onChange={(e) =>
                      writeUserState(
                       onChange,
                       e,
                       parentObj,
                       n,
                       parentState,
                       parentKey,
                       i
                      )
                     }>
                     {options.map(({ value, display }) => (
                      <option value={value}>{display}</option>
                     ))}
                    </select>
                   </label>
                  );
                 });
                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <select
                    name={keyName}
                    onChange={(e) =>
                     writeUserState(
                      onChange,
                      e,
                      parentObj,
                      n,
                      parentState,
                      parentKey
                     )
                    }>
                    {options.map(({ value, display }) => (
                     <option value={value}>{display}</option>
                    ))}
                   </select>
                  </label>
                 );
                }
               } else if (type === "number") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <input
                     type='number'
                     name={keyName}
                     checked={keyName === checkedValue}
                     onChange={(e) =>
                      writeUserState(
                       onChange,
                       e,
                       parentObj,
                       n,
                       parentState,
                       parentKey,
                       i
                      )
                     }
                    />
                   </label>
                  );
                 });
                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <input
                    type='number'
                    name={keyName}
                    checked={keyName === checkedValue}
                    onChange={(e) =>
                     writeUserState(
                      onChange,
                      e,
                      parentObj,
                      n,
                      parentState,
                      parentKey
                     )
                    }
                   />
                  </label>
                 );
                }
               } else if (type === "date") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <input
                     type='date'
                     name={keyName}
                     value={displayDate && displayDate}
                     onChange={(e) =>
                      writeUserState(
                       onChange,
                       e,
                       parentObj,
                       n,
                       parentState,
                       parentKey,
                       i
                      )
                     }
                    />
                   </label>
                  );
                 });
                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <input
                    type='date'
                    name={keyName}
                    value={displayDate && displayDate}
                    onChange={(e) =>
                     writeUserState(
                      onChange,
                      e,
                      parentObj,
                      n,
                      parentState,
                      parentKey
                     )
                    }
                   />
                  </label>
                 );
                }
               } else if (type === "range") {
                if (Array.isArray(userState[parentState][parentKey])) {
                 const arr = userState[parentState][parentKey].map((k, i) => {
                  return (
                   <label>
                    {label}
                    <Slider
                     axis='x'
                     x={parseFloat(userState[`${keyName}`])}
                     value={parseFloat(userState[`${keyName}`])}
                     onChange={(e) =>
                      writeUserState(
                       onChange,
                       e,
                       parentObj,
                       n,
                       parentState,
                       parentKey,
                       i
                      )
                     }
                     orientation='horizontal'
                     name={keyName}
                     min={rangeMax}
                     max={rangeMin}
                     step={step}
                    />
                   </label>
                  );
                 });
                 return arr;
                } else {
                 return (
                  <label>
                   {label}
                   <Slider
                    axis='x'
                    x={parseFloat(userState[`${keyName}`])}
                    value={parseFloat(userState[`${keyName}`])}
                    onChange={(e) =>
                     writeUserState(
                      onChange,
                      e,
                      parentObj,
                      n,
                      parentState,
                      parentKey
                     )
                    }
                    orientation='horizontal'
                    name={keyName}
                    min={rangeMax}
                    max={rangeMin}
                    step={step}
                   />
                  </label>
                 );
                }
               } else if (type === "submit") {
                return (
                 <input
                  type='submit'
                  onClick={() => readUserState(userState, lead)}
                 />
                );
               } else
                return (
                 <span>
                  {type === "h" && headingSize === "h1" ? (
                   <h1
                    style={{
                     color: `${color}`,
                     fontFamily: `${font}`,
                     background: `${background}`,
                    }}>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    <span>
                     {faIconPosition === "front" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}{" "}
                     {fontStyle
                      ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                      : text}
                     {faIconPosition === "back" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}
                    </span>
                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </h1>
                  ) : (
                   ""
                  )}
                  {type === "h" && headingSize === "h2" ? (
                   <h2
                    style={{
                     color: `${color}`,
                     fontFamily: `${font}`,
                     background: `${background}`,
                    }}>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    <span>
                     {faIconPosition === "front" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}{" "}
                     {fontStyle
                      ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                      : text}
                     {faIconPosition === "back" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}
                    </span>
                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </h2>
                  ) : (
                   ""
                  )}
                  {type === "h" && headingSize === "h3" ? (
                   <h3
                    style={{
                     color: `${color}`,
                     fontFamily: `${font}`,
                     background: `${background}`,
                    }}>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    <span>
                     {faIconPosition === "front" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}{" "}
                     {fontStyle
                      ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                      : text}
                     {faIconPosition === "back" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}
                    </span>
                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </h3>
                  ) : (
                   ""
                  )}
                  {type === "h" && headingSize === "h4" ? (
                   <h4
                    style={{
                     color: `${color}`,
                     fontFamily: `${font}`,
                     background: `${background}`,
                    }}>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    <span>
                     {faIconPosition === "front" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}{" "}
                     {fontStyle
                      ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                      : text}
                     {faIconPosition === "back" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}
                    </span>
                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </h4>
                  ) : (
                   ""
                  )}
                  {type === "h" && headingSize === "h5" ? (
                   <h5
                    style={{
                     color: `${color}`,
                     fontFamily: `${font}`,
                     background: `${background}`,
                    }}>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    <span>
                     {faIconPosition === "front" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}{" "}
                     {fontStyle
                      ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                      : text}
                     {faIconPosition === "back" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}
                    </span>
                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </h5>
                  ) : (
                   ""
                  )}
                  {type === "p" ? (
                   <p
                    style={{
                     color: `${color}`,
                     background: `${background}`,
                     fontFamily: `${font}`,
                    }}>
                    {fontStyle
                     ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                     : text}
                   </p>
                  ) : (
                   ""
                  )}
                  {type === "li" ? (
                   <li>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    <span>
                     {faIconPosition === "front" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}{" "}
                     {fontStyle
                      ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                      : text}
                     {faIconPosition === "back" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}
                    </span>

                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </li>
                  ) : (
                   ""
                  )}
                  {type === "i" ? (
                   <i
                    style={{
                     color: `${color}`,
                    }}
                    className={faIcon}
                   />
                  ) : (
                   ""
                  )}
                  {type === "a" ? (
                   <a
                    style={
                     buttonStyle === "btn"
                      ? {
                         display: "block",
                         minWidth: "115px",
                         maxWidth: "50%",
                         minHeight: "25px",
                         maxHeight: "50px",
                         background: "#333",
                         padding: "10px",
                         textAlign: "center",
                         borderRadius: "5px",
                         color: "white",
                         fontWeight: "bold",
                         lineHeight: "25px",
                        }
                      : {}
                    }
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    <span>
                     {faIconPosition === "front" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}{" "}
                     {fontStyle
                      ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                      : text}
                     {faIconPosition === "back" ? (
                      <i className={faIcon}></i>
                     ) : (
                      ""
                     )}
                    </span>

                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </a>
                  ) : (
                   ""
                  )}
                  {type === "button" ? (
                   <button
                    style={{
                     background: `${background}`,
                    }}
                    onClick={action}>
                    {faIconPosition === "top" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i> <br />
                     </span>
                    ) : (
                     ""
                    )}
                    {faIconPosition === "front" ? (
                     <i className={faIcon}></i>
                    ) : (
                     ""
                    )}{" "}
                    {fontStyle
                     ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                     : text}
                    {faIconPosition === "back" ? (
                     <i className={faIcon}></i>
                    ) : (
                     ""
                    )}
                    {faIconPosition === "bottom" ? (
                     <span
                      style={{
                       display: "block",
                       textAlign: "center",
                       width: "100%",
                      }}>
                      <i className={faIcon}></i>
                     </span>
                    ) : (
                     ""
                    )}
                   </button>
                  ) : (
                   ""
                  )}
                  {type === "img" ? (
                   <img
                    alt={name}
                    src={code}
                    height={`${height}px`}
                    width={`${width}px`}
                   />
                  ) : (
                   ""
                  )}
                  {type === "vid" ? (
                   <YouTube
                    videoId={url}
                    opts={{
                     height: height,
                     width: width,
                     playerVars: {
                      autoplay: autoplay,
                     },
                    }}
                   />
                  ) : (
                   ""
                  )}
                 </span>
                );
              }
             )}
           </div>
          </Fragment>
          {subGrids.length > 0 && (
           <Grid
            className={
             subGrids[subGrids.findIndex((x) => x.parent === id)] &&
             `G${subGrids[subGrids.findIndex((x) => x.parent === id)].key}`
            }
            key={
             subGrids[subGrids.findIndex((x) => x.parent === id)] &&
             subGrids[subGrids.findIndex((x) => x.parent === id)].key
            }
            columns={
             subGrids[subGrids.findIndex((x) => x.parent === id)] &&
             subGrids[subGrids.findIndex((x) => x.parent === id)].columnString
            }
            rows={
             subGrids[subGrids.findIndex((x) => x.parent === id)] &&
             subGrids[subGrids.findIndex((x) => x.parent === id)].rowString
            }
            flow={
             subGrids[subGrids.findIndex((x) => x.parent === id)] &&
             subGrids[subGrids.findIndex((x) => x.parent === id)].direction
            }
            justifyContent={
             subGrids[subGrids.findIndex((x) => x.parent === id)] &&
             subGrids[subGrids.findIndex((x) => x.parent === id)]
              .horizontalAlignment
            }
            alignContent={
             subGrids[subGrids.findIndex((x) => x.parent === id)] &&
             subGrids[subGrids.findIndex((x) => x.parent === id)]
              .verticalAlignment
            }>
            {subCells
             .filter((g) => g.grandParent === id)
             .map(
              (
               {
                top,
                id,
                left,
                rowSpan,
                columnSpan,
                css,
                contentCss,
                grandParent,
                subViewState,
                content,
               },
               i
              ) => {
               const index = cells.findIndex((x) => x.id === grandParent);
               return (
                <Cell
                 height={rowSpan}
                 width={columnSpan}
                 className={`C${id}`}
                 top={top}
                 left={left}
                 key={id}>
                 <>
                  {subViewState === true ? (
                   <div>
                    <div className='grid-2'>
                     <div
                      className='card'
                      style={{ backgroundColor: "#f4f4f4" }}>
                      <button
                       className='btn btn-block btn-dark'
                       onClick={() => addSubCellForm(_id)}>
                       Add Current Form To This Cell
                      </button>
                      <button
                       className='btn btn-block btn-dark'
                       onClick={() =>
                        setSubCellQuiz([
                         ...subCellQuiz,
                         { quiz: builtQuiz, cell: _id },
                        ])
                       }>
                       Add Built Quiz To This Cell
                      </button>
                      {subContentToggle === true ? (
                       <div style={{ height: "500px", overflowY: "scroll" }}>
                        <span
                         className='lead bg-light'
                         style={{ float: "right" }}>
                         <a
                          onClick={() =>
                           setSubContentToggle((prevState) => !prevState)
                          }>
                          X
                         </a>
                        </span>
                        <h5>{gridLevel && "Grid Level"} Styles</h5>
                        <button
                         className='btn btn-light btn-sm'
                         onClick={() => setGridLevelView(true)}>
                         View Grid Level Styles
                        </button>
                        {gridLevel === false ? (
                         <h5>
                          Each Number corresponds with the section ordinality of
                          the content assigned to this cell
                         </h5>
                        ) : (
                         ""
                        )}
                        <CssFilter
                         i={i}
                         ind={contentCss.findIndex(
                          (x) => x.id === currentResults[0].id
                         )}
                         level={gridLevel === true ? "cell" : "cellChild"}
                        />
                        <Pagination
                         postsPerPage={postsPerPage}
                         totalPosts={contentCss.length}
                         paginate={paginate}
                         toggleGrid={toggleGrid}
                        />

                        {Object.keys(filtered).length > 0 &&
                         Object.keys(filtered).map((key) => {
                          if (key.includes("Color")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option>Set Color...</option>
                              <option value={pallet && pallet.primary}>
                               Primary
                              </option>
                              <option value={pallet && pallet.dark}>
                               Dark
                              </option>
                              <option value={pallet && pallet.light}>
                               Light
                              </option>
                              <option value={pallet && pallet.danger}>
                               Danger
                              </option>
                              <option value={pallet && pallet.success}>
                               Success
                              </option>
                             </select>
                            </label>
                           );
                          } else if (key === "animation") {
                           return (
                            <label key={key}>
                             <div className='card'>
                              <button
                               className='btn btn-sm btn-dark'
                               onClick={() => addSubCellAnimation(i)}>
                               + Animation
                              </button>
                              <h5>Current Animation Order</h5>
                              <ul>
                               {css.animation.length > 0 &&
                                css.animation.map(
                                 (
                                  {
                                   animationName,
                                   animationDuration,
                                   animationTimingFunction,
                                   animationDelay,
                                   animationIterationCount,
                                   animationDirection,
                                   animationFillMode,
                                   cubicNs,
                                   steps,
                                   keyframes,
                                  },
                                  index
                                 ) => (
                                  <div>
                                   <h5>Animation Name</h5>
                                   <input
                                    type='text'
                                    name='animationName'
                                    value={animationName}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   <h5>Animation Duration</h5>
                                   <input
                                    type='text'
                                    name='animationDuration'
                                    value={animationDuration}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   <h5>Animation Function</h5>
                                   <select
                                    name='animationTimingFunction'
                                    value={animationTimingFunction}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }>
                                    <option></option>
                                    <option value='ease'>Ease</option>
                                    <option value='ease-in'>Ease In</option>
                                    <option value='ease-in-out'>
                                     Ease In Out
                                    </option>
                                    <option value='step-end'>Step End</option>
                                    <option value='step-start'>
                                     Step Start
                                    </option>
                                    <option value='cubic-bezier'>
                                     Cubic Bezier
                                    </option>
                                    <option value='steps'>Steps</option>
                                    <option value='inherit'>Inherit</option>
                                    <option value='initial'>Initial</option>
                                   </select>
                                   <h5>Animation Delay</h5>
                                   <input
                                    placeholder='enter a value in seconds'
                                    type='text'
                                    name='animationDelay'
                                    value={animationDelay}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   {animationTimingFunction ===
                                    "cubic-bezier" &&
                                    Object.keys(cubicNs).map((n) => (
                                     <div>
                                      <h5>Cubic Bez (n,n,n,n)</h5>
                                      <div key={n}>
                                       <h5>N {parseInt(n) + 1}</h5>
                                       <Slider
                                        axis='x'
                                        x={
                                         css["animation"][index]["cubicNs"][n]
                                        }
                                        value={parseFloat(
                                         css["animation"][index]["cubicNs"][n]
                                        )}
                                        onChange={(e) =>
                                         onChangeSubCell(
                                          i,
                                          e,
                                          "cubicNs",
                                          index,
                                          n
                                         )
                                        }
                                        orientation='horizontal'
                                        name={n}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                       />
                                      </div>
                                     </div>
                                    ))}
                                   <h5>Animation Iteration Count</h5>
                                   <input
                                    placeholder='Positive Integers Only'
                                    type='text'
                                    name='animationIterationCount'
                                    value={animationIterationCount}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   <h5>Animation Iteration Count</h5>
                                   <input
                                    placeholder='Positive Integers Only'
                                    type='text'
                                    name='animationIterationCount'
                                    value={animationIterationCount}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   <h5>Animation Direction</h5>
                                   <select
                                    name='animationDirection'
                                    value={animationDirection}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }>
                                    <option></option>
                                    <option value='normal'>Normal</option>
                                    <option value='reverse'>Reverse</option>
                                    <option value='alternate'>Alternate</option>
                                    <option value='reverse'>
                                     Alternate Reverse
                                    </option>
                                    <option value='inherit'>Inherit</option>
                                   </select>
                                   <h5>Animation Fill Mode</h5>
                                   <select
                                    name='animationFillMode'
                                    value={animationFillMode}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }>
                                    <option></option>
                                    <option value='none'>None</option>
                                    <option value='forward'>Forward</option>
                                    <option value='backward'>Backward</option>
                                    <option value='both'>Both</option>
                                    <option value='inherit'>Inherit</option>
                                   </select>
                                   <h5>Key Frames</h5>
                                   <button
                                    className='btn btn-sm btn-dark'
                                    onClick={() =>
                                     addSubCellAnimationKeyframe(i, index)
                                    }>
                                    + Keyframe
                                   </button>
                                   lineHeight:'',
                                  </div>
                                 )
                                )}
                              </ul>
                             </div>
                            </label>
                           );
                          } else if (key === "posiition") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             ition
                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='fixed'>Fixed</option>
                              <option value='relative'>Relative</option>
                              <option value='absolute'>Absolute</option>
                             </select>
                            </label>
                           );
                          } else if (key === "backgroundRepeat") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='repeatX'>Repeat X</option>
                              <option value='repeatY'>Repeat Y</option>
                              <option value='repeat'>Repeat</option>
                              <option value='space'>Space</option>
                              <option value='round'>Round</option>
                              <option value='noRepeat'>No Repeat</option>
                             </select>
                            </label>
                           );
                          } else if (key === "backgroundPosition") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='center'>Center</option>
                              <option value='left'>Left</option>
                              <option value='right'>Right</option>
                              <option value='top'>Top</option>
                              <option value='bottom'>Bottom</option>
                             </select>
                            </label>
                           );
                          } else if (key === "backgroundSize") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='cover'>Cover</option>
                              <option value='contain'>Contain</option>
                             </select>
                            </label>
                           );
                          } else if (key === "display") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='block'>Block</option>
                              <option value='inline'>Inline</option>
                              <option value='inline-block'>Inline Block</option>
                              <option value='flex'>Flex</option>
                              <option value='none'>None</option>
                             </select>
                            </label>
                           );
                          } else if (key === "textDecorationLine") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='none'>None</option>
                              <option value='underline'>Underline</option>
                              <option value='overline'>Overline</option>
                              <option value='line-through'>Line Through</option>
                              <option value='blink'>Blink</option>
                             </select>
                            </label>
                           );
                          } else if (key === "textDecorationStyle") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='solid'>Solid</option>
                              <option value='double'>Double</option>
                              <option value='dotted'>Dotted</option>
                              <option value='dashed'>Dashed</option>
                              <option value='wavy'>Wavy</option>
                             </select>
                            </label>
                           );
                          } else if (key === "transition") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <button
                              className='btn btn-sm btn-dark'
                              onClick={() => addSubCellTransition(i)}>
                              + Transition
                             </button>
                             <div
                              className='card'
                              style={{
                               overflowY: "scroll",
                               overflowX: "scroll",
                              }}>
                              {css.transition.map(
                               (
                                {
                                 property,
                                 duration,
                                 timingFunction,
                                 cubicNs,
                                 delay,
                                },
                                index
                               ) => (
                                <div key={index} className='card'>
                                 <h5>Transition Property</h5>
                                 <select
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }
                                  value={property}
                                  name='property'>
                                  <option value=''></option>
                                  {Object.keys(flatCss)
                                   .filter(
                                    (e) => typeof parseInt(e) === "number"
                                   )
                                   .map((c, i) => (
                                    <option key={i} value={c}>
                                     {c}
                                    </option>
                                   ))}
                                  <option value='color'>Color</option>
                                  <option value='background-color'>
                                   Background Color
                                  </option>
                                 </select>
                                 <h5>Transition Timing</h5>
                                 <input
                                  type='text'
                                  name='duration'
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }
                                  value={duration}
                                  placeholder='Enter A Value in seconds'
                                 />
                                 <h5>Transition Function</h5>
                                 <select
                                  name='timingFunction'
                                  value={timingFunction}
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }>
                                  <option></option>
                                  <option value='ease'>Ease</option>
                                  <option value='ease-in'>Ease In</option>
                                  <option value='ease-in-out'>
                                   Ease In Out
                                  </option>
                                  <option value='step-end'>Step End</option>
                                  <option value='step-start'>Step Start</option>
                                  <option value='cubic-bezier'>
                                   Cubic Bezier
                                  </option>
                                  <option value='inherit'>Inherit</option>
                                  <option value='initial'>Initial</option>
                                 </select>
                                 <h5>Transition Delay</h5>
                                 <input
                                  type='text'
                                  name='delay'
                                  value={delay}
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }
                                  placeholder='Enter A Value in seconds'
                                 />

                                 {timingFunction === "cubic-bezier" &&
                                  Object.keys(cubicNs).map((n) => (
                                   <div>
                                    <h5>Cubic Bez (n,n,n,n)</h5>
                                    <div key={n}>
                                     <h5>N {parseInt(n) + 1}</h5>
                                     <Slider
                                      axis='x'
                                      x={css["transition"][index]["cubicNs"][n]}
                                      value={parseFloat(
                                       css["transition"][index]["cubicNs"][n]
                                      )}
                                      onChange={(e) =>
                                       onChangeSubCell(
                                        i,
                                        e,
                                        "cubicNs",
                                        index,
                                        n
                                       )
                                      }
                                      orientation='horizontal'
                                      name={n}
                                      min={0}
                                      max={1}
                                      step={0.01}
                                     />
                                    </div>
                                   </div>
                                  ))}
                                </div>
                               )
                              )}
                             </div>
                            </label>
                           );
                          } else if (key === "transform") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              onChange={(e) =>
                               onChangeSubCell(i, e, "transform")
                              }
                              multiple>
                              <option></option>
                              <option value='rotateX'>RotateX</option>
                              <option value='rotateY'>RotateY</option>
                              <option value='skewX'>SkewX</option>
                              <option value='skewY'>SkewY</option>
                              <option value='rotateZ'>RotateZ</option>
                              <option value='scaleX'>ScaleX</option>
                              <option value='scaleY'>ScaleY</option>
                              <option value='translateX'>TranslateX</option>
                              <option value='translateY'>TranslateY</option>
                             </select>
                            </label>
                           );
                          } else if (key === "transformProp") {
                           return (
                            <label key={key}>
                             <div className='card all-center'>
                              <h5>Current Transform Order</h5>
                              <ul>
                               {css.transform.map((m) => (
                                <li key={m}>{m}</li>
                               ))}
                              </ul>
                             </div>
                             {css.transform.includes("rotateZ") && (
                              <div>
                               <h5>Rotate Z Deg</h5>
                               <Slider
                                axis='x'
                                x={css["transformProp"]["rotateZ"]}
                                value={parseInt(
                                 css["transformProp"]["rotateZ"]
                                )}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e,
                                  "rotateZ",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='rotateZ'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("rotateX") && (
                              <div>
                               <h5>Rotate X Deg</h5>
                               <Slider
                                axis='x'
                                x={css["transformProp"]["rotateX"]}
                                value={parseInt(
                                 css["transformProp"]["rotateX"]
                                )}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e,
                                  "rotateX",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='rotateX'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("translateX") && (
                              <div>
                               <h5>Translate X Px</h5>
                               <input
                                type='text'
                                name='translateX'
                                value={css["transformProp"]["translateX"]}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e.target.value,
                                  "translateX",
                                  "transformProp"
                                 )
                                }
                               />
                              </div>
                             )}
                             {css.transform.includes("translateY") && (
                              <div>
                               <h5>Translate Y Px</h5>
                               <input
                                type='text'
                                name='translateY'
                                value={css["transformProp"]["translateY"]}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e.target.value,
                                  "translateY",
                                  "transformProp"
                                 )
                                }
                               />
                              </div>
                             )}
                             {css.transform.includes("rotateY") && (
                              <div>
                               <h5>Rotate Y Deg</h5>
                               <Slider
                                value={parseInt(
                                 css["transformProp"]["rotateY"]
                                )}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e,
                                  "rotateY",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='rotateY'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("skewX") && (
                              <div>
                               <h5>Skew X Deg</h5>
                               <Slider
                                value={parseInt(css["transformProp"]["skewX"])}
                                onChange={(e) =>
                                 onChangeSubCell(i, e, "skewX", "transformProp")
                                }
                                orientation='horizontal'
                                name='skewX'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("skewY") && (
                              <div>
                               <h5>Skew Y Deg</h5>
                               <Slider
                                value={parseInt(css["transformProp"]["skewY"])}
                                onChange={(e) =>
                                 onChangeSubCell(i, e, "skewY", "transformProp")
                                }
                                orientation='horizontal'
                                name='skewY'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("scaleX") && (
                              <div>
                               <h5>Scale X Percent</h5>
                               <Slider
                                value={
                                 parseInt(css["transformProp"]["scaleX"]) * 10
                                }
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e / 10,
                                  "scaleX",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='scaleX'
                                min={-100}
                                max={200}
                                step={1}
                               />
                              </div>
                             )}{" "}
                             {css.transform.includes("scaleY") && (
                              <div>
                               <h5>Scale Y Percent</h5>
                               <Slider
                                value={
                                 parseInt(css["transformProp"]["scaleY"]) * 10
                                }
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e / 10,
                                  "scaleY",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='scaleY'
                                min={-100}
                                max={200}
                                step={1}
                               />
                              </div>
                             )}
                            </label>
                           );
                          } else if (key === "fontSize") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='5px'>XX Small</option>
                              <option value='7px'>X Small</option>
                              <option value='11px'>Small</option>
                              <option value='16px'>Medium</option>
                              <option value='24px'>Large</option>
                              <option value='36px'>X Large</option>
                              <option value='54px'>XX Large</option>
                             </select>
                            </label>
                           );
                          } else if (key.includes("Inset")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option>Outer</option>
                              <option value='inset'>Inset</option>
                             </select>
                            </label>
                           );
                          } else if (key === "fontWeight") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option value='100'>100</option>
                              <option value='200'>200</option>
                              <option value='300'>300</option>
                              <option value='400'>400</option>
                              <option value='500'>500</option>
                              <option value='600'>600</option>
                              <option value='700'>700</option>
                              <option value='800'>800</option>
                              <option value='900'>900</option>
                             </select>
                            </label>
                           );
                          } else if (key === "opacity") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <Slider
                              axis='x'
                              x={css.opacity}
                              value={parseInt(css[key])}
                              onChange={(e) =>
                               onChangeSubCell(i, e, "opacity", "slider")
                              }
                              orientation='horizontal'
                              min={0}
                              max={100}
                              step={1}
                             />
                            </label>
                           );
                          } else if (key.includes("Radius")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <Slider
                              value={parseInt(css[key])}
                              onChange={(e) =>
                               onChangeSubCell(i, e, key, "slider")
                              }
                              orientation='horizontal'
                              min={0}
                              max={50}
                              step={0.5}
                             />
                            </label>
                           );
                          } else if (key === "textAlign") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>

                              <option value='start'>Start</option>
                              <option value='end'>End</option>
                              <option value='left'>Left</option>
                              <option value='right'>Right</option>
                              <option value='center'>Center</option>
                              <option value='justify'>Justify</option>
                              <option value='matchParent'>Match Parent</option>
                              <option value='justifyAll'>Justify All</option>
                             </select>
                            </label>
                           );
                          } else if (
                           key.includes("border") &&
                           key.includes("Style")
                          ) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='solid'>Solid</option>
                              <option value='double'>Double</option>
                              <option value='dotted'>Dotted</option>
                              <option value='dashed'>Dashed</option>
                              <option value='groove'>Groove</option>
                              <option value='none'>None</option>
                              <option value='hidden'>Hidden</option>
                              <option value='ridge'>Ridge</option>
                              <option value='inset'>Inset</option>
                              <option value='outset'>Outset</option>
                             </select>
                            </label>
                           );
                          } else if (key === "textShadowSize") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='small'>2px</option>
                             </select>
                            </label>
                           );
                          } else if (key.includes("overflow")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='visible'>Visible</option>
                              <option value='hidden'>Hidden</option>
                              <option value='clip'>Clip</option>
                              <option value='scroll'>Scroll</option>
                              <option value='auto'>Auto</option>
                             </select>
                            </label>
                           );
                          } else {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <input
                              type='text'
                              placeholder='Enter A Value In Pixels'
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}
                              name={key}
                             />
                            </label>
                           );
                          }
                         })}

                        {gridLevel &&
                         Object.keys(filtered).length === 0 &&
                         Object.keys(css).map((key) => {
                          if (key.includes("Color")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option>Set Color...</option>
                              <option value={pallet && pallet.primary}>
                               Primary
                              </option>
                              <option value={pallet && pallet.dark}>
                               Dark
                              </option>
                              <option value={pallet && pallet.light}>
                               Light
                              </option>
                              <option value={pallet && pallet.danger}>
                               Danger
                              </option>
                              <option value={pallet && pallet.success}>
                               Success
                              </option>
                             </select>
                            </label>
                           );
                          } else if (key === "position") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='fixed'>Fixed</option>
                              <option value='relative'>Relative</option>
                              <option value='absolute'>Absolute</option>
                             </select>
                            </label>
                           );
                          } else if (key === "backgroundRepeat") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='repeatX'>Repeat X</option>
                              <option value='repeatY'>Repeat Y</option>
                              <option value='repeat'>Repeat</option>
                              <option value='space'>Space</option>
                              <option value='round'>Round</option>
                              <option value='noRepeat'>No Repeat</option>
                             </select>
                            </label>
                           );
                          } else if (key === "backgroundPosition") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='center'>Center</option>
                              <option value='left'>Left</option>
                              <option value='right'>Right</option>
                              <option value='top'>Top</option>
                              <option value='bottom'>Bottom</option>
                             </select>
                            </label>
                           );
                          } else if (key === "backgroundSize") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='cover'>Cover</option>
                              <option value='contain'>Contain</option>
                             </select>
                            </label>
                           );
                          } else if (key === "display") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='block'>Block</option>
                              <option value='inline'>Inline</option>
                              <option value='inline-block'>Inline Block</option>
                              <option value='flex'>Flex</option>
                              <option value='none'>None</option>
                             </select>
                            </label>
                           );
                          } else if (key === "textDecorationLine") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='none'>None</option>
                              <option value='underline'>Underline</option>
                              <option value='overline'>Overline</option>
                              <option value='line-through'>Line Through</option>
                              <option value='blink'>Blink</option>
                             </select>
                            </label>
                           );
                          } else if (key === "textDecorationStyle") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='solid'>Solid</option>
                              <option value='double'>Double</option>
                              <option value='dotted'>Dotted</option>
                              <option value='dashed'>Dashed</option>
                              <option value='wavy'>Wavy</option>
                             </select>
                            </label>
                           );
                          } else if (key === "transition") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <button
                              className='btn btn-sm btn-dark'
                              onClick={() => addSubCellTransition(i)}>
                              + Transition
                             </button>
                             <div
                              className='card'
                              style={{
                               overflowY: "scroll",
                               overflowX: "scroll",
                              }}>
                              {css.transition.map(
                               (
                                {
                                 property,
                                 duration,
                                 timingFunction,
                                 cubicNs,
                                 delay,
                                },
                                index
                               ) => (
                                <div key={index} className='card'>
                                 <h5>Transition Property</h5>
                                 <select
                                  name='property'
                                  value={property}
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }>
                                  <option value='translate'>Translate</option>
                                  <option value='transform'>Transform</option>
                                  <option value='height'>Height</option>
                                  <option value='width'>Width</option>
                                  <option value='border-left-color'>
                                   Border Left Color
                                  </option>
                                  <option value='border-left-width'>
                                   Border Left Width
                                  </option>
                                  <option value='background-color'>
                                   Background Color
                                  </option>
                                  <option value='background-position'>
                                   Background Position
                                  </option>
                                  <option value='background-size'>
                                   Background Size
                                  </option>
                                  <option value='border-bottom-color'>
                                   Border Bottom Color
                                  </option>
                                  <option value='border-bottom-left-radius'>
                                   Border Bottom Left Radius
                                  </option>
                                  <option value='border-bottom-right-radius'>
                                   Border Bottom Right Radius
                                  </option>
                                  <option value='border-bottom-width'>
                                   Border Bottom Width
                                  </option>
                                  <option value='border-radius'>
                                   Border Radius
                                  </option>
                                  <option value='border-right'>
                                   Border Right
                                  </option>
                                  <option value='border-right-color'>
                                   Border Right Color
                                  </option>
                                  <option value='border-right-width'>
                                   Border Right Width
                                  </option>
                                  <option value='border-color'>
                                   Border Color
                                  </option>
                                  <option value='border-width'>
                                   Border Width
                                  </option>
                                  <option value='border-top-color'>
                                   Border Top Color
                                  </option>
                                  <option value='border-top-left-radius'>
                                   Border Top Left Radius
                                  </option>
                                  <option value='border-top-right-radius'>
                                   Border Top Right Radius
                                  </option>
                                  <option value='border-top-width'>
                                   Border Top Width
                                  </option>
                                  <option value='box-shadow'>Box Shadow</option>
                                  <option value='font'>Font</option>
                                  <option value='font-size'>Font Size</option>
                                  <option value='flex'>Flex</option>
                                  <option value='font-weight'>
                                   Font Weight
                                  </option>
                                  <option value='line-height'>
                                   Line Height
                                  </option>
                                  <option value='margin-bottom'>
                                   Margin Bottom
                                  </option>
                                  <option value='margin'>Margin</option>
                                  <option value='margin-left'>
                                   Margin Left
                                  </option>
                                  <option value='margin-top'>Margin Top</option>
                                  <option value='margin-right'>
                                   Margin Right
                                  </option>
                                  <option value='opacity'>Opacity</option>
                                  <option value='outline'>Outline</option>
                                  <option value='padding-left'>
                                   Padding Left
                                  </option>
                                  <option value='padding-right'>
                                   Padding Right
                                  </option>
                                  <option value='padding-top'>
                                   Padding Top
                                  </option>
                                  <option value='z-index'>Z Index</option>
                                  <option value='padding-bottom'>
                                   Padding Bottom
                                  </option>
                                  <option value='top'>Top</option>
                                  <option value='left'>Left</option>
                                  <option value='right'>Right</option>
                                  <option value='bottom'>Bottom</option>
                                 </select>
                                 <h5>Transition Timing</h5>
                                 <input
                                  type='text'
                                  name='duration'
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }
                                  value={duration}
                                  placeholder='Enter A Value in seconds'
                                 />
                                 <h5>Transition Function</h5>
                                 <select
                                  name='timingFunction'
                                  value={timingFunction}
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }>
                                  <option></option>
                                  <option value='ease'>Ease</option>
                                  <option value='ease-in'>Ease In</option>
                                  <option value='ease-in-out'>
                                   Ease In Out
                                  </option>
                                  <option value='step-end'>Step End</option>
                                  <option value='step-start'>Step Start</option>
                                  <option value='cubic-bezier'>
                                   Cubic Bezier
                                  </option>
                                  <option value='inherit'>Inherit</option>
                                  <option value='initial'>Initial</option>
                                 </select>
                                 <h5>Transition Delay</h5>
                                 <input
                                  type='text'
                                  name='delay'
                                  value={delay}
                                  onChange={(e) =>
                                   onChangeSubCell(i, e, "transition", index)
                                  }
                                  placeholder='Enter A Value in seconds'
                                 />

                                 {timingFunction === "cubic-bezier" &&
                                  Object.keys(cubicNs).map((n) => (
                                   <div>
                                    <h5>Cubic Bez (n,n,n,n)</h5>
                                    <div key={n}>
                                     <h5>N {parseInt(n) + 1}</h5>
                                     <Slider
                                      axis='x'
                                      x={css["transition"][index]["cubicNs"][n]}
                                      value={parseFloat(
                                       css["transition"][index]["cubicNs"][n]
                                      )}
                                      onChange={(e) =>
                                       onChangeSubCell(
                                        i,
                                        e,
                                        "cubicNs",
                                        index,
                                        n
                                       )
                                      }
                                      orientation='horizontal'
                                      name={n}
                                      min={0}
                                      max={1}
                                      step={0.01}
                                     />
                                    </div>
                                   </div>
                                  ))}
                                </div>
                               )
                              )}
                             </div>
                            </label>
                           );
                          } else if (key === "transform") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              onChange={(e) =>
                               onChangeSubCell(i, e, "transform")
                              }
                              multiple>
                              <option></option>
                              <option value='rotateX'>RotateX</option>
                              <option value='rotateY'>RotateY</option>
                              <option value='skewX'>SkewX</option>
                              <option value='skewY'>SkewY</option>
                              <option value='rotateZ'>RotateZ</option>
                              <option value='scaleX'>ScaleX</option>
                              <option value='scaleY'>ScaleY</option>
                              <option value='translateX'>TranslateX</option>
                              <option value='translateY'>TranslateY</option>
                             </select>
                            </label>
                           );
                          } else if (key === "transformProp") {
                           return (
                            <label key={key}>
                             <div className='card all-center'>
                              <h5>Current Transform Order</h5>
                              <ul>
                               {css.transform.map((m) => (
                                <li key={m}>{m}</li>
                               ))}
                              </ul>
                             </div>
                             {css.transform.includes("rotateZ") && (
                              <div>
                               <h5>Rotate Z Deg</h5>
                               <Slider
                                axis='x'
                                x={css["transformProp"]["rotateZ"]}
                                value={parseInt(
                                 css["transformProp"]["rotateZ"]
                                )}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e,
                                  "rotateZ",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='rotateZ'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("rotateX") && (
                              <div>
                               <h5>Rotate X Deg</h5>
                               <Slider
                                axis='x'
                                x={css["transformProp"]["rotateX"]}
                                value={parseInt(
                                 css["transformProp"]["rotateX"]
                                )}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e,
                                  "rotateX",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='rotateX'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("translateX") && (
                              <div>
                               <h5>Translate X Px</h5>
                               <input
                                type='text'
                                name='translateX'
                                value={css["transformProp"]["translateX"]}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e.target.value,
                                  "translateX",
                                  "transformProp"
                                 )
                                }
                               />
                              </div>
                             )}
                             {css.transform.includes("translateY") && (
                              <div>
                               <h5>Translate Y Px</h5>
                               <input
                                type='text'
                                name='translateY'
                                value={css["transformProp"]["translateY"]}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e.target.value,
                                  "translateY",
                                  "transformProp"
                                 )
                                }
                               />
                              </div>
                             )}
                             {css.transform.includes("rotateY") && (
                              <div>
                               <h5>Rotate Y Deg</h5>
                               <Slider
                                value={parseInt(
                                 css["transformProp"]["rotateY"]
                                )}
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e,
                                  "rotateY",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='rotateY'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("skewX") && (
                              <div>
                               <h5>Skew X Deg</h5>
                               <Slider
                                value={parseInt(css["transformProp"]["skewX"])}
                                onChange={(e) =>
                                 onChangeSubCell(i, e, "skewX", "transformProp")
                                }
                                orientation='horizontal'
                                name='skewX'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("skewY") && (
                              <div>
                               <h5>Skew Y Deg</h5>
                               <Slider
                                value={parseInt(css["transformProp"]["skewY"])}
                                onChange={(e) =>
                                 onChangeSubCell(i, e, "skewY", "transformProp")
                                }
                                orientation='horizontal'
                                name='skewY'
                                min={0}
                                max={360}
                                step={1}
                               />
                              </div>
                             )}
                             {css.transform.includes("scaleX") && (
                              <div>
                               <h5>Scale X Percent</h5>
                               <Slider
                                value={
                                 parseInt(css["transformProp"]["scaleX"]) * 10
                                }
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e / 10,
                                  "scaleX",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='scaleX'
                                min={-100}
                                max={200}
                                step={1}
                               />
                              </div>
                             )}{" "}
                             {css.transform.includes("scaleY") && (
                              <div>
                               <h5>Scale Y Percent</h5>
                               <Slider
                                value={
                                 parseInt(css["transformProp"]["scaleY"]) * 10
                                }
                                onChange={(e) =>
                                 onChangeSubCell(
                                  i,
                                  e / 10,
                                  "scaleY",
                                  "transformProp"
                                 )
                                }
                                orientation='horizontal'
                                name='scaleY'
                                min={-100}
                                max={200}
                                step={1}
                               />
                              </div>
                             )}
                            </label>
                           );
                          } else if (key === "animation") {
                           return (
                            <label key={key}>
                             <div className='card'>
                              <button
                               className='btn btn-sm btn-dark'
                               onClick={() => addSubCellAnimation(i)}>
                               + Animation
                              </button>
                              <h5>Current Animation Order</h5>
                              <ul>
                               {css.animation.length > 0 &&
                                css.animation.map(
                                 (
                                  {
                                   animationName,
                                   animationDuration,
                                   animationTimingFunction,
                                   animationDelay,
                                   animationIterationCount,
                                   animationDirection,
                                   animationFillMode,
                                   cubicNs,
                                   keyframes,
                                  },
                                  index
                                 ) => (
                                  <div>
                                   <h5>Animation Name</h5>
                                   <input
                                    type='text'
                                    name='animationName'
                                    value={animationName}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   <h5>Animation Duration</h5>
                                   <input
                                    type='text'
                                    name='animationDuration'
                                    value={animationDuration}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   <h5>Animation Function</h5>
                                   <select
                                    name='animationTimingFunction'
                                    value={animationTimingFunction}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }>
                                    <option></option>
                                    <option value='ease'>Ease</option>
                                    <option value='ease-in'>Ease In</option>
                                    <option value='ease-in-out'>
                                     Ease In Out
                                    </option>
                                    <option value='step-end'>Step End</option>
                                    <option value='step-start'>
                                     Step Start
                                    </option>
                                    <option value='cubic-bezier'>
                                     Cubic Bezier
                                    </option>
                                    <option value='steps'>Steps</option>
                                    <option value='inherit'>Inherit</option>
                                    <option value='initial'>Initial</option>
                                   </select>

                                   {animationTimingFunction ===
                                    "cubic-bezier" &&
                                    Object.keys(cubicNs).map((n) => (
                                     <div>
                                      <h5>Cubic Bez (n,n,n,n)</h5>
                                      <div key={n}>
                                       <h5>N {parseInt(n) + 1}</h5>
                                       <Slider
                                        axis='x'
                                        x={
                                         css["animation"][index]["cubicNs"][n]
                                        }
                                        value={parseFloat(
                                         css["animation"][index]["cubicNs"][n]
                                        )}
                                        onChange={(e) =>
                                         onChangeSubCell(
                                          i,
                                          e,
                                          "cubicNs",
                                          index,
                                          n,
                                          "animation"
                                         )
                                        }
                                        orientation='horizontal'
                                        name={n}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                       />
                                      </div>
                                     </div>
                                    ))}
                                   <h5>Animation Delay</h5>
                                   <input
                                    placeholder='enter a value in seconds'
                                    type='text'
                                    name='animationDelay'
                                    value={animationDelay}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />
                                   <h5>Animation Iteration Count</h5>

                                   <i style={{ fontSize: "8px" }}>
                                    Typing the value "infinite" will do what you
                                    imagine it does.
                                   </i>
                                   <input
                                    placeholder='Positive Integers Only'
                                    type='text'
                                    name='animationIterationCount'
                                    value={animationIterationCount}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }
                                   />

                                   <h5>Animation Direction</h5>
                                   <select
                                    name='animationDirection'
                                    value={animationDirection}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }>
                                    <option></option>
                                    <option value='normal'>Normal</option>
                                    <option value='reverse'>Reverse</option>
                                    <option value='alternate'>Alternate</option>
                                    <option value='reverse'>
                                     Alternate Reverse
                                    </option>
                                    <option value='inherit'>Inherit</option>
                                   </select>
                                   <h5>Animation Fill Mode</h5>
                                   <select
                                    name='animationFillMode'
                                    value={animationFillMode}
                                    onChange={(e) =>
                                     onChangeSubCell(i, e, "animation", index)
                                    }>
                                    <option></option>
                                    <option value='none'>None</option>
                                    <option value='forward'>Forward</option>
                                    <option value='backward'>Backward</option>
                                    <option value='both'>Both</option>
                                    <option value='inherit'>Inherit</option>
                                   </select>

                                   <h5>Key Frames</h5>
                                   <button
                                    className='btn btn-sm btn-dark'
                                    onClick={() =>
                                     addSubCellAnimationKeyframe(i, index)
                                    }>
                                    + Keyframe
                                   </button>

                                   {keyframes.map(
                                    (
                                     { completionPercent, properties },
                                     ind
                                    ) => (
                                     <div>
                                      <h5>Completion Percentage </h5>
                                      <i style={{ fontSize: "8px" }}>
                                       (all animations require a 0 and 100)
                                      </i>
                                      <input
                                       placeholder='enter a value from 0 to 100'
                                       type='text'
                                       name='completionPercent'
                                       value={completionPercent}
                                       onChange={(e) =>
                                        onChangeSubCell(
                                         i,
                                         e,
                                         "animationkey",
                                         index,
                                         ind
                                        )
                                       }
                                      />
                                      <button
                                       className='btn btn-sm btn-dark'
                                       onClick={() =>
                                        addSubCellAnimationKeyframeProperty(
                                         i,
                                         index,
                                         ind
                                        )
                                       }>
                                       + Property
                                      </button>

                                      {properties.map(
                                       (
                                        {
                                         propName,
                                         propValue,
                                         shadowValues,
                                         transValues,
                                        },
                                        indy
                                       ) => (
                                        <div>
                                         <select
                                          name='propName'
                                          value={propName}
                                          onChange={(e) =>
                                           onChangeSubCell(
                                            i,
                                            e,
                                            "animationkeyprop",
                                            index,
                                            ind,
                                            indy
                                           )
                                          }>
                                          <option value='transform'>
                                           Transform
                                          </option>
                                          <option value='height'>Height</option>
                                          <option value='width'>Width</option>
                                          <option value='border-left-color'>
                                           Border Left Color
                                          </option>
                                          <option value='border-left-width'>
                                           Border Left Width
                                          </option>
                                          <option value='background-color'>
                                           Background Color
                                          </option>
                                          <option value='background-position'>
                                           Background Position
                                          </option>
                                          <option value='background-size'>
                                           Background Size
                                          </option>
                                          <option value='border-bottom-color'>
                                           Border Bottom Color
                                          </option>
                                          <option value='border-bottom-left-radius'>
                                           Border Bottom Left Radius
                                          </option>
                                          <option value='border-bottom-right-radius'>
                                           Border Bottom Right Radius
                                          </option>
                                          <option value='border-bottom-width'>
                                           Border Bottom Width
                                          </option>
                                          <option value='border-radius'>
                                           Border Radius
                                          </option>
                                          <option value='border-right'>
                                           Border Right
                                          </option>
                                          <option value='border-right-color'>
                                           Border Right Color
                                          </option>
                                          <option value='border-right-width'>
                                           Border Right Width
                                          </option>
                                          <option value='border-color'>
                                           Border Color
                                          </option>
                                          <option value='border-width'>
                                           Border Width
                                          </option>
                                          <option value='border-top-color'>
                                           Border Top Color
                                          </option>
                                          <option value='border-top-left-radius'>
                                           Border Top Left Radius
                                          </option>
                                          <option value='border-top-right-radius'>
                                           Border Top Right Radius
                                          </option>
                                          <option value='border-top-width'>
                                           Border Top Width
                                          </option>
                                          <option value='box-shadow'>
                                           Box Shadow
                                          </option>
                                          <option value='font'>Font</option>
                                          <option value='font-size'>
                                           Font Size
                                          </option>

                                          <option value='font-weight'>
                                           Font Weight
                                          </option>
                                          <option value='line-height'>
                                           Line Height
                                          </option>
                                          <option value='margin-bottom'>
                                           Margin Bottom
                                          </option>
                                          <option value='margin'>Margin</option>
                                          <option value='margin-left'>
                                           Margin Left
                                          </option>
                                          <option value='margin-top'>
                                           Margin Top
                                          </option>
                                          <option value='margin-right'>
                                           Margin Right
                                          </option>
                                          <option value='opacity'>
                                           Opacity
                                          </option>

                                          <option value='padding-left'>
                                           Padding Left
                                          </option>
                                          <option value='padding-right'>
                                           Padding Right
                                          </option>
                                          <option value='padding-top'>
                                           Padding Top
                                          </option>
                                          <option value='z-index'>
                                           Z Index
                                          </option>
                                          <option value='padding-bottom'>
                                           Padding Bottom
                                          </option>
                                          <option value='top'>Top</option>
                                          <option value='left'>Left</option>
                                          <option value='right'>Right</option>
                                          <option value='bottom'>Bottom</option>
                                         </select>
                                         {propName.includes("width") ||
                                         propName.includes("height") ||
                                         propName.includes("size") ||
                                         propName.includes("weight") ||
                                         propName.includes("margin") ||
                                         propName.includes("padding") ||
                                         propName === "top" ||
                                         propName === "bottom" ||
                                         propName === "left" ||
                                         propName === "right" ? (
                                          <input
                                           placeholder='enter a value in pixels'
                                           type='text'
                                           name='propValue'
                                           value={propValue}
                                           onChange={(e) =>
                                            onChangeSubCell(
                                             i,
                                             e,
                                             "animationkeyprop",
                                             index,
                                             ind,
                                             indy
                                            )
                                           }
                                          />
                                         ) : (
                                          ""
                                         )}

                                         {propName === "transform" ? (
                                          <div>
                                           <h5>Rotate Z Deg</h5>
                                           <Slider
                                            axis='x'
                                            x={parseInt(transValues.rotateZ)}
                                            name='rotateZ'
                                            value={parseInt(
                                             transValues.rotateZ
                                            )}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "rotateZ",
                                              "slider"
                                             )
                                            }
                                            orientation='horizontal'
                                            min={0}
                                            max={360}
                                            step={1}
                                           />

                                           <h5>Rotate X Deg</h5>
                                           <Slider
                                            axis='x'
                                            x={parseInt(transValues.rotateX)}
                                            name='rotateX'
                                            value={parseInt(
                                             transValues.rotateX
                                            )}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "rotateX",
                                              "slider"
                                             )
                                            }
                                            orientation='horizontal'
                                            min={0}
                                            max={360}
                                            step={1}
                                           />

                                           <h5>Translate X Px</h5>
                                           <input
                                            type='text'
                                            name='translateX'
                                            value={transValues.translateX}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "translateX"
                                             )
                                            }
                                           />

                                           <h5>Translate Y Px</h5>
                                           <input
                                            type='text'
                                            name='translateY'
                                            value={transValues.translateY}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "translateY"
                                             )
                                            }
                                           />

                                           <h5>Rotate Y Deg</h5>
                                           <Slider
                                            x={parseInt(transValues.rotateY)}
                                            name='rotateY'
                                            value={parseInt(
                                             transValues.rotateY
                                            )}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "rotateY",
                                              "slider"
                                             )
                                            }
                                            orientation='horizontal'
                                            min={0}
                                            max={360}
                                            step={1}
                                           />

                                           <h5>Skew X Deg</h5>
                                           <Slider
                                            x={parseInt(transValues.skewX)}
                                            name='skewX'
                                            value={parseInt(transValues.skewX)}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "skewX",
                                              "slider"
                                             )
                                            }
                                            orientation='horizontal'
                                            name='skewX'
                                            min={0}
                                            max={360}
                                            step={1}
                                           />

                                           <h5>Skew Y Deg</h5>
                                           <Slider
                                            x={parseInt(transValues.skewY)}
                                            name='skewY'
                                            value={transValues.skewY}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "skewY",
                                              "slider"
                                             )
                                            }
                                            orientation='horizontal'
                                            min={0}
                                            max={360}
                                            step={1}
                                           />

                                           <h5>Scale X Percent</h5>
                                           <Slider
                                            x={parseFloat(transValues.scaleX)}
                                            name='scaleX'
                                            value={transValues.scaleX}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "scaleX",
                                              "slider"
                                             )
                                            }
                                            orientation='horizontal'
                                            min={-1}
                                            max={2}
                                            step={0.01}
                                           />

                                           <h5>Scale Y Percent</h5>
                                           <Slider
                                            x={parseFloat(transValues.scaleY)}
                                            name='scaleY'
                                            value={transValues.scaleY}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "scaleY",
                                              "slider"
                                             )
                                            }
                                            orientation='horizontal'
                                            name='scaleY'
                                            min={-1}
                                            max={2}
                                            step={0.01}
                                           />
                                          </div>
                                         ) : (
                                          ""
                                         )}

                                         {propName === "background-position" ? (
                                          <select
                                           name='propValue'
                                           value={propValue}
                                           onChange={(e) =>
                                            onChangeSubCell(
                                             i,
                                             e,
                                             "animationkeyprop",
                                             index,
                                             ind,
                                             indy
                                            )
                                           }>
                                           <option></option>
                                           <option value='center'>
                                            Center
                                           </option>
                                           <option value='left'>Left</option>
                                           <option value='right'>Right</option>
                                           <option value='top'>Top</option>
                                           <option value='bottom'>
                                            Bottom
                                           </option>
                                          </select>
                                         ) : (
                                          ""
                                         )}

                                         {propName.includes("shadow") ? (
                                          <div>
                                           <h5>Horizontal Shadow</h5>
                                           <input
                                            placeholder='enter a value in pixels'
                                            type='text'
                                            name='horizontalShadow'
                                            value={
                                             shadowValues.horizontalShadow
                                            }
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "boxshadow"
                                             )
                                            }
                                           />
                                           <h5>Vertical Shadow</h5>
                                           <input
                                            placeholder='enter a value in pixels'
                                            type='text'
                                            name='verticalShadow'
                                            value={shadowValues.verticalShadow}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "boxshadow"
                                             )
                                            }
                                           />
                                           <h5>Shadow Blur</h5>
                                           <input
                                            placeholder='enter a value in pixels'
                                            type='text'
                                            name='blurShadow'
                                            value={shadowValues.blurShadow}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "boxshadow"
                                             )
                                            }
                                           />
                                           <h5>Shadow Spread</h5>
                                           <input
                                            placeholder='enter a value in pixels'
                                            type='text'
                                            name='spreadShadow'
                                            value={shadowValues.spreadShadow}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "boxshadow"
                                             )
                                            }
                                           />
                                           <h5>Shadow Direction</h5>
                                           <select
                                            name='shadowDirection'
                                            value={shadowValues.shadowDirection}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "boxshadow"
                                             )
                                            }>
                                            <option></option>
                                            <option value='cover'>Inset</option>
                                            <option value='contain'>
                                             Outset
                                            </option>
                                           </select>
                                           <h5>Shadow Color</h5>
                                           <select
                                            name='shadowColor'
                                            value={shadowValues.shadowColor}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "boxshadow"
                                             )
                                            }>
                                            <option>Set Color...</option>
                                            <option
                                             value={pallet && pallet.primary}>
                                             Primary
                                            </option>
                                            <option
                                             value={pallet && pallet.dark}>
                                             Dark
                                            </option>
                                            <option
                                             value={pallet && pallet.light}>
                                             Light
                                            </option>
                                            <option
                                             value={pallet && pallet.danger}>
                                             Danger
                                            </option>
                                            <option
                                             value={pallet && pallet.success}>
                                             Success
                                            </option>
                                           </select>
                                          </div>
                                         ) : (
                                          ""
                                         )}

                                         {propName === "background-size" ? (
                                          <select
                                           name='propValue'
                                           value={propValue}
                                           onChange={(e) =>
                                            onChangeSubCell(
                                             i,
                                             e,
                                             "animationkeyprop",
                                             index,
                                             ind,
                                             indy
                                            )
                                           }>
                                           <option></option>
                                           <option value='cover'>Cover</option>
                                           <option value='contain'>
                                            Contain
                                           </option>
                                          </select>
                                         ) : (
                                          ""
                                         )}

                                         {propName === "font" ? (
                                          <div>
                                           <h5>Current Font</h5>
                                           <input
                                            type='text'
                                            value={propValue}
                                           />
                                           <button
                                            className='btn btn-dark btn-sm'
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              "font",
                                              font
                                             )
                                            }>
                                            Set Font
                                           </button>
                                          </div>
                                         ) : (
                                          ""
                                         )}

                                         {propName.includes("opacity") ||
                                         propName.includes("radius") ? (
                                          <Slider
                                           axis='x'
                                           x={css["animation"][index]}
                                           value={parseFloat(
                                            css["animation"][index]
                                           )}
                                           onChange={(e) =>
                                            onChangeSubCell(
                                             i,
                                             e,
                                             "animationkeyprop",
                                             index,
                                             ind,
                                             indy
                                            )
                                           }
                                           orientation='horizontal'
                                           name='n'
                                           min={0}
                                           max={1}
                                           step={0.01}
                                          />
                                         ) : (
                                          ""
                                         )}

                                         {propName.includes("color") && (
                                          <select
                                           name='propValue'
                                           value={propValue}
                                           onChange={(e) =>
                                            onChangeSubCell(
                                             i,
                                             e,
                                             "animationkeyprop",
                                             index,
                                             ind,
                                             indy
                                            )
                                           }>
                                           <option>Set Color...</option>
                                           <option
                                            value={pallet && pallet.primary}>
                                            Primary
                                           </option>
                                           <option
                                            value={pallet && pallet.dark}>
                                            Dark
                                           </option>
                                           <option
                                            value={pallet && pallet.light}>
                                            Light
                                           </option>
                                           <option
                                            value={pallet && pallet.danger}>
                                            Danger
                                           </option>
                                           <option
                                            value={pallet && pallet.success}>
                                            Success
                                           </option>
                                          </select>
                                         )}
                                        </div>
                                       )
                                      )}
                                     </div>
                                    )
                                   )}
                                  </div>
                                 )
                                )}
                              </ul>
                             </div>
                            </label>
                           );
                          } else if (key === "fontSize") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='5px'>XX Small</option>
                              <option value='7px'>X Small</option>
                              <option value='11px'>Small</option>
                              <option value='16px'>Medium</option>
                              <option value='24px'>Large</option>
                              <option value='36px'>X Large</option>
                              <option value='54px'>XX Large</option>
                             </select>
                            </label>
                           );
                          } else if (key.includes("Inset")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option>Outer</option>
                              <option value='inset'>Inset</option>
                             </select>
                            </label>
                           );
                          } else if (key === "fontWeight") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option value='100'>100</option>
                              <option value='200'>200</option>
                              <option value='300'>300</option>
                              <option value='400'>400</option>
                              <option value='500'>500</option>
                              <option value='600'>600</option>
                              <option value='700'>700</option>
                              <option value='800'>800</option>
                              <option value='900'>900</option>
                             </select>
                            </label>
                           );
                          } else if (key === "opacity") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <Slider
                              axis='x'
                              x={css.opacity}
                              value={parseInt(css[key])}
                              onChange={(e) =>
                               onChangeSubCell(i, e, "opacity", "slider")
                              }
                              orientation='horizontal'
                              min={0}
                              max={100}
                              step={1}
                             />
                            </label>
                           );
                          } else if (key.includes("Radius")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <Slider
                              value={parseInt(css[key])}
                              onChange={(e) =>
                               onChangeSubCell(i, e, key, "slider")
                              }
                              orientation='horizontal'
                              min={0}
                              max={50}
                              step={0.5}
                             />
                            </label>
                           );
                          } else if (key === "textAlign") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>

                              <option value='start'>Start</option>
                              <option value='end'>End</option>
                              <option value='left'>Left</option>
                              <option value='right'>Right</option>
                              <option value='center'>Center</option>
                              <option value='justify'>Justify</option>
                              <option value='matchParent'>Match Parent</option>
                              <option value='justifyAll'>Justify All</option>
                             </select>
                            </label>
                           );
                          } else if (
                           key.includes("border") &&
                           key.includes("Style")
                          ) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='solid'>Solid</option>
                              <option value='double'>Double</option>
                              <option value='dotted'>Dotted</option>
                              <option value='dashed'>Dashed</option>
                              <option value='groove'>Groove</option>
                              <option value='none'>None</option>
                              <option value='hidden'>Hidden</option>
                              <option value='ridge'>Ridge</option>
                              <option value='inset'>Inset</option>
                              <option value='outset'>Outset</option>
                             </select>
                            </label>
                           );
                          } else if (key === "textShadowSize") {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='small'>2px</option>
                             </select>
                            </label>
                           );
                          } else if (key.includes("overflow")) {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}

                             <select
                              name={key}
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}>
                              <option></option>
                              <option value='visible'>Visible</option>
                              <option value='hidden'>Hidden</option>
                              <option value='clip'>Clip</option>
                              <option value='scroll'>Scroll</option>
                              <option value='auto'>Auto</option>
                             </select>
                            </label>
                           );
                          } else {
                           return (
                            <label key={key}>
                             {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                               return str.toUpperCase();
                              })}
                             <input
                              type='text'
                              placeholder='Enter A Value In Pixels'
                              value={css[key]}
                              onChange={(e) => onChangeSubCell(i, e, "css")}
                              name={key}
                             />
                            </label>
                           );
                          }
                         })}
                        {!gridLevel &&
                         Object.keys(filtered).length === 0 &&
                         currentResults.map((css) =>
                          Object.keys(css).map((key) => {
                           const index = contentCss.findIndex(
                            (x) => x.id === css.id
                           );
                           if (key.includes("Color")) {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}
                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option>Set Color...</option>
                               <option value={pallet && pallet.primary}>
                                Primary
                               </option>
                               <option value={pallet && pallet.dark}>
                                Dark
                               </option>
                               <option value={pallet && pallet.light}>
                                Light
                               </option>
                               <option value={pallet && pallet.danger}>
                                Danger
                               </option>
                               <option value={pallet && pallet.success}>
                                Success
                               </option>
                              </select>
                             </label>
                            );
                           } else if (key === "position") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='fixed'>Fixed</option>
                               <option value='relative'>Relative</option>
                               <option value='absolute'>Absolute</option>
                              </select>
                             </label>
                            );
                           } else if (key === "backgroundRepeat") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='repeatX'>Repeat X</option>
                               <option value='repeatY'>Repeat Y</option>
                               <option value='repeat'>Repeat</option>
                               <option value='space'>Space</option>
                               <option value='round'>Round</option>
                               <option value='noRepeat'>No Repeat</option>
                              </select>
                             </label>
                            );
                           } else if (key === "backgroundPosition") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='center'>Center</option>
                               <option value='left'>Left</option>
                               <option value='right'>Right</option>
                               <option value='top'>Top</option>
                               <option value='bottom'>Bottom</option>
                              </select>
                             </label>
                            );
                           } else if (key === "backgroundSize") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='cover'>Cover</option>
                               <option value='contain'>Contain</option>
                              </select>
                             </label>
                            );
                           } else if (key === "display") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='block'>Block</option>
                               <option value='inline'>Inline</option>
                               <option value='inline-block'>
                                Inline Block
                               </option>
                               <option value='flex'>Flex</option>
                               <option value='none'>None</option>
                              </select>
                             </label>
                            );
                           } else if (key === "textDecorationLine") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='none'>None</option>
                               <option value='underline'>Underline</option>
                               <option value='overline'>Overline</option>
                               <option value='line-through'>
                                Line Through
                               </option>
                               <option value='blink'>Blink</option>
                              </select>
                             </label>
                            );
                           } else if (key === "textDecorationStyle") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='solid'>Solid</option>
                               <option value='double'>Double</option>
                               <option value='dotted'>Dotted</option>
                               <option value='dashed'>Dashed</option>
                               <option value='wavy'>Wavy</option>
                              </select>
                             </label>
                            );
                           } else if (key === "transition") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <button
                               className='btn btn-sm btn-dark'
                               onClick={() =>
                                addSubCellChildTransition(i, index)
                               }>
                               + Transition
                              </button>
                              <div
                               className='card'
                               style={{
                                overflowY: "scroll",
                                overflowX: "scroll",
                               }}>
                               {css.transition.map(
                                (
                                 {
                                  property,
                                  duration,
                                  timingFunction,
                                  cubicNs,
                                  delay,
                                 },
                                 ind
                                ) => (
                                 <div key={index} className='card'>
                                  <h5>Transition Property</h5>
                                  <select
                                   onChange={(e) =>
                                    onChangeSubCell(
                                     i,
                                     e,
                                     "conttransition",
                                     index,
                                     ind
                                    )
                                   }
                                   value={property}
                                   name='property'>
                                   <option value=''></option>
                                   {Object.keys(flatCss)
                                    .filter(
                                     (e) => typeof parseInt(e) === "number"
                                    )
                                    .map((c, i) => (
                                     <option key={i} value={c}>
                                      {c}
                                     </option>
                                    ))}
                                   <option value='color'>Color</option>
                                   <option value='background-color'>
                                    Background Color
                                   </option>
                                  </select>
                                  <h5>Transition Timing</h5>
                                  <input
                                   type='text'
                                   name='duration'
                                   onChange={(e) =>
                                    onChangeSubCell(
                                     i,
                                     e,
                                     "conttransition",
                                     index,
                                     ind
                                    )
                                   }
                                   value={duration}
                                   placeholder='Enter A Value in seconds'
                                  />
                                  <h5>Transition Function</h5>
                                  <select
                                   name='timingFunction'
                                   value={timingFunction}
                                   onChange={(e) =>
                                    onChangeSubCell(
                                     i,
                                     e,
                                     "conttransition",
                                     index,
                                     ind
                                    )
                                   }>
                                   <option></option>
                                   <option value='ease'>Ease</option>
                                   <option value='ease-in'>Ease In</option>
                                   <option value='ease-in-out'>
                                    Ease In Out
                                   </option>
                                   <option value='step-end'>Step End</option>
                                   <option value='step-start'>
                                    Step Start
                                   </option>
                                   <option value='cubic-bezier'>
                                    Cubic Bezier
                                   </option>
                                   <option value='inherit'>Inherit</option>
                                   <option value='initial'>Initial</option>
                                  </select>
                                  <h5>Transition Delay</h5>
                                  <input
                                   type='text'
                                   name='delay'
                                   value={delay}
                                   onChange={(e) =>
                                    onChangeSubCell(
                                     i,
                                     e,
                                     "conttransition",
                                     index,
                                     ind
                                    )
                                   }
                                   placeholder='Enter A Value in seconds'
                                  />

                                  {timingFunction === "cubic-bezier" &&
                                   Object.keys(cubicNs).map((n) => (
                                    <div>
                                     <h5>Cubic Bez (n,n,n,n)</h5>
                                     <div key={n}>
                                      <h5>N {parseInt(n) + 1}</h5>
                                      <Slider
                                       axis='x'
                                       x={css["transition"][ind]["cubicNs"][n]}
                                       value={parseFloat(
                                        css["transition"][ind]["cubicNs"][n]
                                       )}
                                       onChange={(e) =>
                                        onChangeSubCell(
                                         i,
                                         e,
                                         "contcubicNs",
                                         index,
                                         ind,
                                         n
                                        )
                                       }
                                       orientation='horizontal'
                                       name={n}
                                       min={0}
                                       max={1}
                                       step={0.01}
                                      />
                                     </div>
                                    </div>
                                   ))}
                                 </div>
                                )
                               )}
                              </div>
                             </label>
                            );
                           } else if (key === "transform") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "conttransform", index)
                               }
                               multiple>
                               <option></option>
                               <option value='rotateX'>RotateX</option>
                               <option value='rotateY'>RotateY</option>
                               <option value='skewX'>SkewX</option>
                               <option value='skewY'>SkewY</option>
                               <option value='rotateZ'>RotateZ</option>
                               <option value='scaleX'>ScaleX</option>
                               <option value='scaleY'>ScaleY</option>
                               <option value='translateX'>TranslateX</option>
                               <option value='translateY'>TranslateY</option>
                              </select>
                             </label>
                            );
                           } else if (key === "transformProp") {
                            return (
                             <label key={key}>
                              <div className='card all-center'>
                               <h5>Current Transform Order</h5>
                               <ul>
                                {css.transform.map((m) => (
                                 <li key={m}>{m}</li>
                                ))}
                               </ul>
                              </div>
                              {css.transform.includes("rotateZ") && (
                               <div>
                                <h5>Rotate Z Deg</h5>
                                <Slider
                                 axis='x'
                                 x={css["transformProp"]["rotateZ"]}
                                 value={parseInt(
                                  css["transformProp"]["rotateZ"]
                                 )}
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e,
                                   "rotateZ",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                 orientation='horizontal'
                                 name='rotateZ'
                                 min={0}
                                 max={360}
                                 step={1}
                                />
                               </div>
                              )}
                              {css.transform.includes("rotateX") && (
                               <div>
                                <h5>Rotate X Deg</h5>
                                <Slider
                                 axis='x'
                                 x={css["transformProp"]["rotateX"]}
                                 value={parseInt(
                                  css["transformProp"]["rotateX"]
                                 )}
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e,
                                   "rotateX",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                 orientation='horizontal'
                                 name='rotateX'
                                 min={0}
                                 max={360}
                                 step={1}
                                />
                               </div>
                              )}
                              {css.transform.includes("translateX") && (
                               <div>
                                <h5>Translate X Px</h5>
                                <input
                                 type='text'
                                 name='translateX'
                                 value={css["transformProp"]["translateX"]}
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e.target.value,
                                   "translateX",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                />
                               </div>
                              )}
                              {css.transform.includes("translateY") && (
                               <div>
                                <h5>Translate Y Px</h5>
                                <input
                                 type='text'
                                 name='translateY'
                                 value={css["transformProp"]["translateY"]}
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e.target.value,
                                   "translateY",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                />
                               </div>
                              )}
                              {css.transform.includes("rotateY") && (
                               <div>
                                <h5>Rotate Y Deg</h5>
                                <Slider
                                 value={parseInt(
                                  css["transformProp"]["rotateY"]
                                 )}
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e,
                                   "rotateY",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                 orientation='horizontal'
                                 name='rotateY'
                                 min={0}
                                 max={360}
                                 step={1}
                                />
                               </div>
                              )}
                              {css.transform.includes("skewX") && (
                               <div>
                                <h5>Skew X Deg</h5>
                                <Slider
                                 value={parseInt(css["transformProp"]["skewX"])}
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e,
                                   "skewX",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                 orientation='horizontal'
                                 name='skewX'
                                 min={0}
                                 max={360}
                                 step={1}
                                />
                               </div>
                              )}
                              {css.transform.includes("skewY") && (
                               <div>
                                <h5>Skew Y Deg</h5>
                                <Slider
                                 value={parseInt(css["transformProp"]["skewY"])}
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e,
                                   "skewY",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                 orientation='horizontal'
                                 name='skewY'
                                 min={0}
                                 max={360}
                                 step={1}
                                />
                               </div>
                              )}
                              {css.transform.includes("scaleX") && (
                               <div>
                                <h5>Scale X Percent</h5>
                                <Slider
                                 value={
                                  parseInt(css["transformProp"]["scaleX"]) * 10
                                 }
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e / 10,
                                   "scaleX",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                 orientation='horizontal'
                                 name='scaleX'
                                 min={-100}
                                 max={200}
                                 step={1}
                                />
                               </div>
                              )}{" "}
                              {css.transform.includes("scaleY") && (
                               <div>
                                <h5>Scale Y Percent</h5>
                                <Slider
                                 value={
                                  parseInt(css["transformProp"]["scaleY"]) * 10
                                 }
                                 onChange={(e) =>
                                  onChangeSubCell(
                                   i,
                                   e / 10,
                                   "scaleY",
                                   "conttransformProp",
                                   index
                                  )
                                 }
                                 orientation='horizontal'
                                 name='scaleY'
                                 min={-100}
                                 max={200}
                                 step={1}
                                />
                               </div>
                              )}
                             </label>
                            );
                           } else if (key === "animation") {
                            return (
                             <label key={key}>
                              <div className='card'>
                               <button
                                className='btn btn-sm btn-dark'
                                onClick={() =>
                                 addSubCellChildAnimation(i, index)
                                }>
                                + Animation
                               </button>
                               <h5>Current Animation Order</h5>
                               <ul>
                                {css.animation.length > 0 &&
                                 css.animation.map(
                                  (
                                   {
                                    animationName,
                                    animationDuration,
                                    animationTimingFunction,
                                    animationDelay,
                                    cubicNs,
                                    steps,
                                    animationIterationCount,
                                    animationDirection,
                                    animationFillMode,
                                    keyframes,
                                   },
                                   ind
                                  ) => (
                                   <div key={ind}>
                                    <h5>Animation Name</h5>
                                    <input
                                     type='text'
                                     name='animationName'
                                     value={animationName}
                                     onChange={(e) =>
                                      onChangeSubCell(
                                       i,
                                       e,
                                       "contanimation",
                                       index,
                                       ind
                                      )
                                     }
                                    />
                                    <h5>Animation Duration</h5>
                                    <input
                                     type='text'
                                     name='animationDuration'
                                     value={animationDuration}
                                     onChange={(e) =>
                                      onChangeSubCell(
                                       i,
                                       e,
                                       "contanimation",
                                       index,
                                       ind
                                      )
                                     }
                                    />
                                    <h5>Animation Function</h5>
                                    <select
                                     name='animationTimingFunction'
                                     value={animationTimingFunction}
                                     onChange={(e) =>
                                      onChangeSubCell(
                                       i,
                                       e,
                                       "contanimation",
                                       index,
                                       ind
                                      )
                                     }>
                                     <option></option>
                                     <option value='ease'>Ease</option>
                                     <option value='ease-in'>Ease In</option>
                                     <option value='ease-in-out'>
                                      Ease In Out
                                     </option>
                                     <option value='step-end'>Step End</option>
                                     <option value='step-start'>
                                      Step Start
                                     </option>
                                     <option value='cubic-bezier'>
                                      Cubic Bezier
                                     </option>
                                     <option value='steps'>Steps</option>
                                     <option value='inherit'>Inherit</option>
                                     <option value='initial'>Initial</option>
                                    </select>
                                    <h5>Animation Delay</h5>
                                    <input
                                     placeholder='enter a value in seconds'
                                     type='text'
                                     name='animationDelay'
                                     value={animationDelay}
                                     onChange={(e) =>
                                      onChangeSubCell(
                                       i,
                                       e,
                                       "contanimation",
                                       index,
                                       ind
                                      )
                                     }
                                    />
                                    <h5>Animation Iteration Count</h5>
                                    <input
                                     placeholder='Positive Integers Only'
                                     type='text'
                                     name='animationIterationCount'
                                     value={animationIterationCount}
                                     onChange={(e) =>
                                      onChangeSubCell(
                                       i,
                                       e,
                                       "contanimation",
                                       index,
                                       ind
                                      )
                                     }
                                    />

                                    <h5>Animation Direction</h5>
                                    <select
                                     name='animationDirection'
                                     value={animationDirection}
                                     onChange={(e) =>
                                      onChangeSubCell(
                                       i,
                                       e,
                                       "contanimation",
                                       index,
                                       ind
                                      )
                                     }>
                                     <option></option>
                                     <option value='normal'>Normal</option>
                                     <option value='reverse'>Reverse</option>
                                     <option value='alternate'>
                                      Alternate
                                     </option>
                                     <option value='reverse'>
                                      Alternate Reverse
                                     </option>
                                     <option value='inherit'>Inherit</option>
                                    </select>
                                    <h5>Animation Fill Mode</h5>
                                    <select
                                     name='animationFillMode'
                                     value={animationFillMode}
                                     onChange={(e) =>
                                      onChangeSubCell(
                                       i,
                                       e,
                                       "contanimation",
                                       index,
                                       ind
                                      )
                                     }>
                                     <option></option>
                                     <option value='none'>None</option>
                                     <option value='forward'>Forward</option>
                                     <option value='backward'>Backward</option>
                                     <option value='both'>Both</option>
                                     <option value='inherit'>Inherit</option>
                                    </select>

                                    <h5>Key Frames</h5>
                                    <button
                                     className='btn btn-sm btn-dark'
                                     onClick={() =>
                                      addSubCellChildAnimationKeyframe(
                                       i,
                                       index,
                                       ind
                                      )
                                     }>
                                     + Keyframe
                                    </button>

                                    {animationTimingFunction ===
                                     "cubic-bezier" &&
                                     Object.keys(cubicNs).map((n) => (
                                      <div>
                                       <h5>Cubic Bez (n,n,n,n)</h5>
                                       <div key={n}>
                                        <h5>N {parseInt(n) + 1}</h5>
                                        <Slider
                                         axis='x'
                                         x={
                                          css["animation"][index]["cubicNs"][n]
                                         }
                                         value={parseFloat(
                                          css["animation"][index]["cubicNs"][n]
                                         )}
                                         onChange={(e) =>
                                          onChangeSubCell(
                                           i,
                                           e,
                                           "cubicNs",
                                           index,
                                           n
                                          )
                                         }
                                         orientation='horizontal'
                                         name={n}
                                         min={0}
                                         max={1}
                                         step={0.01}
                                        />
                                       </div>
                                      </div>
                                     ))}

                                    {keyframes.map(
                                     (
                                      { completionPercent, properties },
                                      indy
                                     ) => (
                                      <div>
                                       <h5>Completion Percentage </h5>
                                       <i style={{ fontSize: "8px" }}>
                                        (all animations require a 0 and 100)
                                       </i>
                                       <input
                                        placeholder='enter a value from 0 to 100'
                                        type='text'
                                        name='completionPercent'
                                        value={completionPercent}
                                        onChange={(e) =>
                                         onChangeSubCell(
                                          i,
                                          e,
                                          "contanimationkey",
                                          index,
                                          ind,
                                          indy
                                         )
                                        }
                                       />
                                       <button
                                        className='btn btn-sm btn-dark'
                                        onClick={() =>
                                         addSubCellChildAnimationKeyframeProperty(
                                          i,
                                          index,
                                          ind,
                                          indy
                                         )
                                        }>
                                        + Property
                                       </button>

                                       {properties.map(
                                        (
                                         {
                                          propName,
                                          propValue,
                                          shadowValues,
                                          transValues,
                                         },
                                         indo
                                        ) => (
                                         <div>
                                          <select
                                           name='propName'
                                           value={propName}
                                           onChange={(e) =>
                                            onChangeSubCell(
                                             i,
                                             e,
                                             "contanimationkeyprop",
                                             index,
                                             ind,
                                             indy,
                                             indo
                                            )
                                           }>
                                           <option value='transform'>
                                            Transform
                                           </option>
                                           <option value='height'>
                                            Height
                                           </option>
                                           <option value='width'>Width</option>
                                           <option value='border-left-color'>
                                            Border Left Color
                                           </option>
                                           <option value='border-left-width'>
                                            Border Left Width
                                           </option>
                                           <option value='background-color'>
                                            Background Color
                                           </option>
                                           <option value='background-position'>
                                            Background Position
                                           </option>
                                           <option value='background-size'>
                                            Background Size
                                           </option>
                                           <option value='border-bottom-color'>
                                            Border Bottom Color
                                           </option>
                                           <option value='border-bottom-left-radius'>
                                            Border Bottom Left Radius
                                           </option>
                                           <option value='border-bottom-right-radius'>
                                            Border Bottom Right Radius
                                           </option>
                                           <option value='border-bottom-width'>
                                            Border Bottom Width
                                           </option>
                                           <option value='border-radius'>
                                            Border Radius
                                           </option>
                                           <option value='border-right'>
                                            Border Right
                                           </option>
                                           <option value='border-right-color'>
                                            Border Right Color
                                           </option>
                                           <option value='border-right-width'>
                                            Border Right Width
                                           </option>
                                           <option value='border-color'>
                                            Border Color
                                           </option>
                                           <option value='border-width'>
                                            Border Width
                                           </option>
                                           <option value='border-top-color'>
                                            Border Top Color
                                           </option>
                                           <option value='border-top-left-radius'>
                                            Border Top Left Radius
                                           </option>
                                           <option value='border-top-right-radius'>
                                            Border Top Right Radius
                                           </option>
                                           <option value='border-top-width'>
                                            Border Top Width
                                           </option>
                                           <option value='box-shadow'>
                                            Box Shadow
                                           </option>
                                           <option value='font'>Font</option>
                                           <option value='font-size'>
                                            Font Size
                                           </option>

                                           <option value='font-weight'>
                                            Font Weight
                                           </option>
                                           <option value='line-height'>
                                            Line Height
                                           </option>
                                           <option value='margin-bottom'>
                                            Margin Bottom
                                           </option>
                                           <option value='margin'>
                                            Margin
                                           </option>
                                           <option value='margin-left'>
                                            Margin Left
                                           </option>
                                           <option value='margin-top'>
                                            Margin Top
                                           </option>
                                           <option value='margin-right'>
                                            Margin Right
                                           </option>
                                           <option value='opacity'>
                                            Opacity
                                           </option>

                                           <option value='padding-left'>
                                            Padding Left
                                           </option>
                                           <option value='padding-right'>
                                            Padding Right
                                           </option>
                                           <option value='padding-top'>
                                            Padding Top
                                           </option>
                                           <option value='z-index'>
                                            Z Index
                                           </option>
                                           <option value='padding-bottom'>
                                            Padding Bottom
                                           </option>
                                           <option value='top'>Top</option>
                                           <option value='left'>Left</option>
                                           <option value='right'>Right</option>
                                           <option value='bottom'>
                                            Bottom
                                           </option>
                                          </select>
                                          {propName.includes("width") ||
                                          propName.includes("height") ||
                                          propName.includes("size") ||
                                          propName.includes("weight") ||
                                          propName.includes("margin") ||
                                          propName.includes("padding") ||
                                          propName === "top" ||
                                          propName === "bottom" ||
                                          propName === "left" ||
                                          propName === "right" ? (
                                           <input
                                            placeholder='enter a value in pixels'
                                            type='text'
                                            name='propValue'
                                            value={propValue}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "contanimationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              indo
                                             )
                                            }
                                           />
                                          ) : (
                                           ""
                                          )}

                                          {propName === "transform" ? (
                                           <div>
                                            <h5>Rotate Z Deg</h5>
                                            <Slider
                                             axis='x'
                                             x={parseInt(transValues.rotateZ)}
                                             name='rotateZ'
                                             value={parseInt(
                                              transValues.rotateZ
                                             )}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "rotateZ",
                                               "slider"
                                              )
                                             }
                                             orientation='horizontal'
                                             min={0}
                                             max={360}
                                             step={1}
                                            />

                                            <h5>Rotate X Deg</h5>
                                            <Slider
                                             axis='x'
                                             x={parseInt(transValues.rotateX)}
                                             name='rotateX'
                                             value={parseInt(
                                              transValues.rotateX
                                             )}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "rotateX",
                                               "slider"
                                              )
                                             }
                                             orientation='horizontal'
                                             min={0}
                                             max={360}
                                             step={1}
                                            />

                                            <h5>Translate X Px</h5>
                                            <input
                                             type='text'
                                             name='translateX'
                                             value={transValues.translateX}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "translateX"
                                              )
                                             }
                                            />

                                            <h5>Translate Y Px</h5>
                                            <input
                                             type='text'
                                             name='translateY'
                                             value={transValues.translateY}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "translateY"
                                              )
                                             }
                                            />

                                            <h5>Rotate Y Deg</h5>
                                            <Slider
                                             x={parseInt(transValues.rotateY)}
                                             name='rotateY'
                                             value={parseInt(
                                              transValues.rotateY
                                             )}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "rotateY",
                                               "slider"
                                              )
                                             }
                                             orientation='horizontal'
                                             min={0}
                                             max={360}
                                             step={1}
                                            />

                                            <h5>Skew X Deg</h5>
                                            <Slider
                                             x={parseInt(transValues.skewX)}
                                             name='skewX'
                                             value={parseInt(transValues.skewX)}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "skewX",
                                               "slider"
                                              )
                                             }
                                             orientation='horizontal'
                                             name='skewX'
                                             min={0}
                                             max={360}
                                             step={1}
                                            />

                                            <h5>Skew Y Deg</h5>
                                            <Slider
                                             x={parseInt(transValues.skewY)}
                                             name='skewY'
                                             value={transValues.skewY}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "skewY",
                                               "slider"
                                              )
                                             }
                                             orientation='horizontal'
                                             min={0}
                                             max={360}
                                             step={1}
                                            />

                                            <h5>Scale X Percent</h5>
                                            <Slider
                                             x={parseFloat(transValues.scaleX)}
                                             name='scaleX'
                                             value={transValues.scaleX}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "scaleX",
                                               "slider"
                                              )
                                             }
                                             orientation='horizontal'
                                             min={-1}
                                             max={2}
                                             step={0.01}
                                            />

                                            <h5>Scale Y Percent</h5>
                                            <Slider
                                             x={parseFloat(transValues.scaleY)}
                                             name='scaleY'
                                             value={transValues.scaleY}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "scaleY",
                                               "slider"
                                              )
                                             }
                                             orientation='horizontal'
                                             name='scaleY'
                                             min={-1}
                                             max={2}
                                             step={0.01}
                                            />
                                           </div>
                                          ) : (
                                           ""
                                          )}

                                          {propName ===
                                          "background-position" ? (
                                           <select
                                            name='propValue'
                                            value={propValue}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "contanimationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              indo
                                             )
                                            }>
                                            <option></option>
                                            <option value='center'>
                                             Center
                                            </option>
                                            <option value='left'>Left</option>
                                            <option value='right'>Right</option>
                                            <option value='top'>Top</option>
                                            <option value='bottom'>
                                             Bottom
                                            </option>
                                           </select>
                                          ) : (
                                           ""
                                          )}

                                          {propName.includes("shadow") ? (
                                           <div>
                                            <h5>Horizontal Shadow</h5>
                                            <input
                                             placeholder='enter a value in pixels'
                                             type='text'
                                             name='horizontalShadow'
                                             value={
                                              shadowValues.horizontalShadow
                                             }
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "boxshadow"
                                              )
                                             }
                                            />
                                            <h5>Vertical Shadow</h5>
                                            <input
                                             placeholder='enter a value in pixels'
                                             type='text'
                                             name='verticalShadow'
                                             value={shadowValues.verticalShadow}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "boxshadow"
                                              )
                                             }
                                            />
                                            <h5>Shadow Blur</h5>
                                            <input
                                             placeholder='enter a value in pixels'
                                             type='text'
                                             name='blurShadow'
                                             value={shadowValues.blurShadow}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "boxshadow"
                                              )
                                             }
                                            />
                                            <h5>Shadow Spread</h5>
                                            <input
                                             placeholder='enter a value in pixels'
                                             type='text'
                                             name='spreadShadow'
                                             value={shadowValues.spreadShadow}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "boxshadow"
                                              )
                                             }
                                            />
                                            <h5>Shadow Direction</h5>
                                            <select
                                             name='shadowDirection'
                                             value={
                                              shadowValues.shadowDirection
                                             }
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "boxshadow"
                                              )
                                             }>
                                             <option></option>
                                             <option value='cover'>
                                              Inset
                                             </option>
                                             <option value='contain'>
                                              Outset
                                             </option>
                                            </select>
                                            <h5>Shadow Color</h5>
                                            <select
                                             name='shadowColor'
                                             value={shadowValues.shadowColor}
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "boxshadow"
                                              )
                                             }>
                                             <option>Set Color...</option>
                                             <option
                                              value={pallet && pallet.primary}>
                                              Primary
                                             </option>
                                             <option
                                              value={pallet && pallet.dark}>
                                              Dark
                                             </option>
                                             <option
                                              value={pallet && pallet.light}>
                                              Light
                                             </option>
                                             <option
                                              value={pallet && pallet.danger}>
                                              Danger
                                             </option>
                                             <option
                                              value={pallet && pallet.success}>
                                              Success
                                             </option>
                                            </select>
                                           </div>
                                          ) : (
                                           ""
                                          )}

                                          {propName === "background-size" ? (
                                           <select
                                            name='propValue'
                                            value={propValue}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "animationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              indo
                                             )
                                            }>
                                            <option></option>
                                            <option value='cover'>Cover</option>
                                            <option value='contain'>
                                             Contain
                                            </option>
                                           </select>
                                          ) : (
                                           ""
                                          )}

                                          {propName === "font" ? (
                                           <div>
                                            <h5>Current Font</h5>
                                            <input
                                             type='text'
                                             value={propValue}
                                            />
                                            <button
                                             className='btn btn-dark btn-sm'
                                             onChange={(e) =>
                                              onChangeSubCell(
                                               i,
                                               e,
                                               "contanimationkeyprop",
                                               index,
                                               ind,
                                               indy,
                                               indo,
                                               "font",
                                               font
                                              )
                                             }>
                                             Set Font
                                            </button>
                                           </div>
                                          ) : (
                                           ""
                                          )}

                                          {propName.includes("opacity") ||
                                          propName.includes("radius") ? (
                                           <Slider
                                            axis='x'
                                            x={css["animation"][index]}
                                            value={parseFloat(
                                             css["animation"][index]
                                            )}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "contanimationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              indo
                                             )
                                            }
                                            orientation='horizontal'
                                            name='n'
                                            min={0}
                                            max={1}
                                            step={0.01}
                                           />
                                          ) : (
                                           ""
                                          )}

                                          {propName.includes("color") && (
                                           <select
                                            name='propValue'
                                            value={propValue}
                                            onChange={(e) =>
                                             onChangeSubCell(
                                              i,
                                              e,
                                              "contanimationkeyprop",
                                              index,
                                              ind,
                                              indy,
                                              indo
                                             )
                                            }>
                                            <option>Set Color...</option>
                                            <option
                                             value={pallet && pallet.primary}>
                                             Primary
                                            </option>
                                            <option
                                             value={pallet && pallet.dark}>
                                             Dark
                                            </option>
                                            <option
                                             value={pallet && pallet.light}>
                                             Light
                                            </option>
                                            <option
                                             value={pallet && pallet.danger}>
                                             Danger
                                            </option>
                                            <option
                                             value={pallet && pallet.success}>
                                             Success
                                            </option>
                                           </select>
                                          )}
                                         </div>
                                        )
                                       )}
                                      </div>
                                     )
                                    )}
                                   </div>
                                  )
                                 )}
                               </ul>
                              </div>
                             </label>
                            );
                           } else if (key === "fontSize") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='5px'>XX Small</option>
                               <option value='7px'>X Small</option>
                               <option value='11px'>Small</option>
                               <option value='16px'>Medium</option>
                               <option value='24px'>Large</option>
                               <option value='36px'>X Large</option>
                               <option value='54px'>XX Large</option>
                              </select>
                             </label>
                            );
                           } else if (key.includes("Inset")) {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option>Outer</option>
                               <option value='inset'>Inset</option>
                              </select>
                             </label>
                            );
                           } else if (key === "fontWeight") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option value='100'>100</option>
                               <option value='200'>200</option>
                               <option value='300'>300</option>
                               <option value='400'>400</option>
                               <option value='500'>500</option>
                               <option value='600'>600</option>
                               <option value='700'>700</option>
                               <option value='800'>800</option>
                               <option value='900'>900</option>
                              </select>
                             </label>
                            );
                           } else if (key === "opacity") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}
                              <Slider
                               axis='x'
                               x={css.opacity}
                               value={parseInt(css[key])}
                               onChange={(e) =>
                                onChangeSubCell(
                                 i,
                                 e,
                                 "opacity",
                                 "contentslider",
                                 index
                                )
                               }
                               orientation='horizontal'
                               min={0}
                               max={100}
                               step={1}
                              />
                             </label>
                            );
                           } else if (key.includes("Radius")) {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}
                              <Slider
                               value={parseInt(css[key])}
                               onChange={(e) =>
                                onChangeSubCell(
                                 i,
                                 e,
                                 key,
                                 "contentslider",
                                 index
                                )
                               }
                               orientation='horizontal'
                               min={0}
                               max={50}
                               step={0.5}
                              />
                             </label>
                            );
                           } else if (key === "textAlign") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>

                               <option value='start'>Start</option>
                               <option value='end'>End</option>
                               <option value='left'>Left</option>
                               <option value='right'>Right</option>
                               <option value='center'>Center</option>
                               <option value='justify'>Justify</option>
                               <option value='matchParent'>Match Parent</option>
                               <option value='justifyAll'>Justify All</option>
                              </select>
                             </label>
                            );
                           } else if (
                            key.includes("border") &&
                            key.includes("Style")
                           ) {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='solid'>Solid</option>
                               <option value='double'>Double</option>
                               <option value='dotted'>Dotted</option>
                               <option value='dashed'>Dashed</option>
                               <option value='groove'>Groove</option>
                               <option value='none'>None</option>
                               <option value='hidden'>Hidden</option>
                               <option value='ridge'>Ridge</option>
                               <option value='inset'>Inset</option>
                               <option value='outset'>Outset</option>
                              </select>
                             </label>
                            );
                           } else if (key === "textShadowSize") {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='small'>2px</option>
                              </select>
                             </label>
                            );
                           } else if (key.includes("overflow")) {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}

                              <select
                               name={key}
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }>
                               <option></option>
                               <option value='visible'>Visible</option>
                               <option value='hidden'>Hidden</option>
                               <option value='clip'>Clip</option>
                               <option value='scroll'>Scroll</option>
                               <option value='auto'>Auto</option>
                              </select>
                             </label>
                            );
                           } else {
                            return (
                             <label key={key}>
                              {key
                               .replace(/([A-Z])/g, " $1")
                               .replace(/^./, function (str) {
                                return str.toUpperCase();
                               })}
                              <input
                               type='text'
                               placeholder='Enter A Value In Pixels'
                               value={css[key]}
                               onChange={(e) =>
                                onChangeSubCell(i, e, "contentCss", index)
                               }
                               name={key}
                              />
                             </label>
                            );
                           }
                          })
                         )}
                       </div>
                      ) : (
                       <div>
                        <button
                         className='btn btn-sm btn-dark'
                         onClick={() =>
                          setSubContentToggle((prevState) => !prevState)
                         }>
                         Show CSS
                        </button>
                        <h5>SubCell Settings</h5>
                        <select
                         name='background'
                         onChange={(e) => {
                          onChangeSubCell(i, e);
                          {
                           currentContent &&
                            getContentImage(
                             currentContent.content,
                             i,
                             "background",
                             "cell"
                            );
                          }
                          {
                           currentContent && clearCurrentContent();
                          }
                         }}>
                         <option>Background</option>
                         <option value={pallet && pallet.primary}>
                          Primary
                         </option>
                         <option value={pallet && pallet.dark}>Dark</option>
                         <option value={pallet && pallet.light}>Light</option>
                         <option value={pallet && pallet.danger}>Danger</option>
                         <option value={pallet && pallet.success}>
                          Success
                         </option>
                         {currentContent && (
                          <option value={currentContent.content}>
                           Set Image
                          </option>
                         )}
                        </select>
                        <label>Row Span</label>
                        <input
                         placeholder='Row Span'
                         type='text'
                         name='rowSpan'
                         value={rowSpan}
                         onChange={(e) => onChangeSubCell(i, e)}
                        />
                        <label>Column Span</label>
                        <input
                         placeholder='Column Span'
                         type='text'
                         name='columnSpan'
                         value={columnSpan}
                         onChange={(e) => onChangeSubCell(i, e)}
                        />
                        <label>Row Start</label>
                        <input
                         placeholder='top'
                         type='text'
                         name='top'
                         value={top}
                         onChange={(e) => onChangeSubCell(i, e)}
                        />
                        <label>Column Start</label>
                        <input
                         placeholder='left'
                         type='text'
                         name='left'
                         value={left}
                         onChange={(e) => onChangeSubCell(i, e)}
                        />
                        <div className='grid-2'>
                         <div>
                          {" "}
                          <input
                           type='radio'
                           name='position'
                           value='false'
                           checked={position === "false"}
                           onChange={(e) => onChangeSubCell(i, e)}
                          />
                          Left
                         </div>
                         <div>
                          {" "}
                          <input
                           type='radio'
                           name='position'
                           value='true'
                           checked={position === "true"}
                           onChange={(e) => onChangeSubCell(i, e)}
                          />
                          Center{" "}
                         </div>
                        </div>
                       </div>
                      )}
                     </div>
                     <div
                      className='card'
                      style={{ backgroundColor: "#f4f4f4" }}>
                      {subGridView === false ? (
                       <div>
                        <h5>BODY GRID SETTINGS</h5>
                        <button
                         className='btn btn-dark btn-sm'
                         onClick={() => addBodyGrid(id)}>
                         Add Grid
                        </button>
                        <button
                         className='btn btn-dark btn-sm'
                         onClick={() => addBodyColumn(id)}>
                         Add Column
                        </button>
                        <button
                         className='btn btn-dark btn-sm'
                         onClick={() => addBodyRow(id)}>
                         Add Row
                        </button>
                        <button
                         className='btn btn-sm btn-dark'
                         onClick={() => addBodyCell(id)}>
                         Add Cell
                        </button>
                        <button
                         className='btn btn-sm btn-dark'
                         onClick={() =>
                          toggleBodyGridView((prevState) => !prevState)
                         }>
                         View Grid
                        </button>
                        <select
                         name='verticalAlignment'
                         onChange={(e) => onChangeSubCell(i, e)}>
                         <option>Vertical</option>
                         <option value='start'>Start</option>
                         <option value='end'>End</option>
                         <option value='center'>Center</option>
                         <option value='space-between'>Between</option>
                         <option value='space-around'>Around</option>
                         <option value='space-evenly'>Evenly</option>
                         <option value='stretch'>Stretch</option>
                        </select>
                        <select
                         name='horitzontalAlignment'
                         onChange={(e) => onChangeSubCell(i, e)}>
                         <option>Horizontal</option>
                         <option value='start'>Start</option>
                         <option value='end'>End</option>
                         <option value='center'>Center</option>
                         <option value='space-between'>Between</option>
                         <option value='space-around'>Around</option>
                         <option value='space-evenly'>Evenly</option>
                        </select>
                        <select
                         name='layout'
                         onChange={(e) => onChangeSubCell(i, e)}>
                         <option>Layout</option>
                         <option value='row'>Row</option>
                         <option value='column'>Column</option>
                         <option value='row dense'>Row Dense</option>
                        </select>
                       </div>
                      ) : (
                       <div>
                        {" "}
                        <button
                         onClick={() =>
                          toggleBodyGridView((prevState) => !prevState)
                         }>
                         Hide Grid
                        </button>
                        <div className='grid-2'>
                         <div
                          className='card'
                          style={{ backgroundColor: "#f4f4f4" }}>
                          {bodyGrids[
                           bodyGrids.findIndex((x) => x.parent === id)
                          ] &&
                           bodyGrids[
                            bodyGrids.findIndex((x) => x.parent === id)
                           ].columns.map(({ size, unit }, index) => (
                            <div>
                             <div>
                              <input
                               placeholder='Column Size...'
                               type='text'
                               name='size'
                               value={size}
                               onChange={(e) => updateBodyColumn(e, id, index)}
                              />
                              <select
                               name='unit'
                               value={unit}
                               onChange={(e) => updateBodyColumn(e, id, index)}>
                               <option></option>
                               <option value='px'>Pixels</option>
                               <option value='fr'>Fractions</option>
                               <option value='repeat(auto-fit,minmax(120px,1fr))'>
                                Responsive
                               </option>
                              </select>
                              <span
                               style={{ float: "right" }}
                               className='c4  olor-background lead'
                               onClick={() => deleteBodyColumn(id, index)}>
                               <a>X</a>
                              </span>
                             </div>
                            </div>
                           ))}
                         </div>
                         <div
                          className='card'
                          style={{ backgroundColor: "#f4f4f4" }}>
                          {subGrids[
                           subGrids.findIndex((x) => x.parent === id)
                          ] &&
                           subGrids[
                            subGrids.findIndex((x) => x.parent === id)
                           ].rows.map(({ size, unit }, index) => (
                            <div>
                             <input
                              placeholder='Row Size...'
                              type='text'
                              name='size'
                              onChange={(e) => updateBodyRow(e, id, index)}
                             />
                             <select
                              name='unit'
                              onChange={(e) => updateBodyRow(e, id, index)}>
                              <option></option>
                              <option value='px'>Pixels</option>
                              <option value='fr'>Fractions</option>
                             </select>
                             <span
                              style={{ float: "right" }}
                              className='color-background lead'
                              onClick={() => deleteBodyRow(id, index)}>
                              <a>X</a>
                             </span>
                            </div>
                           ))}
                         </div>
                        </div>
                       </div>
                      )}
                     </div>
                    </div>

                    <select
                     name='viewToggle'
                     style={{ height: "20px", width: "75px" }}
                     className='btn btn-block'
                     onChange={(e) => onChangeSubCell(i, e)}>
                     <option value=''></option>
                     <option value='delete'>Delete Cell</option>
                     <option value='close'>Close</option>
                    </select>
                   </div>
                  ) : (
                   <>
                    <div
                     style={{
                      wordWrap: "breakWord",
                      wordBreak: "breakAll",
                     }}
                     className={"a" + subCells[i].id}>
                     {content
                      .slice()
                      .sort(
                       (a, b) =>
                        parseInt(a.sectionOrdinality) -
                        parseInt(b.sectionOrdinality)
                      )
                      .map(
                       (
                        {
                         name,
                         text,
                         props,
                         fontStyle,
                         font,
                         faIcon,
                         faIconPosition,
                         formName,
                         keyName,
                         parentObj,
                         parentState,
                         parentKey,
                         checkedValue,
                         isBool,
                         onChange,
                         options,
                         type,
                         label,
                         legend,
                         step,
                         n,
                         rangeMin,
                         rangeMax,
                         displayDate,
                         headingSize,
                         action,
                         code,
                         color,
                         top,
                         left,
                         background,
                         height,
                         width,
                         url,
                         autoplay,
                        },
                        i
                       ) => {
                        if (content[i].hasOwnProperty("props")) {
                         const VariableComponent = content;
                         return VariableComponent;
                        } else if (subCellQuiz[0]) {
                         const Quiz = subCellQuiz
                          .filter((q) => q.id === subCells[i].id)
                          .map(({ quiz }) => {
                           return quiz;
                          });

                         return Quiz;
                        } else if (type === "text") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <input
                               type='text'
                               name={keyName}
                               value={
                                lead && parentObj === "lead"
                                 ? lead[keyName]
                                 : userState && userState[keyName]
                               }
                               onChange={(e) => {
                                parentObj === "lead"
                                 ? writeLeadState(onChange, e)
                                 : writeUserState(
                                    onChange,
                                    e,
                                    parentObj,
                                    n,
                                    parentState,
                                    parentKey,
                                    i
                                   );
                               }}
                              />
                             </label>
                            );
                           }
                          );
                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <input
                             type='text'
                             name={keyName}
                             value={
                              lead && parentObj === "lead"
                               ? lead[keyName]
                               : userState && userState[keyName]
                             }
                             onChange={(e) => {
                              parentObj === "lead"
                               ? writeLeadState(onChange, e)
                               : writeUserState(
                                  onChange,
                                  e,
                                  parentObj,
                                  n,
                                  parentState,
                                  parentKey
                                 );
                             }}
                            />
                           </label>
                          );
                         }
                        } else if (type === "textarea") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <textarea
                               type='text'
                               name={keyName}
                               value={lead && lead[keyName]}
                               onChange={(e) =>
                                writeUserState(
                                 onChange,
                                 e,
                                 parentObj,
                                 n,
                                 parentState,
                                 parentKey,
                                 i
                                )
                               }
                              />
                             </label>
                            );
                           }
                          );
                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <textarea
                             type='text'
                             name={keyName}
                             value={lead && lead[keyName]}
                             onChange={(e) =>
                              writeUserState(
                               onChange,
                               e,
                               parentObj,
                               n,
                               parentState,
                               parentKey,
                               Array.from(
                                userState[parentState][parentKey]
                               ).findIndex((x) =>
                                Object.values(x).includes(e.target.value)
                               )
                              )
                             }
                            />
                           </label>
                          );
                         }
                        } else if (type === "radio") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <input
                               type='radio'
                               name={keyName}
                               value={
                                isBool === "true" || isBool === "false"
                                 ? stringToBoolean(isBool)
                                 : checkedValue
                               }
                               onClick={(e) =>
                                writeUserState(
                                 onChange,
                                 e,
                                 parentObj,
                                 n,
                                 parentState,
                                 parentKey,
                                 i
                                )
                               }
                              />
                             </label>
                            );
                           }
                          );
                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <input
                             type='radio'
                             name={keyName}
                             value={
                              isBool === "true" || isBool === "false"
                               ? stringToBoolean(isBool)
                               : checkedValue
                             }
                             onClick={(e) =>
                              writeUserState(
                               onChange,
                               e,
                               parentObj,
                               n,
                               parentState,
                               parentKey
                              )
                             }
                            />
                           </label>
                          );
                         }
                        } else if (type === "checkbox") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <input
                               type='checkbox'
                               name={keyName}
                               checked={
                                isBool === true || isBool === false
                                 ? keyName === isBool
                                 : checkedValue
                               }
                               onChange={(e) =>
                                writeUserState(
                                 onChange,
                                 e,
                                 parentObj,
                                 n,
                                 parentState,
                                 parentKey,
                                 i
                                )
                               }
                              />
                             </label>
                            );
                           }
                          );

                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <input
                             type='checkbox'
                             name={keyName}
                             checked={
                              isBool === true || isBool === false
                               ? keyName === isBool
                               : checkedValue
                             }
                             onChange={(e) =>
                              writeUserState(
                               onChange,
                               e,
                               parentObj,
                               n,
                               parentState,
                               parentKey
                              )
                             }
                            />
                           </label>
                          );
                         }
                        } else if (type === "select") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <select
                               name={keyName}
                               onChange={(e) =>
                                writeUserState(
                                 onChange,
                                 e,
                                 parentObj,
                                 n,
                                 parentState,
                                 parentKey,
                                 i
                                )
                               }>
                               {options.map(({ value, display }) => (
                                <option value={value}>{display}</option>
                               ))}
                              </select>
                             </label>
                            );
                           }
                          );
                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <select
                             name={keyName}
                             onChange={(e) =>
                              writeUserState(
                               onChange,
                               e,
                               parentObj,
                               n,
                               parentState,
                               parentKey
                              )
                             }>
                             {options.map(({ value, display }) => (
                              <option value={value}>{display}</option>
                             ))}
                            </select>
                           </label>
                          );
                         }
                        } else if (type === "number") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <input
                               type='number'
                               name={keyName}
                               checked={keyName === checkedValue}
                               onChange={(e) =>
                                writeUserState(
                                 onChange,
                                 e,
                                 parentObj,
                                 n,
                                 parentState,
                                 parentKey,
                                 i
                                )
                               }
                              />
                             </label>
                            );
                           }
                          );
                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <input
                             type='number'
                             name={keyName}
                             checked={keyName === checkedValue}
                             onChange={(e) =>
                              writeUserState(
                               onChange,
                               e,
                               parentObj,
                               n,
                               parentState,
                               parentKey
                              )
                             }
                            />
                           </label>
                          );
                         }
                        } else if (type === "date") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <input
                               type='date'
                               name={keyName}
                               value={displayDate && displayDate}
                               onChange={(e) =>
                                writeUserState(
                                 onChange,
                                 e,
                                 parentObj,
                                 n,
                                 parentState,
                                 parentKey,
                                 i
                                )
                               }
                              />
                             </label>
                            );
                           }
                          );
                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <input
                             type='date'
                             name={keyName}
                             value={displayDate && displayDate}
                             onChange={(e) =>
                              writeUserState(
                               onChange,
                               e,
                               parentObj,
                               n,
                               parentState,
                               parentKey
                              )
                             }
                            />
                           </label>
                          );
                         }
                        } else if (type === "range") {
                         if (Array.isArray(userState[parentState][parentKey])) {
                          const arr = userState[parentState][parentKey].map(
                           (k, i) => {
                            return (
                             <label>
                              {label}
                              <Slider
                               axis='x'
                               x={parseFloat(userState[`${keyName}`])}
                               value={parseFloat(userState[`${keyName}`])}
                               onChange={(e) =>
                                writeUserState(
                                 onChange,
                                 e,
                                 parentObj,
                                 n,
                                 parentState,
                                 parentKey,
                                 i
                                )
                               }
                               orientation='horizontal'
                               name={keyName}
                               min={rangeMax}
                               max={rangeMin}
                               step={step}
                              />
                             </label>
                            );
                           }
                          );
                          return arr;
                         } else {
                          return (
                           <label>
                            {label}
                            <Slider
                             axis='x'
                             x={parseFloat(userState[`${keyName}`])}
                             value={parseFloat(userState[`${keyName}`])}
                             onChange={(e) =>
                              writeUserState(
                               onChange,
                               e,
                               parentObj,
                               n,
                               parentState,
                               parentKey
                              )
                             }
                             orientation='horizontal'
                             name={keyName}
                             min={rangeMax}
                             max={rangeMin}
                             step={step}
                            />
                           </label>
                          );
                         }
                        } else if (type === "submit") {
                         return (
                          <input
                           type='submit'
                           onClick={() => readUserState(userState, lead)}
                          />
                         );
                        } else
                         return (
                          <Fragment>
                           <span>
                            {type === "h" && headingSize === "h1" ? (
                             <h1
                              style={{
                               color: `${color}`,
                               fontFamily: `${font}`,
                               background: `${background}`,
                              }}>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>
                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </h1>
                            ) : (
                             ""
                            )}
                            {type === "h" && headingSize === "h2" ? (
                             <h2
                              style={{
                               color: `${color}`,
                               fontFamily: `${font}`,
                               background: `${background}`,
                              }}>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>
                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </h2>
                            ) : (
                             ""
                            )}
                            {type === "h" && headingSize === "h3" ? (
                             <h3
                              style={{
                               color: `${color}`,
                               fontFamily: `${font}`,
                               background: `${background}`,
                              }}>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>
                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </h3>
                            ) : (
                             ""
                            )}
                            {type === "h" && headingSize === "h4" ? (
                             <h4
                              style={{
                               color: `${color}`,
                               fontFamily: `${font}`,
                               background: `${background}`,
                              }}>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>
                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </h4>
                            ) : (
                             ""
                            )}
                            {type === "h" && headingSize === "h5" ? (
                             <h5
                              style={{
                               color: `${color}`,
                               fontFamily: `${font}`,
                               background: `${background}`,
                              }}>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>
                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </h5>
                            ) : (
                             ""
                            )}
                            {type === "p" ? (
                             <p
                              style={{
                               color: `${color}`,
                               background: `${background}`,
                               fontFamily: `${font}`,
                              }}>
                              {fontStyle
                               ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                               : text}
                             </p>
                            ) : (
                             ""
                            )}
                            {type === "li" ? (
                             <li>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>

                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </li>
                            ) : (
                             ""
                            )}
                            {type === "i" ? (
                             <i
                              style={{
                               color: `${color}`,
                              }}
                              className={faIcon}
                             />
                            ) : (
                             ""
                            )}
                            {type === "a" ? (
                             <a
                              href={url}
                              target='_blank'
                              rel='noopener noreferrer'>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>

                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </a>
                            ) : (
                             ""
                            )}
                            {type === "button" ? (
                             <button
                              style={{
                               background: `${background}`,
                              }}
                              onClick={action}>
                              {faIconPosition === "top" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i> <br />
                               </span>
                              ) : (
                               ""
                              )}
                              <span>
                               {faIconPosition === "front" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}{" "}
                               {fontStyle
                                ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                                : text}
                               {faIconPosition === "back" ? (
                                <i className={faIcon}></i>
                               ) : (
                                ""
                               )}
                              </span>

                              {faIconPosition === "bottom" ? (
                               <span
                                style={{
                                 display: "block",
                                 textAlign: "center",
                                 width: "100%",
                                }}>
                                <i className={faIcon}></i>
                               </span>
                              ) : (
                               ""
                              )}
                             </button>
                            ) : (
                             ""
                            )}
                            {type === "img" ? (
                             <img
                              alt={name}
                              src={code}
                              height={`${height}px`}
                              width={`${width}px`}
                             />
                            ) : (
                             ""
                            )}
                            {type === "vid" ? (
                             <YouTube
                              videoId={url}
                              opts={{
                               height: height,
                               width: width,
                               playerVars: {
                                autoplay: autoplay,
                               },
                              }}
                             />
                            ) : (
                             ""
                            )}
                           </span>
                          </Fragment>
                         );
                       }
                      )}
                    </div>
                    {bodyGrids.length > 0 && (
                     <Grid
                      className={
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                       `G${
                        bodyGrids[bodyGrids.findIndex((x) => x.parent === id)]
                         .key
                       }`
                      }
                      key={
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)]
                        .key
                      }
                      columns={
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)]
                        .columnString
                      }
                      rows={
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)]
                        .rowString
                      }
                      flow={
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)]
                        .direction
                      }
                      justifyContent={
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)]
                        .horizontalAlignment
                      }
                      alignContent={
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                       bodyGrids[bodyGrids.findIndex((x) => x.parent === id)]
                        .verticalAlignment
                      }>
                      {bodyCells
                       .filter((g) => g.parent === id)
                       .map(
                        ({
                         rowSpan,
                         left,
                         columnSpan,
                         css,
                         contentCss,
                         top,
                         id,
                         content,
                         bodyViewState,
                        }) => (
                         <Cell
                          height={rowSpan}
                          width={columnSpan}
                          className={`C${id}`}
                          top={top}
                          left={left}
                          key={id}>
                          {bodyViewState === true ? (
                           <div
                            className='card'
                            style={{ backgroundColor: "#f4f4f4" }}>
                            <div
                             style={{
                              height: "5px",
                              width: "5px",
                              zIndex: 9999999,
                              float: "right",
                             }}>
                             <a>
                              <select
                               name='viewToggle'
                               style={{
                                height: "5px",
                                width: "5px",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                zIndex: 9999999,
                               }}
                               onChange={(e) => {
                                onChangeBodyCell(i, e);
                               }}>
                               <option value=''></option>
                               <option value='close'>Close</option>
                               <option value='delete'>Delete</option>
                              </select>
                             </a>
                            </div>
                            <button
                             className='btn btn-block btn-dark'
                             onClick={() => addBodyCellForm(_id)}>
                             Add Current Form To This Cell
                            </button>

                            <button
                             className='btn btn-block btn-dark'
                             onClick={() =>
                              setBodyCellQuiz([
                               ...bodyCellQuiz,
                               { quiz: builtQuiz, cell: _id },
                              ])
                             }>
                             Add Built Quiz To This Cell
                            </button>
                            <button
                             onClick={() =>
                              setBodyContentToggle((prevState) => !prevState)
                             }>
                             View CSS
                            </button>
                            {bodyContentToggle === true ? (
                             <div>
                              {Object.keys(filtered).length > 0 &&
                               Object.keys(filtered).map((key) => {
                                if (key.includes("Color")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option>Set Color...</option>
                                    <option value={pallet && pallet.primary}>
                                     Primary
                                    </option>
                                    <option value={pallet && pallet.dark}>
                                     Dark
                                    </option>
                                    <option value={pallet && pallet.light}>
                                     Light
                                    </option>
                                    <option value={pallet && pallet.danger}>
                                     Danger
                                    </option>
                                    <option value={pallet && pallet.success}>
                                     Success
                                    </option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "animation") {
                                 return (
                                  <label key={key}>
                                   <div className='card'>
                                    <button
                                     className='btn btn-sm btn-dark'
                                     onClick={() => addBodyCellAnimation(i)}>
                                     + Animation
                                    </button>
                                    <h5>Current Animation Order</h5>
                                    <ul>
                                     {css.animation.length > 0 &&
                                      css.animation.map(
                                       (
                                        {
                                         animationName,
                                         animationDuration,
                                         animationTimingFunction,
                                         animationDelay,
                                         animationIterationCount,
                                         animationDirection,
                                         animationFillMode,
                                         cubicNs,
                                         steps,
                                         keyframes,
                                        },
                                        index
                                       ) => (
                                        <div>
                                         <h5>Animation Name</h5>
                                         <input
                                          type='text'
                                          name='animationName'
                                          value={animationName}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         <h5>Animation Duration</h5>
                                         <input
                                          type='text'
                                          name='animationDuration'
                                          value={animationDuration}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         <h5>Animation Function</h5>
                                         <select
                                          name='animationTimingFunction'
                                          value={animationTimingFunction}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }>
                                          <option></option>
                                          <option value='ease'>Ease</option>
                                          <option value='ease-in'>
                                           Ease In
                                          </option>
                                          <option value='ease-in-out'>
                                           Ease In Out
                                          </option>
                                          <option value='step-end'>
                                           Step End
                                          </option>
                                          <option value='step-start'>
                                           Step Start
                                          </option>
                                          <option value='cubic-bezier'>
                                           Cubic Bezier
                                          </option>
                                          <option value='steps'>Steps</option>
                                          <option value='inherit'>
                                           Inherit
                                          </option>
                                          <option value='initial'>
                                           Initial
                                          </option>
                                         </select>
                                         <h5>Animation Delay</h5>
                                         <input
                                          placeholder='enter a value in seconds'
                                          type='text'
                                          name='animationDelay'
                                          value={animationDelay}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         {animationTimingFunction ===
                                          "cubic-bezier" &&
                                          Object.keys(cubicNs).map((n) => (
                                           <div>
                                            <h5>Cubic Bez (n,n,n,n)</h5>
                                            <div key={n}>
                                             <h5>N {parseInt(n) + 1}</h5>
                                             <Slider
                                              axis='x'
                                              x={
                                               css["animation"][index][
                                                "cubicNs"
                                               ][n]
                                              }
                                              value={parseFloat(
                                               css["animation"][index][
                                                "cubicNs"
                                               ][n]
                                              )}
                                              onChange={(e) =>
                                               onChangeBodyCell(
                                                i,
                                                e,
                                                "cubicNs",
                                                index,
                                                n
                                               )
                                              }
                                              orientation='horizontal'
                                              name={n}
                                              min={0}
                                              max={1}
                                              step={0.01}
                                             />
                                            </div>
                                           </div>
                                          ))}
                                         <h5>Animation Iteration Count</h5>
                                         <input
                                          placeholder='Positive Integers Only'
                                          type='text'
                                          name='animationIterationCount'
                                          value={animationIterationCount}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         <h5>Animation Iteration Count</h5>
                                         <input
                                          placeholder='Positive Integers Only'
                                          type='text'
                                          name='animationIterationCount'
                                          value={animationIterationCount}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         <h5>Animation Direction</h5>
                                         <select
                                          name='animationDirection'
                                          value={animationDirection}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }>
                                          <option></option>
                                          <option value='normal'>Normal</option>
                                          <option value='reverse'>
                                           Reverse
                                          </option>
                                          <option value='alternate'>
                                           Alternate
                                          </option>
                                          <option value='reverse'>
                                           Alternate Reverse
                                          </option>
                                          <option value='inherit'>
                                           Inherit
                                          </option>
                                         </select>
                                         <h5>Animation Fill Mode</h5>
                                         <select
                                          name='animationFillMode'
                                          value={animationFillMode}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }>
                                          <option></option>
                                          <option value='none'>None</option>
                                          <option value='forward'>
                                           Forward
                                          </option>
                                          <option value='backward'>
                                           Backward
                                          </option>
                                          <option value='both'>Both</option>
                                          <option value='inherit'>
                                           Inherit
                                          </option>
                                         </select>
                                         <h5>Key Frames</h5>
                                         <button
                                          className='btn btn-sm btn-dark'
                                          onClick={() =>
                                           addBodyCellAnimationKeyframe(
                                            i,
                                            index
                                           )
                                          }>
                                          + Keyframe
                                         </button>
                                         lineHeight:'',
                                        </div>
                                       )
                                      )}
                                    </ul>
                                   </div>
                                  </label>
                                 );
                                } else if (key === "posiition") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   ition
                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='fixed'>Fixed</option>
                                    <option value='relative'>Relative</option>
                                    <option value='absolute'>Absolute</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "backgroundRepeat") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='repeatX'>Repeat X</option>
                                    <option value='repeatY'>Repeat Y</option>
                                    <option value='repeat'>Repeat</option>
                                    <option value='space'>Space</option>
                                    <option value='round'>Round</option>
                                    <option value='noRepeat'>No Repeat</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "backgroundPosition") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='center'>Center</option>
                                    <option value='left'>Left</option>
                                    <option value='right'>Right</option>
                                    <option value='top'>Top</option>
                                    <option value='bottom'>Bottom</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "backgroundSize") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='cover'>Cover</option>
                                    <option value='contain'>Contain</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "display") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='block'>Block</option>
                                    <option value='inline'>Inline</option>
                                    <option value='inline-block'>
                                     Inline Block
                                    </option>
                                    <option value='flex'>Flex</option>
                                    <option value='none'>None</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "textDecorationLine") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='none'>None</option>
                                    <option value='underline'>Underline</option>
                                    <option value='overline'>Overline</option>
                                    <option value='line-through'>
                                     Line Through
                                    </option>
                                    <option value='blink'>Blink</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "textDecorationStyle") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='solid'>Solid</option>
                                    <option value='double'>Double</option>
                                    <option value='dotted'>Dotted</option>
                                    <option value='dashed'>Dashed</option>
                                    <option value='wavy'>Wavy</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "transition") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <button
                                    className='btn btn-sm btn-dark'
                                    onClick={() => addBodyCellTransition(i)}>
                                    + Transition
                                   </button>
                                   <div
                                    className='card'
                                    style={{
                                     overflowY: "scroll",
                                     overflowX: "scroll",
                                    }}>
                                    {css.transition.map(
                                     (
                                      {
                                       property,
                                       duration,
                                       timingFunction,
                                       cubicNs,
                                       delay,
                                      },
                                      index
                                     ) => (
                                      <div key={index} className='card'>
                                       <h5>Transition Property</h5>
                                       <select
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }
                                        value={property}
                                        name='property'>
                                        <option value=''></option>
                                        {Object.keys(flatCss)
                                         .filter(
                                          (e) => typeof parseInt(e) === "number"
                                         )
                                         .map((c, i) => (
                                          <option key={i} value={c}>
                                           {c}
                                          </option>
                                         ))}
                                        <option value='color'>Color</option>
                                        <option value='background-color'>
                                         Background Color
                                        </option>
                                       </select>
                                       <h5>Transition Timing</h5>
                                       <input
                                        type='text'
                                        name='duration'
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }
                                        value={duration}
                                        placeholder='Enter A Value in seconds'
                                       />
                                       <h5>Transition Function</h5>
                                       <select
                                        name='timingFunction'
                                        value={timingFunction}
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }>
                                        <option></option>
                                        <option value='ease'>Ease</option>
                                        <option value='ease-in'>Ease In</option>
                                        <option value='ease-in-out'>
                                         Ease In Out
                                        </option>
                                        <option value='step-end'>
                                         Step End
                                        </option>
                                        <option value='step-start'>
                                         Step Start
                                        </option>
                                        <option value='cubic-bezier'>
                                         Cubic Bezier
                                        </option>
                                        <option value='inherit'>Inherit</option>
                                        <option value='initial'>Initial</option>
                                       </select>
                                       <h5>Transition Delay</h5>
                                       <input
                                        type='text'
                                        name='delay'
                                        value={delay}
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }
                                        placeholder='Enter A Value in seconds'
                                       />

                                       {timingFunction === "cubic-bezier" &&
                                        Object.keys(cubicNs).map((n) => (
                                         <div>
                                          <h5>Cubic Bez (n,n,n,n)</h5>
                                          <div key={n}>
                                           <h5>N {parseInt(n) + 1}</h5>
                                           <Slider
                                            axis='x'
                                            x={
                                             css["transition"][index][
                                              "cubicNs"
                                             ][n]
                                            }
                                            value={parseFloat(
                                             css["transition"][index][
                                              "cubicNs"
                                             ][n]
                                            )}
                                            onChange={(e) =>
                                             onChangeBodyCell(
                                              i,
                                              e,
                                              "cubicNs",
                                              index,
                                              n
                                             )
                                            }
                                            orientation='horizontal'
                                            name={n}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                           />
                                          </div>
                                         </div>
                                        ))}
                                      </div>
                                     )
                                    )}
                                   </div>
                                  </label>
                                 );
                                } else if (key === "transform") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "transform")
                                    }
                                    multiple>
                                    <option></option>
                                    <option value='rotateX'>RotateX</option>
                                    <option value='rotateY'>RotateY</option>
                                    <option value='skewX'>SkewX</option>
                                    <option value='skewY'>SkewY</option>
                                    <option value='rotateZ'>RotateZ</option>
                                    <option value='scaleX'>ScaleX</option>
                                    <option value='scaleY'>ScaleY</option>
                                    <option value='translateX'>
                                     TranslateX
                                    </option>
                                    <option value='translateY'>
                                     TranslateY
                                    </option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "transformProp") {
                                 return (
                                  <label key={key}>
                                   <div className='card all-center'>
                                    <h5>Current Transform Order</h5>
                                    <ul>
                                     {css.transform.map((m) => (
                                      <li key={m}>{m}</li>
                                     ))}
                                    </ul>
                                   </div>
                                   {css.transform.includes("rotateZ") && (
                                    <div>
                                     <h5>Rotate Z Deg</h5>
                                     <Slider
                                      axis='x'
                                      x={css["transformProp"]["rotateZ"]}
                                      value={parseInt(
                                       css["transformProp"]["rotateZ"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "rotateZ",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='rotateZ'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("rotateX") && (
                                    <div>
                                     <h5>Rotate X Deg</h5>
                                     <Slider
                                      axis='x'
                                      x={css["transformProp"]["rotateX"]}
                                      value={parseInt(
                                       css["transformProp"]["rotateX"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "rotateX",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='rotateX'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("translateX") && (
                                    <div>
                                     <h5>Translate X Px</h5>
                                     <input
                                      type='text'
                                      name='translateX'
                                      value={css["transformProp"]["translateX"]}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e.target.value,
                                        "translateX",
                                        "transformProp"
                                       )
                                      }
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("translateY") && (
                                    <div>
                                     <h5>Translate Y Px</h5>
                                     <input
                                      type='text'
                                      name='translateY'
                                      value={css["transformProp"]["translateY"]}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e.target.value,
                                        "translateY",
                                        "transformProp"
                                       )
                                      }
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("rotateY") && (
                                    <div>
                                     <h5>Rotate Y Deg</h5>
                                     <Slider
                                      value={parseInt(
                                       css["transformProp"]["rotateY"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "rotateY",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='rotateY'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("skewX") && (
                                    <div>
                                     <h5>Skew X Deg</h5>
                                     <Slider
                                      value={parseInt(
                                       css["transformProp"]["skewX"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "skewX",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='skewX'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("skewY") && (
                                    <div>
                                     <h5>Skew Y Deg</h5>
                                     <Slider
                                      value={parseInt(
                                       css["transformProp"]["skewY"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "skewY",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='skewY'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("scaleX") && (
                                    <div>
                                     <h5>Scale X Percent</h5>
                                     <Slider
                                      value={
                                       parseInt(
                                        css["transformProp"]["scaleX"]
                                       ) * 10
                                      }
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e / 10,
                                        "scaleX",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='scaleX'
                                      min={-100}
                                      max={200}
                                      step={1}
                                     />
                                    </div>
                                   )}{" "}
                                   {css.transform.includes("scaleY") && (
                                    <div>
                                     <h5>Scale Y Percent</h5>
                                     <Slider
                                      value={
                                       parseInt(
                                        css["transformProp"]["scaleY"]
                                       ) * 10
                                      }
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e / 10,
                                        "scaleY",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='scaleY'
                                      min={-100}
                                      max={200}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                  </label>
                                 );
                                } else if (key === "fontSize") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='5px'>XX Small</option>
                                    <option value='7px'>X Small</option>
                                    <option value='11px'>Small</option>
                                    <option value='16px'>Medium</option>
                                    <option value='24px'>Large</option>
                                    <option value='36px'>X Large</option>
                                    <option value='54px'>XX Large</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key.includes("Inset")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option>Outer</option>
                                    <option value='inset'>Inset</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "fontWeight") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option value='100'>100</option>
                                    <option value='200'>200</option>
                                    <option value='300'>300</option>
                                    <option value='400'>400</option>
                                    <option value='500'>500</option>
                                    <option value='600'>600</option>
                                    <option value='700'>700</option>
                                    <option value='800'>800</option>
                                    <option value='900'>900</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "opacity") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <Slider
                                    axis='x'
                                    x={css.opacity}
                                    value={parseInt(css[key])}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "opacity", "slider")
                                    }
                                    orientation='horizontal'
                                    min={0}
                                    max={100}
                                    step={1}
                                   />
                                  </label>
                                 );
                                } else if (key.includes("Radius")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <Slider
                                    value={parseInt(css[key])}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, key, "slider")
                                    }
                                    orientation='horizontal'
                                    min={0}
                                    max={50}
                                    step={0.5}
                                   />
                                  </label>
                                 );
                                } else if (key === "textAlign") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>

                                    <option value='start'>Start</option>
                                    <option value='end'>End</option>
                                    <option value='left'>Left</option>
                                    <option value='right'>Right</option>
                                    <option value='center'>Center</option>
                                    <option value='justify'>Justify</option>
                                    <option value='matchParent'>
                                     Match Parent
                                    </option>
                                    <option value='justifyAll'>
                                     Justify All
                                    </option>
                                   </select>
                                  </label>
                                 );
                                } else if (
                                 key.includes("border") &&
                                 key.includes("Style")
                                ) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='solid'>Solid</option>
                                    <option value='double'>Double</option>
                                    <option value='dotted'>Dotted</option>
                                    <option value='dashed'>Dashed</option>
                                    <option value='groove'>Groove</option>
                                    <option value='none'>None</option>
                                    <option value='hidden'>Hidden</option>
                                    <option value='ridge'>Ridge</option>
                                    <option value='inset'>Inset</option>
                                    <option value='outset'>Outset</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "textShadowSize") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='small'>2px</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key.includes("overflow")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='visible'>Visible</option>
                                    <option value='hidden'>Hidden</option>
                                    <option value='clip'>Clip</option>
                                    <option value='scroll'>Scroll</option>
                                    <option value='auto'>Auto</option>
                                   </select>
                                  </label>
                                 );
                                } else {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <input
                                    type='text'
                                    placeholder='Enter A Value In Pixels'
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }
                                    name={key}
                                   />
                                  </label>
                                 );
                                }
                               })}

                              {gridLevel &&
                               Object.keys(filtered).length === 0 &&
                               Object.keys(css).map((key) => {
                                if (key.includes("Color")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option>Set Color...</option>
                                    <option value={pallet && pallet.primary}>
                                     Primary
                                    </option>
                                    <option value={pallet && pallet.dark}>
                                     Dark
                                    </option>
                                    <option value={pallet && pallet.light}>
                                     Light
                                    </option>
                                    <option value={pallet && pallet.danger}>
                                     Danger
                                    </option>
                                    <option value={pallet && pallet.success}>
                                     Success
                                    </option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "position") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='fixed'>Fixed</option>
                                    <option value='relative'>Relative</option>
                                    <option value='absolute'>Absolute</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "backgroundRepeat") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='repeatX'>Repeat X</option>
                                    <option value='repeatY'>Repeat Y</option>
                                    <option value='repeat'>Repeat</option>
                                    <option value='space'>Space</option>
                                    <option value='round'>Round</option>
                                    <option value='noRepeat'>No Repeat</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "backgroundPosition") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='center'>Center</option>
                                    <option value='left'>Left</option>
                                    <option value='right'>Right</option>
                                    <option value='top'>Top</option>
                                    <option value='bottom'>Bottom</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "backgroundSize") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='cover'>Cover</option>
                                    <option value='contain'>Contain</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "display") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='block'>Block</option>
                                    <option value='inline'>Inline</option>
                                    <option value='inline-block'>
                                     Inline Block
                                    </option>
                                    <option value='flex'>Flex</option>
                                    <option value='none'>None</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "textDecorationLine") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='none'>None</option>
                                    <option value='underline'>Underline</option>
                                    <option value='overline'>Overline</option>
                                    <option value='line-through'>
                                     Line Through
                                    </option>
                                    <option value='blink'>Blink</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "textDecorationStyle") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='solid'>Solid</option>
                                    <option value='double'>Double</option>
                                    <option value='dotted'>Dotted</option>
                                    <option value='dashed'>Dashed</option>
                                    <option value='wavy'>Wavy</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "transition") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <button
                                    className='btn btn-sm btn-dark'
                                    onClick={() => addBodyCellTransition(i)}>
                                    + Transition
                                   </button>
                                   <div
                                    className='card'
                                    style={{
                                     overflowY: "scroll",
                                     overflowX: "scroll",
                                    }}>
                                    {css.transition.map(
                                     (
                                      {
                                       property,
                                       duration,
                                       timingFunction,
                                       cubicNs,
                                       delay,
                                      },
                                      index
                                     ) => (
                                      <div key={index} className='card'>
                                       <h5>Transition Property</h5>
                                       <select
                                        name='property'
                                        value={property}
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }>
                                        <option value='translate'>
                                         Translate
                                        </option>
                                        <option value='transform'>
                                         Transform
                                        </option>
                                        <option value='height'>Height</option>
                                        <option value='width'>Width</option>
                                        <option value='border-left-color'>
                                         Border Left Color
                                        </option>
                                        <option value='border-left-width'>
                                         Border Left Width
                                        </option>
                                        <option value='background-color'>
                                         Background Color
                                        </option>
                                        <option value='background-position'>
                                         Background Position
                                        </option>
                                        <option value='background-size'>
                                         Background Size
                                        </option>
                                        <option value='border-bottom-color'>
                                         Border Bottom Color
                                        </option>
                                        <option value='border-bottom-left-radius'>
                                         Border Bottom Left Radius
                                        </option>
                                        <option value='border-bottom-right-radius'>
                                         Border Bottom Right Radius
                                        </option>
                                        <option value='border-bottom-width'>
                                         Border Bottom Width
                                        </option>
                                        <option value='border-radius'>
                                         Border Radius
                                        </option>
                                        <option value='border-right'>
                                         Border Right
                                        </option>
                                        <option value='border-right-color'>
                                         Border Right Color
                                        </option>
                                        <option value='border-right-width'>
                                         Border Right Width
                                        </option>
                                        <option value='border-color'>
                                         Border Color
                                        </option>
                                        <option value='border-width'>
                                         Border Width
                                        </option>
                                        <option value='border-top-color'>
                                         Border Top Color
                                        </option>
                                        <option value='border-top-left-radius'>
                                         Border Top Left Radius
                                        </option>
                                        <option value='border-top-right-radius'>
                                         Border Top Right Radius
                                        </option>
                                        <option value='border-top-width'>
                                         Border Top Width
                                        </option>
                                        <option value='box-shadow'>
                                         Box Shadow
                                        </option>
                                        <option value='font'>Font</option>
                                        <option value='font-size'>
                                         Font Size
                                        </option>
                                        <option value='flex'>Flex</option>
                                        <option value='font-weight'>
                                         Font Weight
                                        </option>
                                        <option value='line-height'>
                                         Line Height
                                        </option>
                                        <option value='margin-bottom'>
                                         Margin Bottom
                                        </option>
                                        <option value='margin'>Margin</option>
                                        <option value='margin-left'>
                                         Margin Left
                                        </option>
                                        <option value='margin-top'>
                                         Margin Top
                                        </option>
                                        <option value='margin-right'>
                                         Margin Right
                                        </option>
                                        <option value='opacity'>Opacity</option>
                                        <option value='outline'>Outline</option>
                                        <option value='padding-left'>
                                         Padding Left
                                        </option>
                                        <option value='padding-right'>
                                         Padding Right
                                        </option>
                                        <option value='padding-top'>
                                         Padding Top
                                        </option>
                                        <option value='z-index'>Z Index</option>
                                        <option value='padding-bottom'>
                                         Padding Bottom
                                        </option>
                                        <option value='top'>Top</option>
                                        <option value='left'>Left</option>
                                        <option value='right'>Right</option>
                                        <option value='bottom'>Bottom</option>
                                       </select>
                                       <h5>Transition Timing</h5>
                                       <input
                                        type='text'
                                        name='duration'
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }
                                        value={duration}
                                        placeholder='Enter A Value in seconds'
                                       />
                                       <h5>Transition Function</h5>
                                       <select
                                        name='timingFunction'
                                        value={timingFunction}
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }>
                                        <option></option>
                                        <option value='ease'>Ease</option>
                                        <option value='ease-in'>Ease In</option>
                                        <option value='ease-in-out'>
                                         Ease In Out
                                        </option>
                                        <option value='step-end'>
                                         Step End
                                        </option>
                                        <option value='step-start'>
                                         Step Start
                                        </option>
                                        <option value='cubic-bezier'>
                                         Cubic Bezier
                                        </option>
                                        <option value='inherit'>Inherit</option>
                                        <option value='initial'>Initial</option>
                                       </select>
                                       <h5>Transition Delay</h5>
                                       <input
                                        type='text'
                                        name='delay'
                                        value={delay}
                                        onChange={(e) =>
                                         onChangeBodyCell(
                                          i,
                                          e,
                                          "transition",
                                          index
                                         )
                                        }
                                        placeholder='Enter A Value in seconds'
                                       />

                                       {timingFunction === "cubic-bezier" &&
                                        Object.keys(cubicNs).map((n) => (
                                         <div>
                                          <h5>Cubic Bez (n,n,n,n)</h5>
                                          <div key={n}>
                                           <h5>N {parseInt(n) + 1}</h5>
                                           <Slider
                                            axis='x'
                                            x={
                                             css["transition"][index][
                                              "cubicNs"
                                             ][n]
                                            }
                                            value={parseFloat(
                                             css["transition"][index][
                                              "cubicNs"
                                             ][n]
                                            )}
                                            onChange={(e) =>
                                             onChangeBodyCell(
                                              i,
                                              e,
                                              "cubicNs",
                                              index,
                                              n
                                             )
                                            }
                                            orientation='horizontal'
                                            name={n}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                           />
                                          </div>
                                         </div>
                                        ))}
                                      </div>
                                     )
                                    )}
                                   </div>
                                  </label>
                                 );
                                } else if (key === "transform") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "transform")
                                    }
                                    multiple>
                                    <option></option>
                                    <option value='rotateX'>RotateX</option>
                                    <option value='rotateY'>RotateY</option>
                                    <option value='skewX'>SkewX</option>
                                    <option value='skewY'>SkewY</option>
                                    <option value='rotateZ'>RotateZ</option>
                                    <option value='scaleX'>ScaleX</option>
                                    <option value='scaleY'>ScaleY</option>
                                    <option value='translateX'>
                                     TranslateX
                                    </option>
                                    <option value='translateY'>
                                     TranslateY
                                    </option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "transformProp") {
                                 return (
                                  <label key={key}>
                                   <div className='card all-center'>
                                    <h5>Current Transform Order</h5>
                                    <ul>
                                     {css.transform.map((m) => (
                                      <li key={m}>{m}</li>
                                     ))}
                                    </ul>
                                   </div>
                                   {css.transform.includes("rotateZ") && (
                                    <div>
                                     <h5>Rotate Z Deg</h5>
                                     <Slider
                                      axis='x'
                                      x={css["transformProp"]["rotateZ"]}
                                      value={parseInt(
                                       css["transformProp"]["rotateZ"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "rotateZ",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='rotateZ'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("rotateX") && (
                                    <div>
                                     <h5>Rotate X Deg</h5>
                                     <Slider
                                      axis='x'
                                      x={css["transformProp"]["rotateX"]}
                                      value={parseInt(
                                       css["transformProp"]["rotateX"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "rotateX",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='rotateX'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("translateX") && (
                                    <div>
                                     <h5>Translate X Px</h5>
                                     <input
                                      type='text'
                                      name='translateX'
                                      value={css["transformProp"]["translateX"]}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e.target.value,
                                        "translateX",
                                        "transformProp"
                                       )
                                      }
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("translateY") && (
                                    <div>
                                     <h5>Translate Y Px</h5>
                                     <input
                                      type='text'
                                      name='translateY'
                                      value={css["transformProp"]["translateY"]}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e.target.value,
                                        "translateY",
                                        "transformProp"
                                       )
                                      }
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("rotateY") && (
                                    <div>
                                     <h5>Rotate Y Deg</h5>
                                     <Slider
                                      value={parseInt(
                                       css["transformProp"]["rotateY"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "rotateY",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='rotateY'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("skewX") && (
                                    <div>
                                     <h5>Skew X Deg</h5>
                                     <Slider
                                      value={parseInt(
                                       css["transformProp"]["skewX"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "skewX",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='skewX'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("skewY") && (
                                    <div>
                                     <h5>Skew Y Deg</h5>
                                     <Slider
                                      value={parseInt(
                                       css["transformProp"]["skewY"]
                                      )}
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e,
                                        "skewY",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='skewY'
                                      min={0}
                                      max={360}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                   {css.transform.includes("scaleX") && (
                                    <div>
                                     <h5>Scale X Percent</h5>
                                     <Slider
                                      value={
                                       parseInt(
                                        css["transformProp"]["scaleX"]
                                       ) * 10
                                      }
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e / 10,
                                        "scaleX",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='scaleX'
                                      min={-100}
                                      max={200}
                                      step={1}
                                     />
                                    </div>
                                   )}{" "}
                                   {css.transform.includes("scaleY") && (
                                    <div>
                                     <h5>Scale Y Percent</h5>
                                     <Slider
                                      value={
                                       parseInt(
                                        css["transformProp"]["scaleY"]
                                       ) * 10
                                      }
                                      onChange={(e) =>
                                       onChangeBodyCell(
                                        i,
                                        e / 10,
                                        "scaleY",
                                        "transformProp"
                                       )
                                      }
                                      orientation='horizontal'
                                      name='scaleY'
                                      min={-100}
                                      max={200}
                                      step={1}
                                     />
                                    </div>
                                   )}
                                  </label>
                                 );
                                } else if (key === "animation") {
                                 return (
                                  <label key={key}>
                                   <div className='card'>
                                    <button
                                     className='btn btn-sm btn-dark'
                                     onClick={() => addBodyCellAnimation(i)}>
                                     + Animation
                                    </button>
                                    <h5>Current Animation Order</h5>
                                    <ul>
                                     {css.animation.length > 0 &&
                                      css.animation.map(
                                       (
                                        {
                                         animationName,
                                         animationDuration,
                                         animationTimingFunction,
                                         animationDelay,
                                         animationIterationCount,
                                         animationDirection,
                                         animationFillMode,
                                         cubicNs,
                                         keyframes,
                                        },
                                        index
                                       ) => (
                                        <div>
                                         <h5>Animation Name</h5>
                                         <input
                                          type='text'
                                          name='animationName'
                                          value={animationName}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         <h5>Animation Duration</h5>
                                         <input
                                          type='text'
                                          name='animationDuration'
                                          value={animationDuration}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         <h5>Animation Function</h5>
                                         <select
                                          name='animationTimingFunction'
                                          value={animationTimingFunction}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }>
                                          <option></option>
                                          <option value='ease'>Ease</option>
                                          <option value='ease-in'>
                                           Ease In
                                          </option>
                                          <option value='ease-in-out'>
                                           Ease In Out
                                          </option>
                                          <option value='step-end'>
                                           Step End
                                          </option>
                                          <option value='step-start'>
                                           Step Start
                                          </option>
                                          <option value='cubic-bezier'>
                                           Cubic Bezier
                                          </option>
                                          <option value='steps'>Steps</option>
                                          <option value='inherit'>
                                           Inherit
                                          </option>
                                          <option value='initial'>
                                           Initial
                                          </option>
                                         </select>

                                         {animationTimingFunction ===
                                          "cubic-bezier" &&
                                          Object.keys(cubicNs).map((n) => (
                                           <div>
                                            <h5>Cubic Bez (n,n,n,n)</h5>
                                            <div key={n}>
                                             <h5>N {parseInt(n) + 1}</h5>
                                             <Slider
                                              axis='x'
                                              x={
                                               css["animation"][index][
                                                "cubicNs"
                                               ][n]
                                              }
                                              value={parseFloat(
                                               css["animation"][index][
                                                "cubicNs"
                                               ][n]
                                              )}
                                              onChange={(e) =>
                                               onChangeBodyCell(
                                                i,
                                                e,
                                                "cubicNs",
                                                index,
                                                n,
                                                "animation"
                                               )
                                              }
                                              orientation='horizontal'
                                              name={n}
                                              min={0}
                                              max={1}
                                              step={0.01}
                                             />
                                            </div>
                                           </div>
                                          ))}
                                         <h5>Animation Delay</h5>
                                         <input
                                          placeholder='enter a value in seconds'
                                          type='text'
                                          name='animationDelay'
                                          value={animationDelay}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />
                                         <h5>Animation Iteration Count</h5>

                                         <i style={{ fontSize: "8px" }}>
                                          Typing the value "infinite" will do
                                          what you imagine it does.
                                         </i>
                                         <input
                                          placeholder='Positive Integers Only'
                                          type='text'
                                          name='animationIterationCount'
                                          value={animationIterationCount}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }
                                         />

                                         <h5>Animation Direction</h5>
                                         <select
                                          name='animationDirection'
                                          value={animationDirection}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }>
                                          <option></option>
                                          <option value='normal'>Normal</option>
                                          <option value='reverse'>
                                           Reverse
                                          </option>
                                          <option value='alternate'>
                                           Alternate
                                          </option>
                                          <option value='reverse'>
                                           Alternate Reverse
                                          </option>
                                          <option value='inherit'>
                                           Inherit
                                          </option>
                                         </select>
                                         <h5>Animation Fill Mode</h5>
                                         <select
                                          name='animationFillMode'
                                          value={animationFillMode}
                                          onChange={(e) =>
                                           onChangeBodyCell(
                                            i,
                                            e,
                                            "animation",
                                            index
                                           )
                                          }>
                                          <option></option>
                                          <option value='none'>None</option>
                                          <option value='forward'>
                                           Forward
                                          </option>
                                          <option value='backward'>
                                           Backward
                                          </option>
                                          <option value='both'>Both</option>
                                          <option value='inherit'>
                                           Inherit
                                          </option>
                                         </select>

                                         <h5>Key Frames</h5>
                                         <button
                                          className='btn btn-sm btn-dark'
                                          onClick={() =>
                                           addBodyCellAnimationKeyframe(
                                            i,
                                            index
                                           )
                                          }>
                                          + Keyframe
                                         </button>

                                         {keyframes.map(
                                          (
                                           { completionPercent, properties },
                                           ind
                                          ) => (
                                           <div>
                                            <h5>Completion Percentage </h5>
                                            <i style={{ fontSize: "8px" }}>
                                             (all animations require a 0 and
                                             100)
                                            </i>
                                            <input
                                             placeholder='enter a value from 0 to 100'
                                             type='text'
                                             name='completionPercent'
                                             value={completionPercent}
                                             onChange={(e) =>
                                              onChangeBodyCell(
                                               i,
                                               e,
                                               "animationkey",
                                               index,
                                               ind
                                              )
                                             }
                                            />
                                            <button
                                             className='btn btn-sm btn-dark'
                                             onClick={() =>
                                              addBodyCellAnimationKeyframeProperty(
                                               i,
                                               index,
                                               ind
                                              )
                                             }>
                                             + Property
                                            </button>

                                            {properties.map(
                                             (
                                              {
                                               propName,
                                               propValue,
                                               shadowValues,
                                               transValues,
                                              },
                                              indy
                                             ) => (
                                              <div>
                                               <select
                                                name='propName'
                                                value={propName}
                                                onChange={(e) =>
                                                 onChangeBodyCell(
                                                  i,
                                                  e,
                                                  "animationkeyprop",
                                                  index,
                                                  ind,
                                                  indy
                                                 )
                                                }>
                                                <option value='transform'>
                                                 Transform
                                                </option>
                                                <option value='height'>
                                                 Height
                                                </option>
                                                <option value='width'>
                                                 Width
                                                </option>
                                                <option value='border-left-color'>
                                                 Border Left Color
                                                </option>
                                                <option value='border-left-width'>
                                                 Border Left Width
                                                </option>
                                                <option value='background-color'>
                                                 Background Color
                                                </option>
                                                <option value='background-position'>
                                                 Background Position
                                                </option>
                                                <option value='background-size'>
                                                 Background Size
                                                </option>
                                                <option value='border-bottom-color'>
                                                 Border Bottom Color
                                                </option>
                                                <option value='border-bottom-left-radius'>
                                                 Border Bottom Left Radius
                                                </option>
                                                <option value='border-bottom-right-radius'>
                                                 Border Bottom Right Radius
                                                </option>
                                                <option value='border-bottom-width'>
                                                 Border Bottom Width
                                                </option>
                                                <option value='border-radius'>
                                                 Border Radius
                                                </option>
                                                <option value='border-right'>
                                                 Border Right
                                                </option>
                                                <option value='border-right-color'>
                                                 Border Right Color
                                                </option>
                                                <option value='border-right-width'>
                                                 Border Right Width
                                                </option>
                                                <option value='border-color'>
                                                 Border Color
                                                </option>
                                                <option value='border-width'>
                                                 Border Width
                                                </option>
                                                <option value='border-top-color'>
                                                 Border Top Color
                                                </option>
                                                <option value='border-top-left-radius'>
                                                 Border Top Left Radius
                                                </option>
                                                <option value='border-top-right-radius'>
                                                 Border Top Right Radius
                                                </option>
                                                <option value='border-top-width'>
                                                 Border Top Width
                                                </option>
                                                <option value='box-shadow'>
                                                 Box Shadow
                                                </option>
                                                <option value='font'>
                                                 Font
                                                </option>
                                                <option value='font-size'>
                                                 Font Size
                                                </option>

                                                <option value='font-weight'>
                                                 Font Weight
                                                </option>
                                                <option value='line-height'>
                                                 Line Height
                                                </option>
                                                <option value='margin-bottom'>
                                                 Margin Bottom
                                                </option>
                                                <option value='margin'>
                                                 Margin
                                                </option>
                                                <option value='margin-left'>
                                                 Margin Left
                                                </option>
                                                <option value='margin-top'>
                                                 Margin Top
                                                </option>
                                                <option value='margin-right'>
                                                 Margin Right
                                                </option>
                                                <option value='opacity'>
                                                 Opacity
                                                </option>

                                                <option value='padding-left'>
                                                 Padding Left
                                                </option>
                                                <option value='padding-right'>
                                                 Padding Right
                                                </option>
                                                <option value='padding-top'>
                                                 Padding Top
                                                </option>
                                                <option value='z-index'>
                                                 Z Index
                                                </option>
                                                <option value='padding-bottom'>
                                                 Padding Bottom
                                                </option>
                                                <option value='top'>Top</option>
                                                <option value='left'>
                                                 Left
                                                </option>
                                                <option value='right'>
                                                 Right
                                                </option>
                                                <option value='bottom'>
                                                 Bottom
                                                </option>
                                               </select>
                                               {propName.includes("width") ||
                                               propName.includes("height") ||
                                               propName.includes("size") ||
                                               propName.includes("weight") ||
                                               propName.includes("margin") ||
                                               propName.includes("padding") ||
                                               propName === "top" ||
                                               propName === "bottom" ||
                                               propName === "left" ||
                                               propName === "right" ? (
                                                <input
                                                 placeholder='enter a value in pixels'
                                                 type='text'
                                                 name='propValue'
                                                 value={propValue}
                                                 onChange={(e) =>
                                                  onChangeBodyCell(
                                                   i,
                                                   e,
                                                   "animationkeyprop",
                                                   index,
                                                   ind,
                                                   indy
                                                  )
                                                 }
                                                />
                                               ) : (
                                                ""
                                               )}

                                               {propName === "transform" ? (
                                                <div>
                                                 <h5>Rotate Z Deg</h5>
                                                 <Slider
                                                  axis='x'
                                                  x={parseInt(
                                                   transValues.rotateZ
                                                  )}
                                                  name='rotateZ'
                                                  value={parseInt(
                                                   transValues.rotateZ
                                                  )}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "rotateZ",
                                                    "slider"
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  min={0}
                                                  max={360}
                                                  step={1}
                                                 />

                                                 <h5>Rotate X Deg</h5>
                                                 <Slider
                                                  axis='x'
                                                  x={parseInt(
                                                   transValues.rotateX
                                                  )}
                                                  name='rotateX'
                                                  value={parseInt(
                                                   transValues.rotateX
                                                  )}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "rotateX",
                                                    "slider"
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  min={0}
                                                  max={360}
                                                  step={1}
                                                 />

                                                 <h5>Translate X Px</h5>
                                                 <input
                                                  type='text'
                                                  name='translateX'
                                                  value={transValues.translateX}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "translateX"
                                                   )
                                                  }
                                                 />

                                                 <h5>Translate Y Px</h5>
                                                 <input
                                                  type='text'
                                                  name='translateY'
                                                  value={transValues.translateY}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "translateY"
                                                   )
                                                  }
                                                 />

                                                 <h5>Rotate Y Deg</h5>
                                                 <Slider
                                                  x={parseInt(
                                                   transValues.rotateY
                                                  )}
                                                  name='rotateY'
                                                  value={parseInt(
                                                   transValues.rotateY
                                                  )}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "rotateY",
                                                    "slider"
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  min={0}
                                                  max={360}
                                                  step={1}
                                                 />

                                                 <h5>Skew X Deg</h5>
                                                 <Slider
                                                  x={parseInt(
                                                   transValues.skewX
                                                  )}
                                                  name='skewX'
                                                  value={parseInt(
                                                   transValues.skewX
                                                  )}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "skewX",
                                                    "slider"
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  name='skewX'
                                                  min={0}
                                                  max={360}
                                                  step={1}
                                                 />

                                                 <h5>Skew Y Deg</h5>
                                                 <Slider
                                                  x={parseInt(
                                                   transValues.skewY
                                                  )}
                                                  name='skewY'
                                                  value={transValues.skewY}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "skewY",
                                                    "slider"
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  min={0}
                                                  max={360}
                                                  step={1}
                                                 />

                                                 <h5>Scale X Percent</h5>
                                                 <Slider
                                                  x={parseFloat(
                                                   transValues.scaleX
                                                  )}
                                                  name='scaleX'
                                                  value={transValues.scaleX}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "scaleX",
                                                    "slider"
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  min={-1}
                                                  max={2}
                                                  step={0.01}
                                                 />

                                                 <h5>Scale Y Percent</h5>
                                                 <Slider
                                                  x={parseFloat(
                                                   transValues.scaleY
                                                  )}
                                                  name='scaleY'
                                                  value={transValues.scaleY}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "scaleY",
                                                    "slider"
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  name='scaleY'
                                                  min={-1}
                                                  max={2}
                                                  step={0.01}
                                                 />
                                                </div>
                                               ) : (
                                                ""
                                               )}

                                               {propName ===
                                               "background-position" ? (
                                                <select
                                                 name='propValue'
                                                 value={propValue}
                                                 onChange={(e) =>
                                                  onChangeBodyCell(
                                                   i,
                                                   e,
                                                   "animationkeyprop",
                                                   index,
                                                   ind,
                                                   indy
                                                  )
                                                 }>
                                                 <option></option>
                                                 <option value='center'>
                                                  Center
                                                 </option>
                                                 <option value='left'>
                                                  Left
                                                 </option>
                                                 <option value='right'>
                                                  Right
                                                 </option>
                                                 <option value='top'>
                                                  Top
                                                 </option>
                                                 <option value='bottom'>
                                                  Bottom
                                                 </option>
                                                </select>
                                               ) : (
                                                ""
                                               )}

                                               {propName.includes("shadow") ? (
                                                <div>
                                                 <h5>Horizontal Shadow</h5>
                                                 <input
                                                  placeholder='enter a value in pixels'
                                                  type='text'
                                                  name='horizontalShadow'
                                                  value={
                                                   shadowValues.horizontalShadow
                                                  }
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "boxshadow"
                                                   )
                                                  }
                                                 />
                                                 <h5>Vertical Shadow</h5>
                                                 <input
                                                  placeholder='enter a value in pixels'
                                                  type='text'
                                                  name='verticalShadow'
                                                  value={
                                                   shadowValues.verticalShadow
                                                  }
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "boxshadow"
                                                   )
                                                  }
                                                 />
                                                 <h5>Shadow Blur</h5>
                                                 <input
                                                  placeholder='enter a value in pixels'
                                                  type='text'
                                                  name='blurShadow'
                                                  value={
                                                   shadowValues.blurShadow
                                                  }
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "boxshadow"
                                                   )
                                                  }
                                                 />
                                                 <h5>Shadow Spread</h5>
                                                 <input
                                                  placeholder='enter a value in pixels'
                                                  type='text'
                                                  name='spreadShadow'
                                                  value={
                                                   shadowValues.spreadShadow
                                                  }
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "boxshadow"
                                                   )
                                                  }
                                                 />
                                                 <h5>Shadow Direction</h5>
                                                 <select
                                                  name='shadowDirection'
                                                  value={
                                                   shadowValues.shadowDirection
                                                  }
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "boxshadow"
                                                   )
                                                  }>
                                                  <option></option>
                                                  <option value='cover'>
                                                   Inset
                                                  </option>
                                                  <option value='contain'>
                                                   Outset
                                                  </option>
                                                 </select>
                                                 <h5>Shadow Color</h5>
                                                 <select
                                                  name='shadowColor'
                                                  value={
                                                   shadowValues.shadowColor
                                                  }
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "boxshadow"
                                                   )
                                                  }>
                                                  <option>Set Color...</option>
                                                  <option
                                                   value={
                                                    pallet && pallet.primary
                                                   }>
                                                   Primary
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.dark
                                                   }>
                                                   Dark
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.light
                                                   }>
                                                   Light
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.danger
                                                   }>
                                                   Danger
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.success
                                                   }>
                                                   Success
                                                  </option>
                                                 </select>
                                                </div>
                                               ) : (
                                                ""
                                               )}

                                               {propName ===
                                               "background-size" ? (
                                                <select
                                                 name='propValue'
                                                 value={propValue}
                                                 onChange={(e) =>
                                                  onChangeBodyCell(
                                                   i,
                                                   e,
                                                   "animationkeyprop",
                                                   index,
                                                   ind,
                                                   indy
                                                  )
                                                 }>
                                                 <option></option>
                                                 <option value='cover'>
                                                  Cover
                                                 </option>
                                                 <option value='contain'>
                                                  Contain
                                                 </option>
                                                </select>
                                               ) : (
                                                ""
                                               )}

                                               {propName === "font" ? (
                                                <div>
                                                 <h5>Current Font</h5>
                                                 <input
                                                  type='text'
                                                  value={propValue}
                                                 />
                                                 <button
                                                  className='btn btn-dark btn-sm'
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    "font",
                                                    font
                                                   )
                                                  }>
                                                  Set Font
                                                 </button>
                                                </div>
                                               ) : (
                                                ""
                                               )}

                                               {propName.includes("opacity") ||
                                               propName.includes("radius") ? (
                                                <Slider
                                                 axis='x'
                                                 x={css["animation"][index]}
                                                 value={parseFloat(
                                                  css["animation"][index]
                                                 )}
                                                 onChange={(e) =>
                                                  onChangeBodyCell(
                                                   i,
                                                   e,
                                                   "animationkeyprop",
                                                   index,
                                                   ind,
                                                   indy
                                                  )
                                                 }
                                                 orientation='horizontal'
                                                 name='n'
                                                 min={0}
                                                 max={1}
                                                 step={0.01}
                                                />
                                               ) : (
                                                ""
                                               )}

                                               {propName.includes("color") && (
                                                <select
                                                 name='propValue'
                                                 value={propValue}
                                                 onChange={(e) =>
                                                  onChangeBodyCell(
                                                   i,
                                                   e,
                                                   "animationkeyprop",
                                                   index,
                                                   ind,
                                                   indy
                                                  )
                                                 }>
                                                 <option>Set Color...</option>
                                                 <option
                                                  value={
                                                   pallet && pallet.primary
                                                  }>
                                                  Primary
                                                 </option>
                                                 <option
                                                  value={pallet && pallet.dark}>
                                                  Dark
                                                 </option>
                                                 <option
                                                  value={
                                                   pallet && pallet.light
                                                  }>
                                                  Light
                                                 </option>
                                                 <option
                                                  value={
                                                   pallet && pallet.danger
                                                  }>
                                                  Danger
                                                 </option>
                                                 <option
                                                  value={
                                                   pallet && pallet.success
                                                  }>
                                                  Success
                                                 </option>
                                                </select>
                                               )}
                                              </div>
                                             )
                                            )}
                                           </div>
                                          )
                                         )}
                                        </div>
                                       )
                                      )}
                                    </ul>
                                   </div>
                                  </label>
                                 );
                                } else if (key === "fontSize") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='5px'>XX Small</option>
                                    <option value='7px'>X Small</option>
                                    <option value='11px'>Small</option>
                                    <option value='16px'>Medium</option>
                                    <option value='24px'>Large</option>
                                    <option value='36px'>X Large</option>
                                    <option value='54px'>XX Large</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key.includes("Inset")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option>Outer</option>
                                    <option value='inset'>Inset</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "fontWeight") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option value='100'>100</option>
                                    <option value='200'>200</option>
                                    <option value='300'>300</option>
                                    <option value='400'>400</option>
                                    <option value='500'>500</option>
                                    <option value='600'>600</option>
                                    <option value='700'>700</option>
                                    <option value='800'>800</option>
                                    <option value='900'>900</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "opacity") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <Slider
                                    axis='x'
                                    x={css.opacity}
                                    value={parseInt(css[key])}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "opacity", "slider")
                                    }
                                    orientation='horizontal'
                                    min={0}
                                    max={100}
                                    step={1}
                                   />
                                  </label>
                                 );
                                } else if (key.includes("Radius")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <Slider
                                    value={parseInt(css[key])}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, key, "slider")
                                    }
                                    orientation='horizontal'
                                    min={0}
                                    max={50}
                                    step={0.5}
                                   />
                                  </label>
                                 );
                                } else if (key === "textAlign") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>

                                    <option value='start'>Start</option>
                                    <option value='end'>End</option>
                                    <option value='left'>Left</option>
                                    <option value='right'>Right</option>
                                    <option value='center'>Center</option>
                                    <option value='justify'>Justify</option>
                                    <option value='matchParent'>
                                     Match Parent
                                    </option>
                                    <option value='justifyAll'>
                                     Justify All
                                    </option>
                                   </select>
                                  </label>
                                 );
                                } else if (
                                 key.includes("border") &&
                                 key.includes("Style")
                                ) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='solid'>Solid</option>
                                    <option value='double'>Double</option>
                                    <option value='dotted'>Dotted</option>
                                    <option value='dashed'>Dashed</option>
                                    <option value='groove'>Groove</option>
                                    <option value='none'>None</option>
                                    <option value='hidden'>Hidden</option>
                                    <option value='ridge'>Ridge</option>
                                    <option value='inset'>Inset</option>
                                    <option value='outset'>Outset</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key === "textShadowSize") {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='small'>2px</option>
                                   </select>
                                  </label>
                                 );
                                } else if (key.includes("overflow")) {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}

                                   <select
                                    name={key}
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }>
                                    <option></option>
                                    <option value='visible'>Visible</option>
                                    <option value='hidden'>Hidden</option>
                                    <option value='clip'>Clip</option>
                                    <option value='scroll'>Scroll</option>
                                    <option value='auto'>Auto</option>
                                   </select>
                                  </label>
                                 );
                                } else {
                                 return (
                                  <label key={key}>
                                   {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, function (str) {
                                     return str.toUpperCase();
                                    })}
                                   <input
                                    type='text'
                                    placeholder='Enter A Value In Pixels'
                                    value={css[key]}
                                    onChange={(e) =>
                                     onChangeBodyCell(i, e, "css")
                                    }
                                    name={key}
                                   />
                                  </label>
                                 );
                                }
                               })}
                              {!gridLevel &&
                               Object.keys(filtered).length === 0 &&
                               currentResults.map((css) =>
                                Object.keys(css).map((key) => {
                                 const index = contentCss.findIndex(
                                  (x) => x.id === css.id
                                 );
                                 if (key.includes("Color")) {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}
                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option>Set Color...</option>
                                     <option value={pallet && pallet.primary}>
                                      Primary
                                     </option>
                                     <option value={pallet && pallet.dark}>
                                      Dark
                                     </option>
                                     <option value={pallet && pallet.light}>
                                      Light
                                     </option>
                                     <option value={pallet && pallet.danger}>
                                      Danger
                                     </option>
                                     <option value={pallet && pallet.success}>
                                      Success
                                     </option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "position") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='fixed'>Fixed</option>
                                     <option value='relative'>Relative</option>
                                     <option value='absolute'>Absolute</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "backgroundRepeat") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='repeatX'>Repeat X</option>
                                     <option value='repeatY'>Repeat Y</option>
                                     <option value='repeat'>Repeat</option>
                                     <option value='space'>Space</option>
                                     <option value='round'>Round</option>
                                     <option value='noRepeat'>No Repeat</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "backgroundPosition") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='center'>Center</option>
                                     <option value='left'>Left</option>
                                     <option value='right'>Right</option>
                                     <option value='top'>Top</option>
                                     <option value='bottom'>Bottom</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "backgroundSize") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='cover'>Cover</option>
                                     <option value='contain'>Contain</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "display") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='block'>Block</option>
                                     <option value='inline'>Inline</option>
                                     <option value='inline-block'>
                                      Inline Block
                                     </option>
                                     <option value='flex'>Flex</option>
                                     <option value='none'>None</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "textDecorationLine") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='none'>None</option>
                                     <option value='underline'>
                                      Underline
                                     </option>
                                     <option value='overline'>Overline</option>
                                     <option value='line-through'>
                                      Line Through
                                     </option>
                                     <option value='blink'>Blink</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "textDecorationStyle") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='solid'>Solid</option>
                                     <option value='double'>Double</option>
                                     <option value='dotted'>Dotted</option>
                                     <option value='dashed'>Dashed</option>
                                     <option value='wavy'>Wavy</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "transition") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <button
                                     className='btn btn-sm btn-dark'
                                     onClick={() =>
                                      addCellChildTransition(i, index)
                                     }>
                                     + Transition
                                    </button>
                                    <div
                                     className='card'
                                     style={{
                                      overflowY: "scroll",
                                      overflowX: "scroll",
                                     }}>
                                     {css.transition.map(
                                      (
                                       {
                                        property,
                                        duration,
                                        timingFunction,
                                        cubicNs,
                                        delay,
                                       },
                                       ind
                                      ) => (
                                       <div key={index} className='card'>
                                        <h5>Transition Property</h5>
                                        <select
                                         onChange={(e) =>
                                          onChangeBodyCell(
                                           i,
                                           e,
                                           "conttransition",
                                           index,
                                           ind
                                          )
                                         }
                                         value={property}
                                         name='property'>
                                         <option value=''></option>
                                         {Object.keys(flatCss)
                                          .filter(
                                           (e) =>
                                            typeof parseInt(e) === "number"
                                          )
                                          .map((c, i) => (
                                           <option key={i} value={c}>
                                            {c}
                                           </option>
                                          ))}
                                         <option value='color'>Color</option>
                                         <option value='background-color'>
                                          Background Color
                                         </option>
                                        </select>
                                        <h5>Transition Timing</h5>
                                        <input
                                         type='text'
                                         name='duration'
                                         onChange={(e) =>
                                          onChangeBodyCell(
                                           i,
                                           e,
                                           "conttransition",
                                           index,
                                           ind
                                          )
                                         }
                                         value={duration}
                                         placeholder='Enter A Value in seconds'
                                        />
                                        <h5>Transition Function</h5>
                                        <select
                                         name='timingFunction'
                                         value={timingFunction}
                                         onChange={(e) =>
                                          onChangeBodyCell(
                                           i,
                                           e,
                                           "conttransition",
                                           index,
                                           ind
                                          )
                                         }>
                                         <option></option>
                                         <option value='ease'>Ease</option>
                                         <option value='ease-in'>
                                          Ease In
                                         </option>
                                         <option value='ease-in-out'>
                                          Ease In Out
                                         </option>
                                         <option value='step-end'>
                                          Step End
                                         </option>
                                         <option value='step-start'>
                                          Step Start
                                         </option>
                                         <option value='cubic-bezier'>
                                          Cubic Bezier
                                         </option>
                                         <option value='inherit'>
                                          Inherit
                                         </option>
                                         <option value='initial'>
                                          Initial
                                         </option>
                                        </select>
                                        <h5>Transition Delay</h5>
                                        <input
                                         type='text'
                                         name='delay'
                                         value={delay}
                                         onChange={(e) =>
                                          onChangeBodyCell(
                                           i,
                                           e,
                                           "conttransition",
                                           index,
                                           ind
                                          )
                                         }
                                         placeholder='Enter A Value in seconds'
                                        />

                                        {timingFunction === "cubic-bezier" &&
                                         Object.keys(cubicNs).map((n) => (
                                          <div>
                                           <h5>Cubic Bez (n,n,n,n)</h5>
                                           <div key={n}>
                                            <h5>N {parseInt(n) + 1}</h5>
                                            <Slider
                                             axis='x'
                                             x={
                                              css["transition"][ind]["cubicNs"][
                                               n
                                              ]
                                             }
                                             value={parseFloat(
                                              css["transition"][ind]["cubicNs"][
                                               n
                                              ]
                                             )}
                                             onChange={(e) =>
                                              onChangeBodyCell(
                                               i,
                                               e,
                                               "contcubicNs",
                                               index,
                                               ind,
                                               n
                                              )
                                             }
                                             orientation='horizontal'
                                             name={n}
                                             min={0}
                                             max={1}
                                             step={0.01}
                                            />
                                           </div>
                                          </div>
                                         ))}
                                       </div>
                                      )
                                     )}
                                    </div>
                                   </label>
                                  );
                                 } else if (key === "transform") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "conttransform",
                                       index
                                      )
                                     }
                                     multiple>
                                     <option></option>
                                     <option value='rotateX'>RotateX</option>
                                     <option value='rotateY'>RotateY</option>
                                     <option value='skewX'>SkewX</option>
                                     <option value='skewY'>SkewY</option>
                                     <option value='rotateZ'>RotateZ</option>
                                     <option value='scaleX'>ScaleX</option>
                                     <option value='scaleY'>ScaleY</option>
                                     <option value='translateX'>
                                      TranslateX
                                     </option>
                                     <option value='translateY'>
                                      TranslateY
                                     </option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "transformProp") {
                                  return (
                                   <label key={key}>
                                    <div className='card all-center'>
                                     <h5>Current Transform Order</h5>
                                     <ul>
                                      {css.transform.map((m) => (
                                       <li key={m}>{m}</li>
                                      ))}
                                     </ul>
                                    </div>
                                    {css.transform.includes("rotateZ") && (
                                     <div>
                                      <h5>Rotate Z Deg</h5>
                                      <Slider
                                       axis='x'
                                       x={css["transformProp"]["rotateZ"]}
                                       value={parseInt(
                                        css["transformProp"]["rotateZ"]
                                       )}
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e,
                                         "rotateZ",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                       orientation='horizontal'
                                       name='rotateZ'
                                       min={0}
                                       max={360}
                                       step={1}
                                      />
                                     </div>
                                    )}
                                    {css.transform.includes("rotateX") && (
                                     <div>
                                      <h5>Rotate X Deg</h5>
                                      <Slider
                                       axis='x'
                                       x={css["transformProp"]["rotateX"]}
                                       value={parseInt(
                                        css["transformProp"]["rotateX"]
                                       )}
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e,
                                         "rotateX",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                       orientation='horizontal'
                                       name='rotateX'
                                       min={0}
                                       max={360}
                                       step={1}
                                      />
                                     </div>
                                    )}
                                    {css.transform.includes("translateX") && (
                                     <div>
                                      <h5>Translate X Px</h5>
                                      <input
                                       type='text'
                                       name='translateX'
                                       value={
                                        css["transformProp"]["translateX"]
                                       }
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e.target.value,
                                         "translateX",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                      />
                                     </div>
                                    )}
                                    {css.transform.includes("translateY") && (
                                     <div>
                                      <h5>Translate Y Px</h5>
                                      <input
                                       type='text'
                                       name='translateY'
                                       value={
                                        css["transformProp"]["translateY"]
                                       }
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e.target.value,
                                         "translateY",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                      />
                                     </div>
                                    )}
                                    {css.transform.includes("rotateY") && (
                                     <div>
                                      <h5>Rotate Y Deg</h5>
                                      <Slider
                                       value={parseInt(
                                        css["transformProp"]["rotateY"]
                                       )}
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e,
                                         "rotateY",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                       orientation='horizontal'
                                       name='rotateY'
                                       min={0}
                                       max={360}
                                       step={1}
                                      />
                                     </div>
                                    )}
                                    {css.transform.includes("skewX") && (
                                     <div>
                                      <h5>Skew X Deg</h5>
                                      <Slider
                                       value={parseInt(
                                        css["transformProp"]["skewX"]
                                       )}
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e,
                                         "skewX",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                       orientation='horizontal'
                                       name='skewX'
                                       min={0}
                                       max={360}
                                       step={1}
                                      />
                                     </div>
                                    )}
                                    {css.transform.includes("skewY") && (
                                     <div>
                                      <h5>Skew Y Deg</h5>
                                      <Slider
                                       value={parseInt(
                                        css["transformProp"]["skewY"]
                                       )}
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e,
                                         "skewY",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                       orientation='horizontal'
                                       name='skewY'
                                       min={0}
                                       max={360}
                                       step={1}
                                      />
                                     </div>
                                    )}
                                    {css.transform.includes("scaleX") && (
                                     <div>
                                      <h5>Scale X Percent</h5>
                                      <Slider
                                       value={
                                        parseInt(
                                         css["transformProp"]["scaleX"]
                                        ) * 10
                                       }
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e / 10,
                                         "scaleX",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                       orientation='horizontal'
                                       name='scaleX'
                                       min={-100}
                                       max={200}
                                       step={1}
                                      />
                                     </div>
                                    )}{" "}
                                    {css.transform.includes("scaleY") && (
                                     <div>
                                      <h5>Scale Y Percent</h5>
                                      <Slider
                                       value={
                                        parseInt(
                                         css["transformProp"]["scaleY"]
                                        ) * 10
                                       }
                                       onChange={(e) =>
                                        onChangeBodyCell(
                                         i,
                                         e / 10,
                                         "scaleY",
                                         "conttransformProp",
                                         index
                                        )
                                       }
                                       orientation='horizontal'
                                       name='scaleY'
                                       min={-100}
                                       max={200}
                                       step={1}
                                      />
                                     </div>
                                    )}
                                   </label>
                                  );
                                 } else if (key === "animation") {
                                  return (
                                   <label key={key}>
                                    <div className='card'>
                                     <button
                                      className='btn btn-sm btn-dark'
                                      onClick={() =>
                                       addCellChildAnimation(i, index)
                                      }>
                                      + Animation
                                     </button>
                                     <h5>Current Animation Order</h5>
                                     <ul>
                                      {css.animation.length > 0 &&
                                       css.animation.map(
                                        (
                                         {
                                          animationName,
                                          animationDuration,
                                          animationTimingFunction,
                                          animationDelay,
                                          cubicNs,
                                          steps,
                                          animationIterationCount,
                                          animationDirection,
                                          animationFillMode,
                                          keyframes,
                                         },
                                         ind
                                        ) => (
                                         <div key={ind}>
                                          <h5>Animation Name</h5>
                                          <input
                                           type='text'
                                           name='animationName'
                                           value={animationName}
                                           onChange={(e) =>
                                            onChangeBodyCell(
                                             i,
                                             e,
                                             "contanimation",
                                             index,
                                             ind
                                            )
                                           }
                                          />
                                          <h5>Animation Duration</h5>
                                          <input
                                           type='text'
                                           name='animationDuration'
                                           value={animationDuration}
                                           onChange={(e) =>
                                            onChangeBodyCell(
                                             i,
                                             e,
                                             "contanimation",
                                             index,
                                             ind
                                            )
                                           }
                                          />
                                          <h5>Animation Function</h5>
                                          <select
                                           name='animationTimingFunction'
                                           value={animationTimingFunction}
                                           onChange={(e) =>
                                            onChangeBodyCell(
                                             i,
                                             e,
                                             "contanimation",
                                             index,
                                             ind
                                            )
                                           }>
                                           <option></option>
                                           <option value='ease'>Ease</option>
                                           <option value='ease-in'>
                                            Ease In
                                           </option>
                                           <option value='ease-in-out'>
                                            Ease In Out
                                           </option>
                                           <option value='step-end'>
                                            Step End
                                           </option>
                                           <option value='step-start'>
                                            Step Start
                                           </option>
                                           <option value='cubic-bezier'>
                                            Cubic Bezier
                                           </option>
                                           <option value='steps'>Steps</option>
                                           <option value='inherit'>
                                            Inherit
                                           </option>
                                           <option value='initial'>
                                            Initial
                                           </option>
                                          </select>
                                          <h5>Animation Delay</h5>
                                          <input
                                           placeholder='enter a value in seconds'
                                           type='text'
                                           name='animationDelay'
                                           value={animationDelay}
                                           onChange={(e) =>
                                            onChangeBodyCell(
                                             i,
                                             e,
                                             "contanimation",
                                             index,
                                             ind
                                            )
                                           }
                                          />
                                          <h5>Animation Iteration Count</h5>
                                          <input
                                           placeholder='Positive Integers Only'
                                           type='text'
                                           name='animationIterationCount'
                                           value={animationIterationCount}
                                           onChange={(e) =>
                                            onChangeBodyCell(
                                             i,
                                             e,
                                             "contanimation",
                                             index,
                                             ind
                                            )
                                           }
                                          />

                                          <h5>Animation Direction</h5>
                                          <select
                                           name='animationDirection'
                                           value={animationDirection}
                                           onChange={(e) =>
                                            onChangeBodyCell(
                                             i,
                                             e,
                                             "contanimation",
                                             index,
                                             ind
                                            )
                                           }>
                                           <option></option>
                                           <option value='normal'>
                                            Normal
                                           </option>
                                           <option value='reverse'>
                                            Reverse
                                           </option>
                                           <option value='alternate'>
                                            Alternate
                                           </option>
                                           <option value='reverse'>
                                            Alternate Reverse
                                           </option>
                                           <option value='inherit'>
                                            Inherit
                                           </option>
                                          </select>
                                          <h5>Animation Fill Mode</h5>
                                          <select
                                           name='animationFillMode'
                                           value={animationFillMode}
                                           onChange={(e) =>
                                            onChangeBodyCell(
                                             i,
                                             e,
                                             "contanimation",
                                             index,
                                             ind
                                            )
                                           }>
                                           <option></option>
                                           <option value='none'>None</option>
                                           <option value='forward'>
                                            Forward
                                           </option>
                                           <option value='backward'>
                                            Backward
                                           </option>
                                           <option value='both'>Both</option>
                                           <option value='inherit'>
                                            Inherit
                                           </option>
                                          </select>

                                          <h5>Key Frames</h5>
                                          <button
                                           className='btn btn-sm btn-dark'
                                           onClick={() =>
                                            addCellChildAnimationKeyframe(
                                             i,
                                             index,
                                             ind
                                            )
                                           }>
                                           + Keyframe
                                          </button>

                                          {animationTimingFunction ===
                                           "cubic-bezier" &&
                                           Object.keys(cubicNs).map((n) => (
                                            <div>
                                             <h5>Cubic Bez (n,n,n,n)</h5>
                                             <div key={n}>
                                              <h5>N {parseInt(n) + 1}</h5>
                                              <Slider
                                               axis='x'
                                               x={
                                                css["animation"][index][
                                                 "cubicNs"
                                                ][n]
                                               }
                                               value={parseFloat(
                                                css["animation"][index][
                                                 "cubicNs"
                                                ][n]
                                               )}
                                               onChange={(e) =>
                                                onChangeBodyCell(
                                                 i,
                                                 e,
                                                 "cubicNs",
                                                 index,
                                                 n
                                                )
                                               }
                                               orientation='horizontal'
                                               name={n}
                                               min={0}
                                               max={1}
                                               step={0.01}
                                              />
                                             </div>
                                            </div>
                                           ))}

                                          {keyframes.map(
                                           (
                                            { completionPercent, properties },
                                            indy
                                           ) => (
                                            <div>
                                             <h5>Completion Percentage </h5>
                                             <i style={{ fontSize: "8px" }}>
                                              (all animations require a 0 and
                                              100)
                                             </i>
                                             <input
                                              placeholder='enter a value from 0 to 100'
                                              type='text'
                                              name='completionPercent'
                                              value={completionPercent}
                                              onChange={(e) =>
                                               onChangeBodyCell(
                                                i,
                                                e,
                                                "contanimationkey",
                                                index,
                                                ind,
                                                indy
                                               )
                                              }
                                             />
                                             <button
                                              className='btn btn-sm btn-dark'
                                              onClick={() =>
                                               addCellChildAnimationKeyframeProperty(
                                                i,
                                                index,
                                                ind,
                                                indy
                                               )
                                              }>
                                              + Property
                                             </button>

                                             {properties.map(
                                              (
                                               {
                                                propName,
                                                propValue,
                                                shadowValues,
                                                transValues,
                                               },
                                               indo
                                              ) => (
                                               <div>
                                                <select
                                                 name='propName'
                                                 value={propName}
                                                 onChange={(e) =>
                                                  onChangeBodyCell(
                                                   i,
                                                   e,
                                                   "contanimationkeyprop",
                                                   index,
                                                   ind,
                                                   indy,
                                                   indo
                                                  )
                                                 }>
                                                 <option value='transform'>
                                                  Transform
                                                 </option>
                                                 <option value='height'>
                                                  Height
                                                 </option>
                                                 <option value='width'>
                                                  Width
                                                 </option>
                                                 <option value='border-left-color'>
                                                  Border Left Color
                                                 </option>
                                                 <option value='border-left-width'>
                                                  Border Left Width
                                                 </option>
                                                 <option value='background-color'>
                                                  Background Color
                                                 </option>
                                                 <option value='background-position'>
                                                  Background Position
                                                 </option>
                                                 <option value='background-size'>
                                                  Background Size
                                                 </option>
                                                 <option value='border-bottom-color'>
                                                  Border Bottom Color
                                                 </option>
                                                 <option value='border-bottom-left-radius'>
                                                  Border Bottom Left Radius
                                                 </option>
                                                 <option value='border-bottom-right-radius'>
                                                  Border Bottom Right Radius
                                                 </option>
                                                 <option value='border-bottom-width'>
                                                  Border Bottom Width
                                                 </option>
                                                 <option value='border-radius'>
                                                  Border Radius
                                                 </option>
                                                 <option value='border-right'>
                                                  Border Right
                                                 </option>
                                                 <option value='border-right-color'>
                                                  Border Right Color
                                                 </option>
                                                 <option value='border-right-width'>
                                                  Border Right Width
                                                 </option>
                                                 <option value='border-color'>
                                                  Border Color
                                                 </option>
                                                 <option value='border-width'>
                                                  Border Width
                                                 </option>
                                                 <option value='border-top-color'>
                                                  Border Top Color
                                                 </option>
                                                 <option value='border-top-left-radius'>
                                                  Border Top Left Radius
                                                 </option>
                                                 <option value='border-top-right-radius'>
                                                  Border Top Right Radius
                                                 </option>
                                                 <option value='border-top-width'>
                                                  Border Top Width
                                                 </option>
                                                 <option value='box-shadow'>
                                                  Box Shadow
                                                 </option>
                                                 <option value='font'>
                                                  Font
                                                 </option>
                                                 <option value='font-size'>
                                                  Font Size
                                                 </option>

                                                 <option value='font-weight'>
                                                  Font Weight
                                                 </option>
                                                 <option value='line-height'>
                                                  Line Height
                                                 </option>
                                                 <option value='margin-bottom'>
                                                  Margin Bottom
                                                 </option>
                                                 <option value='margin'>
                                                  Margin
                                                 </option>
                                                 <option value='margin-left'>
                                                  Margin Left
                                                 </option>
                                                 <option value='margin-top'>
                                                  Margin Top
                                                 </option>
                                                 <option value='margin-right'>
                                                  Margin Right
                                                 </option>
                                                 <option value='opacity'>
                                                  Opacity
                                                 </option>

                                                 <option value='padding-left'>
                                                  Padding Left
                                                 </option>
                                                 <option value='padding-right'>
                                                  Padding Right
                                                 </option>
                                                 <option value='padding-top'>
                                                  Padding Top
                                                 </option>
                                                 <option value='z-index'>
                                                  Z Index
                                                 </option>
                                                 <option value='padding-bottom'>
                                                  Padding Bottom
                                                 </option>
                                                 <option value='top'>
                                                  Top
                                                 </option>
                                                 <option value='left'>
                                                  Left
                                                 </option>
                                                 <option value='right'>
                                                  Right
                                                 </option>
                                                 <option value='bottom'>
                                                  Bottom
                                                 </option>
                                                </select>
                                                {propName.includes("width") ||
                                                propName.includes("height") ||
                                                propName.includes("size") ||
                                                propName.includes("weight") ||
                                                propName.includes("margin") ||
                                                propName.includes("padding") ||
                                                propName === "top" ||
                                                propName === "bottom" ||
                                                propName === "left" ||
                                                propName === "right" ? (
                                                 <input
                                                  placeholder='enter a value in pixels'
                                                  type='text'
                                                  name='propValue'
                                                  value={propValue}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "contanimationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    indo
                                                   )
                                                  }
                                                 />
                                                ) : (
                                                 ""
                                                )}

                                                {propName === "transform" ? (
                                                 <div>
                                                  <h5>Rotate Z Deg</h5>
                                                  <Slider
                                                   axis='x'
                                                   x={parseInt(
                                                    transValues.rotateZ
                                                   )}
                                                   name='rotateZ'
                                                   value={parseInt(
                                                    transValues.rotateZ
                                                   )}
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "rotateZ",
                                                     "slider"
                                                    )
                                                   }
                                                   orientation='horizontal'
                                                   min={0}
                                                   max={360}
                                                   step={1}
                                                  />

                                                  <h5>Rotate X Deg</h5>
                                                  <Slider
                                                   axis='x'
                                                   x={parseInt(
                                                    transValues.rotateX
                                                   )}
                                                   name='rotateX'
                                                   value={parseInt(
                                                    transValues.rotateX
                                                   )}
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "rotateX",
                                                     "slider"
                                                    )
                                                   }
                                                   orientation='horizontal'
                                                   min={0}
                                                   max={360}
                                                   step={1}
                                                  />

                                                  <h5>Translate X Px</h5>
                                                  <input
                                                   type='text'
                                                   name='translateX'
                                                   value={
                                                    transValues.translateX
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "translateX"
                                                    )
                                                   }
                                                  />

                                                  <h5>Translate Y Px</h5>
                                                  <input
                                                   type='text'
                                                   name='translateY'
                                                   value={
                                                    transValues.translateY
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "translateY"
                                                    )
                                                   }
                                                  />

                                                  <h5>Rotate Y Deg</h5>
                                                  <Slider
                                                   x={parseInt(
                                                    transValues.rotateY
                                                   )}
                                                   name='rotateY'
                                                   value={parseInt(
                                                    transValues.rotateY
                                                   )}
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "rotateY",
                                                     "slider"
                                                    )
                                                   }
                                                   orientation='horizontal'
                                                   min={0}
                                                   max={360}
                                                   step={1}
                                                  />

                                                  <h5>Skew X Deg</h5>
                                                  <Slider
                                                   x={parseInt(
                                                    transValues.skewX
                                                   )}
                                                   name='skewX'
                                                   value={parseInt(
                                                    transValues.skewX
                                                   )}
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "skewX",
                                                     "slider"
                                                    )
                                                   }
                                                   orientation='horizontal'
                                                   name='skewX'
                                                   min={0}
                                                   max={360}
                                                   step={1}
                                                  />

                                                  <h5>Skew Y Deg</h5>
                                                  <Slider
                                                   x={parseInt(
                                                    transValues.skewY
                                                   )}
                                                   name='skewY'
                                                   value={transValues.skewY}
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "skewY",
                                                     "slider"
                                                    )
                                                   }
                                                   orientation='horizontal'
                                                   min={0}
                                                   max={360}
                                                   step={1}
                                                  />

                                                  <h5>Scale X Percent</h5>
                                                  <Slider
                                                   x={parseFloat(
                                                    transValues.scaleX
                                                   )}
                                                   name='scaleX'
                                                   value={transValues.scaleX}
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "scaleX",
                                                     "slider"
                                                    )
                                                   }
                                                   orientation='horizontal'
                                                   min={-1}
                                                   max={2}
                                                   step={0.01}
                                                  />

                                                  <h5>Scale Y Percent</h5>
                                                  <Slider
                                                   x={parseFloat(
                                                    transValues.scaleY
                                                   )}
                                                   name='scaleY'
                                                   value={transValues.scaleY}
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "scaleY",
                                                     "slider"
                                                    )
                                                   }
                                                   orientation='horizontal'
                                                   name='scaleY'
                                                   min={-1}
                                                   max={2}
                                                   step={0.01}
                                                  />
                                                 </div>
                                                ) : (
                                                 ""
                                                )}

                                                {propName ===
                                                "background-position" ? (
                                                 <select
                                                  name='propValue'
                                                  value={propValue}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "contanimationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    indo
                                                   )
                                                  }>
                                                  <option></option>
                                                  <option value='center'>
                                                   Center
                                                  </option>
                                                  <option value='left'>
                                                   Left
                                                  </option>
                                                  <option value='right'>
                                                   Right
                                                  </option>
                                                  <option value='top'>
                                                   Top
                                                  </option>
                                                  <option value='bottom'>
                                                   Bottom
                                                  </option>
                                                 </select>
                                                ) : (
                                                 ""
                                                )}

                                                {propName.includes("shadow") ? (
                                                 <div>
                                                  <h5>Horizontal Shadow</h5>
                                                  <input
                                                   placeholder='enter a value in pixels'
                                                   type='text'
                                                   name='horizontalShadow'
                                                   value={
                                                    shadowValues.horizontalShadow
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "boxshadow"
                                                    )
                                                   }
                                                  />
                                                  <h5>Vertical Shadow</h5>
                                                  <input
                                                   placeholder='enter a value in pixels'
                                                   type='text'
                                                   name='verticalShadow'
                                                   value={
                                                    shadowValues.verticalShadow
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "boxshadow"
                                                    )
                                                   }
                                                  />
                                                  <h5>Shadow Blur</h5>
                                                  <input
                                                   placeholder='enter a value in pixels'
                                                   type='text'
                                                   name='blurShadow'
                                                   value={
                                                    shadowValues.blurShadow
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "boxshadow"
                                                    )
                                                   }
                                                  />
                                                  <h5>Shadow Spread</h5>
                                                  <input
                                                   placeholder='enter a value in pixels'
                                                   type='text'
                                                   name='spreadShadow'
                                                   value={
                                                    shadowValues.spreadShadow
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "boxshadow"
                                                    )
                                                   }
                                                  />
                                                  <h5>Shadow Direction</h5>
                                                  <select
                                                   name='shadowDirection'
                                                   value={
                                                    shadowValues.shadowDirection
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "boxshadow"
                                                    )
                                                   }>
                                                   <option></option>
                                                   <option value='cover'>
                                                    Inset
                                                   </option>
                                                   <option value='contain'>
                                                    Outset
                                                   </option>
                                                  </select>
                                                  <h5>Shadow Color</h5>
                                                  <select
                                                   name='shadowColor'
                                                   value={
                                                    shadowValues.shadowColor
                                                   }
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "boxshadow"
                                                    )
                                                   }>
                                                   <option>Set Color...</option>
                                                   <option
                                                    value={
                                                     pallet && pallet.primary
                                                    }>
                                                    Primary
                                                   </option>
                                                   <option
                                                    value={
                                                     pallet && pallet.dark
                                                    }>
                                                    Dark
                                                   </option>
                                                   <option
                                                    value={
                                                     pallet && pallet.light
                                                    }>
                                                    Light
                                                   </option>
                                                   <option
                                                    value={
                                                     pallet && pallet.danger
                                                    }>
                                                    Danger
                                                   </option>
                                                   <option
                                                    value={
                                                     pallet && pallet.success
                                                    }>
                                                    Success
                                                   </option>
                                                  </select>
                                                 </div>
                                                ) : (
                                                 ""
                                                )}

                                                {propName ===
                                                "background-size" ? (
                                                 <select
                                                  name='propValue'
                                                  value={propValue}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "animationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    indo
                                                   )
                                                  }>
                                                  <option></option>
                                                  <option value='cover'>
                                                   Cover
                                                  </option>
                                                  <option value='contain'>
                                                   Contain
                                                  </option>
                                                 </select>
                                                ) : (
                                                 ""
                                                )}

                                                {propName === "font" ? (
                                                 <div>
                                                  <h5>Current Font</h5>
                                                  <input
                                                   type='text'
                                                   value={propValue}
                                                  />
                                                  <button
                                                   className='btn btn-dark btn-sm'
                                                   onChange={(e) =>
                                                    onChangeBodyCell(
                                                     i,
                                                     e,
                                                     "contanimationkeyprop",
                                                     index,
                                                     ind,
                                                     indy,
                                                     indo,
                                                     "font",
                                                     font
                                                    )
                                                   }>
                                                   Set Font
                                                  </button>
                                                 </div>
                                                ) : (
                                                 ""
                                                )}

                                                {propName.includes("opacity") ||
                                                propName.includes("radius") ? (
                                                 <Slider
                                                  axis='x'
                                                  x={css["animation"][index]}
                                                  value={parseFloat(
                                                   css["animation"][index]
                                                  )}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "contanimationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    indo
                                                   )
                                                  }
                                                  orientation='horizontal'
                                                  name='n'
                                                  min={0}
                                                  max={1}
                                                  step={0.01}
                                                 />
                                                ) : (
                                                 ""
                                                )}

                                                {propName.includes("color") && (
                                                 <select
                                                  name='propValue'
                                                  value={propValue}
                                                  onChange={(e) =>
                                                   onChangeBodyCell(
                                                    i,
                                                    e,
                                                    "contanimationkeyprop",
                                                    index,
                                                    ind,
                                                    indy,
                                                    indo
                                                   )
                                                  }>
                                                  <option>Set Color...</option>
                                                  <option
                                                   value={
                                                    pallet && pallet.primary
                                                   }>
                                                   Primary
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.dark
                                                   }>
                                                   Dark
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.light
                                                   }>
                                                   Light
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.danger
                                                   }>
                                                   Danger
                                                  </option>
                                                  <option
                                                   value={
                                                    pallet && pallet.success
                                                   }>
                                                   Success
                                                  </option>
                                                 </select>
                                                )}
                                               </div>
                                              )
                                             )}
                                            </div>
                                           )
                                          )}
                                         </div>
                                        )
                                       )}
                                     </ul>
                                    </div>
                                   </label>
                                  );
                                 } else if (key === "fontSize") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='5px'>XX Small</option>
                                     <option value='7px'>X Small</option>
                                     <option value='11px'>Small</option>
                                     <option value='16px'>Medium</option>
                                     <option value='24px'>Large</option>
                                     <option value='36px'>X Large</option>
                                     <option value='54px'>XX Large</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key.includes("Inset")) {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option>Outer</option>
                                     <option value='inset'>Inset</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "fontWeight") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option value='100'>100</option>
                                     <option value='200'>200</option>
                                     <option value='300'>300</option>
                                     <option value='400'>400</option>
                                     <option value='500'>500</option>
                                     <option value='600'>600</option>
                                     <option value='700'>700</option>
                                     <option value='800'>800</option>
                                     <option value='900'>900</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "opacity") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}
                                    <Slider
                                     axis='x'
                                     x={css.opacity}
                                     value={parseInt(css[key])}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "opacity",
                                       "contentslider",
                                       index
                                      )
                                     }
                                     orientation='horizontal'
                                     min={0}
                                     max={100}
                                     step={1}
                                    />
                                   </label>
                                  );
                                 } else if (key.includes("Radius")) {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}
                                    <Slider
                                     value={parseInt(css[key])}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       key,
                                       "contentslider",
                                       index
                                      )
                                     }
                                     orientation='horizontal'
                                     min={0}
                                     max={50}
                                     step={0.5}
                                    />
                                   </label>
                                  );
                                 } else if (key === "textAlign") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>

                                     <option value='start'>Start</option>
                                     <option value='end'>End</option>
                                     <option value='left'>Left</option>
                                     <option value='right'>Right</option>
                                     <option value='center'>Center</option>
                                     <option value='justify'>Justify</option>
                                     <option value='matchParent'>
                                      Match Parent
                                     </option>
                                     <option value='justifyAll'>
                                      Justify All
                                     </option>
                                    </select>
                                   </label>
                                  );
                                 } else if (
                                  key.includes("border") &&
                                  key.includes("Style")
                                 ) {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='solid'>Solid</option>
                                     <option value='double'>Double</option>
                                     <option value='dotted'>Dotted</option>
                                     <option value='dashed'>Dashed</option>
                                     <option value='groove'>Groove</option>
                                     <option value='none'>None</option>
                                     <option value='hidden'>Hidden</option>
                                     <option value='ridge'>Ridge</option>
                                     <option value='inset'>Inset</option>
                                     <option value='outset'>Outset</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key === "textShadowSize") {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='small'>2px</option>
                                    </select>
                                   </label>
                                  );
                                 } else if (key.includes("overflow")) {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}

                                    <select
                                     name={key}
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }>
                                     <option></option>
                                     <option value='visible'>Visible</option>
                                     <option value='hidden'>Hidden</option>
                                     <option value='clip'>Clip</option>
                                     <option value='scroll'>Scroll</option>
                                     <option value='auto'>Auto</option>
                                    </select>
                                   </label>
                                  );
                                 } else {
                                  return (
                                   <label key={key}>
                                    {key
                                     .replace(/([A-Z])/g, " $1")
                                     .replace(/^./, function (str) {
                                      return str.toUpperCase();
                                     })}
                                    <input
                                     type='text'
                                     placeholder='Enter A Value In Pixels'
                                     value={css[key]}
                                     onChange={(e) =>
                                      onChangeBodyCell(
                                       i,
                                       e,
                                       "contentCss",
                                       index
                                      )
                                     }
                                     name={key}
                                    />
                                   </label>
                                  );
                                 }
                                })
                               )}
                             </div>
                            ) : (
                             <div>
                              <h5>Cell Settings</h5>
                              <select
                               name='background'
                               onChange={(e) => {
                                onChangeBodyCell(i, e);
                                {
                                 currentContent &&
                                  getContentImage(
                                   currentContent.content,
                                   i,
                                   "background",
                                   "bodyCell"
                                  );
                                }
                                {
                                 currentContent && clearCurrentContent();
                                }
                               }}>
                               <option>Background</option>
                               <option value={pallet && pallet.primary}>
                                Primary
                               </option>
                               <option value={pallet && pallet.dark}>
                                Dark
                               </option>
                               <option value={pallet && pallet.light}>
                                Light
                               </option>
                               <option value={pallet && pallet.danger}>
                                Danger
                               </option>
                               <option value={pallet && pallet.success}>
                                Success
                               </option>
                               {currentContent && (
                                <option value={currentContent.content}>
                                 Set Image
                                </option>
                               )}
                              </select>
                              <input
                               placeholder='Row Span'
                               type='text'
                               name='rowSpan'
                               value={rowSpan}
                               onChange={(e) => onChangeBodyCell(i, e)}
                              />
                              <input
                               placeholder='Column Span'
                               type='text'
                               name='columnSpan'
                               value={columnSpan}
                               onChange={(e) => onChangeBodyCell(i, e)}
                              />
                              <input
                               placeholder='top'
                               type='text'
                               name='top'
                               value={top}
                               onChange={(e) => onChangeBodyCell(i, e)}
                              />
                              <input
                               placeholder='left'
                               type='text'
                               name='left'
                               value={left}
                               onChange={(e) => onChangeBodyCell(i, e)}
                              />
                             </div>
                            )}
                           </div>
                          ) : (
                           ""
                          )}
                          {nodeView === true ? (
                           <div
                            style={{
                             height: "5px",
                             width: "5px",
                             zIndex: 9999999,
                             float: "left",
                            }}>
                            <a>
                             <select
                              name='viewToggle'
                              style={{
                               height: "5px",
                               width: "5px",
                               WebkitAppearance: "none",
                               MozAppearance: "none",
                               zIndex: 9999999,
                              }}
                              onChange={(e) => {
                               onChangeBodyCell(i, e);
                              }}>
                              <option value=''>B</option>
                              <option value='open'>Open</option>
                             </select>
                            </a>
                           </div>
                          ) : (
                           ""
                          )}

                          <>
                           <div
                            className={"a" + bodyCells[i].id}
                            style={{
                             wordWrap: "breakWord",
                             wordBreak: "breakAll",
                            }}>
                            {content
                             .slice()
                             .sort(
                              (a, b) =>
                               parseInt(a.sectionOrdinality) -
                               parseInt(b.sectionOrdinality)
                             )
                             .map(
                              (
                               {
                                text,
                                props,
                                font,
                                fontStyle,
                                faIcon,
                                faIconPosition,
                                name,
                                formName,
                                keyName,
                                parentObj,
                                parentState,
                                parentKey,
                                checkedValue,
                                isBool,
                                onChange,
                                options,
                                type,
                                label,
                                legend,
                                step,
                                n,
                                rangeMin,
                                rangeMax,
                                displayDate,
                                headingSize,
                                action,
                                color,
                                background,
                                code,
                                top,
                                left,
                                height,
                                width,
                                url,
                                autoplay,
                               },
                               i
                              ) => {
                               if (content[i].hasOwnProperty("props")) {
                                const VariableComponent = content;
                                return VariableComponent;
                               } else if (bodyCellQuiz[0]) {
                                const Quiz = bodyCellQuiz
                                 .filter((q) => q.id === bodyCells[i].id)
                                 .map(({ quiz }) => {
                                  return quiz;
                                 });

                                return Quiz;
                               } else if (type === "text") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <input
                                     type='text'
                                     name={keyName}
                                     value={
                                      lead && parentObj === "lead"
                                       ? lead[keyName]
                                       : userState && userState[keyName]
                                     }
                                     onChange={(e) => {
                                      parentObj === "lead"
                                       ? writeLeadState(onChange, e)
                                       : writeUserState(
                                          onChange,
                                          e,
                                          parentObj,
                                          n,
                                          parentState,
                                          parentKey,
                                          i
                                         );
                                     }}
                                    />
                                   </label>
                                  );
                                 });
                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <input
                                    type='text'
                                    name={keyName}
                                    value={
                                     lead && parentObj === "lead"
                                      ? lead[keyName]
                                      : userState && userState[keyName]
                                    }
                                    onChange={(e) => {
                                     parentObj === "lead"
                                      ? writeLeadState(onChange, e)
                                      : writeUserState(
                                         onChange,
                                         e,
                                         parentObj,
                                         n,
                                         parentState,
                                         parentKey
                                        );
                                    }}
                                   />
                                  </label>
                                 );
                                }
                               } else if (type === "textarea") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <textarea
                                     type='text'
                                     name={keyName}
                                     value={lead && lead[keyName]}
                                     onChange={(e) =>
                                      writeUserState(
                                       onChange,
                                       e,
                                       parentObj,
                                       n,
                                       parentState,
                                       parentKey,
                                       i
                                      )
                                     }
                                    />
                                   </label>
                                  );
                                 });
                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <textarea
                                    type='text'
                                    name={keyName}
                                    value={lead && lead[keyName]}
                                    onChange={(e) =>
                                     writeUserState(
                                      onChange,
                                      e,
                                      parentObj,
                                      n,
                                      parentState,
                                      parentKey,
                                      Array.from(
                                       userState[parentState][parentKey]
                                      ).findIndex((x) =>
                                       Object.values(x).includes(e.target.value)
                                      )
                                     )
                                    }
                                   />
                                  </label>
                                 );
                                }
                               } else if (type === "radio") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <input
                                     type='radio'
                                     name={keyName}
                                     value={
                                      isBool === "true" || isBool === "false"
                                       ? stringToBoolean(isBool)
                                       : checkedValue
                                     }
                                     onClick={(e) =>
                                      writeUserState(
                                       onChange,
                                       e,
                                       parentObj,
                                       n,
                                       parentState,
                                       parentKey,
                                       i
                                      )
                                     }
                                    />
                                   </label>
                                  );
                                 });
                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <input
                                    type='radio'
                                    name={keyName}
                                    value={
                                     isBool === "true" || isBool === "false"
                                      ? stringToBoolean(isBool)
                                      : checkedValue
                                    }
                                    onClick={(e) =>
                                     writeUserState(
                                      onChange,
                                      e,
                                      parentObj,
                                      n,
                                      parentState,
                                      parentKey
                                     )
                                    }
                                   />
                                  </label>
                                 );
                                }
                               } else if (type === "checkbox") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <input
                                     type='checkbox'
                                     name={keyName}
                                     checked={
                                      isBool === true || isBool === false
                                       ? keyName === isBool
                                       : checkedValue
                                     }
                                     onChange={(e) =>
                                      writeUserState(
                                       onChange,
                                       e,
                                       parentObj,
                                       n,
                                       parentState,
                                       parentKey,
                                       i
                                      )
                                     }
                                    />
                                   </label>
                                  );
                                 });

                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <input
                                    type='checkbox'
                                    name={keyName}
                                    checked={
                                     isBool === true || isBool === false
                                      ? keyName === isBool
                                      : checkedValue
                                    }
                                    onChange={(e) =>
                                     writeUserState(
                                      onChange,
                                      e,
                                      parentObj,
                                      n,
                                      parentState,
                                      parentKey
                                     )
                                    }
                                   />
                                  </label>
                                 );
                                }
                               } else if (type === "select") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <select
                                     name={keyName}
                                     onChange={(e) =>
                                      writeUserState(
                                       onChange,
                                       e,
                                       parentObj,
                                       n,
                                       parentState,
                                       parentKey,
                                       i
                                      )
                                     }>
                                     {options.map(({ value, display }) => (
                                      <option value={value}>{display}</option>
                                     ))}
                                    </select>
                                   </label>
                                  );
                                 });
                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <select
                                    name={keyName}
                                    onChange={(e) =>
                                     writeUserState(
                                      onChange,
                                      e,
                                      parentObj,
                                      n,
                                      parentState,
                                      parentKey
                                     )
                                    }>
                                    {options.map(({ value, display }) => (
                                     <option value={value}>{display}</option>
                                    ))}
                                   </select>
                                  </label>
                                 );
                                }
                               } else if (type === "number") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <input
                                     type='number'
                                     name={keyName}
                                     checked={keyName === checkedValue}
                                     onChange={(e) =>
                                      writeUserState(
                                       onChange,
                                       e,
                                       parentObj,
                                       n,
                                       parentState,
                                       parentKey,
                                       i
                                      )
                                     }
                                    />
                                   </label>
                                  );
                                 });
                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <input
                                    type='number'
                                    name={keyName}
                                    checked={keyName === checkedValue}
                                    onChange={(e) =>
                                     writeUserState(
                                      onChange,
                                      e,
                                      parentObj,
                                      n,
                                      parentState,
                                      parentKey
                                     )
                                    }
                                   />
                                  </label>
                                 );
                                }
                               } else if (type === "date") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <input
                                     type='date'
                                     name={keyName}
                                     value={displayDate && displayDate}
                                     onChange={(e) =>
                                      writeUserState(
                                       onChange,
                                       e,
                                       parentObj,
                                       n,
                                       parentState,
                                       parentKey,
                                       i
                                      )
                                     }
                                    />
                                   </label>
                                  );
                                 });
                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <input
                                    type='date'
                                    name={keyName}
                                    value={displayDate && displayDate}
                                    onChange={(e) =>
                                     writeUserState(
                                      onChange,
                                      e,
                                      parentObj,
                                      n,
                                      parentState,
                                      parentKey
                                     )
                                    }
                                   />
                                  </label>
                                 );
                                }
                               } else if (type === "range") {
                                if (
                                 Array.isArray(
                                  userState[parentState][parentKey]
                                 )
                                ) {
                                 const arr = userState[parentState][
                                  parentKey
                                 ].map((k, i) => {
                                  return (
                                   <label>
                                    {label}
                                    <Slider
                                     axis='x'
                                     x={parseFloat(userState[`${keyName}`])}
                                     value={parseFloat(userState[`${keyName}`])}
                                     onChange={(e) =>
                                      writeUserState(
                                       onChange,
                                       e,
                                       parentObj,
                                       n,
                                       parentState,
                                       parentKey,
                                       i
                                      )
                                     }
                                     orientation='horizontal'
                                     name={keyName}
                                     min={rangeMax}
                                     max={rangeMin}
                                     step={step}
                                    />
                                   </label>
                                  );
                                 });
                                 return arr;
                                } else {
                                 return (
                                  <label>
                                   {label}
                                   <Slider
                                    axis='x'
                                    x={parseFloat(userState[`${keyName}`])}
                                    value={parseFloat(userState[`${keyName}`])}
                                    onChange={(e) =>
                                     writeUserState(
                                      onChange,
                                      e,
                                      parentObj,
                                      n,
                                      parentState,
                                      parentKey
                                     )
                                    }
                                    orientation='horizontal'
                                    name={keyName}
                                    min={rangeMax}
                                    max={rangeMin}
                                    step={step}
                                   />
                                  </label>
                                 );
                                }
                               } else if (type === "submit") {
                                return (
                                 <input
                                  type='submit'
                                  onClick={() => readUserState(userState, lead)}
                                 />
                                );
                               } else
                                return (
                                 <Fragment>
                                  <span
                                   style={{ background: "initial !important" }}>
                                   {type === "h" && headingSize === "h1" ? (
                                    <h1
                                     style={{
                                      color: `${color}`,
                                      fontFamily: `${font}`,
                                      background: `${background}`,
                                     }}>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>
                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </h1>
                                   ) : (
                                    ""
                                   )}
                                   {type === "h" && headingSize === "h2" ? (
                                    <h2
                                     style={{
                                      color: `${color}`,
                                      fontFamily: `${font}`,
                                      background: `${background}`,
                                     }}>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>
                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </h2>
                                   ) : (
                                    ""
                                   )}
                                   {type === "h" && headingSize === "h3" ? (
                                    <h3
                                     style={{
                                      color: `${color}`,
                                      fontFamily: `${font}`,
                                      background: `${background}`,
                                     }}>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>
                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </h3>
                                   ) : (
                                    ""
                                   )}
                                   {type === "h" && headingSize === "h4" ? (
                                    <h4
                                     style={{
                                      color: `${color}`,
                                      fontFamily: `${font}`,
                                      background: `${background}`,
                                     }}>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>
                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </h4>
                                   ) : (
                                    ""
                                   )}
                                   {type === "h" && headingSize === "h5" ? (
                                    <h5
                                     style={{
                                      color: `${color}`,
                                      fontFamily: `${font}`,
                                      background: `${background}`,
                                     }}>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>
                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </h5>
                                   ) : (
                                    ""
                                   )}
                                   {type === "p" ? (
                                    <p
                                     style={{
                                      color: `${color}`,
                                      background: `${background}`,
                                      fontFamily: `${font}`,
                                     }}>
                                     {fontStyle
                                      ? parse(
                                         `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    </p>
                                   ) : (
                                    ""
                                   )}
                                   {type === "li" ? (
                                    <li>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>

                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </li>
                                   ) : (
                                    ""
                                   )}
                                   {type === "i" ? (
                                    <i
                                     style={{
                                      color: `${color}`,
                                     }}
                                     className={faIcon}
                                    />
                                   ) : (
                                    ""
                                   )}
                                   {type === "a" ? (
                                    <a
                                     href={url}
                                     target='_blank'
                                     rel='noopener noreferrer'>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>

                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </a>
                                   ) : (
                                    ""
                                   )}
                                   {type === "button" ? (
                                    <button
                                     style={{
                                      background: `${background}`,
                                     }}
                                     onClick={action}>
                                     {faIconPosition === "top" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i> <br />
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                     <span>
                                      {faIconPosition === "front" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}{" "}
                                      {fontStyle
                                       ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                         )
                                       : text}
                                      {faIconPosition === "back" ? (
                                       <i className={faIcon}></i>
                                      ) : (
                                       ""
                                      )}
                                     </span>

                                     {faIconPosition === "bottom" ? (
                                      <span
                                       style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                       }}>
                                       <i className={faIcon}></i>
                                      </span>
                                     ) : (
                                      ""
                                     )}
                                    </button>
                                   ) : (
                                    ""
                                   )}
                                   {type === "img" ? (
                                    <img
                                     alt={name}
                                     src={code}
                                     height={`${height}px`}
                                     width={`${width}px`}
                                    />
                                   ) : (
                                    ""
                                   )}
                                   {type === "vid" ? (
                                    <YouTube
                                     videoId={url}
                                     opts={{
                                      height: height,
                                      width: width,
                                      playerVars: {
                                       autoplay: autoplay,
                                      },
                                     }}
                                    />
                                   ) : (
                                    ""
                                   )}
                                  </span>
                                 </Fragment>
                                );
                              }
                             )}
                           </div>
                          </>
                         </Cell>
                        )
                       )}
                     </Grid>
                    )}

                    {nodeView === true ? (
                     <div
                      style={{
                       height: "5px",
                       width: "5px",
                       zIndex: 9999999,
                       float: "right",
                      }}>
                      <a>
                       <select
                        name='viewToggle'
                        style={{
                         height: "5px",
                         width: "5px",
                         WebkitAppearance: "none",
                         MozAppearance: "none",
                         zIndex: 9999999,
                        }}
                        onChange={(e) => {
                         onChangeSubCell(i, e);
                        }}>
                        <option value=''>S</option>
                        <option value='open'>Open</option>
                       </select>
                      </a>
                     </div>
                    ) : (
                     ""
                    )}
                   </>
                  )}
                 </>
                </Cell>
               );
              }
             )}
           </Grid>
          )}
         </>
        )}
       </Cell>
      );
     }
    )}
    <style
     dangerouslySetInnerHTML={{
      __html: str`
      

      
  ${cells.map(({ id, css, contentCss, content, background, code }, i) => {
   function clean(obj) {
    for (var propName in obj) {
     if (
      obj[propName] === "" ||
      obj[propName] === true ||
      obj[propName] === false
     ) {
      delete obj[propName];
     } else if (
      propName === "boxShadowBottom" ||
      propName === "boxShadowRight" ||
      propName === "boxShadowLeft" ||
      propName === "boxShaadowHoriz" ||
      propName === "boxShadowColor" ||
      propName === "textShadowSize" ||
      propName === "textShadowColor" ||
      propName === "id" ||
      propName === "transformProp"
     ) {
      delete obj[propName];
     }
    }
    return obj;
   }

   let img =
    "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQYV2NkIAKckTrzn5GQOpAik2cmjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQD+Nia8BIDCEQAAAABJRU5ErkJggg==";

   const childRules = contentCss.map((css, i) => {
    const ruleObj = clean(
     Object.assign(
      {},
      {
       ...css,

       boxShadow: `${
        css.boxShaadowHoriz ||
        css.boxShadowVert ||
        css.boxShadowSpread ||
        css.boxShadowBlur
         ? `${css.boxShaadowHoriz ? css.boxShaadowHoriz : "0px"} ${
            css.boxShaadowVert ? css.boxShadowVert : "0px"
           } ${css.boxShaadowBlur ? css.boxShadowBlur : "0px"} ${
            css.boxShaadowSpread ? css.boxShadowSpread : "0px"
           } ${css.boxShaadowColor ? css.boxShadowColor : ""} ${
            css.boxShaadowInset ? css.boxShadowInset : ""
           }`
         : `0px 0px 0px 0px`
       }`,
       textShadow:
        css.textShadowSize === "small" &&
        `-2px -2px 0 ${css.textShadowColor},
               2px -2px 0 ${css.textShadowColor},
               -2px 2px 0 ${css.textShadowColor},
               2px 2px 0 ${css.textShadowColor},
               -3px 0 0 ${css.textShadowColor},
               3px 0 0 ${css.textShadowColor},
               0 -3px 0 ${css.textShadowColor},
               0 3px 0 ${css.textShadowColor}`,
       transform:
        css.transform.length > 0
         ? str`${css.transform
            .map((transform) => {
             if (transform.includes("scale")) {
              return `${transform}(${
               parseInt(
                Object.keys(css.transformProp)
                 .filter((e) => e === transform)
                 .map((e) => {
                  const val = css.transformProp[transform];
                  return val;
                 })[0]
               ) >= 0
                ? parseInt(
                   Object.keys(css.transformProp)
                    .filter((e) => e === transform)
                    .map((e) => {
                     const val = css.transformProp[transform];
                     return val;
                    })[0]
                  )
                : 1 -
                  parseInt(
                   Object.keys(css.transformProp)
                    .filter((e) => e === transform)
                    .map((e) => {
                     const val = css.transformProp[transform];
                     return val;
                    })[0]
                  ) *
                   0.1 *
                   -1
              })`;
             } else {
              return `${transform}(${parseInt(
               Object.keys(css.transformProp)
                .filter((e) => e === transform)
                .map((e) => {
                 const val = css.transformProp[transform];
                 return val;
                })[0]
              )}${transform.includes("translate") ? "px" : ""}${
               transform.includes("rotate") ? "deg" : ""
              }${transform.includes("skew") ? "deg" : ""})`;
             }
            })
            .toString()
            .replaceAll(",", " ")}`
         : "translateX(0px)",
       opacity: css.opacity,

       animation: str`${css.animation
        .filter((a) => a.animationName.length > 0)
        .map(
         ({
          animationName,
          animationTimingFunction,
          animationDelay,
          animationDirection,
          animationDuration,
          animationFillMode,
          animationIterationCount,
         }) => {
          const str = `${animationName} ${animationDuration}s ${animationTimingFunction} ${animationIterationCount} ${animationDirection} ${animationFillMode} `;
          return str;
         }
        )}`,
       transition: str`${css.transition
        .map(({ property, duration, timingFunction, cubicNs, delay }) => {
         const transString = `width ${parseFloat(duration)}s ${
          timingFunction === "cubic-bezier"
           ? `${timingFunction}(${
              (parseFloat(cubicNs["0"]),
              parseFloat(cubicNs["1"]),
              parseFloat(cubicNs["2"]),
              parseFloat(cubicNs["3"]))
             })`
           : `${timingFunction}`
         } ${delay && `${parseFloat(delay)}s`}`;
         return transString;
        })
        .toString()}`,

       borderTopRightRadius: css.borderTopRightRadius + "%",
       borderBottomRightRadius: css.borderBottomRightRadius + "%",
       borderTopLeftRadius: css.borderTopLeftRadius + "%",
       borderBottomLeftRadius: css.borderBottomLeftRadius + "%",

       backgroundImage:
        code.length > 0
         ? `url('${code}');`
         : !background.includes("#") && ` url('${img}')`,
       backgroundColor: background.includes("#") && `${background}`,
      }
     )
    );
    const cellRules = Object.keys(ruleObj)
     .map((k, i) => {
      const rule = Object.values(ruleObj)[i];
      const property = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

      const cl = `${property}:${rule};\n`;

      return cl;
     })
     .toString();
    const ruleString = `.a${id} span:nth-child(${i + 1}){
     ${cellRules}}\r`;

    return ruleString;
   });

   const ruleObj = clean(
    Object.assign(
     {},
     {
      ...css,
      boxShadow: `${
       css.boxShaadowHoriz ||
       css.boxShadowVert ||
       css.boxShadowSpread ||
       css.boxShadowBlur
        ? `${css.boxShaadowHoriz ? css.boxShaadowHoriz : "0px"} ${
           css.boxShaadowVert ? css.boxShadowVert : "0px"
          } ${css.boxShaadowBlur ? css.boxShadowBlur : "0px"} ${
           css.boxShaadowSpread ? css.boxShadowSpread : "0px"
          } ${css.boxShaadowColor ? css.boxShadowColor : ""} ${
           css.boxShaadowInset ? css.boxShadowInset : ""
          }`
        : `0px 0px 0px 0px`
      }`,
      textShadow:
       css.textShadowSize === "small" &&
       `-2px -2px 0 ${css.textShadowColor},
               2px -2px 0 ${css.textShadowColor},
               -2px 2px 0 ${css.textShadowColor},
               2px 2px 0 ${css.textShadowColor},
               -3px 0 0 ${css.textShadowColor},
               3px 0 0 ${css.textShadowColor},
               0 -3px 0 ${css.textShadowColor},
               0 3px 0 ${css.textShadowColor}`,

      animation: str`${css.animation
       .filter((a) => a.animationName.length > 0)
       .map(
        ({
         animationName,
         animationTimingFunction,
         animationDelay,
         animationDirection,
         animationDuration,
         animationFillMode,
         animationIterationCount,
        }) => {
         const str = `${animationName} ${animationDuration}s ${animationTimingFunction} ${animationIterationCount} ${animationDirection} ${animationFillMode} `;
         return str;
        }
       )}`,
      transform:
       css.transform.length > 0
        ? str`${css.transform
           .map((transform) => {
            if (transform.includes("scale")) {
             return `${transform}(${
              parseInt(
               Object.keys(css.transformProp)
                .filter((e) => e === transform)
                .map((e) => {
                 const val = css.transformProp[transform];
                 return val;
                })[0]
              ) >= 0
               ? parseInt(
                  Object.keys(css.transformProp)
                   .filter((e) => e === transform)
                   .map((e) => {
                    const val = css.transformProp[transform];
                    return val;
                   })[0]
                 )
               : 1 -
                 parseInt(
                  Object.keys(css.transformProp)
                   .filter((e) => e === transform)
                   .map((e) => {
                    const val = css.transformProp[transform];
                    return val;
                   })[0]
                 ) *
                  0.1 *
                  -1
             })`;
            } else {
             return `${transform}(${parseInt(
              Object.keys(css.transformProp)
               .filter((e) => e === transform)
               .map((e) => {
                const val = css.transformProp[transform];
                return val;
               })[0]
             )}${transform.includes("translate") ? "px" : ""}${
              transform.includes("rotate") ? "deg" : ""
             }${transform.includes("skew") ? "deg" : ""})`;
            }
           })
           .toString()
           .replaceAll(",", " ")}`
        : "translateX(0px)",
      opacity: css.opacity,
      height:
       css.height > 0
        ? css.height
        : `${
           grid.columns[i] &&
           grid.columns[i].size.length > 0 &&
           grid.columns[i].size
          }` +
          `${
           grid.columns[i] &&
           grid.columns[i].unit.length > 0 &&
           grid.columns[i].unit
          }`,
      transition: str`${css.transition
       .map(({ property, duration, timingFunction, cubicNs, delay }) => {
        const transString = `width ${parseFloat(duration)}s ${
         timingFunction === "cubic-bezier"
          ? `${timingFunction}(${
             (parseFloat(cubicNs["0"]),
             parseFloat(cubicNs["1"]),
             parseFloat(cubicNs["2"]),
             parseFloat(cubicNs["3"]))
            })`
          : `${timingFunction}`
        } ${delay && `${parseFloat(delay)}s`}`;
        return transString;
       })
       .toString()}`,

      borderTopRightRadius: css.borderTopRightRadius + "%",
      borderBottomRightRadius: css.borderBottomRightRadius + "%",
      borderTopLeftRadius: css.borderTopLeftRadius + "%",
      borderBottomLeftRadius: css.borderBottomLeftRadius + "%",
      width: css.width
       ? css.width > 0
       : `${
          grid.rows[i] && grid.rows[i].size.length > 0 && grid.rows[i].size
         }` +
         `${grid.rows[i] && grid.rows[i].unit.length > 0 && grid.rows[i].unit}`,
      backgroundImage:
       code.length > 0
        ? `url('${code}');`
        : !background.includes("#") && ` url('${img}')`,
      backgroundColor: background.includes("#") && `${background}`,
     }
    )
   );

   const cellRules = Object.keys(ruleObj)
    .map((k, i) => {
     const rule = Object.values(ruleObj)[i];
     const property = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

     const cl = `${
      property.includes("keyframe") ? `@${property}` : `${property}:`
     }  ${property.includes("keyframe") ? `${rule}` : `${rule};\r`}`;

     return cl;
    })
    .reverse()
    .toString();

   const ruleString = `.a${id} {
     ${cellRules}}\r`;

   const parentkeyframes = str`${css.animation
    .filter((a) => a.animationName.length > 0)
    .map(({ animationName, keyframes }, index) => {
     const keyframe = `${animationName} {
          ${keyframes.map(({ completionPercent, properties }, ind) => {
           const frame = `${completionPercent}% {${properties.map(
            ({ propName, propValue, shadowValues, transValues }, i) => {
             let frameString = [];
             if (propName.includes("transform")) {
              frameString.push(
               ` transform: ${Object.keys(transValues)

                .map((k, i) => {
                 const val = parseFloat(Object.values(transValues)[i]);
                 const trans = ` ${k}(${val}${k.includes("skew") ? "deg" : ""}${
                  k.includes("rotate") ? "deg" : ""
                 }${k.includes("translate") ? "px" : ""}) `;
                 return trans;
                })
                .toString()};`
              );
             } else if (propName.includes("shadow")) {
              frameString.push(
               ` box-shadow: ${Object.values(shadowValues)
                .map((v) => {
                 let val;
                 typeof v === "number"
                  ? (val = ` ${parseFloat(v)}px `)
                  : (val = ` ${v} `);
                 return val;
                })
                .toString()}; `
              );
             } else {
              frameString.push(` ${propName}:${propValue}; `);
             }
             return frameString.toString();
            }
           )} }\r\n`;
           return frame;
          })}
        }
        `;
     return `@keyframes ${keyframe}`;
    })}`;

   const childkeyframes = str`${contentCss.map(({ animation }, index) => {
    const frames = animation
     .filter((a) => a.animationName.length > 0)
     .map(({ animationName, keyframes }) => {
      const keyframe = `${animationName} {
          ${keyframes.map(({ completionPercent, properties }, ind) => {
           const frame = `${completionPercent}% {${properties.map(
            ({ propName, propValue, shadowValues, transValues }, i) => {
             let frameString = [];
             if (propName.includes("transform")) {
              frameString.push(
               ` transform: ${Object.keys(transValues)

                .map((k, i) => {
                 const val = parseFloat(Object.values(transValues)[i]);
                 const trans = ` ${k}(${val}${k.includes("skew") ? "deg" : ""}${
                  k.includes("rotate") ? "deg" : ""
                 }${k.includes("translate") ? "px" : ""}) `;
                 return trans;
                })
                .toString()};`
              );
             } else if (propName.includes("shadow")) {
              frameString.push(
               ` box-shadow: ${Object.values(shadowValues)
                .map((v) => {
                 let val;
                 typeof v === "number"
                  ? (val = ` ${parseFloat(v)}px `)
                  : (val = ` ${v} `);
                 return val;
                })
                .toString()}; `
              );
             } else {
              frameString.push(` ${propName}:${propValue}; `);
             }
             return frameString.toString();
            }
           )} }\r\n`;
           return frame;
          })}
        }
        `;
      return `@keyframes ${keyframe}`;
     });
    return frames;
   })}`;

   const res = [parentkeyframes, childkeyframes, ruleString, childRules]
    .toString()
    .replace(/\,/g, "")
    .replace("base64", "base64,");

   return res;
  })}
  
    ${subCells.map(({ id, css, contentCss, content, background, code }, i) => {
     function clean(obj) {
      for (var propName in obj) {
       if (
        obj[propName] === "" ||
        obj[propName] === true ||
        obj[propName] === false
       ) {
        delete obj[propName];
       } else if (
        propName === "boxShadowBottom" ||
        propName === "boxShadowRight" ||
        propName === "boxShadowLeft" ||
        propName === "boxShaadowHoriz" ||
        propName === "boxShadowColor" ||
        propName === "textShadowSize" ||
        propName === "textShadowColor" ||
        propName === "id" ||
        propName === "transformProp"
       ) {
        delete obj[propName];
       }
      }
      return obj;
     }

     let img =
      "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQYV2NkIAKckTrzn5GQOpAik2cmjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQD+Nia8BIDCEQAAAABJRU5ErkJggg==";

     const childRules = contentCss.map((css, i) => {
      const ruleObj = clean(
       Object.assign(
        {},
        {
         ...css,

         boxShadow: `${
          css.boxShaadowHoriz ||
          css.boxShadowVert ||
          css.boxShadowSpread ||
          css.boxShadowBlur
           ? `${css.boxShaadowHoriz ? css.boxShaadowHoriz : "0px"} ${
              css.boxShaadowVert ? css.boxShadowVert : "0px"
             } ${css.boxShaadowBlur ? css.boxShadowBlur : "0px"} ${
              css.boxShaadowSpread ? css.boxShadowSpread : "0px"
             } ${css.boxShaadowColor ? css.boxShadowColor : ""} ${
              css.boxShaadowInset ? css.boxShadowInset : ""
             }`
           : `0px 0px 0px 0px`
         }`,
         textShadow:
          css.textShadowSize === "small" &&
          `-2px -2px 0 ${css.textShadowColor},
               2px -2px 0 ${css.textShadowColor},
               -2px 2px 0 ${css.textShadowColor},
               2px 2px 0 ${css.textShadowColor},
               -3px 0 0 ${css.textShadowColor},
               3px 0 0 ${css.textShadowColor},
               0 -3px 0 ${css.textShadowColor},
               0 3px 0 ${css.textShadowColor}`,
         transform:
          css.transform.length > 0
           ? str`${css.transform
              .map((transform) => {
               if (transform.includes("scale")) {
                return `${transform}(${
                 parseInt(
                  Object.keys(css.transformProp)
                   .filter((e) => e === transform)
                   .map((e) => {
                    const val = css.transformProp[transform];
                    return val;
                   })[0]
                 ) >= 0
                  ? parseInt(
                     Object.keys(css.transformProp)
                      .filter((e) => e === transform)
                      .map((e) => {
                       const val = css.transformProp[transform];
                       return val;
                      })[0]
                    )
                  : 1 -
                    parseInt(
                     Object.keys(css.transformProp)
                      .filter((e) => e === transform)
                      .map((e) => {
                       const val = css.transformProp[transform];
                       return val;
                      })[0]
                    ) *
                     0.1 *
                     -1
                })`;
               } else {
                return `${transform}(${parseInt(
                 Object.keys(css.transformProp)
                  .filter((e) => e === transform)
                  .map((e) => {
                   const val = css.transformProp[transform];
                   return val;
                  })[0]
                )}${transform.includes("translate") ? "px" : ""}${
                 transform.includes("rotate") ? "deg" : ""
                }${transform.includes("skew") ? "deg" : ""})`;
               }
              })
              .toString()
              .replaceAll(",", " ")}`
           : "translateX(0px)",
         opacity: css.opacity,

         animation: str`${css.animation
          .filter((a) => a.animationName.length > 0)
          .map(
           ({
            animationName,
            animationTimingFunction,
            animationDelay,
            animationDirection,
            animationDuration,
            animationFillMode,
            animationIterationCount,
           }) => {
            const str = `${animationName} ${animationDuration}s ${animationTimingFunction} ${animationIterationCount} ${animationDirection} ${animationFillMode} `;
            return str;
           }
          )}`,
         transition: str`${css.transition
          .map(({ property, duration, timingFunction, cubicNs, delay }) => {
           const transString = `width ${parseFloat(duration)}s ${
            timingFunction === "cubic-bezier"
             ? `${timingFunction}(${
                (parseFloat(cubicNs["0"]),
                parseFloat(cubicNs["1"]),
                parseFloat(cubicNs["2"]),
                parseFloat(cubicNs["3"]))
               })`
             : `${timingFunction}`
           } ${delay && `${parseFloat(delay)}s`}`;
           return transString;
          })
          .toString()}`,

         borderTopRightRadius: css.borderTopRightRadius + "%",
         borderBottomRightRadius: css.borderBottomRightRadius + "%",
         borderTopLeftRadius: css.borderTopLeftRadius + "%",
         borderBottomLeftRadius: css.borderBottomLeftRadius + "%",

         backgroundImage:
          code.length > 0
           ? `url('${code}');`
           : !background.includes("#") && ` url('${img}')`,
         backgroundColor: background.includes("#") && `${background}`,
        }
       )
      );
      const cellRules = Object.keys(ruleObj)
       .map((k, i) => {
        const rule = Object.values(ruleObj)[i];
        const property = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

        const cl = `${property}:${rule};\n`;

        return cl;
       })
       .toString();
      const ruleString = `.a${id} span:nth-child(${i + 1}){
     ${cellRules}}\r`;

      return ruleString;
     });

     const ruleObj = clean(
      Object.assign(
       {},
       {
        ...css,
        boxShadow: `${
         css.boxShaadowHoriz ||
         css.boxShadowVert ||
         css.boxShadowSpread ||
         css.boxShadowBlur
          ? `${css.boxShaadowHoriz ? css.boxShaadowHoriz : "0px"} ${
             css.boxShaadowVert ? css.boxShadowVert : "0px"
            } ${css.boxShaadowBlur ? css.boxShadowBlur : "0px"} ${
             css.boxShaadowSpread ? css.boxShadowSpread : "0px"
            } ${css.boxShaadowColor ? css.boxShadowColor : ""} ${
             css.boxShaadowInset ? css.boxShadowInset : ""
            }`
          : `0px 0px 0px 0px`
        }`,
        textShadow:
         css.textShadowSize === "small" &&
         `-2px -2px 0 ${css.textShadowColor},
               2px -2px 0 ${css.textShadowColor},
               -2px 2px 0 ${css.textShadowColor},
               2px 2px 0 ${css.textShadowColor},
               -3px 0 0 ${css.textShadowColor},
               3px 0 0 ${css.textShadowColor},
               0 -3px 0 ${css.textShadowColor},
               0 3px 0 ${css.textShadowColor}`,

        animation: str`${css.animation
         .filter((a) => a.animationName.length > 0)
         .map(
          ({
           animationName,
           animationTimingFunction,
           animationDelay,
           animationDirection,
           animationDuration,
           animationFillMode,
           animationIterationCount,
          }) => {
           const str = `${animationName} ${animationDuration}s ${animationTimingFunction} ${animationIterationCount} ${animationDirection} ${animationFillMode} `;
           return str;
          }
         )}`,
        transform:
         css.transform.length > 0
          ? str`${css.transform
             .map((transform) => {
              if (transform.includes("scale")) {
               return `${transform}(${
                parseInt(
                 Object.keys(css.transformProp)
                  .filter((e) => e === transform)
                  .map((e) => {
                   const val = css.transformProp[transform];
                   return val;
                  })[0]
                ) >= 0
                 ? parseInt(
                    Object.keys(css.transformProp)
                     .filter((e) => e === transform)
                     .map((e) => {
                      const val = css.transformProp[transform];
                      return val;
                     })[0]
                   )
                 : 1 -
                   parseInt(
                    Object.keys(css.transformProp)
                     .filter((e) => e === transform)
                     .map((e) => {
                      const val = css.transformProp[transform];
                      return val;
                     })[0]
                   ) *
                    0.1 *
                    -1
               })`;
              } else {
               return `${transform}(${parseInt(
                Object.keys(css.transformProp)
                 .filter((e) => e === transform)
                 .map((e) => {
                  const val = css.transformProp[transform];
                  return val;
                 })[0]
               )}${transform.includes("translate") ? "px" : ""}${
                transform.includes("rotate") ? "deg" : ""
               }${transform.includes("skew") ? "deg" : ""})`;
              }
             })
             .toString()
             .replaceAll(",", " ")}`
          : "translateX(0px)",
        opacity: css.opacity,
        height:
         css.height > 0
          ? css.height
          : `${
             grid.columns[i] &&
             grid.columns[i].size.length > 0 &&
             grid.columns[i].size
            }` +
            `${
             grid.columns[i] &&
             grid.columns[i].unit.length > 0 &&
             grid.columns[i].unit
            }`,
        transition: str`${css.transition
         .map(({ property, duration, timingFunction, cubicNs, delay }) => {
          const transString = `width ${parseFloat(duration)}s ${
           timingFunction === "cubic-bezier"
            ? `${timingFunction}(${
               (parseFloat(cubicNs["0"]),
               parseFloat(cubicNs["1"]),
               parseFloat(cubicNs["2"]),
               parseFloat(cubicNs["3"]))
              })`
            : `${timingFunction}`
          } ${delay && `${parseFloat(delay)}s`}`;
          return transString;
         })
         .toString()}`,

        borderTopRightRadius: css.borderTopRightRadius + "%",
        borderBottomRightRadius: css.borderBottomRightRadius + "%",
        borderTopLeftRadius: css.borderTopLeftRadius + "%",
        borderBottomLeftRadius: css.borderBottomLeftRadius + "%",
        width: css.width
         ? css.width > 0
         : `${
            grid.rows[i] && grid.rows[i].size.length > 0 && grid.rows[i].size
           }` +
           `${
            grid.rows[i] && grid.rows[i].unit.length > 0 && grid.rows[i].unit
           }`,
        backgroundImage:
         code.length > 0
          ? `url('${code}');`
          : !background.includes("#") && ` url('${img}')`,
        backgroundColor: background.includes("#") && `${background}`,
       }
      )
     );

     const cellRules = Object.keys(ruleObj)
      .map((k, i) => {
       const rule = Object.values(ruleObj)[i];
       const property = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

       const cl = `${
        property.includes("keyframe") ? `@${property}` : `${property}:`
       }  ${property.includes("keyframe") ? `${rule}` : `${rule};\r`}`;

       return cl;
      })
      .reverse()
      .toString();

     const ruleString = `.a${id} {
     ${cellRules}}\r`;

     const parentkeyframes = str`${css.animation
      .filter((a) => a.animationName.length > 0)
      .map(({ animationName, keyframes }, index) => {
       const keyframe = `${animationName} {
          ${keyframes.map(({ completionPercent, properties }, ind) => {
           const frame = `${completionPercent}% {${properties.map(
            ({ propName, propValue, shadowValues, transValues }, i) => {
             let frameString = [];
             if (propName.includes("transform")) {
              frameString.push(
               ` transform: ${Object.keys(transValues)

                .map((k, i) => {
                 const val = parseFloat(Object.values(transValues)[i]);
                 const trans = ` ${k}(${val}${k.includes("skew") ? "deg" : ""}${
                  k.includes("rotate") ? "deg" : ""
                 }${k.includes("translate") ? "px" : ""}) `;
                 return trans;
                })
                .toString()};`
              );
             } else if (propName.includes("shadow")) {
              frameString.push(
               ` box-shadow: ${Object.values(shadowValues)
                .map((v) => {
                 let val;
                 typeof v === "number"
                  ? (val = ` ${parseFloat(v)}px `)
                  : (val = ` ${v} `);
                 return val;
                })
                .toString()}; `
              );
             } else {
              frameString.push(` ${propName}:${propValue}; `);
             }
             return frameString.toString();
            }
           )} }\r\n`;
           return frame;
          })}
        }
        `;
       return `@keyframes ${keyframe}`;
      })}`;

     const childkeyframes = str`${contentCss.map(({ animation }, index) => {
      const frames = animation
       .filter((a) => a.animationName.length > 0)
       .map(({ animationName, keyframes }) => {
        const keyframe = `${animationName} {
          ${keyframes.map(({ completionPercent, properties }, ind) => {
           const frame = `${completionPercent}% {${properties.map(
            ({ propName, propValue, shadowValues, transValues }, i) => {
             let frameString = [];
             if (propName.includes("transform")) {
              frameString.push(
               ` transform: ${Object.keys(transValues)

                .map((k, i) => {
                 const val = parseFloat(Object.values(transValues)[i]);
                 const trans = ` ${k}(${val}${k.includes("skew") ? "deg" : ""}${
                  k.includes("rotate") ? "deg" : ""
                 }${k.includes("translate") ? "px" : ""}) `;
                 return trans;
                })
                .toString()};`
              );
             } else if (propName.includes("shadow")) {
              frameString.push(
               ` box-shadow: ${Object.values(shadowValues)
                .map((v) => {
                 let val;
                 typeof v === "number"
                  ? (val = ` ${parseFloat(v)}px `)
                  : (val = ` ${v} `);
                 return val;
                })
                .toString()}; `
              );
             } else {
              frameString.push(` ${propName}:${propValue}; `);
             }
             return frameString.toString();
            }
           )} }\r\n`;
           return frame;
          })}
        }
        `;
        return `@keyframes ${keyframe}`;
       });
      return frames;
     })}`;

     const res = [parentkeyframes, childkeyframes, ruleString, childRules]
      .toString()
      .replace(/\,/g, "")
      .replace("base64", "base64,");

     return res;
    })}
  
    ${bodyCells.map(({ id, css, contentCss, content, background, code }, i) => {
     function clean(obj) {
      for (var propName in obj) {
       if (
        obj[propName] === "" ||
        obj[propName] === true ||
        obj[propName] === false
       ) {
        delete obj[propName];
       } else if (
        propName === "boxShadowBottom" ||
        propName === "boxShadowRight" ||
        propName === "boxShadowLeft" ||
        propName === "boxShaadowHoriz" ||
        propName === "boxShadowColor" ||
        propName === "textShadowSize" ||
        propName === "textShadowColor" ||
        propName === "id" ||
        propName === "transformProp"
       ) {
        delete obj[propName];
       }
      }
      return obj;
     }

     let img =
      "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQYV2NkIAKckTrzn5GQOpAik2cmjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQD+Nia8BIDCEQAAAABJRU5ErkJggg==";

     const childRules = contentCss.map((css, i) => {
      const ruleObj = clean(
       Object.assign(
        {},
        {
         ...css,

         boxShadow: `${
          css.boxShaadowHoriz ||
          css.boxShadowVert ||
          css.boxShadowSpread ||
          css.boxShadowBlur
           ? `${css.boxShaadowHoriz ? css.boxShaadowHoriz : "0px"} ${
              css.boxShaadowVert ? css.boxShadowVert : "0px"
             } ${css.boxShaadowBlur ? css.boxShadowBlur : "0px"} ${
              css.boxShaadowSpread ? css.boxShadowSpread : "0px"
             } ${css.boxShaadowColor ? css.boxShadowColor : ""} ${
              css.boxShaadowInset ? css.boxShadowInset : ""
             }`
           : `0px 0px 0px 0px`
         }`,
         textShadow:
          css.textShadowSize === "small" &&
          `-2px -2px 0 ${css.textShadowColor},
               2px -2px 0 ${css.textShadowColor},
               -2px 2px 0 ${css.textShadowColor},
               2px 2px 0 ${css.textShadowColor},
               -3px 0 0 ${css.textShadowColor},
               3px 0 0 ${css.textShadowColor},
               0 -3px 0 ${css.textShadowColor},
               0 3px 0 ${css.textShadowColor}`,
         transform:
          css.transform.length > 0
           ? str`${css.transform
              .map((transform) => {
               if (transform.includes("scale")) {
                return `${transform}(${
                 parseInt(
                  Object.keys(css.transformProp)
                   .filter((e) => e === transform)
                   .map((e) => {
                    const val = css.transformProp[transform];
                    return val;
                   })[0]
                 ) >= 0
                  ? parseInt(
                     Object.keys(css.transformProp)
                      .filter((e) => e === transform)
                      .map((e) => {
                       const val = css.transformProp[transform];
                       return val;
                      })[0]
                    )
                  : 1 -
                    parseInt(
                     Object.keys(css.transformProp)
                      .filter((e) => e === transform)
                      .map((e) => {
                       const val = css.transformProp[transform];
                       return val;
                      })[0]
                    ) *
                     0.1 *
                     -1
                })`;
               } else {
                return `${transform}(${parseInt(
                 Object.keys(css.transformProp)
                  .filter((e) => e === transform)
                  .map((e) => {
                   const val = css.transformProp[transform];
                   return val;
                  })[0]
                )}${transform.includes("translate") ? "px" : ""}${
                 transform.includes("rotate") ? "deg" : ""
                }${transform.includes("skew") ? "deg" : ""})`;
               }
              })
              .toString()
              .replaceAll(",", " ")}`
           : "translateX(0px)",
         opacity: css.opacity,

         animation: str`${css.animation
          .filter((a) => a.animationName.length > 0)
          .map(
           ({
            animationName,
            animationTimingFunction,
            animationDelay,
            animationDirection,
            animationDuration,
            animationFillMode,
            animationIterationCount,
           }) => {
            const str = `${animationName} ${animationDuration}s ${animationTimingFunction} ${animationIterationCount} ${animationDirection} ${animationFillMode} `;
            return str;
           }
          )}`,
         transition: str`${css.transition
          .map(({ property, duration, timingFunction, cubicNs, delay }) => {
           const transString = `width ${parseFloat(duration)}s ${
            timingFunction === "cubic-bezier"
             ? `${timingFunction}(${
                (parseFloat(cubicNs["0"]),
                parseFloat(cubicNs["1"]),
                parseFloat(cubicNs["2"]),
                parseFloat(cubicNs["3"]))
               })`
             : `${timingFunction}`
           } ${delay && `${parseFloat(delay)}s`}`;
           return transString;
          })
          .toString()}`,

         borderTopRightRadius: css.borderTopRightRadius + "%",
         borderBottomRightRadius: css.borderBottomRightRadius + "%",
         borderTopLeftRadius: css.borderTopLeftRadius + "%",
         borderBottomLeftRadius: css.borderBottomLeftRadius + "%",

         backgroundImage:
          code.length > 0
           ? `url('${code}');`
           : !background.includes("#") && ` url('${img}')`,
         backgroundColor: background.includes("#") && `${background}`,
        }
       )
      );
      const cellRules = Object.keys(ruleObj)
       .map((k, i) => {
        const rule = Object.values(ruleObj)[i];
        const property = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

        const cl = `${property}:${rule};\n`;

        return cl;
       })
       .toString();
      const ruleString = `.a${id} span:nth-child(${i + 1}){
     ${cellRules}}\r`;

      return ruleString;
     });

     const ruleObj = clean(
      Object.assign(
       {},
       {
        ...css,
        boxShadow: `${
         css.boxShaadowHoriz ||
         css.boxShadowVert ||
         css.boxShadowSpread ||
         css.boxShadowBlur
          ? `${css.boxShaadowHoriz ? css.boxShaadowHoriz : "0px"} ${
             css.boxShaadowVert ? css.boxShadowVert : "0px"
            } ${css.boxShaadowBlur ? css.boxShadowBlur : "0px"} ${
             css.boxShaadowSpread ? css.boxShadowSpread : "0px"
            } ${css.boxShaadowColor ? css.boxShadowColor : ""} ${
             css.boxShaadowInset ? css.boxShadowInset : ""
            }`
          : `0px 0px 0px 0px`
        }`,
        textShadow:
         css.textShadowSize === "small" &&
         `-2px -2px 0 ${css.textShadowColor},
               2px -2px 0 ${css.textShadowColor},
               -2px 2px 0 ${css.textShadowColor},
               2px 2px 0 ${css.textShadowColor},
               -3px 0 0 ${css.textShadowColor},
               3px 0 0 ${css.textShadowColor},
               0 -3px 0 ${css.textShadowColor},
               0 3px 0 ${css.textShadowColor}`,

        animation: str`${css.animation
         .filter((a) => a.animationName.length > 0)
         .map(
          ({
           animationName,
           animationTimingFunction,
           animationDelay,
           animationDirection,
           animationDuration,
           animationFillMode,
           animationIterationCount,
          }) => {
           const str = `${animationName} ${animationDuration}s ${animationTimingFunction} ${animationIterationCount} ${animationDirection} ${animationFillMode} `;
           return str;
          }
         )}`,
        transform:
         css.transform.length > 0
          ? str`${css.transform
             .map((transform) => {
              if (transform.includes("scale")) {
               return `${transform}(${
                parseInt(
                 Object.keys(css.transformProp)
                  .filter((e) => e === transform)
                  .map((e) => {
                   const val = css.transformProp[transform];
                   return val;
                  })[0]
                ) >= 0
                 ? parseInt(
                    Object.keys(css.transformProp)
                     .filter((e) => e === transform)
                     .map((e) => {
                      const val = css.transformProp[transform];
                      return val;
                     })[0]
                   )
                 : 1 -
                   parseInt(
                    Object.keys(css.transformProp)
                     .filter((e) => e === transform)
                     .map((e) => {
                      const val = css.transformProp[transform];
                      return val;
                     })[0]
                   ) *
                    0.1 *
                    -1
               })`;
              } else {
               return `${transform}(${parseInt(
                Object.keys(css.transformProp)
                 .filter((e) => e === transform)
                 .map((e) => {
                  const val = css.transformProp[transform];
                  return val;
                 })[0]
               )}${transform.includes("translate") ? "px" : ""}${
                transform.includes("rotate") ? "deg" : ""
               }${transform.includes("skew") ? "deg" : ""})`;
              }
             })
             .toString()
             .replaceAll(",", " ")}`
          : "translateX(0px)",
        opacity: css.opacity,
        height:
         css.height > 0
          ? css.height
          : `${
             grid.columns[i] &&
             grid.columns[i].size.length > 0 &&
             grid.columns[i].size
            }` +
            `${
             grid.columns[i] &&
             grid.columns[i].unit.length > 0 &&
             grid.columns[i].unit
            }`,
        transition: str`${css.transition
         .map(({ property, duration, timingFunction, cubicNs, delay }) => {
          const transString = `width ${parseFloat(duration)}s ${
           timingFunction === "cubic-bezier"
            ? `${timingFunction}(${
               (parseFloat(cubicNs["0"]),
               parseFloat(cubicNs["1"]),
               parseFloat(cubicNs["2"]),
               parseFloat(cubicNs["3"]))
              })`
            : `${timingFunction}`
          } ${delay && `${parseFloat(delay)}s`}`;
          return transString;
         })
         .toString()}`,

        borderTopRightRadius: css.borderTopRightRadius + "%",
        borderBottomRightRadius: css.borderBottomRightRadius + "%",
        borderTopLeftRadius: css.borderTopLeftRadius + "%",
        borderBottomLeftRadius: css.borderBottomLeftRadius + "%",
        width: css.width
         ? css.width > 0
         : `${
            grid.rows[i] && grid.rows[i].size.length > 0 && grid.rows[i].size
           }` +
           `${
            grid.rows[i] && grid.rows[i].unit.length > 0 && grid.rows[i].unit
           }`,
        backgroundImage:
         code.length > 0
          ? `url('${code}');`
          : !background.includes("#") && ` url('${img}')`,
        backgroundColor: background.includes("#") && `${background}`,
       }
      )
     );

     const cellRules = Object.keys(ruleObj)
      .map((k, i) => {
       const rule = Object.values(ruleObj)[i];
       const property = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

       const cl = `${
        property.includes("keyframe") ? `@${property}` : `${property}:`
       }  ${property.includes("keyframe") ? `${rule}` : `${rule};\r`}`;

       return cl;
      })
      .reverse()
      .toString();

     const ruleString = `.a${id} {
     ${cellRules}}\r`;

     const parentkeyframes = str`${css.animation
      .filter((a) => a.animationName.length > 0)
      .map(({ animationName, keyframes }, index) => {
       const keyframe = `${animationName} {
          ${keyframes.map(({ completionPercent, properties }, ind) => {
           const frame = `${completionPercent}% {${properties.map(
            ({ propName, propValue, shadowValues, transValues }, i) => {
             let frameString = [];
             if (propName.includes("transform")) {
              frameString.push(
               ` transform: ${Object.keys(transValues)

                .map((k, i) => {
                 const val = parseFloat(Object.values(transValues)[i]);
                 const trans = ` ${k}(${val}${k.includes("skew") ? "deg" : ""}${
                  k.includes("rotate") ? "deg" : ""
                 }${k.includes("translate") ? "px" : ""}) `;
                 return trans;
                })
                .toString()};`
              );
             } else if (propName.includes("shadow")) {
              frameString.push(
               ` box-shadow: ${Object.values(shadowValues)
                .map((v) => {
                 let val;
                 typeof v === "number"
                  ? (val = ` ${parseFloat(v)}px `)
                  : (val = ` ${v} `);
                 return val;
                })
                .toString()}; `
              );
             } else {
              frameString.push(` ${propName}:${propValue}; `);
             }
             return frameString.toString();
            }
           )} }\r\n`;
           return frame;
          })}
        }
        `;
       return `@keyframes ${keyframe}`;
      })}`;

     const childkeyframes = str`${contentCss.map(({ animation }, index) => {
      const frames = animation
       .filter((a) => a.animationName.length > 0)
       .map(({ animationName, keyframes }) => {
        const keyframe = `${animationName} {
          ${keyframes.map(({ completionPercent, properties }, ind) => {
           const frame = `${completionPercent}% {${properties.map(
            ({ propName, propValue, shadowValues, transValues }, i) => {
             let frameString = [];
             if (propName.includes("transform")) {
              frameString.push(
               ` transform: ${Object.keys(transValues)

                .map((k, i) => {
                 const val = parseFloat(Object.values(transValues)[i]);
                 const trans = ` ${k}(${val}${k.includes("skew") ? "deg" : ""}${
                  k.includes("rotate") ? "deg" : ""
                 }${k.includes("translate") ? "px" : ""}) `;
                 return trans;
                })
                .toString()};`
              );
             } else if (propName.includes("shadow")) {
              frameString.push(
               ` box-shadow: ${Object.values(shadowValues)
                .map((v) => {
                 let val;
                 typeof v === "number"
                  ? (val = ` ${parseFloat(v)}px `)
                  : (val = ` ${v} `);
                 return val;
                })
                .toString()}; `
              );
             } else {
              frameString.push(` ${propName}:${propValue}; `);
             }
             return frameString.toString();
            }
           )} }\r\n`;
           return frame;
          })}
        }
        `;
        return `@keyframes ${keyframe}`;
       });
      return frames;
     })}`;

     const res = [parentkeyframes, childkeyframes, ruleString, childRules]
      .toString()
      .replace(/\,/g, "")
      .replace("base64", "base64,");

     return res;
    })}
  
  
  
  `,
     }}></style>
   </Grid>
  </div>
 );
};

export default SecViewer;
