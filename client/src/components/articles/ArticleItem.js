import React, { Fragment, useContext } from "react";
import ArticleContext from "../../context/article/articleContext";
import ArticleForm from "./ArticleForm";

const ArticleItem = ({ article }) => {
  const { title, date, vertical, _id } = article;
  const {
    getArticle,
    clearCurrentArticle,
    deleteArticle,
    current,
  } = useContext(ArticleContext);
  return (
    <Fragment>
      {current && current._id === article._id ? (
        <ArticleForm setForm={clearCurrentArticle} />
      ) : (
        <div className='grid-2 bg-secondary card m-2 lead'>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-dark'
              onClick={
                current ? () => clearCurrentArticle() : () => getArticle(_id)
              }>
              {current ? `Clear ${title} update` : `Edit ${title}`}
            </button>
          </div>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteArticle(_id)}>
              Delete {title}
            </button>
          </div>
          <div>
            A {vertical} article from {date}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ArticleItem;
