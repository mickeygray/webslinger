import React, { useContext, useEffect } from "react";
import ArticleContext from "../../context/article/articleContext";
import ArticleItem from "./ArticleItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const ArticleList = () => {
  const articleContext = useContext(ArticleContext);
  const { articles, loading, getArticles } = articleContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  useEffect(() => {
    if (user) getArticles(_id);
  }, [user, authContext]);

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
