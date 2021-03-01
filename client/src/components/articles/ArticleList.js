import React, { useContext, useEffect } from "react";
import ArticleContext from "../../context/article/articleContext";
import ArticleItem from "./ArticleItem";
import Spinner from "../layout/Spinner";

const ArticleList = () => {
  const articleContext = useContext(ArticleContext);
  const { articles, loading, getArticles } = articleContext;

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      {articles !== null && !loading ? (
        articles.map((article) => (
          <ArticleItem article={article} key={article._id} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ArticleList;
