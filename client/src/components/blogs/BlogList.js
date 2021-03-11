import React, { useContext, useEffect } from "react";
import BlogContext from "../../context/blog/blogContext";
import BlogItem from "./BlogItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const BlogList = () => {
  const blogContext = useContext(BlogContext);
  const { blogs, loading, getBlogs } = blogContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  useEffect(() => {
    if (user) getBlogs(_id);
  }, [user, authContext]);

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
