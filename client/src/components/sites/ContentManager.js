import React, { useContext } from "react";
import ContentItem from "./ContentItem";
import SiteContext from "../../context/site/siteContext";
const ContentManager = () => {
 const siteContext = useContext(SiteContext);
 const { currentSection, content } = siteContext;

 /*
      .filter(
       ((s) => (o) =>
        ((k) => !s.has(k) && s.add(k))(
         Object.keys(content)
          .map((k) => o[k])
          .join("|")
        ))(new Set())
      )
 */

 const uniqueContent = Object.values(
  content.reduce((unique, o) => {
   if (!unique[o.id] || +o.id > +unique[o._id]._id) unique[o._id] = o;

   return unique;
  }, {})
 );
 return (
  <div
   style={{
    background: "#f4f4f4",
    height: "110vh",
    overflowY: "scroll",
    width: "200px",
    overflowX: "hidden",
   }}>
   <h5>Firms</h5>
   <div>
    {uniqueContent
     .filter((e) => e.contentType === "firm")

     .map((content) => (
      <ContentItem
       currentSection={currentSection}
       content={content}
       key={content._id}
      />
     ))}
   </div>
   <h5>Verticals</h5>
   <div>
    {uniqueContent
     .filter((e) => e.contentType === "vertical")

     .map((content) => (
      <ContentItem
       currentSection={currentSection}
       content={content}
       key={content._id}
      />
     ))}
   </div>
   <h5>Blogs</h5>
   <div>
    {uniqueContent
     .filter((e) => e.contentType === "blog")

     .map((content) => (
      <ContentItem
       currentSection={currentSection}
       content={content}
       key={content._id}
      />
     ))}
   </div>
   <h5>Articles</h5>
   <div>
    {uniqueContent
     .filter((e) => e.contentType === "article")

     .map((content) => (
      <ContentItem
       currentSection={currentSection}
       content={content}
       key={content._id}
      />
     ))}
   </div>
   <h5>Reviews</h5>
   <div>
    {uniqueContent
     .filter((e) => e.contentType === "review")

     .map((content) => (
      <ContentItem
       currentSection={currentSection}
       content={content}
       key={content._id}
      />
     ))}
   </div>
   <h5>Quizzes</h5>
   <div>
    {uniqueContent
     .filter((e) => e.contentType === "quiz")

     .map((content) => (
      <ContentItem
       currentSection={currentSection}
       content={content}
       key={content._id}
      />
     ))}
   </div>
  </div>
 );
};

export default ContentManager;
