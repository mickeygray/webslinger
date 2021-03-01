import React, { Fragment, useContext, useState, useCallback } from "react";
import ArticleForm from "./ArticleForm";
import ArticleContext from "../../context/article/articleContext";
const ArticleCreator = () => {
  const [newArticle, setNewArticle] = useState(false);
  const articleContext = useContext(ArticleContext);
  const { clearCurrentArticle, current } = articleContext;
  const setForm = useCallback(() => {
    setNewArticle((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      <div
        className={current !== null ? "grid-2 bg-light card" : "bg-light card"}>
        <button
          onClick={
            current !== null
              ? () => {
                  clearCurrentArticle();
                  setNewArticle((prevState) => !prevState);
                }
              : () => setNewArticle((prevState) => !prevState)
          }
          className='btn btn-block btn-primary'>
          {newArticle === false ? "Create New Article" : "Clear New Article"}
        </button>
        {current !== null ? (
          <button
            onClick={() => clearCurrentArticle()}
            className='btn btn-block btn-primary'>
            Clear Loaded Article
          </button>
        ) : (
          ""
        )}
      </div>
      <div>{newArticle === true ? <ArticleForm setForm={setForm} /> : ""}</div>
    </Fragment>
  );
};

export default ArticleCreator;
