import React, { useState, useEffect, useContext, Fragment } from "react";
import { useAppContext } from "../../context/site/SiteState";
import parse from "html-react-parser";
import Pagination from "../layout/Pagination";
import ImageContext from "../../context/image/imageContext";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import { Grid, Cell } from "styled-css-grid";
import styled, { ServerStyleSheet } from "styled-components";
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
 const [styles, setStyles] = useState([]);
 const [styleString, setStyleString] = useState([]);
 const { LoadedComponents, id } = pg;

 const index = pages.findIndex((x) => x.id === id);

 console.log(LoadedComponents);
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
      id: MyComponent._id,
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

    const uniqueComps = Array.from(
     new Set(newPages[index].LoadedComponents.reverse().map((a) => a.id))
    ).map((id) => {
     return newPages[index].LoadedComponents.find((a) => a.id === id);
    });

    newPages[index] = {
     ...newPages[index],
     LoadedComponents: uniqueComps,
    };

    setLoadedComponents(newPages);
    clearComponentImages();
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
     <Cell id={`navCells${i}`}>
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
     <Cell id={`mainCells${i}`}>
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
     <Cell id={`footerCells${i}`}>
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
     <Cell id={`headerCells${i}`}>
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
   (
    {
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
    },
    i
   ) => (
    <Cell id={`articleCells${i}`}>
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
  if (document.getElementById("page") !== null) {
   const { layout, css, nav, header, footer, article, main } = page;

   const { navGrid, navCSS, navCells } = nav;
   const { headerGrid, headerCSS, headerCells } = header;
   const { footerGrid, footerCSS, footerCells } = footer;
   const { articleGrid, articleCSS, articleCells } = article;
   const { mainGrid, mainCSS, mainCells } = main;

   let layoutArr = [];
   let navArr = [];
   let headerArr = [];
   let footerArr = [];
   let mainArr = [];
   let articleArr = [];
   Object.keys(layout)
    .filter(
     (k) =>
      k.includes("String") || k.includes("Alignment") || k.includes("direction")
    )
    .map((k) => {
     let key;
     let val;
     if (k === "rowString") {
      key = "gridTemplateRows";
      val = layout[k];
     } else if (k === "columnString") {
      key = "gridTemplateColumns";
      val = layout[k];
     } else if (k === "verticalAlignment") {
      key = "alignContent";
      val = layout[k];
     } else if (k === "horizontalAlignment") {
      key = "justifyContent";
      val = layout[k];
     } else if (k === "direction") {
      key = "gridAutoFlow";
      val = layout[k];
     }

     let obj = [[key], val];
     layoutArr.push(obj);
    });
   Object.keys(articleGrid)
    .filter(
     (k) =>
      k.includes("String") || k.includes("Alignment") || k.includes("direction")
    )
    .map((k) => {
     let key;

     if (k === "rowString") {
      key = "gridTemplateRows";
     } else if (k === "columnString") {
      key = "gridTemplateColumns";
     } else if (k === "areaString") {
      key = "gridTemplateAreas";
     } else if (k === "verticalAlignment") {
      key = "alignContent";
     } else if (k === "horizontalAlignment") {
      key = "justifyContent";
     } else if (k === "direction") {
      key = "gridAutoFlow";
     }

     let obj = [[key], articleGrid[k]];
     articleArr.push(obj);
    });
   Object.keys(navGrid)
    .filter(
     (k) =>
      k.includes("String") || k.includes("Alignment") || k.includes("direction")
    )
    .map((k) => {
     let key;

     if (k === "rowString") {
      key = "gridTemplateRows";
     } else if (k === "columnString") {
      key = "gridTemplateColumns";
     } else if (k === "areaString") {
      key = "gridTemplateAreas";
     } else if (k === "verticalAlignment") {
      key = "alignContent";
     } else if (k === "horizontalAlignment") {
      key = "justifyContent";
     } else if (k === "direction") {
      key = "gridAutoFlow";
     }

     let obj = [[key], navGrid[k]];
     navArr.push(obj);
    });
   Object.keys(headerGrid)
    .filter(
     (k) =>
      k.includes("String") || k.includes("Alignment") || k.includes("direction")
    )
    .map((k) => {
     let key;

     if (k === "rowString") {
      key = "gridTemplateRows";
     } else if (k === "columnString") {
      key = "gridTemplateColumns";
     } else if (k === "areaString") {
      key = "gridTemplateAreas";
     } else if (k === "verticalAlignment") {
      key = "alignContent";
     } else if (k === "horizontalAlignment") {
      key = "justifyContent";
     } else if (k === "direction") {
      key = "gridAutoFlow";
     }

     let obj = [[key], headerGrid[k]];
     headerArr.push(obj);
    });
   Object.keys(footerGrid)
    .filter(
     (k) =>
      k.includes("String") || k.includes("Alignment") || k.includes("direction")
    )
    .map((k) => {
     let key;

     if (k === "rowString") {
      key = "gridTemplateRows";
     } else if (k === "columnString") {
      key = "gridTemplateColumns";
     } else if (k === "areaString") {
      key = "gridTemplateAreas";
     } else if (k === "verticalAlignment") {
      key = "alignContent";
     } else if (k === "horizontalAlignment") {
      key = "justifyContent";
     } else if (k === "direction") {
      key = "gridAutoFlow";
     }

     let obj = [[key], footerGrid[k]];
     footerArr.push(obj);
    });
   Object.keys(mainGrid)
    .filter(
     (k) =>
      k.includes("String") || k.includes("Alignment") || k.includes("direction")
    )
    .map((k) => {
     let key;

     if (k === "rowString") {
      key = "gridTemplateRows";
     } else if (k === "columnString") {
      key = "gridTemplateColumns";
     } else if (k === "areaString") {
      key = "gridTemplateAreas";
     } else if (k === "verticalAlignment") {
      key = "alignContent";
     } else if (k === "horizontalAlignment") {
      key = "justifyContent";
     } else if (k === "direction") {
      key = "gridAutoFlow";
     }

     let obj = [[key], mainGrid[k]];
     mainArr.push(obj);
    });

   const layoutStyles = { [layout.className]: Object.fromEntries(layoutArr) };
   const headerStyles = {
    [headerGrid.className]: Object.fromEntries(headerArr),
   };
   const navStyles = { [navGrid.className]: Object.fromEntries(navArr) };
   const mainStyles = { [mainGrid.className]: Object.fromEntries(mainArr) };

   const articleStyles = {
    [articleGrid.className]: Object.fromEntries(articleArr),
   };
   const footerStyles = {
    [footerGrid.className]: Object.fromEntries(footerArr),
   };
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
      ...navCSS,
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
      ...headerCSS,
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
      ...footerCSS,
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
      ...mainCSS,
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

   let navLevelObj = {
    [navCSS.className]: { ...navLevelCss, gridArea: "nav" },
   };
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

    const cellObj = {
     gridColumnStart: left,
     gridRowStart: top,
     gridColumnEnd: columnSpan,
     gridRowEnd: rowSpan,
     gridArea: gridArea,
    };

    const cellCss = clean(
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

    const cellStyle = { [className]: { ...cellObj, ...cellCss } };
    navCellObjs.push(cellStyle);
   }

   for (const cell of headerCells) {
    const { rowSpan, columnSpan, gridArea, top, left, css, className } = cell;

    const cellObj = {
     gridColumnStart: left,
     gridRowStart: top,
     gridColumnEnd: columnSpan,
     gridRowEnd: rowSpan,
     gridArea: gridArea,
    };

    const cellCss = clean(
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

    const cellStyle = { [className]: { ...cellObj, ...cellCss } };
    headerCellObjs.push(cellStyle);
   }

   for (const cell of mainCells) {
    const { rowSpan, columnSpan, gridArea, top, left, css, className } = cell;

    const cellObj = {
     gridColumnStart: left,
     gridRowStart: top,
     gridColumnEnd: columnSpan,
     gridRowEnd: rowSpan,
     gridArea: gridArea,
    };

    const cellCss = clean(
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

    const cellStyle = { [className]: { ...cellObj, ...cellCss } };
    mainCellObjs.push(cellStyle);
   }

   for (const cell of articleCells) {
    const { rowSpan, columnSpan, gridArea, top, left, css, className } = cell;

    const cellObj = {
     gridColumnStart: left,
     gridRowStart: top,
     gridColumnEnd: columnSpan,
     gridRowEnd: rowSpan,
     gridArea: gridArea,
    };

    const cellCss = clean(
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

    const cellStyle = { [className]: { ...cellObj, ...cellCss } };
    articleCellObjs.push(cellStyle);
   }

   for (const cell of footerCells) {
    const { rowSpan, columnSpan, gridArea, top, left, css, className } = cell;

    const cellObj = {
     gridColumnStart: left,
     gridRowStart: top,
     gridColumnEnd: columnSpan,
     gridRowEnd: rowSpan,
     gridArea: gridArea,
    };

    const cellCss = clean(
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

    const cellStyle = { [className]: { ...cellObj, ...cellCss } };
    footerCellObjs.push(cellStyle);
   }

   let gridClasses = ReactDOMServer.renderToString(
    document.getElementById("page").innerHTML
   ).match(/(?<=class=&quot;\s*).*?(?=\s*&quot;)/gs);

   console.log(gridClasses);
   setStyles([
    layoutStyles,
    navLevelObj,
    navStyles,
    headerLevelObj,
    headerStyles,
    articleLevelObj,
    articleStyles,
    mainLevelObj,
    mainStyles,
    footerLevelObj,
    footerStyles,
    ...navCellObjs,
    ...headerCellObjs,
    ...footerCellObjs,
    ...mainCellObjs,
    ...articleCellObjs,
   ]);

   console.log(navCellObjs, "navcellobjs");

   if (navCellObjs.length > 0) {
    navCellObjs.map((k, i) => {
     const element = document.getElementById(`navCells${i}`);

     if (element != null) {
      element.classList.add(Object.keys(k).toString());
     }
    });
   }

   if (headerCellObjs.length > 0) {
    headerCellObjs.map((k, i) => {
     const element = document.getElementById(`headerCells${i}`);

     if (element != null) {
      element.classList.add(Object.keys(k).toString());
     }
    });
   }
   if (footerCellObjs.length > 0) {
    footerCellObjs.map((k, i) => {
     const element = document.getElementById(`footerCells${i}`);

     if (element != null) {
      element.classList.add(Object.keys(k).toString());
     }
    });
   }
   if (mainCellObjs.length > 0) {
    mainCellObjs.map((k, i) => {
     const element = document.getElementById(`mainCells${i}`);

     if (element != null) {
      element.classList.add(Object.keys(k).toString());
     }
    });
   }
   if (articleCellObjs.length > 0) {
    articleCellObjs.map((k, i) => {
     const element = document.getElementById(`articleCells${i}`);
     if (element != null) {
      element.classList.add(Object.keys(k).toString());
     }
    });
   }

   const layoutElement = document.getElementById("layoutStyles");
   const navCell = document.getElementById("navLevelObj");
   const navGrd = document.getElementById("navStyles");
   const headerCell = document.getElementById("headerLevelObj");
   const headerGrd = document.getElementById("headerStyles");
   const mainCell = document.getElementById("mainLevelObj");
   const mainGrd = document.getElementById("mainStyles");
   const footerCell = document.getElementById("footerLevelObj");
   const footerGrd = document.getElementById("footerStyles");
   const articleCell = document.getElementById("articleLevelObj");
   const articleGrd = document.getElementById("articleStyles");

   layoutElement.classList.add(Object.keys(layoutStyles).toString());
   navCell.classList.add(Object.keys(navLevelObj).toString());
   navGrd.classList.add(Object.keys(navStyles).toString());
   headerCell.classList.add(Object.keys(headerLevelObj).toString());
   headerGrd.classList.add(Object.keys(headerStyles).toString());
   footerCell.classList.add(Object.keys(footerLevelObj).toString());
   footerGrd.classList.add(Object.keys(footerStyles).toString());
   articleCell.classList.add(Object.keys(articleLevelObj).toString());
   articleGrd.classList.add(Object.keys(articleStyles).toString());
   mainCell.classList.add(Object.keys(mainLevelObj).toString());
   mainGrd.classList.add(Object.keys(mainStyles).toString());
  }
 }, [document, page]);

 useEffect(() => {
  if (styles.length > 0) {
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

    setStyleString((prevState) =>
     [...prevState, st].filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
     })
    );
   });
  }
 }, [styles, page]);

 return (
  <div id='page'>
   <Grid
    id='layoutStyles'
    columns={"127px  1fr  127px"}
    rows={"45px 1fr 45px"}
    areas={[
     "nav nav nav",
     "header header header",
     "main main main",
     "article article article",
     "footer footer footer",
    ]}>
    <Cell id='navLevelObj' area='nav'>
     <Grid id='navStyles' columns='repeat(auto-fit,minmax(120px,1fr))'>
      {" "}
      {navFuncMap}
     </Grid>
    </Cell>
    <Cell id='headerLevelObj' area='header'>
     <Grid id='headerStyles' columns='repeat(auto-fit,minmax(120px,1fr))'>
      {heroFuncMap}
     </Grid>
    </Cell>
    <Cell id='articleLevelObj' area='article'>
     <Grid id='articleStyles' columns='repeat(auto-fit,minmax(120px,1fr))'>
      {articleFuncMap}
     </Grid>
    </Cell>
    <Cell id='mainLevelObj' area='main'>
     <Grid id='mainStyles' columns='repeat(auto-fit,minmax(120px,1fr))'>
      {mainFuncMap}
     </Grid>
    </Cell>
    <Cell id='footerLevelObj' area='footer'>
     <Grid id='footerStyles' columns='repeat(auto-fit,minmax(120px,1fr))'>
      {footerFuncMap}{" "}
     </Grid>
    </Cell>
   </Grid>
   <style
    dangerouslySetInnerHTML={{
     __html: str`${styleString.join(" ")}`,
    }}></style>
  </div>
 );
};

export default ComponentViewer;
