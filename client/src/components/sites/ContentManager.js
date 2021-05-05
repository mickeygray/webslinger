import React, { useContext, useEffect } from "react";
import ContentItem from "./ContentItem";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import FormItem from "./FormItem";
import UserStateItem from "./UserStateItem";

const ContentManager = () => {
 const siteContext = useContext(SiteContext);
 const { currentSection, content, forms, getForms, userStates } = siteContext;
 const authContext = useContext(AuthContext);
 const { user } = authContext;
 const { _id } = user;

 const uniqueContent = Object.values(
  content.reduce((unique, o) => {
   if (!unique[o.id] || +o.id > +unique[o._id]._id) unique[o._id] = o;

   return unique;
  }, {})
 );

 useEffect(() => {
  getForms(_id);
 }, []);

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
   <h5>Forms</h5>
   <div>
    {forms.length > 0
     ? [...new Set(forms.map((form) => form.formName))].map((formName, i) => (
        <FormItem formName={formName} key={i} />
       ))
     : ""}
   </div>
   <h5>User States</h5>

   {userStates.map((userState) => (
    <UserStateItem key={userState._id} userState={userState} />
   ))}
  </div>
 );
};

export default ContentManager;
