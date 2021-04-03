import React, {
 Fragment,
 useState,
 useContext,
 useEffect,
 useRef,
} from "react";
import { findIndex, camelCase } from "lodash";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";
import { useAppContext } from "../../context/site/SiteState";
import { v4 as uuidV4 } from "uuid";
const SectionManager = ({
 h,
 p,
 icon,
 li,
 button,
 a,
 vid,
 img,
 onChangeA,
 onChangeButton,
 onChangeH,
 onChangeIcon,
 onChangeImg,
 onChangeVid,
 onChangeP,
 onChangeLi,
 contentList,
 setContentList,
}) => {
 const { getStateContent } = useAppContext();
 const siteContext = useContext(SiteContext);
 const {
  font,
  pallet,
  currentContent,
  clearCurrentContent,
  myComponents,
  cellStructure,
 } = siteContext;
 const imageContext = useContext(ImageContext);
 const { contentImage } = imageContext;
 const [actionComponents, setActionComponents] = useState({
  actionComponent1: "",
  actionComponent2: "",
 });

 useEffect(() => {
  if (currentContent != null) {
   getStateContent(currentContent);
  }
 }, [currentContent]);

 return (
  <Fragment>
   <div className='bg-light grid-4'>
    {h.map((row, i) => {
     const { compStyle, componentName } = row;
     return (
      <div style={{ width: "200px" }} key={i} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         let delCheck = 1;
         if (h.length === 1) {
          h.splice(0, 1);
         } else if (h.length > 1 && i) {
          h.splice(i, 1);
         }
         onChangeH(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""}{" "}
        {row.componentName && row.componentName} Heading
       </h3>
       {Object.keys(row).map((key) => (
        <div>
         {key === "fontStyle" ? (
          <select
           name='fontStyle'
           onChange={(e) => onChangeH(i, e, row.componentName, compStyle)}>
           <option>Font Styling...</option>
           <option value='b'>Bold</option>
           <option value='i'>Italic</option>
          </select>
         ) : (
          ""
         )}

         {key === "color" && pallet ? (
          <div>
           <select
            name='color'
            onChange={(e) => onChangeH(i, e, row.componentName, compStyle)}>
            <option>Font Color...</option>
            <option value={pallet.primary}>Primary</option>
            <option value={pallet.dark}>Dark</option>
            <option value={pallet.light}>Light</option>
            <option value={pallet.danger}>Danger</option>
            <option value={pallet.primary}>Success</option>
           </select>
           <h5>Current Text Color</h5>
           <input type='text' value={row[key]} name='color' />
           <button
            className='btn btn-dark btn-sm'
            onClick={(e) => onChangeH(i, e, row.componentName, compStyle)}>
            Set Text Color
           </button>
          </div>
         ) : (
          ""
         )}

         {key === "font" ? (
          <div>
           <h5>Current Font</h5>
           <input type='text' value={row[key]} />
           <button
            className='btn btn-dark btn-sm'
            onClick={(e) => onChangeH(i, e, font, "font")}>
            Set Font
           </button>
          </div>
         ) : (
          ""
         )}

         {key === "sectionOrdinality" ? (
          <div>
           <h5>Order the elements 1 is the first to appear</h5>
           <input
            type='number'
            name='sectionOrdinality'
            onChange={(e) => onChangeH(i, e, row.componentName, compStyle)}
            value={row[key]}
           />
          </div>
         ) : (
          ""
         )}

         {key === "background" && pallet ? (
          <div>
           <select name='background' onChange={(e) => onChangeH(i, e)}>
            <option>Background Color...</option>
            <option value={pallet.primary}>Primary</option>
            <option value={pallet.dark}>Dark</option>
            <option value={pallet.light}>Light</option>
            <option value={pallet.danger}>Danger</option>
            <option value={pallet.primary}>Success</option>
           </select>
          </div>
         ) : (
          ""
         )}

         {key === "headingSize" ? (
          <select
           name='headingSize'
           onChange={(e) => onChangeH(i, e)}
           value={row[key]}>
           <option>Heading Size...</option>
           <option value='h1'>X-Large</option>
           <option value='h2'>Large</option>
           <option value='h3'>Standard</option>
           <option value='h4'>Small</option>
           <option value='h5'>x-small</option>
          </select>
         ) : (
          ""
         )}
         {key === "faIconPosition" ? (
          <select name='faIconPosition' onChange={(e) => onChangeH(i, e)}>
           <option>Icon Position...</option>
           <option value='top'>Top</option>
           <option value='front'>Front</option>
           <option value='back'>Back</option>
           <option value='bottom'>Bottom</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionArea" ? (
          <select name='sectionArea' onChange={(e) => onChangeH(i, e)}>
           <option></option>
           {cellStructure.map((cell) => {
            const { name, id, children } = cell;
            const subs = children.map((sub) => {
             const { name, id, bodyCells } = sub;

             const body = bodyCells.map(({ name, id }) => (
              <option value={id}>{name}</option>
             ));

             return [<option value={id}>{name}</option>, ...body];
            });

            const cell1 = <option value={id}>{name}</option>;

            const cellMap = [cell1, ...subs.flat()];

            return cellMap;
           })}
          </select>
         ) : (
          ""
         )}
         {key === "text" ? (
          <div>
           <input
            type='text'
            value={row[key]}
            placeholder='Text..'
            name={key}
            onChange={(e) => onChangeH(i, e)}
           />
           <span style={{ float: "right" }}>
            <button
             value={row[key]}
             className='btn btn-sm'
             onClick={(e) => {
              const c = currentContent.content;

              onChangeH(i, e, c, key, "current");

              clearCurrentContent();
             }}>
             Add Content
            </button>
           </span>
          </div>
         ) : (
          ""
         )}
         {key === "url" ? (
          <input
           type='text'
           placeholder='Url...'
           value={row[key]}
           name={key}
           onChange={(e) => onChangeH(i, e)}
          />
         ) : (
          ""
         )}
         {key === "faIcon" ? (
          <div className='all-center'>
           <a
            className='lead'
            style={{ color: "#f4f4f4" }}
            href='https://fontawesome.com/cheatsheet/'>
            Icons
           </a>
           <input
            type='text'
            placeholder='Type your Font Awesome Icon Here'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeH(i, e)}
           />
          </div>
         ) : (
          ""
         )}
        </div>
       ))}
      </div>
     );
    })}

    {p.map((row, i) => {
     let delCheck = 1;
     const componentName = row.componentName;
     const compStyle = row.compStyle;

     return (
      <div style={{ width: "200px" }} key={i} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         if (p.length === 1) {
          p.splice(0, 1);
         } else {
          p.splice(i, 1);
         }
         onChangeP(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {" "}
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""} Paragraph
       </h3>
       {Object.keys(row).map((key) => (
        <div key={key}>
         {key === "fontStyle" ? (
          <select
           value={row[key]}
           name='fontStyle'
           onChange={(e) => onChangeP(i, e)}>
           <option>Font Styling...</option>
           <option value='b'>Bold</option>
           <option value='i'>Italic</option>
          </select>
         ) : (
          ""
         )}

         {key === "sectionOrdinality" ? (
          <div>
           <h5>Order the elements 1 is the first to appear</h5>
           <input
            type='number'
            name='sectionOrdinality'
            onChange={(e) => onChangeP(i, e)}
            value={row[key]}
           />
          </div>
         ) : (
          ""
         )}

         {key === "font" ? (
          <div>
           <h5>Current Font</h5>
           <input type='text' value={row[key]} />
           <button
            className='btn btn-dark btn-sm'
            onClick={(e) => onChangeP(i, e, font, "font")}>
            Set Font
           </button>
          </div>
         ) : (
          ""
         )}

         {key === "color" && pallet ? (
          <select
           value={row[key]}
           name='color'
           onChange={(e) => onChangeP(i, e, componentName, compStyle)}>
           <option>Font Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}

         {key === "background" && pallet ? (
          <select
           value={row[key]}
           name='background'
           onChange={(e) => onChangeP(i, e, componentName, compStyle)}>
           <option>Background Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionArea" ? (
          <select name='sectionArea' onChange={(e) => onChangeP(i, e)}>
           <option></option>
           {cellStructure.map((cell) => {
            const { name, id, children } = cell;
            const subs = children.map((sub) => {
             const { name, id, bodyCells } = sub;

             const body = bodyCells.map(({ name, id }) => (
              <option value={id}>{name}</option>
             ));

             return [<option value={id}>{name}</option>, ...body];
            });

            const cell1 = <option value={id}>{name}</option>;

            const cellMap = [cell1, ...subs.flat()];

            return cellMap;
           })}
          </select>
         ) : (
          ""
         )}
         {key === "text" ? (
          <div>
           <input
            type='text'
            value={row[key]}
            placeholder='Text..'
            name={key}
            onChange={(e) => onChangeP(i, e, componentName, compStyle)}
           />
           <span style={{ float: "right" }}>
            <button
             className='btn btn-sm'
             onClick={(e) => {
              const c = currentContent.content;
              onChangeP(i, e, c, key, "current");

              clearCurrentContent();
             }}>
             Add Content
            </button>
           </span>
          </div>
         ) : (
          ""
         )}
         {key === "url" ? (
          <input
           type='text'
           placeholder='Url...'
           value={row[key]}
           name={key}
           onChange={(e) => onChangeP(i, e)}
          />
         ) : (
          ""
         )}
         {key === "faIcon" ? (
          <div className='all-center'>
           <a
            className='lead'
            style={{ color: "#f4f4f4" }}
            href='https://fontawesome.com/cheatsheet/'>
            Icons
           </a>
           <input
            type='text'
            placeholder='Type your Font Awesome Icon Here'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeP(i, e, componentName, compStyle)}
           />
          </div>
         ) : (
          ""
         )}
        </div>
       ))}
      </div>
     );
    })}

    {icon.map((row, i) => {
     let delCheck = 1;

     const componentName = row.componentName;
     const compStyle = row.compStyle;
     return (
      <div style={{ width: "200px" }} key={row.id} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         if (icon.length === 1) {
          icon.splice(0, 1);
         } else {
          icon.splice(i, 1);
         }
         onChangeIcon(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {" "}
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""} Icon
       </h3>
       {Object.keys(row).map((key) => (
        <div>
         {key === "fontStyle" ? (
          <select
           name='fontStyle'
           value={row[key]}
           onChange={(e) => onChangeIcon(i, e, componentName, compStyle)}>
           <option>Font Styling...</option>
           <option value='b'>Bold</option>
           <option value='i'>Italic</option>
          </select>
         ) : (
          ""
         )}
         {key === "faIconPosition" ? (
          <select
           value={row[key]}
           name='faIconPosition'
           onChange={(e) => onChangeIcon(i, e, componentName, compStyle)}>
           <option>Icon Position...</option>
           <option value='top'>Top</option>
           <option value='front'>Front</option>
           <option value='back'>Back</option>
           <option value='bottom'>Bottom</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionOrdinality" ? (
          <div>
           <h5>Order the elements 1 is the first to appear</h5>
           <input
            type='number'
            name='sectionOrdinality'
            onChange={(e) => onChangeIcon(i, e, componentName, compStyle)}
            value={row[key]}
           />
          </div>
         ) : (
          ""
         )}
         {key === "color" && pallet ? (
          <select
           value={row[key]}
           name='color'
           onChange={(e) => onChangeIcon(i, e, font, pallet)}>
           <option>Icon Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}

         {key === "background" && pallet ? (
          <select
           value={row[key]}
           name='background'
           onChange={(e) => onChangeIcon(i, e, font, pallet)}>
           <option>Background Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionArea" ? (
          <select name='sectionArea' onChange={(e) => onChangeIcon(i, e)}>
           <option></option>
           {cellStructure.map((cell) => {
            const { name, id, children } = cell;
            const subs = children.map((sub) => {
             const { name, id, bodyCells } = sub;

             const body = bodyCells.map(({ name, id }) => (
              <option value={id}>{name}</option>
             ));

             return [<option value={id}>{name}</option>, ...body];
            });

            const cell1 = <option value={id}>{name}</option>;

            const cellMap = [cell1, ...subs.flat()];

            return cellMap;
           })}
          </select>
         ) : (
          ""
         )}
         {key === "faIcon" ? (
          <div className='all-center'>
           <a
            className='lead'
            style={{ color: "#f4f4f4" }}
            href='https://fontawesome.com/cheatsheet/'>
            Icons
           </a>
           <input
            type='text'
            placeholder='Type your Font Awesome Icon Here'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeIcon(i, e)}
           />
          </div>
         ) : (
          ""
         )}
        </div>
       ))}
      </div>
     );
    })}

    {button.map((row, i) => {
     let delCheck = 1;
     const { componentName, compStyle } = row;

     return (
      <div style={{ width: "200px" }} key={row.id} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         if (button.length === 1) {
          button.splice(0, 1);
         } else {
          button.splice(i, 1);
         }
         onChangeButton(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {" "}
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""} Button
       </h3>
       {Object.keys(row).map((key) => (
        <div>
         {key === "fontStyle" ? (
          <select
           value={row[key]}
           name='fontStyle'
           onChange={(e) => onChangeButton(i, e, componentName, compStyle)}>
           <option>Font Styling...</option>
           <option value='b'>Bold</option>
           <option value='i'>Italic</option>
          </select>
         ) : (
          ""
         )}

         {key === "faIconPosition" ? (
          <select
           value={row[key]}
           name='faIconPosition'
           onChange={(e) => onChangeButton(i, e, componentName, compStyle)}>
           <option>Icon Position...</option>
           <option value='top'>Top</option>
           <option value='front'>Front</option>
           <option value='back'>Back</option>
           <option value='bottom'>Bottom</option>
          </select>
         ) : (
          ""
         )}

         {key === "font" ? (
          <div>
           <h5>Current Font</h5>
           <input type='text' value={row[key]} />
           <button
            className='btn btn-dark btn-sm'
            onClick={(e) => onChangeButton(i, e, font, "font")}>
            Set Font
           </button>
          </div>
         ) : (
          ""
         )}

         {key === "color" && pallet ? (
          <select
           value={row[key]}
           name='color'
           onChange={(e) => onChangeButton(i, e, font, pallet)}>
           <option>Font Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionOrdinality" ? (
          <div>
           <h5>Order the elements 1 is the first to appear</h5>
           <input
            value={row[key]}
            type='number'
            name='sectionOrdinality'
            onChange={(e) => onChangeButton(i, e, font, pallet)}
            value={row[key]}
           />
          </div>
         ) : (
          ""
         )}
         {key === "background" && pallet ? (
          <select
           name='background'
           onChange={(e) => onChangeButton(i, e, font, pallet)}>
           <option>Background Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionArea" ? (
          <select name='sectionArea' onChange={(e) => onChangeButton(i, e)}>
           <option></option>
           {cellStructure.map((cell) => {
            const { name, id, children } = cell;
            const subs = children.map((sub) => {
             const { name, id, bodyCells } = sub;

             const body = bodyCells.map(({ name, id }) => (
              <option value={id}>{name}</option>
             ));

             return [<option value={id}>{name}</option>, ...body];
            });

            const cell1 = <option value={id}>{name}</option>;

            const cellMap = [cell1, ...subs.flat()];

            return cellMap;
           })}
          </select>
         ) : (
          ""
         )}
         {key === "action" ? (
          <select
           name='action'
           onChange={(e) => onChangeButton(i, e, componentName, compStyle)}
           value={row[key]}
           multiple>
           <option>Button Action...</option>
           <option value='toggleModal'>Toggle Modal</option>
           <option value='postForm'>Post Form</option>
           <option value='getContent'>Get Content</option>
           <option value='internalSiteLink'>Link Site Pages</option>
           <option value='nextElement'>Next Element</option>
           <option value='prevElement'>Previous Element</option>
          </select>
         ) : (
          ""
         )}

         {row["action"].length > 0 ? (
          <div>
           <h5>Please Select The Component The Button Action Will Fire From</h5>
           <select
            name='actionComponent1'
            onChange={(e) =>
             setActionComponents({
              ...actionComponents,
              [e.target.name]: e.target.value,
             })
            }
            value={row[key]}>
            <option>My Saved Components...</option>
            {myComponents.map((comp) => (
             <option value={comp.name} name='actionComponent1'>
              {comp.name}
             </option>
            ))}{" "}
           </select>
           <br />
           <h5>Please Select The Component The Button Action Will Load</h5>
           <p style={{ textSize: "8px" }}>
            <i>
             Please Select Site Link and Action to force Redirect On Submission
            </i>
           </p>
           <select
            name='actionComponent2'
            onChange={(e) =>
             setActionComponents({
              ...actionComponents,
              [e.target.name]: e.target.value,
             })
            }
            value={row[key]}>
            <option>My Saved Components...</option>
            {myComponents.map((comp) => (
             <option value={comp.name} name='actionComponent1'>
              {comp.name}
             </option>
            ))}{" "}
           </select>

           <button
            className='btn btn-sm'
            onClick={(e) => {
             onChangeButton(i, e, actionComponents);
            }}>
            Add Button Actions
           </button>
          </div>
         ) : (
          ""
         )}

         {key === "text" ? (
          <div>
           <input
            type='text'
            value={row[key]}
            placeholder='Text..'
            name={key}
            onChange={(e) => onChangeButton(i, e, componentName, compStyle)}
           />
           <span style={{ float: "right" }}>
            <button
             className='btn btn-sm'
             onClick={(e) => {
              const c = currentContent.content;
              onChangeButton(i, e, c, key, "current");

              clearCurrentContent();
             }}>
             Add Content
            </button>
           </span>
          </div>
         ) : (
          ""
         )}
         {key === "url" ? (
          <input
           type='text'
           placeholder='Url...'
           value={row[key]}
           name={key}
           onChange={(e) => onChangeButton(i, e, componentName, compStyle)}
          />
         ) : (
          ""
         )}
         {key === "faIcon" ? (
          <div className='all-center'>
           <a
            className='lead'
            style={{ color: "#f4f4f4" }}
            href='https://fontawesome.com/cheatsheet/'>
            Icons
           </a>
           <input
            type='text'
            placeholder='Type your Font Awesome Icon Here'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeButton(i, e, componentName, compStyle)}
           />
          </div>
         ) : (
          ""
         )}
        </div>
       ))}
      </div>
     );
    })}

    {a.map((row, i) => {
     let delCheck = 1;
     const componentName = row.componentName;
     const compStyle = row.compStyle;

     return (
      <div style={{ width: "200px" }} key={row.id} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         if (a.length === 1) {
          a.splice(0, 1);
         } else {
          a.splice(i, 1);
         }
         onChangeA(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {" "}
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""} Link
       </h3>
       {Object.keys(row).map((key) => (
        <div>
         {key === "fontStyle" ? (
          <select
           name='fontStyle'
           value={row[key]}
           onChange={(e) => onChangeA(i, e, componentName, compStyle)}>
           <option>Font Styling...</option>
           <option value='b'>Bold</option>
           <option value='i'>Italic</option>
          </select>
         ) : (
          ""
         )}
         {key === "font" ? (
          <div>
           <h5>Current Font</h5>
           <input type='text' value={row[key]} />
           <button
            className='btn btn-dark btn-sm'
            onClick={(e) => onChangeA(i, e, font, "font")}>
            Set Font
           </button>
          </div>
         ) : (
          ""
         )}
         {key === "buttonStyle" ? (
          <select
           name='buttonStyle'
           value={row[key]}
           onChange={(e) => onChangeA(i, e, componentName, compStyle)}>
           <option>Apply Button Styles</option>
           <option value='btn'>Button</option>
           <option value=''>Regular</option>
          </select>
         ) : (
          ""
         )}

         {key === "color" && pallet ? (
          <select
           value={row[key]}
           name='color'
           onChange={(e) => onChangeA(i, e, font, pallet)}>
           <option>Font Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}

         {key === "sectionOrdinality" ? (
          <div>
           <h5>Order the elements 1 is the first to appear</h5>
           <input
            type='number'
            name='sectionOrdinality'
            onChange={(e) => onChangeA(i, e, componentName, compStyle)}
            value={row[key]}
           />
          </div>
         ) : (
          ""
         )}

         {key === "background" && pallet ? (
          <select
           name='background'
           value={row[key]}
           onChange={(e) => onChangeA(i, e, font, pallet)}>
           <option>Background Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}
         {key === "headingSize" ? (
          <select
           name='headingSize'
           value={row[key]}
           onChange={(e) => onChangeA(i, e, componentName, compStyle)}>
           <option>Heading Size...</option>
           <option value='h1'>X-Large</option>
           <option value='h2'>Large</option>
           <option value='h3'>Standard</option>
           <option value='h4'>Small</option>
           <option value='h5'>x-small</option>
          </select>
         ) : (
          ""
         )}
         {key === "faIconPosition" ? (
          <select
           name='faIconPosition'
           value={row[key]}
           onChange={(e) => onChangeA(i, e, componentName, compStyle)}>
           <option>Icon Position...</option>
           <option value='top'>Top</option>
           <option value='front'>Front</option>
           <option value='back'>Back</option>
           <option value='bottom'>Bottom</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionArea" ? (
          <select name='sectionArea' onChange={(e) => onChangeA(i, e)}>
           <option></option>
           {cellStructure.map((cell) => {
            const { name, id, children } = cell;
            const subs = children.map((sub) => {
             const { name, id, bodyCells } = sub;

             const body = bodyCells.map(({ name, id }) => (
              <option value={id}>{name}</option>
             ));

             return [<option value={id}>{name}</option>, ...body];
            });

            const cell1 = <option value={id}>{name}</option>;

            const cellMap = [cell1, ...subs.flat()];

            return cellMap;
           })}
          </select>
         ) : (
          ""
         )}
         {key === "text" ? (
          <div>
           <input
            type='text'
            value={row[key]}
            placeholder='Text..'
            name={key}
            onChange={(e) => onChangeA(i, e, componentName, compStyle)}
           />
           <span style={{ float: "right" }}>
            <button
             className='btn btn-sm'
             onClick={(e) => {
              const c = currentContent.content;
              onChangeA(i, e, c, key, "current");

              clearCurrentContent();
             }}>
             Add Content
            </button>
           </span>
          </div>
         ) : (
          ""
         )}
         {key === "url" ? (
          <div>
           <input
            type='text'
            placeholder='Url...'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeA(i, e)}
           />
           <span style={{ float: "right" }}>
            <button
             className='btn btn-sm'
             onClick={(e) => {
              const c = currentContent.content;
              onChangeA(i, e, c, key, "current");

              clearCurrentContent();
             }}>
             Add Content
            </button>
           </span>
          </div>
         ) : (
          ""
         )}
         {key === "faIcon" ? (
          <div className='all-center'>
           <a
            className='lead'
            style={{ color: "#f4f4f4" }}
            href='https://fontawesome.com/cheatsheet/'>
            Icons
           </a>
           <input
            type='text'
            placeholder='Type your Font Awesome Icon Here'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeA(i, e)}
           />
          </div>
         ) : (
          ""
         )}
        </div>
       ))}
      </div>
     );
    })}

    {li.map((row, i) => {
     let delCheck = 1;
     const componentName = row.componentName;
     const compStyle = row.compStyle;

     return (
      <div style={{ width: "200px" }} key={row.id} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         if (li.length === 1) {
          li.splice(0, 1);
         } else {
          li.splice(i, 1);
         }
         onChangeLi(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {" "}
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""} List Item
       </h3>
       {Object.keys(row).map((key) => (
        <div>
         {key === "fontStyle" ? (
          <select name='fontStyle' onChange={(e) => onChangeLi(i, e)}>
           <option>Font Styling...</option>
           <option value='b'>Bold</option>
           <option value='i'>Italic</option>
          </select>
         ) : (
          ""
         )}

         {key === "font" ? (
          <div>
           <h5>Current Font</h5>
           <input type='text' value={row[key]} />
           <button
            className='btn btn-dark btn-sm'
            onClick={(e) => onChangeLi(i, e, font, "font")}>
            Set Font
           </button>
          </div>
         ) : (
          ""
         )}
         {key === "sectionOrdinality" ? (
          <div>
           <h5>Order the elements 1 is the first to appear</h5>
           <input
            type='number'
            name='sectionOrdinality'
            onChange={(e) => onChangeLi(i, e, font, pallet)}
            value={row[key]}
           />
          </div>
         ) : (
          ""
         )}
         {key === "color" && pallet ? (
          <select name='color' onChange={(e) => onChangeLi(i, e, font, pallet)}>
           <option>Font Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}
         {key === "background" && pallet ? (
          <select
           name='background'
           onChange={(e) => onChangeLi(i, e, font, pallet)}>
           <option>Background Color...</option>
           <option value={pallet.primary}>Primary</option>
           <option value={pallet.dark}>Dark</option>
           <option value={pallet.light}>Light</option>
           <option value={pallet.danger}>Danger</option>
           <option value={pallet.primary}>Success</option>
          </select>
         ) : (
          ""
         )}
         {key === "headingSize" ? (
          <select name='headingSize' onChange={(e) => onChangeLi(i, e)}>
           <option>Heading Size...</option>
           <option value='h1'>X-Large</option>
           <option value='h2'>Large</option>
           <option value='h3'>Standard</option>
           <option value='h4'>Small</option>
           <option value='h5'>x-small</option>
          </select>
         ) : (
          ""
         )}
         {key === "faIconPosition" ? (
          <select name='faIconPosition' onChange={(e) => onChangeLi(i, e)}>
           <option>Icon Position...</option>
           <option value='top'>Top</option>
           <option value='front'>Front</option>
           <option value='back'>Back</option>
           <option value='bottom'>Bottom</option>
          </select>
         ) : (
          ""
         )}
         {key === "sectionArea" ? (
          <select name='sectionArea' onChange={(e) => onChangeLi(i, e)}>
           <option></option>
           {cellStructure.map((cell) => {
            const { name, id, children } = cell;
            const subs = children.map((sub) => {
             const { name, id, bodyCells } = sub;

             const body = bodyCells.map(({ name, id }) => (
              <option value={id}>{name}</option>
             ));

             return [<option value={id}>{name}</option>, ...body];
            });

            const cell1 = <option value={id}>{name}</option>;

            const cellMap = [cell1, ...subs.flat()];

            return cellMap;
           })}
          </select>
         ) : (
          ""
         )}
         {key === "text" ? (
          <div>
           <input
            type='text'
            value={row[key]}
            placeholder='Text..'
            name={key}
            onChange={(e) => onChangeLi(i, e, componentName, compStyle)}
           />
           <span style={{ float: "right" }}>
            <button
             className='btn btn-sm'
             onClick={(e) => {
              const c = currentContent.content;
              onChangeLi(i, e, c, key, "current");

              clearCurrentContent();
             }}>
             Add Content
            </button>
           </span>
          </div>
         ) : (
          ""
         )}
         {key === "url" ? (
          <div>
           <input
            type='text'
            placeholder='Url...'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeLi(i, e)}
           />
           <span style={{ float: "right" }}>
            <button
             className='btn btn-sm'
             onClick={(e) => {
              const c = currentContent.content;
              onChangeLi(i, e, c, key, "current");

              clearCurrentContent();
             }}>
             Add Content
            </button>
           </span>
          </div>
         ) : (
          ""
         )}
         {key === "listName" ? (
          <input
           type='text'
           placeholder='Listname...'
           value={row[key]}
           name={key}
           onChange={(e) => onChangeLi(i, e, componentName, compStyle)}
          />
         ) : (
          ""
         )}
         {key === "faIcon" ? (
          <div className='all-center'>
           <a
            className='lead'
            style={{ color: "#f4f4f4" }}
            href='https://fontawesome.com/cheatsheet/'>
            Icons
           </a>
           <input
            type='text'
            placeholder='Type your Font Awesome Icon Here'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeLi(i, e)}
           />
          </div>
         ) : (
          ""
         )}
        </div>
       ))}
      </div>
     );
    })}

    {img.map((row, i) => {
     const componentName = row.componentName;
     const compStyle = row.compStyle;
     let delCheck = 1;

     return (
      <div style={{ width: "200px" }} key={row.id} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         if (img.length === 1) {
          img.splice(0, 1);
         } else {
          img.splice(i, 1);
         }
         onChangeImg(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {" "}
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""} Image
       </h3>
       {Object.keys(row).map((key) => (
        <div>
         <form onSubmit={(e) => e.preventDefault()}>
          {key === "sectionArea" ? (
           <select name='sectionArea' onChange={(e) => onChangeImg(i, e)}>
            <option></option>
            {cellStructure.map((cell) => {
             const { name, id, children } = cell;
             const subs = children.map((sub) => {
              const { name, id, bodyCells } = sub;

              const body = bodyCells.map(({ name, id }) => (
               <option value={id}>{name}</option>
              ));

              return [<option value={id}>{name}</option>, ...body];
             });

             const cell1 = <option value={id}>{name}</option>;

             const cellMap = [cell1, ...subs.flat()];

             return cellMap;
            })}
           </select>
          ) : (
           ""
          )}
          {key === "sectionOrdinality" ? (
           <div>
            <h5>Order the elements 1 is the first to appear</h5>
            <input
             type='number'
             name='sectionOrdinality'
             onChange={(e) => onChangeImg(i, e, font, pallet)}
             value={row[key]}
            />
           </div>
          ) : (
           ""
          )}
          {key === "background" && pallet && row["name"].length > 0 != "" ? (
           <select
            name='background'
            value={row[key]}
            onChange={(e) => onChangeImg(i, e)}>
            <option>Background Color...</option>
            <option value={pallet.primary}>Primary</option>
            <option value={pallet.dark}>Dark</option>
            <option value={pallet.light}>Light</option>
            <option value={pallet.danger}>Danger</option>
            <option value={pallet.primary}>Success</option>
           </select>
          ) : (
           ""
          )}

          {key === "name" ? (
           <div className='grid-2'>
            <input
             type='text'
             placeholder='name...'
             value={row[key]}
             name={key}
            />

            <span style={{ float: "right" }}>
             <button
              className='btn btn-sm'
              name='name'
              onClick={(e) => {
               onChangeImg(i, e, currentContent);
              }}>
              Add Content
             </button>
            </span>
           </div>
          ) : (
           ""
          )}

          {key === "width" ? (
           <input
            type='text'
            placeholder='Width'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeImg(i, e, componentName, compStyle)}
           />
          ) : (
           ""
          )}
          {key === "height" ? (
           <input
            type='text'
            placeholder='Height'
            value={row[key]}
            name={key}
            onChange={(e) => onChangeImg(i, e, componentName, compStyle)}
           />
          ) : (
           ""
          )}
         </form>
        </div>
       ))}
      </div>
     );
    })}

    {vid.map((row, i) => {
     const componentName = row.componentName;
     const compStyle = row.compStyle;
     let delCheck = 1;

     return (
      <div style={{ width: "200px" }} key={row.id} className='row card bg-dark'>
       <span
        style={{ float: "right", background: "#f4f4f4" }}
        className='lead'
        onClick={(e) => {
         if (vid.length === 1) {
          vid.splice(0, 1);
         } else {
          vid.splice(i, 1);
         }
         onChangeVid(i, e, delCheck);
        }}>
        <a>X</a>
       </span>
       <h3>
        {" "}
        {row.level === "cell" ? "Main Level" : ""}{" "}
        {row.level === "subcell" ? "Sub Level" : ""}{" "}
        {row.level === "bodycell" ? "Body Level" : ""} Video
       </h3>
       {Object.keys(row).map((key) => (
        <div>
         {key === "sectionArea" ? (
          <select name='sectionArea' onChange={(e) => onChangeVid(i, e)}>
           <option></option>
           {cellStructure.map((cell) => {
            const { name, id, children } = cell;
            const subs = children.map((sub) => {
             const { name, id, bodyCells } = sub;

             const body = bodyCells.map(({ name, id }) => (
              <option value={id}>{name}</option>
             ));

             return [<option value={id}>{name}</option>, ...body];
            });

            const cell1 = <option value={id}>{name}</option>;

            const cellMap = [cell1, ...subs.flat()];

            return cellMap;
           })}
          </select>
         ) : (
          ""
         )}
         {key === "sectionOrdinality" ? (
          <div>
           <h5>Order the elements 1 is the first to appear</h5>
           <input
            type='number'
            name='sectionOrdinality'
            onChange={(e) => onChangeVid(i, e, font, pallet)}
            value={row[key]}
           />
          </div>
         ) : (
          ""
         )}
         {key === "url" ? (
          <input
           type='text'
           placeholder='youtube watch key'
           value={row[key]}
           name={key}
           onChange={(e) => onChangeVid(i, e, componentName, compStyle)}
          />
         ) : (
          ""
         )}

         {key === "width" ? (
          <input
           type='text'
           placeholder='Width'
           value={row[key]}
           name={key}
           onChange={(e) => onChangeVid(i, e, componentName, compStyle)}
          />
         ) : (
          ""
         )}
         {key === "height" ? (
          <input
           type='text'
           placeholder='Height'
           value={row[key]}
           name={key}
           onChange={(e) => onChangeVid(i, e, componentName, compStyle)}
          />
         ) : (
          ""
         )}
        </div>
       ))}
      </div>
     );
    })}
   </div>
  </Fragment>
 );
};

export default SectionManager;
