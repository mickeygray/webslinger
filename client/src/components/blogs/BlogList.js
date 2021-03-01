import React, { useContext, useEffect } from "react";
import BlogContext from "../../context/blog/blogContext";
import BlogItem from "./BlogItem";
import Spinner from "../layout/Spinner";

const BlogList = () => {
  const blogContext = useContext(BlogContext);
  const { blogs, loading, getBlogs } = blogContext;

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      {blogs !== null && !loading ? (
        blogs.map((blog) => <BlogItem blog={blog} key={blog._id} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BlogList;
