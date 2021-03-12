import React, { useContext } from "react";
import ContentItem from "./ContentItem";
import SiteContext from "../../context/site/siteContext";
const ContentManager = () => {
  const siteContext = useContext(SiteContext);
  const { currentSection, content } = siteContext;

  console.log(content);
  return (
    <div style={{ height: "80vh", overflowY: "scroll", width: "200px" }}>
      <h5>Firms</h5>
      <div>
        {content &&
          content
            .filter((e) => e.contentType === "firm")
            .filter(
              ((s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(
                  Object.keys(content)
                    .map((k) => o[k])
                    .join("|")
                ))(new Set())
            )
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
        {content &&
          content
            .filter((e) => e.contentType === "vertical")
            .filter(
              ((s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(
                  Object.keys(content)
                    .map((k) => o[k])
                    .join("|")
                ))(new Set())
            )
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
        {content &&
          content
            .filter((e) => e.contentType === "blog")
            .filter(
              ((s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(
                  Object.keys(content)
                    .map((k) => o[k])
                    .join("|")
                ))(new Set())
            )
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
        {content &&
          content
            .filter((e) => e.contentType === "article")
            .filter(
              ((s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(
                  Object.keys(content)
                    .map((k) => o[k])
                    .join("|")
                ))(new Set())
            )
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
        {content &&
          content
            .filter((e) => e.contentType === "review")
            .filter(
              ((s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(
                  Object.keys(content)
                    .map((k) => o[k])
                    .join("|")
                ))(new Set())
            )
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
        {content &&
          content
            .filter((e) => e.contentType === "quiz")
            .filter(
              ((s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(
                  Object.keys(content)
                    .map((k) => o[k])
                    .join("|")
                ))(new Set())
            )
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
