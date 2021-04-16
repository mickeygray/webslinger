import React, { useState, useEffect, useContext, Fragment } from "react";
import { useAppContext } from "../../context/site/SiteState";
import parse from "html-react-parser";
import Pagination from "../layout/Pagination";
import ImageContext from "../../context/image/imageContext";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import { Grid, Cell } from "styled-css-grid";
import styled from "styled-components";
import str from "string-template-format-tostring";
import ReactDOMServer from "react-dom/server";
const ComponentViewer = ({ pg }) => {
 const { NewComponent } = useAppContext();

 const authContext = useContext(AuthContext);
 const imageContext = useContext(ImageContext);
 const siteContext = useContext(SiteContext);
 const {
  getComponentImage,
  clearComponentImages,
  componentImages,
 } = imageContext;

 const { user } = authContext;

 const userid = user._id;
 const {
  getComponentContent,
  MyComponent,

  setLoadedComponents,
  componentContent,
  addComponent,
  clearComponentContent,
  pages,
  page,
  addNavCell,
  addFooterCell,
  addHeaderCell,
  addMainCell,
  addArticleCell,
 } = siteContext;

 const [codeArray, setCodeArray] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage, setPostsPerPage] = useState(1);
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const [imgs, setImgs] = useState([]);
 const [logos, setLogos] = useState([]);

 const { LoadedComponents, id } = pg;

 const index = pages.findIndex((x) => x.id === id);

 console.log(page);
 useEffect(() => {
  if (MyComponent != null) {
   getComponentContent(MyComponent, userid);

   if (componentContent !== null) {
    console.log(componentContent, "COMPONENTCONTENT");

    for (let i = 0; i < componentContent.length; i++) {
     if (Array.isArray(Object.values(componentContent[i])[0])) {
      const imgs = componentContent.filter((f) =>
       Array.isArray(Object.values(f)[0])
      );

      console.log(imgs, "imgs`");

      for (let i = 0; i < imgs.length; i++) {
       const imgArr = Object.values(imgs[i]);

       console.log(imgArr, "imgArr");

       for (let i = 0; i < imgArr.length; i++) {
        const finalArr = imgArr[i];

        console.log(finalArr);
        for (let i = 0; i < finalArr.length; i++) {
         if (Object.keys(finalArr[i]).includes("logo"))
          getComponentImage({ ["logo"]: finalArr[i].logo });
         if (Object.keys(finalArr[i]).includes("pic"))
          getComponentImage({ ["pic"]: finalArr[i].pic });
         if (Object.keys(finalArr[i]).includes("img"))
          getComponentImage({ ["img"]: finalArr[i].img });

         finalArr.shift();
        }
       }
      }
     } else if (Object.keys(componentContent[i]).toString().includes("img")) {
      getComponentImage(componentContent[i]);
     }
    }

    addComponent(
     {
      html: MyComponent.html,
      state: MyComponent.userState,
      area: MyComponent.area,
      content: [...componentContent],
     },
     index
    );
    if (MyComponent.area === "nav") {
     addNavCell();
    } else if (MyComponent.area === "header") {
     addHeaderCell();
    } else if (MyComponent.area === "main") {
     addMainCell();
    } else if (MyComponent.area === "article") {
     addArticleCell();
    } else if (MyComponent.area === "footer") {
     addFooterCell();
    }

    clearComponentContent();
   }
  }
 }, [MyComponent, componentContent]);

 useEffect(() => {
  if (componentImages.length > 0) {
   let newPages = [...pages];

   newPages[index] = {
    ...newPages[index],
    LoadedComponents: [
     ...newPages[index].LoadedComponents,
     {
      ...newPages[index].LoadedComponents[
       newPages[index].LoadedComponents.length - 1
      ],
      content: [
       ...newPages[index].LoadedComponents[
        newPages[index].LoadedComponents.length - 1
       ].content,
       ...componentImages,
      ]
       .filter((f) => !Array.isArray(Object.values(f)[0]))
       .filter((v, i, a) => a.indexOf(v) === i)
       .filter((obj) => Object.keys(obj).some((key) => !key.includes("img"))),
     },
    ],
   };

   const content =
    newPages[index].LoadedComponents[
     newPages[index].LoadedComponents.length - 1
    ].content;
   if (
    content.filter((obj) =>
     Object.keys(obj).some((key) => !key.includes("code"))
    )
   ) {
    newPages[index].LoadedComponents[
     newPages[index].LoadedComponents.length - 1
    ] = {
     ...newPages[index].LoadedComponents[
      newPages[index].LoadedComponents.length - 1
     ],
     content: [
      ...content.reduce((acc, entry) => {
       if (
        acc.filter((item) =>
         Object.values(item).some((item) => item.includes(entry["value"]))
        ).length > 0
       ) {
        // If an entry with parameters already exists
        let idx = acc.findIndex((item) =>
         Object.values(item).some((item) => item.includes(entry["value"]))
        );
        //Merge items by sum quantities as in example
        acc[idx] = { ...acc[idx], code: entry["code"] };
        return acc;
       }

       // Otherwise adds entry to accumulator as it is
       return [...acc, entry];
      }, []),
     ],
    };

    setLoadedComponents(newPages);
   }
  }
 }, [componentImages, imageContext]);

 const navFuncMap = LoadedComponents.filter((v) => v.area === "nav").map(
  ({ html, content }, i) => {
   function MyHtml(props) {
    var toRender = eval("`" + html + "`");
    return parse(toRender);
   }

   const currentFuncs = content.slice(indexOfFirstPost, indexOfLastPost);

   const func = currentFuncs.map(
    ({
     website,
     contentType,
     email,
     phone,
     cpa,
     socialLinks,
     cpapic,
     cpabio,
     stars,
     vid,
     fees,
     avgsavings,
     minimum,
     years,
     bbb,
     cost,
     address,
     logo,
     city,
     state,
     experiences,
     acknowledgements,
     services,
     pros,
     cons,
     reviews,
     name,
     descrip1,
     qna,
     vLogSummary,
     navText,
     vLogTitle,
     vids,
     img1,
     img2,
     img3,
     title,
     code,
     p1,
     p2,
     p3,
     p4,
     p5,
     firm,
     date,
     author,
     type,
     headingCopy,
     footerCopy,
     body,
     builtQuiz,
     results,
     verticalName,
     summary,
     categories,
     firms,
    }) => (
     <Cell>
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={content.length}
       paginate={paginate}
      />
      <MyHtml
       key={i}
       p1={p1}
       website={website}
       email={email}
       phone={phone}
       cpa={cpa}
       socialLinks={socialLinks}
       cpapic={cpapic}
       cpabio={cpabio}
       stars={stars}
       vid={vid}
       fees={fees}
       avgsavings={avgsavings}
       minimum={minimum}
       years={years}
       bbb={bbb}
       cost={cost}
       address={address}
       logo={logo}
       city={city}
       state={state}
       experiences={experiences}
       acknowledgements={acknowledgements}
       services={services}
       pros={pros}
       cons={cons}
       reviews={reviews}
       descrip1={descrip1}
       qna={qna}
       vLogSummary={vLogSummary}
       navText={navText}
       vLogTitle={vLogTitle}
       vids={vids}
       img1={code && code}
       img2={code && code}
       img3={code && code}
       title={title}
       p2={p2}
       p3={p3}
       p4={p4}
       p5={p5}
       firm={firm}
       date={date}
       author={author}
       type={type}
       headingCopy={headingCopy}
       footerCopy={footerCopy}
       body={body}
       builtQuiz={builtQuiz}
       results={results}
       verticalName={verticalName}
       summary={summary}
       categories={categories}
       firms={code && code}
      />
     </Cell>
    )
   );

   return func;
  }
 );

 const mainFuncMap = LoadedComponents.filter((v) => v.area === "main").map(
  ({ html, content }, i) => {
   console.log(html);
   function MyHtml(props) {
    var toRender = eval("`" + html + "`");
    return parse(toRender);
   }

   const currentFuncs = content.slice(indexOfFirstPost, indexOfLastPost);

   const func = currentFuncs.map(
    ({
     website,
     contentType,
     email,
     phone,
     cpa,
     socialLinks,
     cpapic,
     cpabio,
     stars,
     vid,
     fees,
     avgsavings,
     minimum,
     years,
     bbb,
     cost,
     address,
     logo,
     city,
     state,
     experiences,
     acknowledgements,
     services,
     pros,
     cons,
     reviews,
     name,
     descrip1,
     qna,
     vLogSummary,
     navText,
     vLogTitle,
     vids,
     img1,
     img2,
     img3,
     title,
     code,
     p1,
     p2,
     p3,
     p4,
     p5,
     firm,
     date,
     author,
     type,
     headingCopy,
     footerCopy,
     body,
     builtQuiz,
     results,
     verticalName,
     summary,
     categories,
     firms,
    }) => (
     <Cell>
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={content.length}
       paginate={paginate}
      />

      <MyHtml
       key={i}
       p1={p1}
       website={website}
       email={email}
       phone={phone}
       cpa={cpa}
       socialLinks={socialLinks}
       cpapic={cpapic}
       cpabio={cpabio}
       stars={stars}
       vid={vid}
       fees={fees}
       avgsavings={avgsavings}
       minimum={minimum}
       years={years}
       bbb={bbb}
       cost={cost}
       address={address}
       logo={logo}
       city={city}
       state={state}
       experiences={experiences}
       acknowledgements={acknowledgements}
       services={services}
       pros={pros}
       cons={cons}
       reviews={reviews}
       descrip1={descrip1}
       qna={qna}
       vLogSummary={vLogSummary}
       navText={navText}
       vLogTitle={vLogTitle}
       vids={vids}
       img1={code && code}
       img2={code && code}
       img3={code && code}
       title={title}
       p2={p2}
       p3={p3}
       p4={p4}
       p5={p5}
       firm={firm}
       date={date}
       author={author}
       type={type}
       headingCopy={headingCopy}
       footerCopy={footerCopy}
       body={body}
       builtQuiz={builtQuiz}
       results={results}
       verticalName={verticalName}
       summary={summary}
       categories={categories}
       firms={code && code}
      />
     </Cell>
    )
   );

   return func;
  }
 );

 const footerFuncMap = LoadedComponents.filter((v) => v.area === "footer").map(
  ({ html, content }, i) => {
   function MyHtml(props) {
    var toRender = eval("`" + html + "`");
    return parse(toRender);
   }

   const currentFuncs = content.slice(indexOfFirstPost, indexOfLastPost);

   const func = currentFuncs.map(
    ({
     website,
     contentType,
     email,
     phone,
     cpa,
     socialLinks,
     cpapic,
     cpabio,
     stars,
     vid,
     fees,
     avgsavings,
     minimum,
     years,
     bbb,
     cost,
     address,
     logo,
     city,
     state,
     experiences,
     acknowledgements,
     services,
     pros,
     cons,
     reviews,
     name,
     descrip1,
     qna,
     vLogSummary,
     navText,
     vLogTitle,
     vids,
     img1,
     img2,
     img3,
     title,
     code,
     p1,
     p2,
     p3,
     p4,
     p5,
     firm,
     date,
     author,
     type,
     headingCopy,
     footerCopy,
     body,
     builtQuiz,
     results,
     verticalName,
     summary,
     categories,
     firms,
    }) => (
     <Cell>
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={content.length}
       paginate={paginate}
      />

      <MyHtml
       key={i}
       p1={p1}
       website={website}
       email={email}
       phone={phone}
       cpa={cpa}
       socialLinks={socialLinks}
       cpapic={cpapic}
       cpabio={cpabio}
       stars={stars}
       vid={vid}
       fees={fees}
       avgsavings={avgsavings}
       minimum={minimum}
       years={years}
       bbb={bbb}
       cost={cost}
       address={address}
       logo={logo}
       city={city}
       state={state}
       experiences={experiences}
       acknowledgements={acknowledgements}
       services={services}
       pros={pros}
       cons={cons}
       reviews={reviews}
       descrip1={descrip1}
       qna={qna}
       vLogSummary={vLogSummary}
       navText={navText}
       vLogTitle={vLogTitle}
       vids={vids}
       img1={code && code}
       img2={code && code}
       img3={code && code}
       title={title}
       p2={p2}
       p3={p3}
       p4={p4}
       p5={p5}
       firm={firm}
       date={date}
       author={author}
       type={type}
       headingCopy={headingCopy}
       footerCopy={footerCopy}
       body={body}
       builtQuiz={builtQuiz}
       results={results}
       verticalName={verticalName}
       summary={summary}
       categories={categories}
       firms={code && code}
      />
     </Cell>
    )
   );

   return func;
  }
 );

 const heroFuncMap = LoadedComponents.filter((v) => v.area === "hero").map(
  ({ html, content }, i) => {
   function MyHtml(props) {
    var toRender = eval("`" + html + "`");
    return parse(toRender);
   }

   const currentFuncs = content.slice(indexOfFirstPost, indexOfLastPost);

   const func = currentFuncs.map(
    ({
     website,
     contentType,
     email,
     phone,
     cpa,
     socialLinks,
     cpapic,
     cpabio,
     stars,
     vid,
     fees,
     avgsavings,
     minimum,
     years,
     bbb,
     cost,
     address,
     logo,
     city,
     state,
     experiences,
     acknowledgements,
     services,
     pros,
     cons,
     reviews,
     name,
     descrip1,
     qna,
     vLogSummary,
     navText,
     vLogTitle,
     vids,
     img1,
     img2,
     img3,
     title,
     code,
     p1,
     p2,
     p3,
     p4,
     p5,
     firm,
     date,
     author,
     type,
     headingCopy,
     footerCopy,
     body,
     builtQuiz,
     results,
     verticalName,
     summary,
     categories,
     firms,
    }) => (
     <Cell>
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={content.length}
       paginate={paginate}
      />

      <MyHtml
       key={i}
       p1={p1}
       website={website}
       email={email}
       phone={phone}
       cpa={cpa}
       socialLinks={socialLinks}
       cpapic={cpapic}
       cpabio={cpabio}
       stars={stars}
       vid={vid}
       fees={fees}
       avgsavings={avgsavings}
       minimum={minimum}
       years={years}
       bbb={bbb}
       cost={cost}
       address={address}
       logo={logo}
       city={city}
       state={state}
       experiences={experiences}
       acknowledgements={acknowledgements}
       services={services}
       pros={pros}
       cons={cons}
       reviews={reviews}
       descrip1={descrip1}
       qna={qna}
       vLogSummary={vLogSummary}
       navText={navText}
       vLogTitle={vLogTitle}
       vids={vids}
       img1={code && code}
       img2={code && code}
       img3={code && code}
       title={title}
       p2={p2}
       p3={p3}
       p4={p4}
       p5={p5}
       firm={firm}
       date={date}
       author={author}
       type={type}
       headingCopy={headingCopy}
       footerCopy={footerCopy}
       body={body}
       builtQuiz={builtQuiz}
       results={results}
       verticalName={verticalName}
       summary={summary}
       categories={categories}
       firms={code && code}
      />
     </Cell>
    )
   );

   return func;
  }
 );

 const articleFuncMap = LoadedComponents.filter(
  (v) => v.area === "article"
 ).map(({ html, content }, i) => {
  function MyHtml(props) {
   var toRender = eval("`" + html + "`");
   return parse(toRender);
  }

  const currentFuncs = content.slice(indexOfFirstPost, indexOfLastPost);

  const func = currentFuncs.map(
   ({
    website,
    contentType,
    email,
    phone,
    cpa,
    socialLinks,
    cpapic,
    cpabio,
    stars,
    vid,
    fees,
    avgsavings,
    minimum,
    years,
    bbb,
    cost,
    address,
    logo,
    city,
    state,
    experiences,
    acknowledgements,
    services,
    pros,
    cons,
    reviews,
    name,
    descrip1,
    qna,
    vLogSummary,
    navText,
    vLogTitle,
    vids,
    img1,
    img2,
    img3,
    title,
    code,
    p1,
    p2,
    p3,
    p4,
    p5,
    firm,
    date,
    author,
    type,
    headingCopy,
    footerCopy,
    body,
    builtQuiz,
    results,
    verticalName,
    summary,
    categories,
    firms,
   }) => (
    <Cell>
     <Pagination
      postsPerPage={postsPerPage}
      totalPosts={content.length}
      paginate={paginate}
     />
     <MyHtml
      key={i}
      p1={p1}
      website={website}
      email={email}
      phone={phone}
      cpa={cpa}
      socialLinks={socialLinks}
      cpapic={cpapic}
      cpabio={cpabio}
      stars={stars}
      vid={vid}
      fees={fees}
      avgsavings={avgsavings}
      minimum={minimum}
      years={years}
      bbb={bbb}
      cost={cost}
      address={address}
      logo={logo}
      city={city}
      state={state}
      experiences={experiences}
      acknowledgements={acknowledgements}
      services={services}
      pros={pros}
      cons={cons}
      reviews={reviews}
      descrip1={descrip1}
      qna={qna}
      vLogSummary={vLogSummary}
      navText={navText}
      vLogTitle={vLogTitle}
      vids={vids}
      img1={code && code}
      img2={code && code}
      img3={code && code}
      title={title}
      p2={p2}
      p3={p3}
      p4={p4}
      p5={p5}
      firm={firm}
      date={date}
      author={author}
      type={type}
      headingCopy={headingCopy}
      footerCopy={footerCopy}
      body={body}
      builtQuiz={builtQuiz}
      results={results}
      verticalName={verticalName}
      summary={summary}
      categories={categories}
      firms={code && code}
     />
    </Cell>
   )
  );

  return func;
 });
 useEffect(() => {
  const { layout, css, nav, header, footer, article, main } = page;

  const { navGrid, navCSS, navCells } = nav;
  const { headerGrid, headerCSS, headerCells } = header;
  const { footerGrid, footerCSS, footerCells } = footer;
  const { articleGrid, articleCSS, articleCells } = article;
  const { mainGrid, mainCSS, mainCells } = main;

  const layoutStyles = Object.keys(layout)
   .filter(
    (k) =>
     k.includes("String") ||
     k.includes("Alignment") ||
     k.includes("direction") ||
     k.includes("className")
   )
   .map((k) => {
    const gridObj = Object.assign({}, { [k]: layout[k] });
    return gridObj;
   });

  const navStyles = Object.keys(navGrid)
   .filter(
    (k) =>
     k.includes("String") ||
     k.includes("Alignment") ||
     k.includes("direction") ||
     k.includes("className")
   )
   .map((k) => {
    const gridObj = Object.assign({}, { [k]: navGrid[k] });
    return gridObj;
   });

  const headerStyles = Object.keys(headerGrid)
   .filter(
    (k) =>
     k.includes("String") ||
     k.includes("Alignment") ||
     k.includes("direction") ||
     k.includes("className")
   )
   .map((k) => {
    const gridObj = Object.assign({}, { [k]: headerGrid[k] });
    return gridObj;
   });

  const footerStyles = Object.keys(footerGrid)
   .filter(
    (k) =>
     k.includes("String") ||
     k.includes("Alignment") ||
     k.includes("direction") ||
     k.includes("className")
   )
   .map((k) => {
    const gridObj = Object.assign({}, { [k]: footerGrid[k] });
    return gridObj;
   });

  const articleStyles = Object.keys(articleGrid)
   .filter(
    (k) =>
     k.includes("String") ||
     k.includes("Alignment") ||
     k.includes("direction") ||
     k.includes("className")
   )
   .map((k) => {
    const gridObj = Object.assign({}, { [k]: articleGrid[k] });
    return gridObj;
   });

  const mainStyles = Object.keys(mainGrid)
   .filter(
    (k) =>
     k.includes("String") ||
     k.includes("Alignment") ||
     k.includes("direction") ||
     k.includes("className")
   )
   .map((k) => {
    const gridObj = Object.assign({}, { [k]: mainGrid[k] });
    return gridObj;
   });

  let layoutObj = {};
  let navGridObj = {};
  let headerGridObj = {};
  let footerGridObj = {};
  let mainGridObj = {};
  let articleGridObj = {};
  let gridStyleObj = { display: "grid" };

  for (const style of layoutStyles) {
   const {
    direction,
    rowString,
    columnString,
    horizontalAlignment,
    verticalAlignment,
    className,
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

   layoutObj = { [className]: gridStyleObj };
  }

  for (const style of articleStyles) {
   const {
    direction,
    rowString,
    columnString,
    horizontalAlignment,
    verticalAlignment,
    className,
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

   articleGridObj = { [className]: gridStyleObj };
  }

  for (const style of navStyles) {
   const {
    direction,
    rowString,
    columnString,
    horizontalAlignment,
    verticalAlignment,
    className,
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

   navGridObj = { [className]: gridStyleObj };
  }
  for (const style of headerStyles) {
   const {
    direction,
    rowString,
    columnString,
    horizontalAlignment,
    verticalAlignment,
    className,
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

   headerGridObj = { [className]: gridStyleObj };
  }
  for (const style of footerStyles) {
   const {
    direction,
    rowString,
    columnString,
    horizontalAlignment,
    verticalAlignment,
    className,
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

   footerGridObj = { [className]: gridStyleObj };
  }
  for (const style of mainStyles) {
   const {
    direction,
    rowString,
    columnString,
    horizontalAlignment,
    verticalAlignment,
    className,
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

   mainGridObj = { [className]: gridStyleObj };
  }

  function clean(obj) {
   for (var propName in obj) {
    if (
     obj[propName] === "" ||
     obj[propName] === true ||
     obj[propName] === false
    ) {
     delete obj[propName];
    } else if (
     propName === "className" ||
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

  const navLevelCss = clean(
   Object.assign(
    {},
    {
     ...articleCSS,
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
     height: css.height,
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
     width: css.width,
     backgroundColor: css.backgroundColor,
    }
   )
  );

  const headerLevelCss = clean(
   Object.assign(
    {},
    {
     ...articleCSS,
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
     height: css.height,
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
     width: css.width,
     backgroundColor: css.backgroundColor,
    }
   )
  );
  const footerLevelCss = clean(
   Object.assign(
    {},
    {
     ...articleCSS,
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
     height: css.height,
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
     width: css.width,
     backgroundColor: css.backgroundColor,
    }
   )
  );
  const mainLevelCss = clean(
   Object.assign(
    {},
    {
     ...articleCSS,
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
     height: css.height,
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
     width: css.width,
     backgroundColor: css.backgroundColor,
    }
   )
  );
  const articleLevelCss = clean(
   Object.assign(
    {},
    {
     ...articleCSS,
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
     height: css.height,
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
     width: css.width,
     backgroundColor: css.backgroundColor,
    }
   )
  );

  let navLevelObj = { [navCSS.className]: { ...navLevelCss, gridArea: "nav" } };
  let headerLevelObj = {
   [headerCSS.className]: { ...headerLevelCss, gridArea: "header" },
  };
  let footerLevelObj = {
   [footerCSS.className]: { ...footerLevelCss, gridArea: "footer" },
  };
  let mainLevelObj = {
   [mainCSS.className]: { ...mainLevelCss, gridArea: "main" },
  };
  let articleLevelObj = {
   [articleCSS.className]: { ...articleLevelCss, gridArea: "article" },
  };

  let navCellObjs = [];
  let headerCellObjs = [];
  let footerCellObjs = [];
  let mainCellObjs = [];
  let articleCellObjs = [];

  for (const cell of navCells) {
   const { rowSpan, columnSpan, gridArea, top, left, css, className } = cell;
  }

  if (document.getElementById("page") !== null) {
   let gridClasses = ReactDOMServer.renderToString(
    document.getElementById("page").innerHTML
   ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

   console.log(gridClasses);
  }
 }, []);

 return (
  <div id='page'>
   <Grid
    columns={"127px  1fr  127px"}
    rows={"45px 1fr 45px"}
    areas={[
     "nav nav nav",
     "header header header",
     "main main main",
     "article article article",
     "footer footer footer",
    ]}>
    <Cell area='nav'>
     <Grid columns='repeat(auto-fit,minmax(120px,1fr))'> {navFuncMap}</Grid>
    </Cell>
    <Cell area='hero'>
     <Grid columns='repeat(auto-fit,minmax(120px,1fr))'>{heroFuncMap}</Grid>
    </Cell>
    <Cell area='article'>
     <Grid columns='repeat(auto-fit,minmax(120px,1fr))'>{articleFuncMap}</Grid>
    </Cell>
    <Cell area='main'>
     <Grid columns='repeat(auto-fit,minmax(120px,1fr))'>{mainFuncMap}</Grid>
    </Cell>
    <Cell area='footer'>
     <Grid columns='repeat(auto-fit,minmax(120px,1fr))'>{footerFuncMap} </Grid>
    </Cell>
   </Grid>
   <style
    dangerouslySetInnerHTML={{
     __html: str`
     
     
     
     
     
     
     
     
     
     
     
     `,
    }}></style>
  </div>
 );
};

export default ComponentViewer;

/*


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
    : `${grid.rows[i] && grid.rows[i].size.length > 0 && grid.rows[i].size}` +
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
  ["gridTemplateRows"]: Object.values(rowString).toString().replaceAll(",", ""),
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




*/
