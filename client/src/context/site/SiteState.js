import React, { useReducer } from "react";
import axios from "axios";
import SiteContext from "./siteContext";
import siteReducer from "./siteReducer";

import {
  GET_SITES,
  SITE_ERROR,
  GET_SITE,
  SET_CURRENTSITE,
  CLEAR_CURRENTSITE,
  CLEAR_CURRENTCONTENT,
  DELETE_SITE,
  POST_SITE,
  PUT_SITE,
  DELETE_PAGE,
  POST_PAGES,
  PUT_PAGES,
  GET_PAGES,
  GET_COMPONENT,
  GET_COMPONENTS,
  GET_REVIEWSSEARCHED,
  GET_VERTICALSSEARCHED,
  GET_FIRMSSEARCHED,
  GET_BLOGSSEARCHED,
  GET_QUIZSSEARCHED,
  SET_CURRENTSECTION,
  CLEAR_CURRENTSECTION,
  PREVIEW_COMPONENT,
  MOUNT_COMPONENT,
  PUT_PAGECSS,
  SET_CURRENTSITECSS,
  GET_SITELAYOUTS,
  CLEAR_SITELAYOUT,
  CLEAR_SITESITECSS,
  ENFORCE_SITELAYOUT,
  GET_ARTICLESSEARCHED,
  SET_CURRENTFONT,
  SET_CURRENTPALLET,
  SET_CURRENTCONTENT,
  SET_CONTENT,
  CLEAR_CONTENT,
} from "../types";

const SiteState = (props) => {
  const initialState = {
    current: null,
    sites: null,
    error: null,
    layout: null,
    currentSection: null,
    currentContent: null,
    page: null,
    font: null,
    pallet: null,
    content: [],
  };

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const getSites = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites?q=${_id}`, config);

      dispatch({
        type: GET_SITES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentSite = () => {
    dispatch({ type: CLEAR_CURRENTSITE });
  };

  const getSite = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites/${_id}`, config);

      dispatch({
        type: GET_SITE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentFont = (font) => {
    dispatch({
      type: SET_CURRENTFONT,
      payload: font,
    });
  };

  const setCurrentSection = (section) => {
    dispatch({
      type: SET_CURRENTSECTION,
      payload: section,
    });
  };

  const clearCurrentSection = () => {
    dispatch({
      type: CLEAR_CURRENTSECTION,
    });
  };

  const setCurrentPallet = (pallet) => {
    dispatch({
      type: SET_CURRENTPALLET,
      payload: pallet,
    });
  };

  const postSite = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/sites/", formData, config);
      dispatch({
        type: POST_SITE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putSite = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/sites/${_id}`, formData, config);
      dispatch({
        type: PUT_SITE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteSite = async (_id) => {
    try {
      await axios.delete(`/api/sites/${_id}`);

      dispatch({
        type: DELETE_SITE,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const getPages = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/sites/:id/pages", config);

      dispatch({
        type: GET_PAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const postPages = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/sites/:id/pages", formData, config);
      dispatch({
        type: POST_PAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putPages = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/sites/${_id}/pages`, formData, config);
      dispatch({
        type: PUT_PAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deletePage = async (_id) => {
    try {
      await axios.delete(`/api/sites/${_id}/pages`);

      dispatch({
        type: DELETE_PAGE,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const getComponents = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/sites/components", config);

      dispatch({
        type: GET_COMPONENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const getComponent = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites/components/${_id}`, config);

      dispatch({
        type: GET_COMPONENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const getSiteLayouts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/sites/layouts", config);

      dispatch({
        type: GET_SITELAYOUTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const getSiteLayout = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/sites/layouts/:id", config);

      dispatch({
        type: GET_SITELAYOUTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearSiteLayout = () => {
    dispatch({ type: CLEAR_SITELAYOUT });
  };

  const setSiteLayout = (layout) => {
    dispatch({
      type: SET_CURRENTSITE,
      payload: layout,
    });
  };

  const getCSSLibrary = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/sites/csslibrary", config);

      dispatch({
        type: GET_SITELAYOUTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const createSiteCSS = (css) => {
    dispatch({
      type: SET_CURRENTSITECSS,
      payload: css,
    });
  };

  const clearSiteCSS = () => {
    dispatch({ type: CLEAR_SITESITECSS });
  };

  const insertCSSOverride = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(
        `/api/sites/${_id}/pages/pageCSS`,
        formData,
        config
      );
      dispatch({
        type: PUT_PAGECSS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const enforceSiteLayout = (siteLayout, page) => {
    dispatch({
      type: ENFORCE_SITELAYOUT,
      payload: page,
    });
  };

  const mountComponent = (data, component) => {
    dispatch({
      type: MOUNT_COMPONENT,
      payload: component,
    });
  };

  const previewComponent = (component) => {
    dispatch({
      type: PREVIEW_COMPONENT,
      payload: component,
    });
  };

  const setContent = (content) => {
    dispatch({
      type: SET_CONTENT,
      payload: content,
    });
  };
  const clearContent = () => {
    dispatch({
      type: CLEAR_CONTENT,
    });
  };

  const setCurrentContent = (content) => {
    console.log(content);
    dispatch({ type: SET_CURRENTCONTENT, payload: content });
  };

  const clearCurrentContent = () => {
    dispatch({ type: CLEAR_CURRENTCONTENT });
  };

  const getFirms = async (_id) => {
    const res = await axios.get(`/api/firms?q=${_id}`);
    res.data.forEach((piece) => {
      piece.contentType = "firm";
      setContent(res.data);
    });

    dispatch({ type: GET_FIRMSSEARCHED, payload: res.data });
  };
  const getReviews = async (_id) => {
    const res = await axios.get(`/api/reviews?q=${_id}`);
    res.data.forEach((piece) => {
      piece.contentType = "review";
      setContent(res.data);
    });
    console.log(res.data);

    dispatch({ type: GET_REVIEWSSEARCHED, payload: res.data });
  };

  const getArticles = async (_id) => {
    const res = await axios.get(`/api/articles?q=${_id}`);
    res.data.forEach((piece) => {
      piece.contentType = "article";
    });
    setContent(res.data);
    dispatch({ type: GET_ARTICLESSEARCHED, payload: res.data });
  };

  const getBlogs = async (_id) => {
    const res = await axios.get(`/api/blogs?q=${_id}`);
    res.data.forEach((piece) => {
      piece.contentType = "blog";
    });
    setContent(res.data);
    dispatch({ type: GET_BLOGSSEARCHED, payload: res.data });
  };

  const getQuizs = async (_id) => {
    const res = await axios.get(`/api/quizs?q=${_id}`);
    res.data.forEach((piece) => {
      piece.contentType = "quiz";
    });
    setContent(res.data);
    dispatch({ type: GET_QUIZSSEARCHED, payload: res.data });
  };

  const getVerticals = async (_id) => {
    const res = await axios.get(`/api/verticals?q=${_id}`);
    res.data.forEach((piece) => {
      piece.contentType = "vertical";
    });
    setContent(res.data);
    dispatch({ type: GET_VERTICALSSEARCHED, payload: res.data });
  };

  return (
    <SiteContext.Provider
      value={{
        current: state.current,
        sites: state.sites,
        content: state.content,
        currentContent: state.currentContent,
        layout: state.layout,
        page: state.page,
        font: state.font,
        pallet: state.pallet,
        error: state.error,
        getSites,
        getSite,
        setCurrentFont,
        setCurrentPallet,
        clearCurrentSite,
        setCurrentSection,
        clearCurrentSection,
        deleteSite,
        postSite,
        putSite,
        previewComponent,
        mountComponent,
        getComponent,
        getComponents,
        getCSSLibrary,
        getSiteLayouts,
        getSiteLayout,
        enforceSiteLayout,
        setSiteLayout,
        clearSiteLayout,
        getPages,
        postPages,
        putPages,
        clearContent,
        deletePage,
        createSiteCSS,
        insertCSSOverride,
        clearSiteCSS,
        setCurrentContent,
        getFirms,
        getVerticals,
        clearCurrentContent,
        getBlogs,
        getArticles,
        getQuizs,
        getReviews,
      }}>
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteState;
