import React, { useContext, useEffect, Fragment, useState } from "react";
import SiteContext from "../../context/site/siteContext";
import Slider from "react-rangeslider";
import Pagination from "../layout/Pagination";
//add importance
//paginate Areas
//set Page Style
const CSSBar = ({ toggleDisplayState, pallet, pages, index, font }) => {
 const siteContext = useContext(SiteContext);

 const {
  addPage,
  clearCurrentPage,
  clearCurrentSite,
  postSite,
  putSite,
  postPage,
  putPage,
  currentSite,
  addCellAnimation,
  addCellAnimationKeyframe,
  addCellTransition,
  page,
  setPageId,
  updatePageCss,
  updateArticleCss,
  updateMainCss,
  updateFooterCss,
  updateHeaderCss,
  updateNavCss,
  addHeaderAnimation,
  addHeaderTransition,
  addHeaderAnimationKeyframe,
  addHeaderAnimationKeyframeProperty,
  addFooterAnimation,
  addFooterTransition,
  addFooterAnimationKeyframe,
  addFooterAnimationKeyframeProperty,
  addMainAnimation,
  addMainTransition,
  addMainAnimationKeyframe,
  addMainAnimationKeyframeProperty,
  addNavAnimation,
  addNavTransition,
  addNavAnimationKeyframe,
  addNavAnimationKeyframeProperty,
  addArticleAnimation,
  addArticleTransition,
  addArticleAnimationKeyframe,
  addArticleAnimationKeyframeProperty,
  addHeaderCellAnimation,
  addHeaderCellTransition,
  addHeaderCellAnimationKeyframe,
  addHeaderCellAnimationKeyframeProperty,
  addFooterCellAnimation,
  addFooterCellTransition,
  addFooterCellAnimationKeyframe,
  addFooterCellAnimationKeyframeProperty,
  addMainCellAnimation,
  addMainCellTransition,
  addMainCellAnimationKeyframe,
  addMainCellAnimationKeyframeProperty,
  addNavCellAnimation,
  addNavCellTransition,
  addNavCellAnimationKeyframe,
  addNavCellAnimationKeyframeProperty,
  addArticleCellAnimation,
  addArticleCellTransition,
  addArticleCellAnimationKeyframe,
  addArticleCellAnimationKeyframeProperty,
  addPageAnimation,
  addPageTransition,
  addPageAnimationKeyframe,
  addPageAnimationKeyframeProperty,
  updateLayout,
  updateHeaderGrid,
  updateFooterGrid,
  updateMainGrid,
  updateNavGrid,
  updateArticleGrid,
  updateHeaderCellCss,
  updateFooterCellCss,
  updateMainCellCss,
  updateNavCellCss,
  updateArticleCellCss,
 } = siteContext;
 const [viewCSS, setViewCSS] = useState(false);
 const [viewPage, setViewPage] = useState(false);
 const [viewSite, setViewSite] = useState(false);
 const [viewMeta, setViewMeta] = useState(false);
 const [cssToggle, setCSSToggle] = useState(false);
 const [gridToggle, setGridToggle] = useState(false);
 const [cellToggle, setCellToggle] = useState(false);
 const [subCssMap, setSubCssMap] = useState("");
 const [newPage, setNewPage] = useState({
  pageName: "",
  route: "",
  layout: "",
 });

 const [newSite, setNewSite] = useState({
  siteName: "",
  url: "",
  favicon: "",
 });

 const metaTag = { tag: "", content: "" };

 const [head, setHead] = useState([]);

 const addTag = () => {
  let newHead = [...head, metaTag];

  setHead(newHead);
 };

 const onChangeTag = (i, e, delCheck) => {
  const { name, value } = e.currentTarget;

  let newHead = [...head];

  if (delCheck) {
   newHead = newHead.splice(0, i);
  } else {
   newHead[i] = {
    ...newHead[i],
    [name]: value,
   };
  }

  setHead(newHead);
 };

 const { pageName, route, layout } = newPage;
 const { siteName, url, favicon } = newSite;

 const { nav, header, footer, main, article, css } = page;

 const { navGrid, navCells, navCSS } = nav;
 const { footerCSS, footerGrid, footerCells } = footer;
 const { headerCSS, headerGrid, headerCells } = header;
 const { mainCSS, mainGrid, mainCells } = main;
 const { articleCSS, articleGrid, articleCells } = article;

 useEffect(() => {
  if (pages && pages[index].id !== page.key) {
   setPageId(pages[index].id);
  }
 }, [pages, page]);

 const [mappedCss, setMappedCss] = useState("");

 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage, setPostsPerPage] = useState(1);

 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 const currentNavCell = navCells.slice(indexOfFirstPost, indexOfLastPost);
 const currentHeaderCell = headerCells.slice(indexOfFirstPost, indexOfLastPost);
 const currentFooterCell = footerCells.slice(indexOfFirstPost, indexOfLastPost);
 const currentMainCell = mainCells.slice(indexOfFirstPost, indexOfLastPost);

 const currentArticleCell = articleCells.slice(
  indexOfFirstPost,
  indexOfLastPost
 );

 console.log(page);

 return (
  <Fragment>
   <div className='color-background'>
    <div className='navbar'>
     <ul>
      <li className='m-1 p-1'>
       <h5>View Component Interface</h5>
       <select name='displayState' onChange={toggleDisplayState}>
        <option value='component'>Component</option>
        <option value='page'>Page</option>
       </select>
      </li>
      <li className='m-1 p-1'>
       <h5>Set Page Style </h5>
       <select
        onChange={(e) =>
         setNewPage({ ...newPage, [e.target.name]: e.target.value })
        }>
        <option></option>

        <option value='HomePage'>HomePage</option>
        <option value='HolyGrail'>HolyGrail</option>
        <option value='Gallery'>Gallery</option>
        <option value='Splash'>Splash</option>
       </select>
      </li>
     </ul>
    </div>
    <div className='navbar'>
     <ul>
      <li className='p-2'>
       <button
        onClick={() => addPage()}
        className='btn m-2 btn-block btn-primary'>
        Add New Page
       </button>
      </li>
      <li className='p-2'>
       <button
        onClick={() => setViewCSS((prevState) => !prevState)}
        className='btn m-2 btn-block btn-primary'>
        Edit CSS
       </button>

       <select
        onChange={(e) => setMappedCss(e.target.value)}
        className='m-2'
        name='mappedCss'>
        <option value=''></option>
        <option value='page'>Page</option>
        <option value='header'>Header</option>
        <option value='footer'>Footer</option>
        <option value='main'>Main</option>
        <option value='nav'>Nav</option>
        <option value='article'>Article</option>
       </select>
       <div className='m-2' style={{ display: "flex" }}>
        {" "}
        <h5 className='p-1'>
         CSS{" "}
         <input
          type='checkbox'
          name='cssToggle'
          onClick={() => setCSSToggle((prevState) => !prevState)}
          checked={
           cssToggle === true && cellToggle === false && gridToggle === false
          }
         />
        </h5>
        <h5 className='p-1'>
         Grid{" "}
         <input
          type='checkbox'
          name='gridToggle'
          onClick={() => setGridToggle((prevState) => !prevState)}
          checked={
           gridToggle === true && cssToggle === false && cellToggle === false
          }
         />
        </h5>
        <h5 className='p-1'>
         Cell{" "}
         <input
          type='checkbox'
          name='cellToggle'
          onClick={() => setCellToggle((prevState) => !prevState)}
          checked={
           cellToggle === true && gridToggle === false && cssToggle === false
          }
         />
        </h5>
       </div>

       {mappedCss === "nav" && navCells.length > 0 ? (
        <select name='subCssMap' onChange={(e) => setSubCssMap(e.target.value)}>
         {navCells.map((n, i) => (
          <option key={`nav+${i}`}>Nav Section {i + 1}</option>
         ))}
        </select>
       ) : (
        ""
       )}

       {mappedCss === "header" && headerCells.length > 0 ? (
        <select name='subCssMap' onChange={(e) => setSubCssMap(e.target.value)}>
         {navCells.map((n, i) => (
          <option key={`header+${i}`}>Header Section {i + 1}</option>
         ))}
        </select>
       ) : (
        ""
       )}
       {mappedCss === "footer" && footerCells.length > 0 ? (
        <select name='subCssMap' onChange={(e) => setSubCssMap(e.target.value)}>
         {navCells.map((n, i) => (
          <option key={`footer+${i}`}>Footer Section {i + 1}</option>
         ))}
        </select>
       ) : (
        ""
       )}
       {mappedCss === "article" && articleCells.length > 0 ? (
        <select name='subCssMap' onChange={(e) => setSubCssMap(e.target.value)}>
         {navCells.map((n, i) => (
          <option key={`article+${i}`}>Article Section {i + 1}</option>
         ))}
        </select>
       ) : (
        ""
       )}
       {mappedCss === "main" && mainCells.length > 0 ? (
        <select name='subCssMap' onChange={(e) => setSubCssMap(e.target.value)}>
         {navCells.map((n, i) => (
          <option key={`main${i}`}>Main Section {i + 1}</option>
         ))}
        </select>
       ) : (
        ""
       )}
      </li>
      <li className='p-2'>
       {viewMeta === false ? (
        <button
         onClick={() => setViewMeta((prevState) => !prevState)}
         className='btn m-2 btn-block btn-primary'>
         Add Meta Tag
        </button>
       ) : (
        <div>
         <a onClick={() => setViewMeta((prevState) => !prevState)}>X</a>
         <button
          onClick={() => addTag()}
          className='btn m-2 btn-block btn-primary'>
          + Tag
         </button>
         {head.map(({ tag, content }, i) => (
          <div>
           <div className='card'>
            {" "}
            <a onClick={(e) => onChangeTag(i, e, 1)}>X</a>
            <h5>Tag Description</h5>
            <input
             type='text'
             name='tag'
             value={tag}
             onChange={(e) => onChangeTag(i, e)}
            />
            <h5>Tag Content</h5>
            <input
             type='text'
             name='content'
             value={content}
             onChange={(e) => onChangeTag(i, e)}
            />
           </div>
          </div>
         ))}
        </div>
       )}
      </li>
      <li className='p-2'>
       {viewPage === false ? (
        <button
         onClick={() => setViewPage((prevState) => !prevState)}
         className='btn  m-2 btn-block btn-primary'>
         Save As Page
        </button>
       ) : (
        <div className='card bg-primary lead'>
         <span style={{ float: "right" }} className='lead bg-light' />
         <a onClick={() => setViewPage((prevState) => !prevState)}>X</a>
         <h5>Name Your Page</h5>
         <input
          type='text'
          name='pageName'
          value={pageName}
          onChange={(e) =>
           setNewPage({ ...newPage, [e.target.name]: e.target.value })
          }
         />
         <h5>Assign Route</h5>
         <input
          type='text'
          name='route'
          value={route}
          onChange={(e) =>
           setNewPage({ ...newPage, [e.target.name]: e.target.value })
          }
         />

         <button
          className='btn btn-block btn-dark'
          onClick={() => postPage(newPage)}>
          Save New Page
         </button>
        </div>
       )}
      </li>
      <li className='p-2'>
       {viewSite === false ? (
        <button
         onClick={() => setViewSite((prevState) => !prevState)}
         className='m-2 btn btn-block btn-primary'>
         Save As Site
        </button>
       ) : (
        <div className='card bg-primary lead'>
         <span style={{ float: "right" }} className='lead bg-light' />
         <a onClick={() => setViewSite((prevState) => !prevState)}>X</a>
         <h5>Name Your Site</h5>
         <input
          type='text'
          name='siteName'
          value={siteName}
          onChange={(e) =>
           setNewSite({ ...newSite, [e.target.name]: e.target.value })
          }
         />
         <h5>Assign Url </h5>
         <input
          type='text'
          name='url'
          value={url}
          onChange={(e) =>
           setNewSite({ ...newSite, [e.target.name]: e.target.value })
          }
         />

         <button
          className='btn btn-block btn-dark'
          onClick={() => postSite(newSite)}>
          Save New Site
         </button>
        </div>
       )}
      </li>
     </ul>
    </div>
   </div>

   {viewCSS === true ? (
    <div>
     <h3>
      {mappedCss === "main" && "Main CSS"}
      {mappedCss === "article" && "Article CSS"}
      {mappedCss === "page" && "Page CSS"}
      {mappedCss === "footer" && "Footer CSS"}
      {mappedCss === "nav" && "Nav CSS"}
      {mappedCss === "header" && "Header CSS"}
     </h3>

     {mappedCss === "footer" && cellToggle === true && footerCells.length > 0 && (
      <div>
       {" "}
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={navCells.length}
        paginate={paginate}
       />
       {currentFooterCell.map(
        ({ css, top, left, templateArea, columnSpan, rowSpan }, i) => {
         return (
          <div>
           <h5>Grid Row Start</h5>
           <input
            type='text'
            name='top'
            value={top}
            onChange={(e) => updateFooterCellCss(i, e)}
           />
           <h5>Grid Column Start</h5>
           <input
            type='text'
            name='left'
            value={left}
            onChange={(e) => updateFooterCellCss(i, e)}
           />

           <h5>Grid Column End</h5>
           <input
            type='text'
            name='columnSpan'
            value={columnSpan}
            onChange={(e) => updateFooterCellCss(i, e)}
           />
           <h5>Grid Row End</h5>
           <input
            type='text'
            name='rowSpan'
            value={rowSpan}
            onChange={(e) => updateFooterCellCss(i, e)}
           />

           <select
            name='templateArea'
            onChange={(e) => updateFooterCellCss(i, e)}
            value={templateArea}>
            <option value=''></option>
            <option value='a'>A</option>
            <option value='b'>B</option>
            <option value='c'>C</option>
            <option value='d'>E</option>
           </select>

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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                 onClick={() => addFooterCellAnimation()}>
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
                       updateFooterCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Duration</h5>
                     <input
                      type='text'
                      name='animationDuration'
                      value={animationDuration}
                      onChange={(e) =>
                       updateFooterCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Function</h5>
                     <select
                      name='animationTimingFunction'
                      value={animationTimingFunction}
                      onChange={(e) =>
                       updateFooterCellCss(i, e, "animation", index)
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
                       updateFooterCellCss(i, e, "animation", index)
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
                           updateFooterCellCss(i, e, "cubicNs", index, n)
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
                       updateFooterCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Iteration Count</h5>
                     <input
                      placeholder='Positive Integers Only'
                      type='text'
                      name='animationIterationCount'
                      value={animationIterationCount}
                      onChange={(e) =>
                       updateFooterCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Direction</h5>
                     <select
                      name='animationDirection'
                      value={animationDirection}
                      onChange={(e) =>
                       updateFooterCellCss(i, e, "animation", index)
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
                       updateFooterCellCss(i, e, "animation", index)
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
                      onClick={() => addFooterCellAnimationKeyframe(index)}>
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
                          updateFooterCellCss(i, e, "animationkey", index, ind)
                         }
                        />
                        <button
                         className='btn btn-sm btn-dark'
                         onClick={() =>
                          addFooterCellAnimationKeyframeProperty(index, ind)
                         }>
                         + Property
                        </button>

                        {properties.map(
                         (
                          { propName, propValue, shadowValues, transValues },
                          indy
                         ) => (
                          <div>
                           <select
                            name='propName'
                            value={propName}
                            onChange={(e) =>
                             updateFooterCellCss(
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

                            <option value='font-weight'>Font Weight</option>
                            <option value='line-height'>Line Height</option>
                            <option value='margin-bottom'>Margin Bottom</option>
                            <option value='margin'>Margin</option>
                            <option value='margin-left'>Margin Left</option>
                            <option value='margin-top'>Margin Top</option>
                            <option value='margin-right'>Margin Right</option>
                            <option value='opacity'>Opacity</option>

                            <option value='padding-left'>Padding Left</option>
                            <option value='padding-right'>Padding Right</option>
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
                              updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                              updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                               updateFooterCellCss(
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
                              updateFooterCellCss(
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
                               updateFooterCellCss(
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
                              updateFooterCellCss(
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
                              updateFooterCellCss(
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
                             <option value={pallet && pallet.dark}>Dark</option>
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
            } else if (key === "position") {
             return (
              <label key={key}>
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}
               ition
               <select
                name={key}
                value={css[key]}
                onChange={(e) => updateFooterCellCss(i, e, "css")}
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onClick={() => addFooterCellTransition(i)}>
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
                     updateFooterCellCss(i, e, "transition", index)
                    }
                    value={property}
                    name='property'>
                    <option value=''></option>

                    <option value='color'>Color</option>
                    <option value='background-color'>Background Color</option>
                   </select>
                   <h5>Transition Timing</h5>
                   <input
                    type='text'
                    name='duration'
                    onChange={(e) =>
                     updateFooterCellCss(i, e, "transition", index)
                    }
                    value={duration}
                    placeholder='Enter A Value in seconds'
                   />
                   <h5>Transition Function</h5>
                   <select
                    name='timingFunction'
                    value={timingFunction}
                    onChange={(e) =>
                     updateFooterCellCss(i, e, "transition", index)
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
                     updateFooterCellCss(i, e, "transition", index)
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
                         updateFooterCellCss(i, e, "cubicNs", index, n)
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
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}

               <select
                name={key}
                onChange={(e) => updateFooterCellCss(i, e, "transform")}
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
                   updateFooterCellCss(i, e, "rotateZ", "transformProp")
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
                   updateFooterCellCss(i, e, "rotateX", "transformProp")
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
                   updateFooterCellCss(
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
                   updateFooterCellCss(
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
                   updateFooterCellCss(i, e, "rotateY", "transformProp")
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
                   updateFooterCellCss(i, e, "skewX", "transformProp")
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
                   updateFooterCellCss(i, e, "skewY", "transformProp")
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
                  value={parseFloat(css["transformProp"]["scaleX"])}
                  onChange={(e) =>
                   updateFooterCellCss(i, e, "scaleX", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleX'
                  min={-1}
                  max={2}
                  step={0.01}
                 />
                </div>
               )}{" "}
               {css.transform.includes("scaleY") && (
                <div>
                 <h5>Scale Y Percent</h5>
                 <Slider
                  value={parseFloat(css["transformProp"]["scaleY"])}
                  onChange={(e) =>
                   updateFooterCellCss(i, e, "scaleY", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleY'
                  min={-1}
                  max={2}
                  step={0.01}
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "opacity", "slider")}
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
                onChange={(e) => updateFooterCellCss(i, e, key, "slider")}
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}>
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
                onChange={(e) => updateFooterCellCss(i, e, "css")}
                name={key}
               />
              </label>
             );
            }
           })}
          </div>
         );
        }
       )}
      </div>
     )}
     {mappedCss === "header" && cellToggle === true && headerCells.length > 0 && (
      <div>
       {" "}
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={headerCells.length}
        paginate={paginate}
       />
       {currentHeaderCell.map(
        ({ css, top, left, templateArea, columnSpan, rowSpan }, i) => {
         return (
          <div>
           <h5>Grid Row Start</h5>
           <input
            type='text'
            name='top'
            value={top}
            onChange={(e) => updateHeaderCellCss(i, e)}
           />
           <h5>Grid Column Start</h5>
           <input
            type='text'
            name='left'
            value={left}
            onChange={(e) => updateHeaderCellCss(i, e)}
           />
           <h5>Grid Column End</h5>
           <input
            type='text'
            name='columnSpan'
            value={columnSpan}
            onChange={(e) => updateHeaderCellCss(i, e)}
           />
           <h5>Grid Row End</h5>
           <input
            type='text'
            name='top'
            value={rowSpan}
            onChange={(e) => updateHeaderCellCss(i, e)}
           />

           <select
            name='templateArea'
            onChange={(e) => updateHeaderCellCss(i, e)}
            value={templateArea}>
            <option value=''></option>
            <option value='a'>A</option>
            <option value='b'>B</option>
            <option value='c'>C</option>
            <option value='d'>E</option>
           </select>

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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                 onClick={() => addPageAnimation()}>
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
                       updateHeaderCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Duration</h5>
                     <input
                      type='text'
                      name='animationDuration'
                      value={animationDuration}
                      onChange={(e) =>
                       updateHeaderCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Function</h5>
                     <select
                      name='animationTimingFunction'
                      value={animationTimingFunction}
                      onChange={(e) =>
                       updateHeaderCellCss(i, e, "animation", index)
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
                       updateHeaderCellCss(i, e, "animation", index)
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
                           updateHeaderCellCss(i, e, "cubicNs", index, n)
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
                       updateHeaderCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Iteration Count</h5>
                     <input
                      placeholder='Positive Integers Only'
                      type='text'
                      name='animationIterationCount'
                      value={animationIterationCount}
                      onChange={(e) =>
                       updateHeaderCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Direction</h5>
                     <select
                      name='animationDirection'
                      value={animationDirection}
                      onChange={(e) =>
                       updateHeaderCellCss(i, e, "animation", index)
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
                       updateHeaderCellCss(i, e, "animation", index)
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
                      onClick={() => addPageAnimationKeyframe(index)}>
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
                          updateHeaderCellCss(i, e, "animationkey", index, ind)
                         }
                        />
                        <button
                         className='btn btn-sm btn-dark'
                         onClick={() =>
                          addHeaderCellAnimationKeyframeProperty(index, ind)
                         }>
                         + Property
                        </button>

                        {properties.map(
                         (
                          { propName, propValue, shadowValues, transValues },
                          indy
                         ) => (
                          <div>
                           <select
                            name='propName'
                            value={propName}
                            onChange={(e) =>
                             updateHeaderCellCss(
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

                            <option value='font-weight'>Font Weight</option>
                            <option value='line-height'>Line Height</option>
                            <option value='margin-bottom'>Margin Bottom</option>
                            <option value='margin'>Margin</option>
                            <option value='margin-left'>Margin Left</option>
                            <option value='margin-top'>Margin Top</option>
                            <option value='margin-right'>Margin Right</option>
                            <option value='opacity'>Opacity</option>

                            <option value='padding-left'>Padding Left</option>
                            <option value='padding-right'>Padding Right</option>
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
                              updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                              updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                              updateHeaderCellCss(
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
                               updateHeaderCellCss(
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
                              updateHeaderCellCss(
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
                              updateHeaderCellCss(
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
                             <option value={pallet && pallet.dark}>Dark</option>
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
            } else if (key === "position") {
             return (
              <label key={key}>
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}
               ition
               <select
                name={key}
                value={css[key]}
                onChange={(e) => updateHeaderCellCss(i, e, "css")}
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onClick={() => addCellTransition()}>
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
                     updateHeaderCellCss(i, e, "transition", index)
                    }
                    value={property}
                    name='property'>
                    <option value=''></option>

                    <option value='color'>Color</option>
                    <option value='background-color'>Background Color</option>
                   </select>
                   <h5>Transition Timing</h5>
                   <input
                    type='text'
                    name='duration'
                    onChange={(e) =>
                     updateHeaderCellCss(i, e, "transition", index)
                    }
                    value={duration}
                    placeholder='Enter A Value in seconds'
                   />
                   <h5>Transition Function</h5>
                   <select
                    name='timingFunction'
                    value={timingFunction}
                    onChange={(e) =>
                     updateHeaderCellCss(i, e, "transition", index)
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
                     updateHeaderCellCss(i, e, "transition", index)
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
                         updateHeaderCellCss(i, e, "cubicNs", index, n)
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
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}

               <select
                name={key}
                onChange={(e) => updateHeaderCellCss(i, e, "transform")}
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
                   updateHeaderCellCss(i, e, "rotateZ", "transformProp")
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
                   updateHeaderCellCss(i, e, "rotateX", "transformProp")
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
                   updateHeaderCellCss(
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
                   updatePageCss(e.target.value, "translateY", "transformProp")
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
                   updateHeaderCellCss(i, e, "rotateY", "transformProp")
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
                   updateHeaderCellCss(i, e, "skewX", "transformProp")
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
                   updateHeaderCellCss(i, e, "skewY", "transformProp")
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
                  value={parseFloat(css["transformProp"]["scaleX"])}
                  onChange={(e) =>
                   updateHeaderCellCss(i, e, "scaleX", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleX'
                  min={-1}
                  max={2}
                  step={0.01}
                 />
                </div>
               )}{" "}
               {css.transform.includes("scaleY") && (
                <div>
                 <h5>Scale Y Percent</h5>
                 <Slider
                  value={parseFloat(css["transformProp"]["scaleY"])}
                  onChange={(e) =>
                   updateHeaderCellCss(i, e, "scaleY", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleY'
                  min={-1}
                  max={2}
                  step={0.01}
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "opacity", "slider")}
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
                onChange={(e) => updateHeaderCellCss(i, e, key, "slider")}
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}>
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
                onChange={(e) => updateHeaderCellCss(i, e, "css")}
                name={key}
               />
              </label>
             );
            }
           })}
          </div>
         );
        }
       )}
      </div>
     )}

     {mappedCss === "nav" && cellToggle === true && navCells.length > 0 && (
      <div>
       {" "}
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={footerCells.length}
        paginate={paginate}
       />
       {currentNavCell.map(
        ({ css, top, left, templateArea, columnSpan, rowSpan }, i) => {
         return (
          <div>
           <input
            type='text'
            name='top'
            value={top}
            onChange={(e) => updateNavCellCss(i, e)}
           />
           <input
            type='text'
            name='left'
            value={left}
            onChange={(e) => updateNavCellCss(i, e)}
           />
           <input
            type='text'
            name='columnSpan'
            value={columnSpan}
            onChange={(e) => updateNavCellCss(i, e)}
           />
           <input
            type='text'
            name='top'
            value={rowSpan}
            onChange={(e) => updateNavCellCss(i, e)}
           />

           <select
            name='templateArea'
            onChange={(e) => updateNavCellCss(i, e)}
            value={templateArea}>
            <option value=''></option>
            <option value='a'>A</option>
            <option value='b'>B</option>
            <option value='c'>C</option>
            <option value='d'>E</option>
           </select>

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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                 onClick={() => addPageAnimation()}>
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
                       updateNavCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Duration</h5>
                     <input
                      type='text'
                      name='animationDuration'
                      value={animationDuration}
                      onChange={(e) =>
                       updateNavCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Function</h5>
                     <select
                      name='animationTimingFunction'
                      value={animationTimingFunction}
                      onChange={(e) =>
                       updateNavCellCss(i, e, "animation", index)
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
                       updateNavCellCss(i, e, "animation", index)
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
                           updateNavCellCss(i, e, "cubicNs", index, n)
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
                       updateNavCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Iteration Count</h5>
                     <input
                      placeholder='Positive Integers Only'
                      type='text'
                      name='animationIterationCount'
                      value={animationIterationCount}
                      onChange={(e) =>
                       updateNavCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Direction</h5>
                     <select
                      name='animationDirection'
                      value={animationDirection}
                      onChange={(e) =>
                       updateNavCellCss(i, e, "animation", index)
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
                       updateNavCellCss(i, e, "animation", index)
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
                      onClick={() => addPageAnimationKeyframe(index)}>
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
                          updateNavCellCss(i, e, "animationkey", index, ind)
                         }
                        />
                        <button
                         className='btn btn-sm btn-dark'
                         onClick={() =>
                          addPageAnimationKeyframeProperty(index, ind)
                         }>
                         + Property
                        </button>

                        {properties.map(
                         (
                          { propName, propValue, shadowValues, transValues },
                          indy
                         ) => (
                          <div>
                           <select
                            name='propName'
                            value={propName}
                            onChange={(e) =>
                             updatePageCss(
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

                            <option value='font-weight'>Font Weight</option>
                            <option value='line-height'>Line Height</option>
                            <option value='margin-bottom'>Margin Bottom</option>
                            <option value='margin'>Margin</option>
                            <option value='margin-left'>Margin Left</option>
                            <option value='margin-top'>Margin Top</option>
                            <option value='margin-right'>Margin Right</option>
                            <option value='opacity'>Opacity</option>

                            <option value='padding-left'>Padding Left</option>
                            <option value='padding-right'>Padding Right</option>
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
                              updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                              updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                               updatePageCss(
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
                              updatePageCss(
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
                               updatePageCss(
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
                              updatePageCss(
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
                              updatePageCss(
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
                             <option value={pallet && pallet.dark}>Dark</option>
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
            } else if (key === "position") {
             return (
              <label key={key}>
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}
               ition
               <select
                name={key}
                value={css[key]}
                onChange={(e) => updateNavCellCss(i, e, "css")}
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onClick={() => addCellTransition()}>
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
                     updateNavCellCss(i, e, "transition", index)
                    }
                    value={property}
                    name='property'>
                    <option value=''></option>

                    <option value='color'>Color</option>
                    <option value='background-color'>Background Color</option>
                   </select>
                   <h5>Transition Timing</h5>
                   <input
                    type='text'
                    name='duration'
                    onChange={(e) =>
                     updateNavCellCss(i, e, "transition", index)
                    }
                    value={duration}
                    placeholder='Enter A Value in seconds'
                   />
                   <h5>Transition Function</h5>
                   <select
                    name='timingFunction'
                    value={timingFunction}
                    onChange={(e) =>
                     updateNavCellCss(i, e, "transition", index)
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
                     updateNavCellCss(i, e, "transition", index)
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
                         updateNavCellCss(i, e, "cubicNs", index, n)
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
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}

               <select
                name={key}
                onChange={(e) => updateNavCellCss(i, e, "transform")}
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
                   updateNavCellCss(i, e, "rotateZ", "transformProp")
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
                   updateNavCellCss(i, e, "rotateX", "transformProp")
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
                   updatePageCss(e.target.value, "translateX", "transformProp")
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
                   updatePageCss(e.target.value, "translateY", "transformProp")
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
                   updateNavCellCss(i, e, "rotateY", "transformProp")
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
                   updateNavCellCss(i, e, "skewX", "transformProp")
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
                   updateNavCellCss(i, e, "skewY", "transformProp")
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
                  value={parseFloat(css["transformProp"]["scaleX"])}
                  onChange={(e) =>
                   updateNavCellCss(i, e, "scaleX", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleX'
                  min={-1}
                  max={2}
                  step={0.01}
                 />
                </div>
               )}{" "}
               {css.transform.includes("scaleY") && (
                <div>
                 <h5>Scale Y Percent</h5>
                 <Slider
                  value={parseFloat(css["transformProp"]["scaleY"])}
                  onChange={(e) =>
                   updateNavCellCss(i, e, "scaleY", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleY'
                  min={-1}
                  max={2}
                  step={0.01}
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "opacity", "slider")}
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
                onChange={(e) => updateNavCellCss(i, e, key, "slider")}
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}>
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
                onChange={(e) => updateNavCellCss(i, e, "css")}
                name={key}
               />
              </label>
             );
            }
           })}
          </div>
         );
        }
       )}
      </div>
     )}

     {mappedCss === "article" &&
      cellToggle === true &&
      articleCells.length > 0 && (
       <div>
        {" "}
        <Pagination
         postsPerPage={postsPerPage}
         totalPosts={articleCells.length}
         paginate={paginate}
        />
        {currentArticleCell.map(
         ({ css, top, left, templateArea, columnSpan, rowSpan }, i) => {
          return (
           <div>
            <input
             type='text'
             name='top'
             value={top}
             onChange={(e) => updateArticleCellCss(i, e)}
            />
            <input
             type='text'
             name='left'
             value={left}
             onChange={(e) => updateArticleCellCss(i, e)}
            />
            <input
             type='text'
             name='columnSpan'
             value={columnSpan}
             onChange={(e) => updateArticleCellCss(i, e)}
            />
            <input
             type='text'
             name='top'
             value={rowSpan}
             onChange={(e) => updateArticleCellCss(i, e)}
            />

            <select
             name='templateArea'
             onChange={(e) => updateArticleCellCss(i, e)}
             value={templateArea}>
             <option value=''></option>
             <option value='a'>A</option>
             <option value='b'>B</option>
             <option value='c'>C</option>
             <option value='d'>E</option>
            </select>

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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                  onClick={() => addArticleCellAnimation(i)}>
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
                        updateArticleCellCss(i, e, "animation", index)
                       }
                      />
                      <h5>Animation Duration</h5>
                      <input
                       type='text'
                       name='animationDuration'
                       value={animationDuration}
                       onChange={(e) =>
                        updateArticleCellCss(i, e, "animation", index)
                       }
                      />
                      <h5>Animation Function</h5>
                      <select
                       name='animationTimingFunction'
                       value={animationTimingFunction}
                       onChange={(e) =>
                        updateArticleCellCss(i, e, "animation", index)
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
                        updateArticleCellCss(i, e, "animation", index)
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
                            updateArticleCellCss(i, e, "cubicNs", index, n)
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
                        updateArticleCellCss(i, e, "animation", index)
                       }
                      />
                      <h5>Animation Iteration Count</h5>
                      <input
                       placeholder='Positive Integers Only'
                       type='text'
                       name='animationIterationCount'
                       value={animationIterationCount}
                       onChange={(e) =>
                        updateArticleCellCss(i, e, "animation", index)
                       }
                      />
                      <h5>Animation Direction</h5>
                      <select
                       name='animationDirection'
                       value={animationDirection}
                       onChange={(e) =>
                        updateArticleCellCss(i, e, "animation", index)
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
                        updateArticleCellCss(i, e, "animation", index)
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
                       onClick={() => addArticleCellAnimationKeyframe(index)}>
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
                           updateArticleCellCss(
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
                           addArticleCellAnimationKeyframeProperty(index, ind)
                          }>
                          + Property
                         </button>

                         {properties.map(
                          (
                           { propName, propValue, shadowValues, transValues },
                           indy
                          ) => (
                           <div>
                            <select
                             name='propName'
                             value={propName}
                             onChange={(e) =>
                              updateArticleCellCss(
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

                             <option value='font-weight'>Font Weight</option>
                             <option value='line-height'>Line Height</option>
                             <option value='margin-bottom'>
                              Margin Bottom
                             </option>
                             <option value='margin'>Margin</option>
                             <option value='margin-left'>Margin Left</option>
                             <option value='margin-top'>Margin Top</option>
                             <option value='margin-right'>Margin Right</option>
                             <option value='opacity'>Opacity</option>

                             <option value='padding-left'>Padding Left</option>
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
                               updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                               updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                                updateArticleCellCss(
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
                               updateArticleCellCss(
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
                                updateArticleCellCss(
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
                               updateArticleCellCss(
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
                               updateArticleCellCss(
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
             } else if (key === "position") {
              return (
               <label key={key}>
                {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                 return str.toUpperCase();
                })}
                ition
                <select
                 name={key}
                 value={css[key]}
                 onChange={(e) => updateArticleCellCss(i, e, "css")}
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onClick={() => addArticleCellTransition(i)}>
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
                      updateArticleCellCss(i, e, "transition", index)
                     }
                     value={property}
                     name='property'>
                     <option value=''></option>

                     <option value='color'>Color</option>
                     <option value='background-color'>Background Color</option>
                    </select>
                    <h5>Transition Timing</h5>
                    <input
                     type='text'
                     name='duration'
                     onChange={(e) =>
                      updateArticleCellCss(i, e, "transition", index)
                     }
                     value={duration}
                     placeholder='Enter A Value in seconds'
                    />
                    <h5>Transition Function</h5>
                    <select
                     name='timingFunction'
                     value={timingFunction}
                     onChange={(e) =>
                      updateArticleCellCss(i, e, "transition", index)
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
                      updateArticleCellCss(i, e, "transition", index)
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
                          updateArticleCellCss(i, e, "cubicNs", index, n)
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
                {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                 return str.toUpperCase();
                })}

                <select
                 name={key}
                 onChange={(e) => updateArticleCellCss(i, e, "transform")}
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
                    updateArticleCellCss(i, e, "rotateZ", "transformProp")
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
                    updateArticleCellCss(i, e, "rotateX", "transformProp")
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
                    updateArticleCellCss(
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
                    updateArticleCellCss(
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
                    updateArticleCellCss(i, e, "rotateY", "transformProp")
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
                    updateArticleCellCss(i, e, "skewX", "transformProp")
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
                    updateArticleCellCss(i, e, "skewY", "transformProp")
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
                   value={parseFloat(css["transformProp"]["scaleX"])}
                   onChange={(e) =>
                    updateArticleCellCss(i, e, "scaleX", "transformProp")
                   }
                   orientation='horizontal'
                   name='scaleX'
                   min={-1}
                   max={2}
                   step={0.01}
                  />
                 </div>
                )}{" "}
                {css.transform.includes("scaleY") && (
                 <div>
                  <h5>Scale Y Percent</h5>
                  <Slider
                   value={parseFloat(css["transformProp"]["scaleY"])}
                   onChange={(e) =>
                    updateArticleCellCss(i, e, "scaleY", "transformProp")
                   }
                   orientation='horizontal'
                   name='scaleY'
                   min={-1}
                   max={2}
                   step={0.01}
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) =>
                  updateArticleCellCss(i, e, "opacity", "slider")
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
                {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                 return str.toUpperCase();
                })}
                <Slider
                 value={parseInt(css[key])}
                 onChange={(e) => updateArticleCellCss(i, e, key, "slider")}
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}>
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
                 onChange={(e) => updateArticleCellCss(i, e, "css")}
                 name={key}
                />
               </label>
              );
             }
            })}
           </div>
          );
         }
        )}
       </div>
      )}

     {mappedCss === "main" && cellToggle === true && mainCells.length > 0 && (
      <div>
       {" "}
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={mainCells.length}
        paginate={paginate}
       />
       {currentMainCell.map(
        ({ css, top, left, templateArea, columnSpan, rowSpan }, i) => {
         return (
          <div>
           <input
            type='text'
            name='top'
            value={top}
            onChange={(e) => updateMainCellCss(i, e)}
           />
           <input
            type='text'
            name='left'
            value={left}
            onChange={(e) => updateMainCellCss(i, e)}
           />
           <input
            type='text'
            name='columnSpan'
            value={columnSpan}
            onChange={(e) => updateMainCellCss(i, e)}
           />
           <input
            type='text'
            name='top'
            value={rowSpan}
            onChange={(e) => updateMainCellCss(i, e)}
           />

           <select
            name='templateArea'
            onChange={(e) => updateMainCellCss(i, e)}
            value={templateArea}>
            <option value=''></option>
            <option value='a'>A</option>
            <option value='b'>B</option>
            <option value='c'>C</option>
            <option value='d'>E</option>
           </select>

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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                 onClick={() => addMainCellAnimation(i)}>
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
                       updateMainCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Duration</h5>
                     <input
                      type='text'
                      name='animationDuration'
                      value={animationDuration}
                      onChange={(e) =>
                       updateMainCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Function</h5>
                     <select
                      name='animationTimingFunction'
                      value={animationTimingFunction}
                      onChange={(e) =>
                       updateMainCellCss(i, e, "animation", index)
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
                       updateMainCellCss(i, e, "animation", index)
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
                           updateMainCellCss(i, e, "cubicNs", index, n)
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
                       updateMainCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Iteration Count</h5>
                     <input
                      placeholder='Positive Integers Only'
                      type='text'
                      name='animationIterationCount'
                      value={animationIterationCount}
                      onChange={(e) =>
                       updateMainCellCss(i, e, "animation", index)
                      }
                     />
                     <h5>Animation Direction</h5>
                     <select
                      name='animationDirection'
                      value={animationDirection}
                      onChange={(e) =>
                       updateMainCellCss(i, e, "animation", index)
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
                       updateMainCellCss(i, e, "animation", index)
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
                      onClick={() => addMainCellAnimationKeyframe(index)}>
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
                          updateMainCellCss(i, e, "animationkey", index, ind)
                         }
                        />
                        <button
                         className='btn btn-sm btn-dark'
                         onClick={() =>
                          addMainCellAnimationKeyframeProperty(index, ind)
                         }>
                         + Property
                        </button>

                        {properties.map(
                         (
                          { propName, propValue, shadowValues, transValues },
                          indy
                         ) => (
                          <div>
                           <select
                            name='propName'
                            value={propName}
                            onChange={(e) =>
                             updateMainCellCss(
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

                            <option value='font-weight'>Font Weight</option>
                            <option value='line-height'>Line Height</option>
                            <option value='margin-bottom'>Margin Bottom</option>
                            <option value='margin'>Margin</option>
                            <option value='margin-left'>Margin Left</option>
                            <option value='margin-top'>Margin Top</option>
                            <option value='margin-right'>Margin Right</option>
                            <option value='opacity'>Opacity</option>

                            <option value='padding-left'>Padding Left</option>
                            <option value='padding-right'>Padding Right</option>
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
                              updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                              updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                               updateMainCellCss(
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
                              updateMainCellCss(
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
                               updateMainCellCss(
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
                              updateMainCellCss(
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
                              updateMainCellCss(
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
                             <option value={pallet && pallet.dark}>Dark</option>
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
            } else if (key === "position") {
             return (
              <label key={key}>
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}
               ition
               <select
                name={key}
                value={css[key]}
                onChange={(e) => updateMainCellCss(i, e, "css")}
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onClick={() => addMainCellTransition(i)}>
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
                     updateMainCellCss(i, e, "transition", index)
                    }
                    value={property}
                    name='property'>
                    <option value=''></option>

                    <option value='color'>Color</option>
                    <option value='background-color'>Background Color</option>
                   </select>
                   <h5>Transition Timing</h5>
                   <input
                    type='text'
                    name='duration'
                    onChange={(e) =>
                     updateMainCellCss(i, e, "transition", index)
                    }
                    value={duration}
                    placeholder='Enter A Value in seconds'
                   />
                   <h5>Transition Function</h5>
                   <select
                    name='timingFunction'
                    value={timingFunction}
                    onChange={(e) =>
                     updateMainCellCss(i, e, "transition", index)
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
                     updateMainCellCss(i, e, "transition", index)
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
                         updateMainCellCss(i, e, "cubicNs", index, n)
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
               {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                return str.toUpperCase();
               })}

               <select
                name={key}
                onChange={(e) => updateMainCellCss(i, e, "transform")}
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
                   updateMainCellCss(i, e, "rotateZ", "transformProp")
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
                   updateMainCellCss(i, e, "rotateX", "transformProp")
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
                   updateMainCellCss(
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
                   updateMainCellCss(
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
                   updateMainCellCss(i, e, "rotateY", "transformProp")
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
                   updateMainCellCss(i, e, "skewX", "transformProp")
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
                   updateMainCellCss(i, e, "skewY", "transformProp")
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
                  value={parseFloat(css["transformProp"]["scaleX"])}
                  onChange={(e) =>
                   updateMainCellCss(i, e, "scaleX", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleX'
                  min={-1}
                  max={2}
                  step={0.01}
                 />
                </div>
               )}{" "}
               {css.transform.includes("scaleY") && (
                <div>
                 <h5>Scale Y Percent</h5>
                 <Slider
                  value={parseFloat(css["transformProp"]["scaleY"])}
                  onChange={(e) =>
                   updateMainCellCss(i, e, "scaleY", "transformProp")
                  }
                  orientation='horizontal'
                  name='scaleY'
                  min={-1}
                  max={2}
                  step={0.01}
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "opacity", "slider")}
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
                onChange={(e) => updateMainCellCss(i, e, key, "slider")}
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}>
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
                onChange={(e) => updateMainCellCss(i, e, "css")}
                name={key}
               />
              </label>
             );
            }
           })}
          </div>
         );
        }
       )}
      </div>
     )}

     {mappedCss === "nav" && gridToggle === true && (
      <div>
       <h5>NAV GRID SETTINGS</h5>
       <select name='verticalAlignment' onChange={(e) => updateNavGrid(e)}>
        <option>Vertical</option>
        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='center'>Center</option>
        <option value='space-between'>Between</option>
        <option value='space-around'>Around</option>
        <option value='space-evenly'>Evenly</option>
        <option value='stretch'>Stretch</option>
       </select>
       <select name='horitzontalAlignment' onChange={(e) => updateNavGrid(e)}>
        <option>Horizontal</option>
        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='center'>Center</option>
        <option value='space-between'>Between</option>
        <option value='space-around'>Around</option>
        <option value='space-evenly'>Evenly</option>
       </select>
       <select name='direction' onChange={(e) => updateNavGrid(e)}>
        <option>Flow</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
       <select name='layout' onChange={(e) => updateNavGrid(e)}>
        <option>Template Area Layouts</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
      </div>
     )}

     {mappedCss === "header" && gridToggle === true && (
      <div>
       <h5>HEADER GRID SETTINGS</h5>
       <select name='verticalAlignment' onChange={(e) => updateHeaderGrid(e)}>
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
        onChange={(e) => updateHeaderGrid(e)}>
        <option>Horizontal</option>
        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='center'>Center</option>
        <option value='space-between'>Between</option>
        <option value='space-around'>Around</option>
        <option value='space-evenly'>Evenly</option>
       </select>
       <select name='direction' onChange={(e) => updateHeaderGrid(e)}>
        <option>Flow</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
       <select name='layout' onChange={(e) => updateHeaderGrid(e)}>
        <option>Template Area Layouts</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
      </div>
     )}
     {mappedCss === "main" && gridToggle === true && (
      <div>
       <h5>MAIN GRID SETTINGS</h5>
       <select name='verticalAlignment' onChange={(e) => updateMainGrid(e)}>
        <option>Vertical</option>
        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='center'>Center</option>
        <option value='space-between'>Between</option>
        <option value='space-around'>Around</option>
        <option value='space-evenly'>Evenly</option>
        <option value='stretch'>Stretch</option>
       </select>
       <select name='horitzontalAlignment' onChange={(e) => updateMainGrid(e)}>
        <option>Horizontal</option>
        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='center'>Center</option>
        <option value='space-between'>Between</option>
        <option value='space-around'>Around</option>
        <option value='space-evenly'>Evenly</option>
       </select>
       <select name='direction' onChange={(e) => updateMainGrid(e)}>
        <option>Flow</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
       <select name='layout' onChange={(e) => updateMainGrid(e)}>
        <option>Template Area Layouts</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
      </div>
     )}

     {mappedCss === "article" && gridToggle === true && (
      <div>
       <h5>HEADER GRID SETTINGS</h5>
       <select name='verticalAlignment' onChange={(e) => updateArticleGrid(e)}>
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
        onChange={(e) => updateHeaderGrid(e)}>
        <option>Horizontal</option>
        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='center'>Center</option>
        <option value='space-between'>Between</option>
        <option value='space-around'>Around</option>
        <option value='space-evenly'>Evenly</option>
       </select>
       <select name='direction' onChange={(e) => updateArticleGrid(e)}>
        <option>Flow</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
       <select name='layout' onChange={(e) => updateArticleGrid(e)}>
        <option>Template Area Layouts</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
      </div>
     )}

     {mappedCss === "footer" && gridToggle === true && (
      <div>
       <h5>FOOTER GRID SETTINGS</h5>
       <select name='verticalAlignment' onChange={(e) => updateFooterGrid(e)}>
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
        onChange={(e) => updateHeaderGrid(e)}>
        <option>Horizontal</option>
        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='center'>Center</option>
        <option value='space-between'>Between</option>
        <option value='space-around'>Around</option>
        <option value='space-evenly'>Evenly</option>
       </select>
       <select name='direction' onChange={(e) => updateFooterGrid(e)}>
        <option>Flow</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
       <select name='layout' onChange={(e) => updateFooterGrid(e)}>
        <option>Template Area Layouts</option>
        <option value='row'>Row</option>
        <option value='column'>Column</option>
        <option value='row dense'>Row Dense</option>
       </select>
      </div>
     )}

     {mappedCss === "page" &&
      cssToggle === true &&
      Object.keys(css).map((key) => {
       if (key.includes("Color")) {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updatePageCss(e, "css")}>
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
            onClick={() => addPageAnimation()}>
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
                 onChange={(e) => updatePageCss(e, "animation", index)}
                />
                <h5>Animation Duration</h5>
                <input
                 type='text'
                 name='animationDuration'
                 value={animationDuration}
                 onChange={(e) => updatePageCss(e, "animation", index)}
                />
                <h5>Animation Function</h5>
                <select
                 name='animationTimingFunction'
                 value={animationTimingFunction}
                 onChange={(e) => updatePageCss(e, "animation", index)}>
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
                 onChange={(e) => updatePageCss(e, "animation", index)}
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
                     value={parseFloat(css["animation"][index]["cubicNs"][n])}
                     onChange={(e) => updatePageCss(e, "cubicNs", index, n)}
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
                 onChange={(e) => updatePageCss(e, "animation", index)}
                />
                <h5>Animation Iteration Count</h5>
                <input
                 placeholder='Positive Integers Only'
                 type='text'
                 name='animationIterationCount'
                 value={animationIterationCount}
                 onChange={(e) => updatePageCss(e, "animation", index)}
                />
                <h5>Animation Direction</h5>
                <select
                 name='animationDirection'
                 value={animationDirection}
                 onChange={(e) => updatePageCss(e, "animation", index)}>
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
                 onChange={(e) => updatePageCss(e, "animation", index)}>
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
                 onClick={() => addPageAnimationKeyframe(index)}>
                 + Keyframe
                </button>
                {keyframes.map(({ completionPercent, properties }, ind) => (
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
                    updatePageCss(e, "animationkey", index, ind)
                   }
                  />
                  <button
                   className='btn btn-sm btn-dark'
                   onClick={() => addPageAnimationKeyframeProperty(index, ind)}>
                   + Property
                  </button>

                  {properties.map(
                   (
                    { propName, propValue, shadowValues, transValues },
                    indy
                   ) => (
                    <div>
                     <select
                      name='propName'
                      value={propName}
                      onChange={(e) =>
                       updatePageCss(e, "animationkeyprop", index, ind, indy)
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
                      <option value='background-color'>Background Color</option>
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
                      <option value='border-top-color'>Border Top Color</option>
                      <option value='border-top-left-radius'>
                       Border Top Left Radius
                      </option>
                      <option value='border-top-right-radius'>
                       Border Top Right Radius
                      </option>
                      <option value='border-top-width'>Border Top Width</option>
                      <option value='box-shadow'>Box Shadow</option>
                      <option value='font'>Font</option>
                      <option value='font-size'>Font Size</option>

                      <option value='font-weight'>Font Weight</option>
                      <option value='line-height'>Line Height</option>
                      <option value='margin-bottom'>Margin Bottom</option>
                      <option value='margin'>Margin</option>
                      <option value='margin-left'>Margin Left</option>
                      <option value='margin-top'>Margin Top</option>
                      <option value='margin-right'>Margin Right</option>
                      <option value='opacity'>Opacity</option>

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
                        updatePageCss(e, "animationkeyprop", index, ind, indy)
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                        updatePageCss(e, "animationkeyprop", index, ind, indy)
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                         updatePageCss(
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
                        <option value={pallet && pallet.dark}>Dark</option>
                        <option value={pallet && pallet.light}>Light</option>
                        <option value={pallet && pallet.danger}>Danger</option>
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
                        updatePageCss(e, "animationkeyprop", index, ind, indy)
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
                         updatePageCss(
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
                        updatePageCss(e, "animationkeyprop", index, ind, indy)
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
                        updatePageCss(e, "animationkeyprop", index, ind, indy)
                       }>
                       <option>Set Color...</option>
                       <option value={pallet && pallet.primary}>Primary</option>
                       <option value={pallet && pallet.dark}>Dark</option>
                       <option value={pallet && pallet.light}>Light</option>
                       <option value={pallet && pallet.danger}>Danger</option>
                       <option value={pallet && pallet.success}>Success</option>
                      </select>
                     )}
                    </div>
                   )
                  )}
                 </div>
                ))}
               </div>
              )
             )}
           </ul>
          </div>
         </label>
        );
       } else if (key === "position") {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          ition
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updatePageCss(e, "css")}
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onClick={() => addCellTransition()}>
           + Transition
          </button>
          <div
           className='card'
           style={{ overflowY: "scroll", overflowX: "scroll" }}>
           {css.transition.map(
            ({ property, duration, timingFunction, cubicNs, delay }, index) => (
             <div key={index} className='card'>
              <h5>Transition Property</h5>
              <select
               onChange={(e) => updatePageCss(e, "transition", index)}
               value={property}
               name='property'>
               <option value=''></option>

               <option value='color'>Color</option>
               <option value='background-color'>Background Color</option>
              </select>
              <h5>Transition Timing</h5>
              <input
               type='text'
               name='duration'
               onChange={(e) => updatePageCss(e, "transition", index)}
               value={duration}
               placeholder='Enter A Value in seconds'
              />
              <h5>Transition Function</h5>
              <select
               name='timingFunction'
               value={timingFunction}
               onChange={(e) => updatePageCss(e, "transition", index)}>
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
               onChange={(e) => updatePageCss(e, "transition", index)}
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
                   value={parseFloat(css["transition"][index]["cubicNs"][n])}
                   onChange={(e) => updatePageCss(e, "cubicNs", index, n)}
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
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}

          <select
           name={key}
           onChange={(e) => updatePageCss(e, "transform")}
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
             onChange={(e) => updatePageCss(e, "rotateZ", "transformProp")}
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
             onChange={(e) => updatePageCss(e, "rotateX", "transformProp")}
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
              updatePageCss(e.target.value, "translateX", "transformProp")
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
              updatePageCss(e.target.value, "translateY", "transformProp")
             }
            />
           </div>
          )}
          {css.transform.includes("rotateY") && (
           <div>
            <h5>Rotate Y Deg</h5>
            <Slider
             value={parseInt(css["transformProp"]["rotateY"])}
             onChange={(e) => updatePageCss(e, "rotateY", "transformProp")}
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
             onChange={(e) => updatePageCss(e, "skewX", "transformProp")}
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
             onChange={(e) => updatePageCss(e, "skewY", "transformProp")}
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
             value={parseFloat(css["transformProp"]["scaleX"])}
             onChange={(e) => updatePageCss(e, "scaleX", "transformProp")}
             orientation='horizontal'
             name='scaleX'
             min={-1}
             max={2}
             step={0.01}
            />
           </div>
          )}{" "}
          {css.transform.includes("scaleY") && (
           <div>
            <h5>Scale Y Percent</h5>
            <Slider
             value={parseFloat(css["transformProp"]["scaleY"])}
             onChange={(e) => updatePageCss(e, "scaleY", "transformProp")}
             orientation='horizontal'
             name='scaleY'
             min={-1}
             max={2}
             step={0.01}
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "opacity", "slider")}
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
           onChange={(e) => updatePageCss(e, key, "slider")}
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}>
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
           onChange={(e) => updatePageCss(e, "css")}
           name={key}
          />
         </label>
        );
       }
      })}

     {mappedCss === "nav" &&
      cssToggle === true &&
      Object.keys(navCSS).map((key) => {
       if (key.includes("Color")) {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateNavCss(e, "css")}>
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
            onClick={() => addPageAnimation()}>
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
                 onChange={(e) => updateNavCss(e, "animation", index)}
                />
                <h5>Animation Duration</h5>
                <input
                 type='text'
                 name='animationDuration'
                 value={animationDuration}
                 onChange={(e) => updateNavCss(e, "animation", index)}
                />
                <h5>Animation Function</h5>
                <select
                 name='animationTimingFunction'
                 value={animationTimingFunction}
                 onChange={(e) => updateNavCss(e, "animation", index)}>
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
                 onChange={(e) => updateNavCss(e, "animation", index)}
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
                     value={parseFloat(css["animation"][index]["cubicNs"][n])}
                     onChange={(e) => updateNavCss(e, "cubicNs", index, n)}
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
                 onChange={(e) => updateNavCss(e, "animation", index)}
                />
                <h5>Animation Iteration Count</h5>
                <input
                 placeholder='Positive Integers Only'
                 type='text'
                 name='animationIterationCount'
                 value={animationIterationCount}
                 onChange={(e) => updateNavCss(e, "animation", index)}
                />
                <h5>Animation Direction</h5>
                <select
                 name='animationDirection'
                 value={animationDirection}
                 onChange={(e) => updateNavCss(e, "animation", index)}>
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
                 onChange={(e) => updateNavCss(e, "animation", index)}>
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
                 onClick={() => addPageAnimationKeyframe(index)}>
                 + Keyframe
                </button>
                {keyframes.map(({ completionPercent, properties }, ind) => (
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
                   onChange={(e) => updateNavCss(e, "animationkey", index, ind)}
                  />
                  <button
                   className='btn btn-sm btn-dark'
                   onClick={() => addPageAnimationKeyframeProperty(index, ind)}>
                   + Property
                  </button>

                  {properties.map(
                   (
                    { propName, propValue, shadowValues, transValues },
                    indy
                   ) => (
                    <div>
                     <select
                      name='propName'
                      value={propName}
                      onChange={(e) =>
                       updateNavCss(e, "animationkeyprop", index, ind, indy)
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
                      <option value='background-color'>Background Color</option>
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
                      <option value='border-top-color'>Border Top Color</option>
                      <option value='border-top-left-radius'>
                       Border Top Left Radius
                      </option>
                      <option value='border-top-right-radius'>
                       Border Top Right Radius
                      </option>
                      <option value='border-top-width'>Border Top Width</option>
                      <option value='box-shadow'>Box Shadow</option>
                      <option value='font'>Font</option>
                      <option value='font-size'>Font Size</option>

                      <option value='font-weight'>Font Weight</option>
                      <option value='line-height'>Line Height</option>
                      <option value='margin-bottom'>Margin Bottom</option>
                      <option value='margin'>Margin</option>
                      <option value='margin-left'>Margin Left</option>
                      <option value='margin-top'>Margin Top</option>
                      <option value='margin-right'>Margin Right</option>
                      <option value='opacity'>Opacity</option>

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
                        updateNavCss(e, "animationkeyprop", index, ind, indy)
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                        updateNavCss(e, "animationkeyprop", index, ind, indy)
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                         updateNavCss(
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
                        <option value={pallet && pallet.dark}>Dark</option>
                        <option value={pallet && pallet.light}>Light</option>
                        <option value={pallet && pallet.danger}>Danger</option>
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
                        updateNavCss(e, "animationkeyprop", index, ind, indy)
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
                         updateNavCss(
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
                        updateNavCss(e, "animationkeyprop", index, ind, indy)
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
                        updateNavCss(e, "animationkeyprop", index, ind, indy)
                       }>
                       <option>Set Color...</option>
                       <option value={pallet && pallet.primary}>Primary</option>
                       <option value={pallet && pallet.dark}>Dark</option>
                       <option value={pallet && pallet.light}>Light</option>
                       <option value={pallet && pallet.danger}>Danger</option>
                       <option value={pallet && pallet.success}>Success</option>
                      </select>
                     )}
                    </div>
                   )
                  )}
                 </div>
                ))}
               </div>
              )
             )}
           </ul>
          </div>
         </label>
        );
       } else if (key === "position") {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          ition
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateNavCss(e, "css")}
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onClick={() => addCellTransition()}>
           + Transition
          </button>
          <div
           className='card'
           style={{ overflowY: "scroll", overflowX: "scroll" }}>
           {css.transition.map(
            ({ property, duration, timingFunction, cubicNs, delay }, index) => (
             <div key={index} className='card'>
              <h5>Transition Property</h5>
              <select
               onChange={(e) => updateNavCss(e, "transition", index)}
               value={property}
               name='property'>
               <option value=''></option>

               <option value='color'>Color</option>
               <option value='background-color'>Background Color</option>
              </select>
              <h5>Transition Timing</h5>
              <input
               type='text'
               name='duration'
               onChange={(e) => updateNavCss(e, "transition", index)}
               value={duration}
               placeholder='Enter A Value in seconds'
              />
              <h5>Transition Function</h5>
              <select
               name='timingFunction'
               value={timingFunction}
               onChange={(e) => updateNavCss(e, "transition", index)}>
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
               onChange={(e) => updateNavCss(e, "transition", index)}
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
                   value={parseFloat(css["transition"][index]["cubicNs"][n])}
                   onChange={(e) => updateNavCss(e, "cubicNs", index, n)}
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
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}

          <select
           name={key}
           onChange={(e) => updateNavCss(e, "transform")}
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
             onChange={(e) => updateNavCss(e, "rotateZ", "transformProp")}
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
             onChange={(e) => updateNavCss(e, "rotateX", "transformProp")}
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
              updateNavCss(e.target.value, "translateX", "transformProp")
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
              updateNavCss(e.target.value, "translateY", "transformProp")
             }
            />
           </div>
          )}
          {css.transform.includes("rotateY") && (
           <div>
            <h5>Rotate Y Deg</h5>
            <Slider
             value={parseInt(css["transformProp"]["rotateY"])}
             onChange={(e) => updateNavCss(e, "rotateY", "transformProp")}
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
             onChange={(e) => updateNavCss(e, "skewX", "transformProp")}
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
             onChange={(e) => updateNavCss(e, "skewY", "transformProp")}
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
             value={parseFloat(css["transformProp"]["scaleX"])}
             onChange={(e) => updateNavCss(e, "scaleX", "transformProp")}
             orientation='horizontal'
             name='scaleX'
             min={-1}
             max={2}
             step={0.01}
            />
           </div>
          )}{" "}
          {css.transform.includes("scaleY") && (
           <div>
            <h5>Scale Y Percent</h5>
            <Slider
             value={parseFloat(css["transformProp"]["scaleY"])}
             onChange={(e) => updateNavCss(e, "scaleY", "transformProp")}
             orientation='horizontal'
             name='scaleY'
             min={-1}
             max={2}
             step={0.01}
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "opacity", "slider")}
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
           onChange={(e) => updateNavCss(e, key, "slider")}
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}>
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
           onChange={(e) => updateNavCss(e, "css")}
           name={key}
          />
         </label>
        );
       }
      })}

     {mappedCss === "header" &&
      cssToggle === true &&
      Object.keys(headerCSS).map((key) => {
       if (key.includes("Color")) {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateHeaderCss(e, "css")}>
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
            onClick={() => addPageAnimation()}>
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
                 onChange={(e) => updateHeaderCss(e, "animation", index)}
                />
                <h5>Animation Duration</h5>
                <input
                 type='text'
                 name='animationDuration'
                 value={animationDuration}
                 onChange={(e) => updateHeaderCss(e, "animation", index)}
                />
                <h5>Animation Function</h5>
                <select
                 name='animationTimingFunction'
                 value={animationTimingFunction}
                 onChange={(e) => updateHeaderCss(e, "animation", index)}>
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
                 onChange={(e) => updateHeaderCss(e, "animation", index)}
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
                     value={parseFloat(css["animation"][index]["cubicNs"][n])}
                     onChange={(e) => updateHeaderCss(e, "cubicNs", index, n)}
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
                 onChange={(e) => updateHeaderCss(e, "animation", index)}
                />
                <h5>Animation Iteration Count</h5>
                <input
                 placeholder='Positive Integers Only'
                 type='text'
                 name='animationIterationCount'
                 value={animationIterationCount}
                 onChange={(e) => updateHeaderCss(e, "animation", index)}
                />
                <h5>Animation Direction</h5>
                <select
                 name='animationDirection'
                 value={animationDirection}
                 onChange={(e) => updateHeaderCss(e, "animation", index)}>
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
                 onChange={(e) => updateHeaderCss(e, "animation", index)}>
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
                 onClick={() => addPageAnimationKeyframe(index)}>
                 + Keyframe
                </button>
                {keyframes.map(({ completionPercent, properties }, ind) => (
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
                    updateHeaderCss(e, "animationkey", index, ind)
                   }
                  />
                  <button
                   className='btn btn-sm btn-dark'
                   onClick={() => addPageAnimationKeyframeProperty(index, ind)}>
                   + Property
                  </button>

                  {properties.map(
                   (
                    { propName, propValue, shadowValues, transValues },
                    indy
                   ) => (
                    <div>
                     <select
                      name='propName'
                      value={propName}
                      onChange={(e) =>
                       updateHeaderCss(e, "animationkeyprop", index, ind, indy)
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
                      <option value='background-color'>Background Color</option>
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
                      <option value='border-top-color'>Border Top Color</option>
                      <option value='border-top-left-radius'>
                       Border Top Left Radius
                      </option>
                      <option value='border-top-right-radius'>
                       Border Top Right Radius
                      </option>
                      <option value='border-top-width'>Border Top Width</option>
                      <option value='box-shadow'>Box Shadow</option>
                      <option value='font'>Font</option>
                      <option value='font-size'>Font Size</option>

                      <option value='font-weight'>Font Weight</option>
                      <option value='line-height'>Line Height</option>
                      <option value='margin-bottom'>Margin Bottom</option>
                      <option value='margin'>Margin</option>
                      <option value='margin-left'>Margin Left</option>
                      <option value='margin-top'>Margin Top</option>
                      <option value='margin-right'>Margin Right</option>
                      <option value='opacity'>Opacity</option>

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
                        updateHeaderCss(e, "animationkeyprop", index, ind, indy)
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                        updateHeaderCss(e, "animationkeyprop", index, ind, indy)
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                         updateHeaderCss(
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
                        <option value={pallet && pallet.dark}>Dark</option>
                        <option value={pallet && pallet.light}>Light</option>
                        <option value={pallet && pallet.danger}>Danger</option>
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
                        updateHeaderCss(e, "animationkeyprop", index, ind, indy)
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
                         updateHeaderCss(
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
                        updateHeaderCss(e, "animationkeyprop", index, ind, indy)
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
                        updateHeaderCss(e, "animationkeyprop", index, ind, indy)
                       }>
                       <option>Set Color...</option>
                       <option value={pallet && pallet.primary}>Primary</option>
                       <option value={pallet && pallet.dark}>Dark</option>
                       <option value={pallet && pallet.light}>Light</option>
                       <option value={pallet && pallet.danger}>Danger</option>
                       <option value={pallet && pallet.success}>Success</option>
                      </select>
                     )}
                    </div>
                   )
                  )}
                 </div>
                ))}
               </div>
              )
             )}
           </ul>
          </div>
         </label>
        );
       } else if (key === "position") {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          ition
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateHeaderCss(e, "css")}
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onClick={() => addCellTransition()}>
           + Transition
          </button>
          <div
           className='card'
           style={{ overflowY: "scroll", overflowX: "scroll" }}>
           {css.transition.map(
            ({ property, duration, timingFunction, cubicNs, delay }, index) => (
             <div key={index} className='card'>
              <h5>Transition Property</h5>
              <select
               onChange={(e) => updateHeaderCss(e, "transition", index)}
               value={property}
               name='property'>
               <option value=''></option>

               <option value='color'>Color</option>
               <option value='background-color'>Background Color</option>
              </select>
              <h5>Transition Timing</h5>
              <input
               type='text'
               name='duration'
               onChange={(e) => updateHeaderCss(e, "transition", index)}
               value={duration}
               placeholder='Enter A Value in seconds'
              />
              <h5>Transition Function</h5>
              <select
               name='timingFunction'
               value={timingFunction}
               onChange={(e) => updateHeaderCss(e, "transition", index)}>
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
               onChange={(e) => updateHeaderCss(e, "transition", index)}
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
                   value={parseFloat(css["transition"][index]["cubicNs"][n])}
                   onChange={(e) => updateHeaderCss(e, "cubicNs", index, n)}
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
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}

          <select
           name={key}
           onChange={(e) => updateHeaderCss(e, "transform")}
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
             onChange={(e) => updateHeaderCss(e, "rotateZ", "transformProp")}
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
             onChange={(e) => updateHeaderCss(e, "rotateX", "transformProp")}
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
              updateHeaderCss(e.target.value, "translateX", "transformProp")
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
              updateHeaderCss(e.target.value, "translateY", "transformProp")
             }
            />
           </div>
          )}
          {css.transform.includes("rotateY") && (
           <div>
            <h5>Rotate Y Deg</h5>
            <Slider
             value={parseInt(css["transformProp"]["rotateY"])}
             onChange={(e) => updateHeaderCss(e, "rotateY", "transformProp")}
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
             onChange={(e) => updateHeaderCss(e, "skewX", "transformProp")}
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
             onChange={(e) => updateHeaderCss(e, "skewY", "transformProp")}
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
             value={parseFloat(css["transformProp"]["scaleX"])}
             onChange={(e) => updateHeaderCss(e, "scaleX", "transformProp")}
             orientation='horizontal'
             name='scaleX'
             min={-1}
             max={2}
             step={0.01}
            />
           </div>
          )}{" "}
          {css.transform.includes("scaleY") && (
           <div>
            <h5>Scale Y Percent</h5>
            <Slider
             value={parseFloat(css["transformProp"]["scaleY"])}
             onChange={(e) => updateHeaderCss(e, "scaleY", "transformProp")}
             orientation='horizontal'
             name='scaleY'
             min={-1}
             max={2}
             step={0.01}
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "opacity", "slider")}
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
           onChange={(e) => updateHeaderCss(e, key, "slider")}
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}>
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
           onChange={(e) => updateHeaderCss(e, "css")}
           name={key}
          />
         </label>
        );
       }
      })}

     {mappedCss === "footer" &&
      cssToggle === true &&
      Object.keys(footerCSS).map((key) => {
       if (key.includes("Color")) {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateFooterCss(e, "css")}>
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
            onClick={() => addPageAnimation()}>
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
                 onChange={(e) => updateFooterCss(e, "animation", index)}
                />
                <h5>Animation Duration</h5>
                <input
                 type='text'
                 name='animationDuration'
                 value={animationDuration}
                 onChange={(e) => updateFooterCss(e, "animation", index)}
                />
                <h5>Animation Function</h5>
                <select
                 name='animationTimingFunction'
                 value={animationTimingFunction}
                 onChange={(e) => updateFooterCss(e, "animation", index)}>
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
                 onChange={(e) => updateFooterCss(e, "animation", index)}
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
                     value={parseFloat(css["animation"][index]["cubicNs"][n])}
                     onChange={(e) => updateFooterCss(e, "cubicNs", index, n)}
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
                 onChange={(e) => updateFooterCss(e, "animation", index)}
                />
                <h5>Animation Iteration Count</h5>
                <input
                 placeholder='Positive Integers Only'
                 type='text'
                 name='animationIterationCount'
                 value={animationIterationCount}
                 onChange={(e) => updateFooterCss(e, "animation", index)}
                />
                <h5>Animation Direction</h5>
                <select
                 name='animationDirection'
                 value={animationDirection}
                 onChange={(e) => updateFooterCss(e, "animation", index)}>
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
                 onChange={(e) => updateFooterCss(e, "animation", index)}>
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
                 onClick={() => addPageAnimationKeyframe(index)}>
                 + Keyframe
                </button>
                {keyframes.map(({ completionPercent, properties }, ind) => (
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
                    updateFooterCss(e, "animationkey", index, ind)
                   }
                  />
                  <button
                   className='btn btn-sm btn-dark'
                   onClick={() => addPageAnimationKeyframeProperty(index, ind)}>
                   + Property
                  </button>

                  {properties.map(
                   (
                    { propName, propValue, shadowValues, transValues },
                    indy
                   ) => (
                    <div>
                     <select
                      name='propName'
                      value={propName}
                      onChange={(e) =>
                       updateFooterCss(e, "animationkeyprop", index, ind, indy)
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
                      <option value='background-color'>Background Color</option>
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
                      <option value='border-top-color'>Border Top Color</option>
                      <option value='border-top-left-radius'>
                       Border Top Left Radius
                      </option>
                      <option value='border-top-right-radius'>
                       Border Top Right Radius
                      </option>
                      <option value='border-top-width'>Border Top Width</option>
                      <option value='box-shadow'>Box Shadow</option>
                      <option value='font'>Font</option>
                      <option value='font-size'>Font Size</option>

                      <option value='font-weight'>Font Weight</option>
                      <option value='line-height'>Line Height</option>
                      <option value='margin-bottom'>Margin Bottom</option>
                      <option value='margin'>Margin</option>
                      <option value='margin-left'>Margin Left</option>
                      <option value='margin-top'>Margin Top</option>
                      <option value='margin-right'>Margin Right</option>
                      <option value='opacity'>Opacity</option>

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
                        updateFooterCss(e, "animationkeyprop", index, ind, indy)
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                        updateFooterCss(e, "animationkeyprop", index, ind, indy)
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                         updateFooterCss(
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
                        <option value={pallet && pallet.dark}>Dark</option>
                        <option value={pallet && pallet.light}>Light</option>
                        <option value={pallet && pallet.danger}>Danger</option>
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
                        updateFooterCss(e, "animationkeyprop", index, ind, indy)
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
                         updateFooterCss(
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
                        updateFooterCss(e, "animationkeyprop", index, ind, indy)
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
                        updateFooterCss(e, "animationkeyprop", index, ind, indy)
                       }>
                       <option>Set Color...</option>
                       <option value={pallet && pallet.primary}>Primary</option>
                       <option value={pallet && pallet.dark}>Dark</option>
                       <option value={pallet && pallet.light}>Light</option>
                       <option value={pallet && pallet.danger}>Danger</option>
                       <option value={pallet && pallet.success}>Success</option>
                      </select>
                     )}
                    </div>
                   )
                  )}
                 </div>
                ))}
               </div>
              )
             )}
           </ul>
          </div>
         </label>
        );
       } else if (key === "position") {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          ition
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateFooterCss(e, "css")}
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onClick={() => addCellTransition()}>
           + Transition
          </button>
          <div
           className='card'
           style={{ overflowY: "scroll", overflowX: "scroll" }}>
           {css.transition.map(
            ({ property, duration, timingFunction, cubicNs, delay }, index) => (
             <div key={index} className='card'>
              <h5>Transition Property</h5>
              <select
               onChange={(e) => updateFooterCss(e, "transition", index)}
               value={property}
               name='property'>
               <option value=''></option>

               <option value='color'>Color</option>
               <option value='background-color'>Background Color</option>
              </select>
              <h5>Transition Timing</h5>
              <input
               type='text'
               name='duration'
               onChange={(e) => updateFooterCss(e, "transition", index)}
               value={duration}
               placeholder='Enter A Value in seconds'
              />
              <h5>Transition Function</h5>
              <select
               name='timingFunction'
               value={timingFunction}
               onChange={(e) => updateFooterCss(e, "transition", index)}>
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
               onChange={(e) => updateFooterCss(e, "transition", index)}
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
                   value={parseFloat(css["transition"][index]["cubicNs"][n])}
                   onChange={(e) => updateFooterCss(e, "cubicNs", index, n)}
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
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}

          <select
           name={key}
           onChange={(e) => updateFooterCss(e, "transform")}
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
             onChange={(e) => updateFooterCss(e, "rotateZ", "transformProp")}
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
             onChange={(e) => updateFooterCss(e, "rotateX", "transformProp")}
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
              updateFooterCss(e.target.value, "translateX", "transformProp")
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
              updateFooterCss(e.target.value, "translateY", "transformProp")
             }
            />
           </div>
          )}
          {css.transform.includes("rotateY") && (
           <div>
            <h5>Rotate Y Deg</h5>
            <Slider
             value={parseInt(css["transformProp"]["rotateY"])}
             onChange={(e) => updateFooterCss(e, "rotateY", "transformProp")}
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
             onChange={(e) => updateFooterCss(e, "skewX", "transformProp")}
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
             onChange={(e) => updateFooterCss(e, "skewY", "transformProp")}
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
             value={parseFloat(css["transformProp"]["scaleX"])}
             onChange={(e) => updateFooterCss(e, "scaleX", "transformProp")}
             orientation='horizontal'
             name='scaleX'
             min={-1}
             max={2}
             step={0.01}
            />
           </div>
          )}{" "}
          {css.transform.includes("scaleY") && (
           <div>
            <h5>Scale Y Percent</h5>
            <Slider
             value={parseFloat(css["transformProp"]["scaleY"])}
             onChange={(e) => updateFooterCss(e, "scaleY", "transformProp")}
             orientation='horizontal'
             name='scaleY'
             min={-1}
             max={2}
             step={0.01}
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "opacity", "slider")}
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
           onChange={(e) => updateFooterCss(e, key, "slider")}
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}>
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
           onChange={(e) => updateFooterCss(e, "css")}
           name={key}
          />
         </label>
        );
       }
      })}

     {mappedCss === "main" &&
      cssToggle === true &&
      Object.keys(mainCSS).map((key) => {
       if (key.includes("Color")) {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateMainCss(e, "css")}>
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
            onClick={() => addPageAnimation()}>
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
                 onChange={(e) => updateMainCss(e, "animation", index)}
                />
                <h5>Animation Duration</h5>
                <input
                 type='text'
                 name='animationDuration'
                 value={animationDuration}
                 onChange={(e) => updateMainCss(e, "animation", index)}
                />
                <h5>Animation Function</h5>
                <select
                 name='animationTimingFunction'
                 value={animationTimingFunction}
                 onChange={(e) => updateMainCss(e, "animation", index)}>
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
                 onChange={(e) => updateMainCss(e, "animation", index)}
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
                     value={parseFloat(css["animation"][index]["cubicNs"][n])}
                     onChange={(e) => updateMainCss(e, "cubicNs", index, n)}
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
                 onChange={(e) => updateMainCss(e, "animation", index)}
                />
                <h5>Animation Iteration Count</h5>
                <input
                 placeholder='Positive Integers Only'
                 type='text'
                 name='animationIterationCount'
                 value={animationIterationCount}
                 onChange={(e) => updateMainCss(e, "animation", index)}
                />
                <h5>Animation Direction</h5>
                <select
                 name='animationDirection'
                 value={animationDirection}
                 onChange={(e) => updateMainCss(e, "animation", index)}>
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
                 onChange={(e) => updateMainCss(e, "animation", index)}>
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
                 onClick={() => addPageAnimationKeyframe(index)}>
                 + Keyframe
                </button>
                {keyframes.map(({ completionPercent, properties }, ind) => (
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
                    updateMainCss(e, "animationkey", index, ind)
                   }
                  />
                  <button
                   className='btn btn-sm btn-dark'
                   onClick={() => addPageAnimationKeyframeProperty(index, ind)}>
                   + Property
                  </button>

                  {properties.map(
                   (
                    { propName, propValue, shadowValues, transValues },
                    indy
                   ) => (
                    <div>
                     <select
                      name='propName'
                      value={propName}
                      onChange={(e) =>
                       updateMainCss(e, "animationkeyprop", index, ind, indy)
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
                      <option value='background-color'>Background Color</option>
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
                      <option value='border-top-color'>Border Top Color</option>
                      <option value='border-top-left-radius'>
                       Border Top Left Radius
                      </option>
                      <option value='border-top-right-radius'>
                       Border Top Right Radius
                      </option>
                      <option value='border-top-width'>Border Top Width</option>
                      <option value='box-shadow'>Box Shadow</option>
                      <option value='font'>Font</option>
                      <option value='font-size'>Font Size</option>

                      <option value='font-weight'>Font Weight</option>
                      <option value='line-height'>Line Height</option>
                      <option value='margin-bottom'>Margin Bottom</option>
                      <option value='margin'>Margin</option>
                      <option value='margin-left'>Margin Left</option>
                      <option value='margin-top'>Margin Top</option>
                      <option value='margin-right'>Margin Right</option>
                      <option value='opacity'>Opacity</option>

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
                        updateMainCss(e, "animationkeyprop", index, ind, indy)
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                        updateMainCss(e, "animationkeyprop", index, ind, indy)
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                         updateMainCss(
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
                        <option value={pallet && pallet.dark}>Dark</option>
                        <option value={pallet && pallet.light}>Light</option>
                        <option value={pallet && pallet.danger}>Danger</option>
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
                        updateMainCss(e, "animationkeyprop", index, ind, indy)
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
                         updateMainCss(
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
                        updateMainCss(e, "animationkeyprop", index, ind, indy)
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
                        updateMainCss(e, "animationkeyprop", index, ind, indy)
                       }>
                       <option>Set Color...</option>
                       <option value={pallet && pallet.primary}>Primary</option>
                       <option value={pallet && pallet.dark}>Dark</option>
                       <option value={pallet && pallet.light}>Light</option>
                       <option value={pallet && pallet.danger}>Danger</option>
                       <option value={pallet && pallet.success}>Success</option>
                      </select>
                     )}
                    </div>
                   )
                  )}
                 </div>
                ))}
               </div>
              )
             )}
           </ul>
          </div>
         </label>
        );
       } else if (key === "position") {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          ition
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateMainCss(e, "css")}
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onClick={() => addCellTransition()}>
           + Transition
          </button>
          <div
           className='card'
           style={{ overflowY: "scroll", overflowX: "scroll" }}>
           {css.transition.map(
            ({ property, duration, timingFunction, cubicNs, delay }, index) => (
             <div key={index} className='card'>
              <h5>Transition Property</h5>
              <select
               onChange={(e) => updateMainCss(e, "transition", index)}
               value={property}
               name='property'>
               <option value=''></option>

               <option value='color'>Color</option>
               <option value='background-color'>Background Color</option>
              </select>
              <h5>Transition Timing</h5>
              <input
               type='text'
               name='duration'
               onChange={(e) => updateMainCss(e, "transition", index)}
               value={duration}
               placeholder='Enter A Value in seconds'
              />
              <h5>Transition Function</h5>
              <select
               name='timingFunction'
               value={timingFunction}
               onChange={(e) => updateMainCss(e, "transition", index)}>
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
               onChange={(e) => updateMainCss(e, "transition", index)}
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
                   value={parseFloat(css["transition"][index]["cubicNs"][n])}
                   onChange={(e) => updateMainCss(e, "cubicNs", index, n)}
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
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}

          <select
           name={key}
           onChange={(e) => updateMainCss(e, "transform")}
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
             onChange={(e) => updateMainCss(e, "rotateZ", "transformProp")}
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
             onChange={(e) => updateMainCss(e, "rotateX", "transformProp")}
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
              updateMainCss(e.target.value, "translateX", "transformProp")
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
              updateMainCss(e.target.value, "translateY", "transformProp")
             }
            />
           </div>
          )}
          {css.transform.includes("rotateY") && (
           <div>
            <h5>Rotate Y Deg</h5>
            <Slider
             value={parseInt(css["transformProp"]["rotateY"])}
             onChange={(e) => updateMainCss(e, "rotateY", "transformProp")}
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
             onChange={(e) => updateMainCss(e, "skewX", "transformProp")}
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
             onChange={(e) => updateMainCss(e, "skewY", "transformProp")}
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
             value={parseFloat(css["transformProp"]["scaleX"])}
             onChange={(e) => updateMainCss(e, "scaleX", "transformProp")}
             orientation='horizontal'
             name='scaleX'
             min={-1}
             max={2}
             step={0.01}
            />
           </div>
          )}{" "}
          {css.transform.includes("scaleY") && (
           <div>
            <h5>Scale Y Percent</h5>
            <Slider
             value={parseFloat(css["transformProp"]["scaleY"])}
             onChange={(e) => updateMainCss(e, "scaleY", "transformProp")}
             orientation='horizontal'
             name='scaleY'
             min={-1}
             max={2}
             step={0.01}
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "opacity", "slider")}
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
           onChange={(e) => updateMainCss(e, key, "slider")}
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}>
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
           onChange={(e) => updateMainCss(e, "css")}
           name={key}
          />
         </label>
        );
       }
      })}

     {mappedCss === "article" &&
      cssToggle === true &&
      Object.keys(articleCSS).map((key) => {
       if (key.includes("Color")) {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateArticleCss(e, "css")}>
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
            onClick={() => addPageAnimation()}>
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
                 onChange={(e) => updateArticleCss(e, "animation", index)}
                />
                <h5>Animation Duration</h5>
                <input
                 type='text'
                 name='animationDuration'
                 value={animationDuration}
                 onChange={(e) => updateArticleCss(e, "animation", index)}
                />
                <h5>Animation Function</h5>
                <select
                 name='animationTimingFunction'
                 value={animationTimingFunction}
                 onChange={(e) => updateArticleCss(e, "animation", index)}>
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
                 onChange={(e) => updateArticleCss(e, "animation", index)}
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
                     value={parseFloat(css["animation"][index]["cubicNs"][n])}
                     onChange={(e) => updateArticleCss(e, "cubicNs", index, n)}
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
                 onChange={(e) => updateArticleCss(e, "animation", index)}
                />
                <h5>Animation Iteration Count</h5>
                <input
                 placeholder='Positive Integers Only'
                 type='text'
                 name='animationIterationCount'
                 value={animationIterationCount}
                 onChange={(e) => updateArticleCss(e, "animation", index)}
                />
                <h5>Animation Direction</h5>
                <select
                 name='animationDirection'
                 value={animationDirection}
                 onChange={(e) => updateArticleCss(e, "animation", index)}>
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
                 onChange={(e) => updateArticleCss(e, "animation", index)}>
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
                 onClick={() => addPageAnimationKeyframe(index)}>
                 + Keyframe
                </button>
                {keyframes.map(({ completionPercent, properties }, ind) => (
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
                    updateArticleCss(e, "animationkey", index, ind)
                   }
                  />
                  <button
                   className='btn btn-sm btn-dark'
                   onClick={() => addPageAnimationKeyframeProperty(index, ind)}>
                   + Property
                  </button>

                  {properties.map(
                   (
                    { propName, propValue, shadowValues, transValues },
                    indy
                   ) => (
                    <div>
                     <select
                      name='propName'
                      value={propName}
                      onChange={(e) =>
                       updateArticleCss(e, "animationkeyprop", index, ind, indy)
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
                      <option value='background-color'>Background Color</option>
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
                      <option value='border-top-color'>Border Top Color</option>
                      <option value='border-top-left-radius'>
                       Border Top Left Radius
                      </option>
                      <option value='border-top-right-radius'>
                       Border Top Right Radius
                      </option>
                      <option value='border-top-width'>Border Top Width</option>
                      <option value='box-shadow'>Box Shadow</option>
                      <option value='font'>Font</option>
                      <option value='font-size'>Font Size</option>

                      <option value='font-weight'>Font Weight</option>
                      <option value='line-height'>Line Height</option>
                      <option value='margin-bottom'>Margin Bottom</option>
                      <option value='margin'>Margin</option>
                      <option value='margin-left'>Margin Left</option>
                      <option value='margin-top'>Margin Top</option>
                      <option value='margin-right'>Margin Right</option>
                      <option value='opacity'>Opacity</option>

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
                        updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                        updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                         updateArticleCss(
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
                        <option value={pallet && pallet.dark}>Dark</option>
                        <option value={pallet && pallet.light}>Light</option>
                        <option value={pallet && pallet.danger}>Danger</option>
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
                        updateArticleCss(
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
                         updateArticleCss(
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
                        updateArticleCss(
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
                        updateArticleCss(
                         e,
                         "animationkeyprop",
                         index,
                         ind,
                         indy
                        )
                       }>
                       <option>Set Color...</option>
                       <option value={pallet && pallet.primary}>Primary</option>
                       <option value={pallet && pallet.dark}>Dark</option>
                       <option value={pallet && pallet.light}>Light</option>
                       <option value={pallet && pallet.danger}>Danger</option>
                       <option value={pallet && pallet.success}>Success</option>
                      </select>
                     )}
                    </div>
                   )
                  )}
                 </div>
                ))}
               </div>
              )
             )}
           </ul>
          </div>
         </label>
        );
       } else if (key === "position") {
        return (
         <label key={key}>
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}
          ition
          <select
           name={key}
           value={css[key]}
           onChange={(e) => updateArticleCss(e, "css")}
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onClick={() => addCellTransition()}>
           + Transition
          </button>
          <div
           className='card'
           style={{ overflowY: "scroll", overflowX: "scroll" }}>
           {css.transition.map(
            ({ property, duration, timingFunction, cubicNs, delay }, index) => (
             <div key={index} className='card'>
              <h5>Transition Property</h5>
              <select
               onChange={(e) => updateArticleCss(e, "transition", index)}
               value={property}
               name='property'>
               <option value=''></option>

               <option value='color'>Color</option>
               <option value='background-color'>Background Color</option>
              </select>
              <h5>Transition Timing</h5>
              <input
               type='text'
               name='duration'
               onChange={(e) => updateArticleCss(e, "transition", index)}
               value={duration}
               placeholder='Enter A Value in seconds'
              />
              <h5>Transition Function</h5>
              <select
               name='timingFunction'
               value={timingFunction}
               onChange={(e) => updateArticleCss(e, "transition", index)}>
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
               onChange={(e) => updateArticleCss(e, "transition", index)}
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
                   value={parseFloat(css["transition"][index]["cubicNs"][n])}
                   onChange={(e) => updateArticleCss(e, "cubicNs", index, n)}
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
          {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
           return str.toUpperCase();
          })}

          <select
           name={key}
           onChange={(e) => updateArticleCss(e, "transform")}
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
             onChange={(e) => updateArticleCss(e, "rotateZ", "transformProp")}
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
             onChange={(e) => updateArticleCss(e, "rotateX", "transformProp")}
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
              updateArticleCss(e.target.value, "translateX", "transformProp")
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
              updateArticleCss(e.target.value, "translateY", "transformProp")
             }
            />
           </div>
          )}
          {css.transform.includes("rotateY") && (
           <div>
            <h5>Rotate Y Deg</h5>
            <Slider
             value={parseInt(css["transformProp"]["rotateY"])}
             onChange={(e) => updateArticleCss(e, "rotateY", "transformProp")}
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
             onChange={(e) => updateArticleCss(e, "skewX", "transformProp")}
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
             onChange={(e) => updateArticleCss(e, "skewY", "transformProp")}
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
             value={parseFloat(css["transformProp"]["scaleX"])}
             onChange={(e) => updateArticleCss(e, "scaleX", "transformProp")}
             orientation='horizontal'
             name='scaleX'
             min={-1}
             max={2}
             step={0.01}
            />
           </div>
          )}{" "}
          {css.transform.includes("scaleY") && (
           <div>
            <h5>Scale Y Percent</h5>
            <Slider
             value={parseFloat(css["transformProp"]["scaleY"])}
             onChange={(e) => updateArticleCss(e, "scaleY", "transformProp")}
             orientation='horizontal'
             name='scaleY'
             min={-1}
             max={2}
             step={0.01}
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "opacity", "slider")}
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
           onChange={(e) => updateArticleCss(e, key, "slider")}
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}>
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
           onChange={(e) => updateArticleCss(e, "css")}
           name={key}
          />
         </label>
        );
       }
      })}
    </div>
   ) : (
    ""
   )}
  </Fragment>
 );
};

export default CSSBar;
