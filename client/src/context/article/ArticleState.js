import React, { useReducer } from "react";
import axios from "axios";
import ArticleContext from "./articleContext";
import articleReducer from "./articleReducer";

import {
  GET_ARTICLES,
  ARTICLE_ERROR,
  GET_ARTICLE,
  SET_CURRENTARTICLE,
  CLEAR_CURRENTARTICLE,
  DELETE_ARTICLE,
  POST_ARTICLE,
  PUT_ARTICLE,
} from "../types";

const ArticleState = (props) => {
  const initialState = {
    current: null,
    articles: null,
    error: null,
  };

  const [state, dispatch] = useReducer(articleReducer, initialState);

  const getArticles = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/articles", config);

      dispatch({
        type: GET_ARTICLES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentArticle = () => {
    dispatch({ type: CLEAR_CURRENTARTICLE });
  };

  const getArticle = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/articles/${_id}`, config);

      dispatch({
        type: GET_ARTICLE,
        payload: res.data,
      });
      setCurrentArticle(res.data);
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentArticle = (current) => {
    dispatch({
      type: SET_CURRENTARTICLE,
      payload: current,
    });
  };

  const postArticle = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/articles/", formData, config);
      dispatch({
        type: POST_ARTICLE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putArticle = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/articles/${_id}`, formData, config);
      dispatch({
        type: PUT_ARTICLE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteArticle = async (_id) => {
    try {
      await axios.delete(`/api/articles/${_id}`);

      dispatch({
        type: DELETE_ARTICLE,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        current: state.current,
        articles: state.articles,
        error: state.error,
        getArticles,
        getArticle,
        setCurrentArticle,
        clearCurrentArticle,
        deleteArticle,
        postArticle,
        putArticle,
      }}>
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleState;
