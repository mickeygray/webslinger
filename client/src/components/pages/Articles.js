import React, { useContext } from "react";
import ArticleList from "../articles/ArticleList";
import ArticleCreator from "../articles/ArticleCreator";

const Articles = () => {
  return (
    <div>
      <ArticleCreator />
      <ArticleList />
    </div>
  );
};

export default Articles;
