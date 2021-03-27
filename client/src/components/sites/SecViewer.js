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
import _ from "lodash";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import str from "string-template-format-tostring";
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
  addCellTransition,
  addSubCellTransition,
  addBodyCellTransition,
 } = siteContext;

 const [elements, setElements] = useState([]);
 const [subGridView, toggleSubGridView] = useState(false);
 const [bodyGridView, toggleBodyGridView] = useState(false);
 const [cellContentToggle, setCellContentToggle] = useState(false);
 console.log(h);
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

  setNewCells(cells, elements);
  setNewBodyCells(subCells, elements);
  setNewSubCells(bodyCells, elements);
 }, [component, h, li, p, a, icon, button, img, vid]);
 console.log(elements);
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
    ["level"]: "cell",
   };
   console.log(a);
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
       css,
      },
      i
     ) => {
      console.log(content);
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
         propName === "boxShadowTop" ||
         propName === "boxShadowColor" ||
         propName === "textShadowSize" ||
         propName === "textShadowColor" ||
         propName === "transformProp"
        ) {
         delete obj[propName];
        }
       }
       return obj;
      }

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

      const styleTag = clean(
       Object.assign(
        {},
        {
         ...css,
         boxShadow: `${css.boxShadowTop} ${css.boxShadowBottom} ${css.boxShadowLeft} ${css.boxShadowRight} ${css.boxShadowColor} ${css.boxShadowInset}`,
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
         opacity: css.opacity + "%",
         height:
          `${
           grid.columns[i] &&
           grid.columns[i].size.length > 0 &&
           grid.columns[i].size
          }` +
          `${
           grid.columns[i] &&
           grid.columns[i].unit.length > 0 &&
           grid.columns[i].unit
          }`,
         borderTopRightRadius: css.borderTopRightRadius + "%",
         borderBottomRightRadius: css.borderBottomRightRadius + "%",
         borderTopLeftRadius: css.borderTopLeftRadius + "%",
         borderBottomLeftRadius: css.borderBottomLeftRadius + "%",
         width:
          `${
           grid.rows[i] && grid.rows[i].size.length > 0 && grid.rows[i].size
          }` +
          `${
           grid.rows[i] && grid.rows[i].unit.length > 0 && grid.rows[i].unit
          }`,
         backgroundImage:
          code.length > 0
           ? `url(${code})`
           : !background.includes("#") &&
             "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQYV2NkIAKckTrzn5GQOpAik2cmjHgVwhSBDMOpEFkRToXoirAqxKYIQyEuRSgK8SmCKySkCKyQGEUghQD+Nia8BIDCEQAAAABJRU5ErkJggg==)",
         backgroundColor: background.includes("#") && `${background}`,
        }
       )
      );

      console.log(styleTag);
      return (
       <Cell
        height={parseInt(height)}
        width={parseInt(width)}
        style={{}}
        top={parseInt(top)}
        left={parseInt(left)}
        center={position === "true" ? true : false}
        key={id}>
        {viewState === true ? (
         <div>
          <div className='grid-2'>
           <div className='card' style={{ backgroundColor: "#f4f4f4" }}>
            {cellContentToggle === true ? (
             <div style={{ height: "500px", overflowY: "scroll" }}>
              <span className='lead bg-light' style={{ float: "right" }}>
               <a
                onClick={() => setCellContentToggle((prevState) => !prevState)}>
                X
               </a>
              </span>
              <h5>Content Settings</h5>

              <p>
               Please note this effects all content within this cell as it is
               manipulating div level styles.
              </p>

              {Object.keys(css).map((key) => {
               if (key.includes("Color")) {
                return (
                 <label key={key}>
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
               } else if (key === "pos") {
                return (
                 <label key={key}>
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                       onChange={(e) => onChangeCell(i, e, "transition", index)}
                       value={property}
                       name='property'>
                       <option value=''></option>
                       {Object.keys(flatCss).map((c, i) => (
                        <option key={i} value={c}>
                         {c}
                        </option>
                       ))}
                      </select>
                      <h5>Transition Timing</h5>
                      <input
                       type='text'
                       name='duration'
                       onChange={(e) => onChangeCell(i, e, "transition", index)}
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
                       onChange={(e) => onChangeCell(i, e, "transition", index)}
                       placeholder='Enter A Value in seconds'
                      />
                      <h5>Cubic Bez (n,n,n,n)</h5>
                      {timingFunction === "cubic-bezier" &&
                       Object.keys(cubicNs).map((n) => (
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
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

           <div style={styleTag}>
            {content
             .slice()
             .sort((a, b) => {
              return b.sectionOrdinality - a.sectionOrdinality;
             })
             .map(
              (
               {
                text,
                props,
                font,
                fontStyle,
                buttonStyle,
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
               console.log(font);
               if (content[i].hasOwnProperty("props")) {
                const VariableComponent = content[i];

                return VariableComponent;
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
                      backgroundColor: `${background}`,
                      backgroundBlendMode: "multiply",
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
                 </Fragment>
                );
              }
             )}
           </div>
          </Fragment>
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
                    <div
                     className='card'
                     style={{ backgroundColor: "#f4f4f4" }}>
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
                     <div
                      className='card'
                      style={{ backgroundColor: "#f4f4f4" }}>
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
                            onChange={(e) => updateBodyColumn(e, id, i)}
                           />
                           <select
                            name='unit'
                            value={unit}
                            onChange={(e) => updateBodyColumn(e, id, i)}>
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
                            onClick={() => deleteBodyColumn(id, index)}>
                            <a>X</a>
                           </span>
                          </div>
                         </div>
                        ))}
                       {bodyGrids[
                        bodyGrids.findIndex((x) => x.parent === id)
                       ] &&
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
                   {content
                    .slice()
                    .sort(
                     (a, b) =>
                      parseInt(b.sectionOrdinality) -
                      parseInt(a.sectionOrdinality)
                    )
                    .map(
                     (
                      {
                       text,
                       props,
                       fontStyle,
                       font,
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
                         {content
                          .slice()
                          .sort(
                           (a, b) =>
                            parseInt(b.sectionOrdinality) -
                            parseInt(a.sectionOrdinality)
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
         </>
        )}
       </Cell>
      );
     }
    )}
   </Grid>
  </div>
 );
};

export default SecViewer;
