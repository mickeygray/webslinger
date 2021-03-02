import React, { createContext, useContext, useReducer } from "react";
import contentReducer from "./contentReducer";
import axios from "axios";
import {
  GET_MYARTICLES,
  GET_MYBLOGS,
  GET_MYREVIEWS,
  GET_MYQUIZS,
  GET_MYVERTICALS,
  GET_MYFIRMS,
} from "./types";
const ContentContext = createContext();

export function ContentWrapper({ children }) {
  let content = {
    blogs: [],
    articles: [],
    firms: [],
    verticals: [],
    quizs: [],
    reviews: [],
  };

  const [state, dispatch] = useReducer(contentReducer, content);

  const getMyBlogs = async (_id) => {
    const res = await axios.get(`/api/blogs/site/${_id}`);
    dispatch({
      type: GET_MYBLOGS,
      payload: res.data,
    });
  };

  const getMyArticles = async (_id) => {
    const res = await axios.get(`/api/sites/${_id}/articles`);
    dispatch({
      type: GET_MYARTICLES,
      payload: res.data,
    });
  };

  const getMyFirms = async (_id) => {
    const res = await axios.get(`/api/sites/${_id}/firms`);
    dispatch({
      type: GET_MYFIRMS,
      payload: res.data,
    });
  };

  const getMyVerticals = async (_id) => {
    const res = await axios.get(`/api/sites/${_id}/firms`);
    dispatch({
      type: GET_MYVERTICALS,
      payload: res.data,
    });
  };

  const getMyReviews = async (_id) => {
    const res = await axios.get(`/api/sites/${_id}/firms`);
    dispatch({
      type: GET_MYREVIEWS,
      payload: res.data,
    });
  };

  const getMyQuizs = async (_id) => {
    const res = await axios.get(`/api/sites/${_id}/firms`);
    dispatch({
      type: GET_MYQUIZS,
      payload: res.data,
    });
  };

  const contextProps = {
    getMyArticles,
    getMyBlogs,
    getMyFirms,
    getMyQuizs,
    getMyReviews,
    getMyVerticals,
    content,
  };

  return (
    <ContentContext.Provider value={contextProps}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
