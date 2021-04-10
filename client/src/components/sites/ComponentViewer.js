import React, { useState, useEffect, useContext, Fragment } from "react";
import { useAppContext } from "../../context/site/SiteState";
import parse from "html-react-parser";
import Pagination from "../layout/Pagination";
import ImageContext from "../../context/image/imageContext";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import { Grid, Cell } from "styled-css-grid";
import styled from "styled-components";

const ComponentViewer = ({}) => {
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
  LoadedComponents,
  setLoadedComponents,
  componentContent,
  addComponent,
  clearComponentContent,
 } = siteContext;

 const [codeArray, setCodeArray] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage, setPostsPerPage] = useState(1);
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const [imgs, setImgs] = useState([]);
 const [logos, setLogos] = useState([]);

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

    addComponent({
     html: MyComponent.html,
     state: MyComponent.userState,
     area: MyComponent.area,
     content: [...componentContent],
    });

    clearComponentContent();
   }
  }
 }, [MyComponent, componentContent]);

 useEffect(() => {
  if (componentImages.length > 0) {
   let newComponents = [...LoadedComponents];

   newComponents[0] = {
    ...newComponents[0],
    content: [...newComponents[0].content, ...componentImages]
     .filter((f) => !Array.isArray(Object.values(f)[0]))
     .filter((v, i, a) => a.indexOf(v) === i)
     .filter((obj) => Object.keys(obj).some((key) => !key.includes("img"))),
   };

   if (
    newComponents[0].content.filter((obj) =>
     Object.keys(obj).some((key) => !key.includes("code"))
    )
   ) {
    newComponents[0] = {
     ...newComponents[0],
     content: [
      ...newComponents[0].content.reduce((acc, entry) => {
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

    console.log(newComponents);

    setLoadedComponents(newComponents);
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

 return (
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
 );
};

export default ComponentViewer;
