import React, { useReducer } from "react";
import axios from "axios";
import BlogContext from "./blogContext";
import blogReducer from "./blogReducer";

import {
  GET_BLOGS,
  BLOG_ERROR,
  GET_BLOG,
  SET_CURRENTBLOG,
  CLEAR_CURRENTBLOG,
  DELETE_BLOG,
  POST_BLOG,
  PUT_BLOG,
} from "../types";

const BlogState = (props) => {
  const initialState = {
    current: null,
    blogs: null,
    error: null,
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);

  const getBlogs = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/blogs", config);

      dispatch({
        type: GET_BLOGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentBlog = () => {
    dispatch({ type: CLEAR_CURRENTBLOG });
  };

  const getBlog = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/blogs/${_id}`, config);

      dispatch({
        type: GET_BLOG,
        payload: res.data,
      });
      setCurrentBlog(res.data);
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentBlog = (current) => {
    dispatch({
      type: SET_CURRENTBLOG,
      payload: current,
    });
  };

  const postBlog = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/blogs/", formData, config);
      dispatch({
        type: POST_BLOG,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putBlog = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/blogs/${_id}`, formData, config);
      dispatch({
        type: PUT_BLOG,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteBlog = async (_id) => {
    try {
      await axios.delete(`/api/blogs/${_id}`);

      dispatch({
        type: DELETE_BLOG,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <BlogContext.Provider
      value={{
        current: state.current,
        blogs: state.blogs,
        error: state.error,
        getBlogs,
        getBlog,
        setCurrentBlog,
        clearCurrentBlog,
        deleteBlog,
        postBlog,
        putBlog,
      }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
