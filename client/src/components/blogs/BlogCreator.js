import React, { Fragment, useContext, useState, useCallback } from "react";
import BlogForm from "./BlogForm";
import BlogContext from "../../context/blog/blogContext";
const BlogCreator = () => {
  const [newBlog, setNewBlog] = useState(false);
  const blogContext = useContext(BlogContext);
  const { clearCurrentBlog, current } = blogContext;
  const setForm = useCallback(() => {
    setNewBlog((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      <div
        className={current !== null ? "grid-2 bg-light card" : "bg-light card"}>
        <button
          onClick={
            current !== null
              ? () => {
                  clearCurrentBlog();
                  setNewBlog((prevState) => !prevState);
                }
              : () => setNewBlog((prevState) => !prevState)
          }
          className='btn btn-block btn-primary'>
          {newBlog === false ? "Create New Blog" : "Clear New Blog"}
        </button>
        {current !== null ? (
          <button
            onClick={() => clearCurrentBlog()}
            className='btn btn-block btn-primary'>
            Clear Loaded Blog
          </button>
        ) : (
          ""
        )}
      </div>
      <div>{newBlog === true ? <BlogForm setForm={setForm} /> : ""}</div>
    </Fragment>
  );
};

export default BlogCreator;
