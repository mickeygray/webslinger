import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useAppContext } from "../state/appState";
import { useContentContext } from "../state/contentState";

const Body = ({ current }) => {
  const { getPages, pages } = useAppContext();
  const {
    getMyBlogs,
    getMyFirms,
    getMyVerticals,
    getMyArticles,
    getMyQuizs,
    getMyReviews,
    content,
  } = useContentContext();

  const page = {
    pageString: "",
    _id: "",
  };

  const noContent = {
    text: "Please Add Content",
  };

  const [pageBody, setPages] = useState([{ ...page }]);

  const [contentBody, setContent] = useState([{ ...noContent }]);

  useEffect(() => {
    if (current != null) {
      getPages(current._id);
      getMyBlogs(current._id);
      getMyFirms(current._id);
      getMyVerticals(current._id);
      getMyArticles(current._id);
      getMyQuizs(current._id);
      getMyReviews(current._id);
    }
  }, [current]);
  return (
    <Site
      pages={current != null ? pages : pageBody}
      content={current != null ? content : contentBody}
    />
  );
};

export default Body;

const Site = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
  grid-template-rows: repeat(7, minmax(100px, 1fr));
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  grid-auto-rows: 75px;
  grid-auto-flow: dense;
  .header {
    grid-area: 4 / 4 / 5 / 5;
  }
  .hero {
    grid-area: 3 / 3 / 4 / 5;
  }
  .body {
    grid-area: 3 / 5 / 5 / 6;
  }
  .footer {
    grid-area: 5 / 4 / 6 / 6;
  }
`;
