import React, {
 Fragment,
 useReducer,
 useState,
 useEffect,
 useContext,
} from "react";
import produce from "immer";
import parse from "html-react-parser";
import { camelCase } from "lodash";
import { Grid, Cell } from "styled-css-grid";
import ImageContext from "../../context/image/imageContext";
import SiteContext from "../../context/site/siteContext";
import YouTube from "react-youtube";
import InputRange from "react-input-range";
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
}) => {
 const siteContext = useContext(SiteContext);
 const imageContext = useContext(ImageContext);
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
 } = siteContext;

 console.log(cells);
 const [elements, setElements] = useState([]);
 const [subGridView, toggleSubGridView] = useState(false);
 const [bodyGridView, toggleBodyGridView] = useState(false);
 const [cellContentToggle, setCellContentToggle] = useState(false);

 useEffect(() => {
  setElements((prevState) =>
   [...prevState, ...component].reverse().filter((value, index, self) => {
    return self.findIndex((v) => v.key === value.key) === index;
   })
  );
  setElements((prevState) =>
   [...prevState, ...h, ...li, ...p, ...a, ...icon, ...button, ...img, ...vid]
    .filter((c) => !c.componentName)
    .reverse()
    .filter((value, index, self) => {
     return self.findIndex((v) => v.code === value.code) === index;
    })
  );

  setNewCells(cells, elements);
  setNewBodyCells(subCells, elements);
  setNewSubCells(bodyCells, elements);
 }, [component, h, li, p, a, icon, button, img, vid]);

 useEffect(() => {
  if (
   contentImage !== null &&
   contentImage.background === true &&
   contentImage.level === "cell"
  ) {
   let newResults = [...cells];
   newResults[contentImage.imgIndex] = {
    ...newResults[contentImage.imgIndex],
    ["background"]: "image",
    ["code"]: contentImage.code,
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
    ["background"]: "image",
    ["code"]: contentImage.code,
    ["level"]: "subCell",
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
    ["level"]: "bodyCell",
   };

   setNewBodyCells(newResults);
   clearCurrentImage();
  }
 }, [contentImage, imageContext]);

 return (
  <div>
   <Grid
    key={grid.key}
    columns={grid.columnString}
    rows={grid.rowString}
    flow={grid.direction}
    justifyContent={grid.horizontalAlignment}
    alignContent={grid.verticalAlignment}>
    {cells.map(
     (
      {
       top,
       left,
       position,
       background,
       height,
       width,
       id,
       viewState,
       content,
       code,
       borderRadius,
       opacity,
      },
      i
     ) => (
      <Cell
       style={
        cells[i].background.includes("#")
         ? {
            background: `${background}`,
            border: "#ccc 1px dotted",
           }
         : {
            backgroundImage: code
             ? `url(${code})`
             : " url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQYV2NkIAKckTrzn5GQOpAik2cmjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQD+Nia8BIDCEQAAAABJRU5ErkJggg==)",
            backgroundSize: code ? "100%" : "20px 20px",
            border: "#ccc 1px dotted",
           }
       }
       height={parseInt(height)}
       width={parseInt(width)}
       top={parseInt(top)}
       left={parseInt(left)}
       center={position === "true" ? true : false}
       key={id}>
       {viewState === true ? (
        <div>
         <div className='grid-2'>
          <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
           {cellContentToggle === true ? (
            <div>
             <h5>Content Settings</h5>
             <p>
              Please note this effects all content within this cell as it is
              manipulating div level styles.
             </p>
             <label>Opacity</label>
            </div>
           ) : (
            ""
           )}
           <h5>Cell Settings</h5>
           <select
            name='background'
            onChange={(e) => {
             onChangeCell(i, e);
             {
              currentContent &&
               getContentImage(currentContent.content, i, "background", "cell");
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
            placeholder='height'
            type='text'
            name='height'
            value={height}
            onChange={(e) => onChangeCell(i, e)}
           />
           <label>Column Span</label>
           <input
            placeholder='width'
            type='text'
            name='width'
            value={width}
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
              id=''
              onChange={(e) => onChangeCell(i, e)}
             />
             Center{" "}
            </div>
           </div>
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
        <Grid
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
          subGrids[subGrids.findIndex((x) => x.parent === id)].verticalAlignment
         }>
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
         {content.map(
          (
           {
            text,
            props,
            fontStyle,
            faIcon,
            faIconPosition,
            type,
            headingSize,
            action,
            background,
            color,
            top,
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
           } else
            return (
             <Fragment>
              <div id={`component${i}`} name='sectionContent'>
               <span>
                {type === "h" && headingSize === "h1" ? (
                 <h1
                  style={{
                   color: `${color}`,
                   fontFamily: `${camelCase(font)}`,
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                   fontFamily: `${camelCase(font)}`,
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                   fontFamily: `${camelCase(font)}`,
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                   fontFamily: `${camelCase(font)}`,
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                   fontFamily: `${camelCase(font)}`,
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                   fontFamily: `${camelCase(font)}`,
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                 <a href={url} target='_blank' rel='noopener noreferrer'>
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                   {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
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
                  src={code}
                  style={{ height: `${height}px`, width: `${width}px` }}
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
              </div>
             </Fragment>
            );
          }
         )}
         {subCells
          .filter((g) => g.grandParent === id)
          .map(
           (
            {
             top,
             id,
             left,
             width,
             height,
             grandParent,
             subViewState,
             content,
            },
            i
           ) => {
            const index = cells.findIndex((x) => x.id === grandParent);
            return (
             <Cell
              height={height}
              width={width}
              style={
               subCells[i].background.includes("#")
                ? {
                   background: `${background}`,
                   border: "#ccc 1px dotted",
                  }
                : {
                   backgroundImage: code
                    ? `url(${code})`
                    : " url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQYV2NkIAKckTrzn5GQOpAik2cmjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQD+Nia8BIDCEQAAAABJRU5ErkJggg==)",
                   backgroundSize: code ? "100%" : "20px 20px",
                   border: "#ccc 1px dotted",
                  }
              }
              top={top}
              left={left}
              key={id}>
              <>
               {subViewState === true ? (
                <div>
                 <div className='grid-2'>
                  <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
                   {" "}
                   <h5>Cell Settings</h5>
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
                        "subCell"
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
                   <input
                    placeholder='height'
                    type='text'
                    name='height'
                    value={height}
                    onChange={(e) => onChangeSubCell(i, e)}
                   />
                   <input
                    placeholder='width'
                    type='text'
                    name='width'
                    value={width}
                    onChange={(e) => onChangeSubCell(i, e)}
                   />
                   <input
                    placeholder='top'
                    type='text'
                    name='top'
                    value={top}
                    onChange={(e) => onChangeSubCell(i, e)}
                   />
                   <input
                    placeholder='left'
                    type='text'
                    name='left'
                    value={left}
                    onChange={(e) => onChangeSubCell(i, e)}
                   />
                  </div>
                  {bodyGridView === false ? (
                   <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
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
                     className='btn btn-dark btn-sm'
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
                    <button
                     className='btn btn-dark btn-sm'
                     onClick={() =>
                      toggleBodyGridView((prevState) => !prevState)
                     }>
                     Hide Grid
                    </button>
                    <div className='grid-2'>
                     {bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
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
                          onChange={(e) => updateBodyColumn(e, id, i)}
                         />
                         <select
                          name='unit'
                          value={unit}
                          onChange={(e) => updateBodyColumn(e, id, i)}>
                          <option value='px'>Pixels</option>
                          <option value='fr'>Fractions</option>
                          <option value='repeat(auto-fit,minmax(120px,1fr))'>
                           Responsive
                          </option>
                         </select>
                         <span
                          style={{ float: "right" }}
                          className='color-background lead'
                          onClick={() => deleteBodyColumn(id, index)}>
                          <a>X</a>
                         </span>
                        </div>
                       </div>
                      ))}
                     {bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                      bodyGrids[
                       bodyGrids.findIndex((x) => x.parent === id)
                      ].rows.map(({ size, unit }, index) => (
                       <div>
                        <input
                         placeholder='Row Size...'
                         type='text'
                         name='size'
                         value={size}
                         onChange={(e) => updateBodyRow(e, id, i)}
                        />
                        <select
                         name='unit'
                         value={unit}
                         onChange={(e) => updateBodyRow(e, id, i)}>
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
                  )}
                 </div>

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
                    id=''
                    onChange={(e) => onChangeSubCell(i, e)}
                   />
                   Center{" "}
                  </div>
                 </div>
                 <button
                  className='btn btn-sm btn-dark'
                  onClick={() => addBodyCell(id)}>
                  Add Body Cell
                 </button>
                 <select
                  name='viewToggle'
                  style={{ height: "20px", width: "75px" }}
                  className='btn btn-block'
                  onChange={(e) => {
                   onChangeSubCell(i, e);
                  }}>
                  <option value=''></option>
                  <option value='delete'>Delete Cell</option>
                  <option value='close'>Close</option>
                 </select>
                </div>
               ) : (
                <>
                 <Grid
                  key={
                   bodyGrids[bodyGrids.findIndex((x) => x.parent === id)] &&
                   bodyGrids[bodyGrids.findIndex((x) => x.parent === id)].key
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
                  {content.map(
                   (
                    {
                     text,
                     props,
                     fontStyle,
                     faIcon,
                     faIconPosition,
                     type,
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
                    } else
                     return (
                      <Fragment>
                       <div
                        id={`component${index}`}
                        name='sectionContent'
                        onChange={(e) => onChangeCell(index, e)}
                        style={{
                         wordWrap: "breakWord",
                         wordBreak: "breakAll",
                        }}
                        onClick={(e) => onChangeCell(index, e)}>
                        <span>
                         {type === "h" && headingSize === "h1" ? (
                          <h1
                           style={{
                            color: `${color}`,
                            fontFamily: `${camelCase(font)}`,
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
                            fontFamily: `${camelCase(font)}`,
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
                            fontFamily: `${camelCase(font)}`,
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
                            fontFamily: `${camelCase(font)}`,
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
                            fontFamily: `${camelCase(font)}`,
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
                            fontFamily: `${camelCase(font)}`,
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
                           src={code}
                           style={{
                            height: `${height}px`,
                            width: `${width}px`,
                           }}
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
                       </div>
                      </Fragment>
                     );
                   }
                  )}
                  {bodyCells
                   .filter((g) => g.parent === id)
                   .map(
                    ({
                     height,
                     left,
                     width,
                     top,
                     id,
                     content,
                     bodyViewState,
                    }) => (
                     <Cell
                      height={height}
                      width={width}
                      style={
                       bodyCells[i].background.includes("#")
                        ? {
                           background: `${background}`,
                           border: "#ccc 1px dotted",
                          }
                        : {
                           backgroundImage: code
                            ? `url(${code})`
                            : " url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQYV2NkIAKckTrzn5GQOpAik2cmjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQD+Nia8BIDCEQAAAABJRU5ErkJggg==)",
                           backgroundSize: code ? "100%" : "20px 20px",
                           border: "#ccc 1px dotted",
                          }
                      }
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
                        </div>{" "}
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
                        <input
                         placeholder='height'
                         type='text'
                         name='height'
                         value={height}
                         onChange={(e) => onChangeBodyCell(i, e)}
                        />
                        <input
                         placeholder='width'
                         type='text'
                         name='width'
                         value={width}
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
                      ) : (
                       ""
                      )}
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
                      </div>{" "}
                      <>
                       {content.map(
                        (
                         {
                          text,
                          props,
                          fontStyle,
                          faIcon,
                          faIconPosition,
                          type,
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
                         } else
                          return (
                           <Fragment>
                            <div
                             id={`component${index}`}
                             name='sectionContent'
                             onChange={(e) => onChangeCell(index, e)}
                             style={{
                              wordWrap: "breakWord",
                              wordBreak: "breakAll",
                             }}
                             onClick={(e) => onChangeCell(index, e)}>
                             <span>
                              {type === "h" && headingSize === "h1" ? (
                               <h1
                                style={{
                                 color: `${color}`,
                                 fontFamily: `${camelCase(font)}`,
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
                                 fontFamily: `${camelCase(font)}`,
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
                                 fontFamily: `${camelCase(font)}`,
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
                                 fontFamily: `${camelCase(font)}`,
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
                                 fontFamily: `${camelCase(font)}`,
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
                                 fontFamily: `${camelCase(font)}`,
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
                                src={code}
                                style={{
                                 height: `${height}px`,
                                 width: `${width}px`,
                                }}
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
                            </div>
                           </Fragment>
                          );
                        }
                       )}
                      </>
                     </Cell>
                    )
                   )}
                 </Grid>

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
                </>
               )}
              </>
             </Cell>
            );
           }
          )}
        </Grid>
       )}
      </Cell>
     )
    )}
   </Grid>
  </div>
 );
};

export default SecViewer;
