import React, { useContext } from "react";
import BlogList from "../blogs/BlogList";
import BlogCreator from "../blogs/BlogCreator";

const Blogs = () => {
  return (
    <div>
      <BlogCreator />
      <BlogList />
    </div>
  );
};

export default Blogs;
