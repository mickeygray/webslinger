import React, {
 Fragment,
 useState,
 useEffect,
 useRef,
 useContext,
 useCallback,
} from "react";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import parse from "html-react-parser";
import YouTube from "react-youtube";
import styled from "styled-components";
import { findIndex, camelCase } from "lodash";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";
import { Grid, Cell } from "styled-css-grid";
import { v4 as uuidV4 } from "uuid";

const SectionViewer = ({
 h,
 p,
 icon,
 li,
 button,
 a,
 vid,
 img,
 VariableComponent,
 setVariableComponent,
 loaded,
 componentString,
 componentH,
 component,
 setComponentString,
}) => {
 const siteContext = useContext(SiteContext);
 const { font, pallet, currentContent, clearCurrentContent } = siteContext;
 const imageContext = useContext(ImageContext);
 const { image, getContentImage } = imageContext;

 const onChangeSection = (e) => {
  setSection({ ...section, [e.target.name]: e.target.value });
 };

 const cellBody = {
  top: 0,
  width: 1,
  height: 2,
  left: 0,
  background: "",
  position: "",
  id: "",
  parent: "",
  viewState: false,
  viewToggle: "",
  code: URL.createObjectURL(new Blob([image], { type: "img/png" })),
  sectionContent: [],
 };

 const [bodyGrid, setBodyGrid] = useState([{ ...cellBody }]);

 const subCell = {
  top: 0,
  width: 1,
  height: 2,
  left: 0,
  background: "",
  position: "",
  id: "",
  grandParent: "",
  viewState: false,
  viewToggle: "",
  code: URL.createObjectURL(new Blob([image], { type: "img/png" })),
  sectionContent: [...bodyGrid],
 };

 const [subGrid, setSubGrid] = useState([{ ...subCell }]);
 const cell = {
  top: 0,
  width: 1,
  height: 2,
  left: 0,
  background: "",
  position: "",
  id: uuidV4(),
  viewState: false,
  viewToggle: "",
  code: URL.createObjectURL(new Blob([image], { type: "img/png" })),
  sectionContent: [...subGrid],
 };

 const [section, setSection] = useState({
  columns: "",
  rows: "",
  background: "",
  layout: "",
  flow: "",
  cells: [{ ...cell }],
 });

 const [cells, setCells] = useState([{ ...cell }]);
 /*
 useEffect(() => {
  setCells([
   ...cells.map(
    ({
     top,
     width,
     height,
     left,
     background,
     position,
     id,
     viewState,
     viewToggle,
     code,
     sectionContent,
    }) => {
     let obj = {
      top,
      width,
      height,
      left,
      background,
      position,
      id,
      viewState,
      viewToggle,
      code,
      sectionContent: [
       ...(component && component.filter((c) => c.props.sectionArea === id))
        .reverse()
        .filter((value, index, self) => {
         return self.findIndex((v) => v.key === value.key) === index;
        }),

       ...h.filter((c) => c.sectionArea === id),

       ...li.filter((c) => c.sectionArea === id),
       ...p.filter((c) => c.sectionArea === id),

       ...a.filter((c) => c.sectionArea === id),

       ...icon.filter((c) => c.sectionArea === id),

       ...button.filter((c) => c.sectionArea === id),
       ...img.filter((c) => c.sectionArea === id),
       ...vid.filter((c) => c.sectionArea === id),
       ...[
        ...(component &&
         component
          .filter((c) => c.props.grandParent === id)
          .reverse()
          .filter((value, index, self) => {
           return self.findIndex((v) => v.key === value.key) === index;
          })),
        ...h.filter((c) => c.grandParent === id),

        ...li.filter((c) => c.grandParent === id),
        ...p.filter((c) => c.grandParent === id),

        ...a.filter((c) => c.grandParent === id),

        ...icon.filter((c) => c.grandParent === id),

        ...button.filter((c) => c.grandParent === id),
        ...img.filter((c) => c.grandParent === id),
        ...vid.filter((c) => c.grandParent === id),
       ],
      ],
     };

     return obj;
    }
   ),
  ]);
 }, [h, p, icon, a, img, vid, button, li, component, setCells]);
*/
 const onChangeCell = (i, e, check) => {
  const { value, name } = e.currentTarget;

  console.log(name);
  if (value === "close") {
   let newResults = [...cells];

   newResults[i] = {
    ...newResults[i],
    ["viewState"]: false,
   };

   console.log(newResults[i]);
   setCells(newResults);
  } else if (value === "open") {
   let newResults = [...cells];
   console.log(newResults, "1");
   newResults[i] = {
    ...newResults[i],
    ["viewState"]: true,
   };
   console.log(newResults[i]);
   setCells(newResults);
   console.log(cells, "3");
  } else if (value === "delete") {
   let newResults = [...cells];
   if (newResults.length === 1) {
    let newResults = [...cells];
    newResults.splice(0, 1);
   } else {
    newResults.splice(i, 1);
   }

   setCells(newResults);
  }
 };

 const addCell = () => {
  const newCell = [
   ...cells,
   {
    ...cell,
    id: uuidV4(),
   },
  ];

  setCells(newCell);
 };

 const addSubCell = (cell) => {
  const newCell = [
   ...cell.sectionContent,
   {
    ...subCell,
    grandParent: cell.id,
    parent: uuidV4(),
   },
  ];

  setCells(newCell);
 };

 const addBodyCell = (cell) => {
  const newCell = [
   ...cell.sectionContent,
   {
    ...subCell,
    parent: cell.id,
    child: uuidV4(),
   },
  ];

  setCells(newCell);
 };

 console.log(cells);
 return (
  <>
   <div className='grid-5'>
    <select name='columns' onChange={(e) => onChangeSection(e)}>
     <option>Width</option>
     <option value='1'>One</option>
     <option value='2'>Two</option>
     <option value='3'>Three</option>
     <option value='4'>Four</option>
     <option value='5'>Five</option>
     <option value='6'>Six</option>
     <option value='7'>Seven</option>
     <option value='8'>Eight</option>
     <option value='repeat(auto-fit,minmax(120px,1fr))'>Responsive</option>
    </select>
    <select name='rows' onChange={(e) => onChangeSection(e)}>
     <option>Height</option>
     <option value='1'>One</option>
     <option value='2'>Two</option>
     <option value='3'>Three</option>
     <option value='4'>Four</option>
     <option value='5'>Five</option>
     <option value='6'>Six</option>
     <option value='7'>Seven</option>
     <option value='8'>Eight</option>
    </select>
    <select name='layout' onChange={(e) => onChangeSection(e)}>
     <option>Layout</option>
     <option value='row'>Row</option>
     <option value='column'>Column</option>
     <option value='row dense'>Row Dense</option>
    </select>

    <button className='btn btn-block btn-dark' onClick={() => addCell()}>
     Add Cell{" "}
    </button>
   </div>

   <Grid columns={section.columns} rows={section.rows} flow={section.layout}>
    {cells.map(
     ({
      id,
      width,
      height,
      top,
      left,
      position,
      code,
      viewState,
      background,
      sectionContent,
     }) => {
      const index = cells.findIndex((x) => x.id === id);
      console.log(index);
      return (
       <Cell
        key={id}
        style={
         cell.background.includes("#")
          ? {
             background: `${background}`,
             border: "#ccc 1px dotted",
            }
          : {
             background: `url(${code})`,
             border: "#ccc 1px dotted",
            }
        }
        height={height}
        width={width}
        top={top}
        left={left}
        center={position === "true" ? true : false}>
        {viewState === true ? (
         <div className='text-center'>
          <form onSubmit={(e) => e.preventDefault()}>
           <select
            name='background'
            onChange={(e) => {
             onChangeCell(index, e);
             {
              currentContent && getContentImage(currentContent);
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
             <option value={currentContent}>Set Image</option>
            )}
           </select>

           <input
            placeholder='height'
            type='text'
            name='height'
            value={height}
            onChange={(e) => onChangeCell(index, e)}
           />

           <input
            placeholder='width'
            type='text'
            name='width'
            value={width}
            onChange={(e) => onChangeCell(index, e)}
           />
           <input
            placeholder='top'
            type='text'
            name='top'
            value={top}
            onChange={(e) => onChangeCell(index, e)}
           />

           <input
            placeholder='left'
            type='text'
            name='left'
            value={left}
            onChange={(e) => onChangeCell(index, e)}
           />

           <div className='grid-2'>
            <div>
             {" "}
             <input
              type='radio'
              name='position'
              value='false'
              checked={position === "false"}
              onChange={(e) => onChangeCell(index, e)}
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
              onChange={(e) => onChangeCell(index, e)}
             />
             Center{" "}
            </div>

            <button
             onClick={addSubCell(cells[index])}
             className='btn btn-dark btn-sm'>
             Add Grid Layer
            </button>
           </div>
           <select
            name='viewToggle'
            style={{ height: "20px", width: "75px" }}
            className='btn btn-block'
            onChange={(e) => onChangeCell(index, e)}>
            <option value=''></option>
            <option value='close'>Close</option>
           </select>
          </form>
         </div>
        ) : (
         <Fragment>
          <div
           style={{
            height: "10px",
            width: "10px",
            float: "left",
            padding: 0,
            background: "#f4f4f4",
            position: "absolute",
            zIndex: 9999999,
           }}>
           <a>
            <select
             name='viewToggle'
             style={{
              height: "10px",
              width: "10px",

              WebkitAppearance: "none",
              MozAppearance: "none",
              texIndent: "1px",
              textOverflow: "",
              zIndex: 9999999,
             }}
             onChange={(e) => onChangeCell(index, e)}>
             <option style={{ textSize: "3px" }} value=''>
              {index}
             </option>
             <option style={{ textSize: "3px" }} value='open'>
              Open
             </option>
             <option style={{ textSize: "3px" }} value='delete'>
              Delete
             </option>
            </select>
           </a>
          </div>

          <div
           id={`component${index}`}
           name='sectionContent'
           onChange={(e) => onChangeCell(index, e)}
           style={{
            wordWrap: "breakWord",
            wordBreak: "breakAll",
           }}
           onClick={(e) => onChangeCell(index, e)}>
           {sectionContent &&
            sectionContent

             .filter((h) =>
              h.props ? h.props.sectionArea === index : h.sectionArea === index
             )
             .filter((h) => h.componentName === undefined)

             .sort((a, b) => a.sectionOrdinality - b.sectionOrdinality)
             .map((content) => {
              const {
               text,
               props,
               fontStyle,
               faIcon,
               faIconPosition,
               type,
               headingSize,
               action,
               color,
               url,
               autoplay,
               sectionContent,
              } = content;

              if (content.hasOwnProperty("props")) {
               const VariableComponent = content;
               return VariableComponent;
              } else if (content.hasOwnProperty("sectionContent")) {
               console.log(content, "but there is no content");
               const subGrid = sectionContent.map(({ sectionContent }) => {
                sectionContent.map(
                 ({
                  text,
                  props,
                  fontStyle,
                  faIcon,
                  faIconPosition,
                  type,
                  headingSize,
                  action,
                  height,
                  width,
                  top,
                  left,
                  color,
                  url,
                  autoplay,
                  sectionContent,
                 }) => {
                  if (content.hasOwnProperty("props")) {
                   const VariableComponent = content;
                   return VariableComponent;
                  } else if (content.hasOwnProperty("sectionContent")) {
                   const bodyGrid = sectionContent.map(({ sectionContent }) => {
                    content.map(
                     ({
                      text,
                      props,
                      fontStyle,
                      faIcon,
                      faIconPosition,
                      type,
                      headingSize,
                      action,
                      color,
                      top,
                      left,
                      height,
                      width,
                      url,
                      autoplay,
                     }) => {
                      if (content.hasOwnProperty("props")) {
                       const VariableComponent = content;
                       return (
            
                
                          VariableComponent
                 
                       );
                      } else
                       return (
                           <Fragment>
                            <div
                             style={{
                              height: "10px",
                              width: "10px",
                              float: "left",
                              padding: 0,
                              background: "#f4f4f4",
                              position: "absolute",
                              zIndex: 9999999,
                             }}>
                             <a>
                              <select
                               name='viewToggle'
                               style={{
                                height: "10px",
                                width: "10px",

                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                texIndent: "1px",
                                textOverflow: "",
                                zIndex: 9999999,
                               }}
                               onChange={(e) => onChangeCell(index, e)}>
                               <option
                                style={{
                                 textSize: "3px",
                                }}
                                value=''>
                                {index}
                               </option>
                               <option
                                style={{
                                 textSize: "3px",
                                }}
                                value='open'>
                                Open
                               </option>
                               <option
                                style={{
                                 textSize: "3px",
                                }}
                                value='delete'>
                                Delete
                               </option>
                              </select>
                             </a>
                            </div>

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
                              {type === "img" ? <img src={code} /> : ""}
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
                          )}
                         </Cell>
                        </Grid>
                       );
                     }
                    );
                   });
                   return bodyGrid;
                  } else
                   return (
                    <Grid>
                     <Cell>
                      {viewState === true ? (
                       <div className='text-center'>
                        <form onSubmit={(e) => e.preventDefault()}>
                         <select
                          name='background'
                          onChange={(e) => {
                           onChangeCell(index, e);
                           {
                            currentContent && getContentImage(currentContent);
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
                          <option value={pallet && pallet.danger}>
                           Danger
                          </option>
                          <option value={pallet && pallet.success}>
                           Success
                          </option>
                          {currentContent && (
                           <option value={currentContent}>Set Image</option>
                          )}
                         </select>

                         <input
                          placeholder='height'
                          type='text'
                          name='height'
                          value={cells[index].height}
                          onChange={(e) => onChangeCell(index, e)}
                         />

                         <input
                          placeholder='width'
                          type='text'
                          name='width'
                          onChange={(e) => onChangeCell(index, e)}
                         />
                         <input
                          placeholder='top'
                          type='text'
                          name='top'
                          onChange={(e) => onChangeCell(index, e)}
                         />

                         <input
                          placeholder='left'
                          type='text'
                          name='left'
                          onChange={(e) => onChangeCell(index, e)}
                         />

                         <div className='grid-2'>
                          <div>
                           {" "}
                           <input
                            type='radio'
                            name='position'
                            value='false'
                            checked={position === "false"}
                            onChange={(e) => onChangeCell(index, e)}
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
                            onChange={(e) => onChangeCell(index, e)}
                           />
                           Center{" "}
                          </div>

                          <button
                           onClick={addSubCell(cells[index])}
                           className='btn btn-dark btn-sm'>
                           Add Grid Layer
                          </button>
                         </div>
                         <select
                          name='viewToggle'
                          style={{
                           height: "20px",
                           width: "75px",
                          }}
                          className='btn btn-block'
                          onChange={(e) => onChangeCell(index, e)}>
                          <option value=''></option>
                          <option value='close'>Close</option>
                         </select>
                        </form>
                       </div>
                      ) : (
                       <Fragment>
                        <div
                         style={{
                          height: "10px",
                          width: "10px",
                          float: "left",
                          padding: 0,
                          background: "#f4f4f4",
                          position: "absolute",
                          zIndex: 9999999,
                         }}>
                         <a>
                          <select
                           name='viewToggle'
                           style={{
                            height: "10px",
                            width: "10px",

                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            texIndent: "1px",
                            textOverflow: "",
                            zIndex: 9999999,
                           }}
                           onChange={(e) => onChangeCell(index, e)}>
                           <option
                            style={{
                             textSize: "3px",
                            }}
                            value=''>
                            {index}
                           </option>
                           <option
                            style={{
                             textSize: "3px",
                            }}
                            value='open'>
                            Open
                           </option>
                           <option
                            style={{
                             textSize: "3px",
                            }}
                            value='delete'>
                            Delete
                           </option>
                          </select>
                         </a>
                        </div>

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
                          {type === "img" ? <img src={code} /> : ""}
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
                      )}
                     </Cell>
                    </Grid>
                   );
                 }
                );
               });
               return subGrid;
              } else {
               return (
                <>
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
                   <i style={{ color: `${color}` }} className={faIcon} />
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
                    style={{ background: `${background}` }}
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
                  {type === "img" ? <img src={code} /> : ""}
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
                </>
               );
              }
             })}
          </div>
         </Fragment>
        )}
       </Cell>
      );
     }
    )}
   </Grid>
  </>
 );
};

export default SectionViewer;
