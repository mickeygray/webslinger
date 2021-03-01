import React, { Fragment, useContext } from "react";
import BlogContext from "../../context/blog/blogContext";
import BlogForm from "./BlogForm";

const BlogItem = ({ blog }) => {
  const { title, date, vertical, _id } = blog;
  const { getBlog, clearCurrentBlog, deleteBlog, current } = useContext(
    BlogContext
  );
  return (
    <Fragment>
      {current && current._id === blog._id ? (
        <BlogForm setForm={clearCurrentBlog} />
      ) : (
        <div className='grid-2 bg-secondary card m-2 lead'>
          {vertical.slice(0, 1).toUpperCase() +
            vertical.slice(1, vertical.length)}{" "}
          Blog From {date}
          <div className='p-2'>
            <button
              className='btn btn-sm btn-dark'
              onClick={current ? () => clearCurrentBlog() : () => getBlog(_id)}>
              {current ? `Clear ${title} update` : `Edit ${title}`}
            </button>
          </div>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteBlog(_id)}>
              Delete {title}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BlogItem;
