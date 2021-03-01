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
  GET_RANGEREVIEWS,
  GET_RANGEVERTICALS,
  GET_RANGEFIRMS,
  GET_RANGEBLOGS,
  GET_RANGEQUIZS,
  GET_RANGEARTICLES,
  PREVIEW_COMPONENT,
  MOUNT_COMPONENT,
  PUT_PAGECSS,
  SET_CURRENTSITECSS,
  GET_SITELAYOUTS,
  CLEAR_SITELAYOUT,
  CLEAR_SITESITECSS,
  ENFORCE_SITELAYOUT,
  GET_ARTICLESSEARCHED,
} from "../types";

const SiteState = (props) => {
  const initialState = {
    current: null,
    sites: null,
    error: null,
    layout: null,
    page: null,
  };

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const getSites = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/sites", config);

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
      setCurrentSite(res.data);
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentSite = (current) => {
    dispatch({
      type: SET_CURRENTSITE,
      payload: current,
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
      setCurrentSite(res.data);
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

  const getFirms = async (text) => {
    const res = await axios.get(`/api/firms?q=${text}`);

    dispatch({ type: GET_FIRMSSEARCHED, payload: res.data });
  };
  const getReviews = async (text) => {
    const res = await axios.get(`/api/reviews?q=${text}`);

    dispatch({ type: GET_REVIEWSSEARCHED, payload: res.data });
  };

  const getArticles = async (text) => {
    const res = await axios.get(`/api/articles?q=${text}`);

    dispatch({ type: GET_ARTICLESSEARCHED, payload: res.data });
  };

  const getBlogs = async (text) => {
    const res = await axios.get(`/api/blogs?q=${text}`);

    dispatch({ type: GET_BLOGSSEARCHED, payload: res.data });
  };

  const getQuizs = async (text) => {
    const res = await axios.get(`/api/quizs?q=${text}`);

    dispatch({ type: GET_QUIZSSEARCHED, payload: res.data });
  };

  const getVerticals = async (text) => {
    const res = await axios.get(`/api/verticals?q=${text}`);

    dispatch({ type: GET_VERTICALSSEARCHED, payload: res.data });
  };

  const getRangeFirms = async (range) => {
    const res = await axios.get(`/api/firms?q=${range}`);

    dispatch({ type: GET_RANGEFIRMS, payload: res.data });
  };

  const getRangeArticles = async (range) => {
    const res = await axios.get(`/api/articles?q=${range}`);

    dispatch({ type: GET_RANGEARTICLES, payload: res.data });
  };

  const getRangeBlogs = async (range) => {
    const res = await axios.get(`/api/blogs?q=${range}`);

    dispatch({ type: GET_RANGEBLOGS, payload: res.data });
  };

  const getRangeQuizs = async (range) => {
    const res = await axios.get(`/api/quizs?q=${range}`);

    dispatch({ type: GET_RANGEQUIZS, payload: res.data });
  };

  const getRangeVerticals = async (range) => {
    const res = await axios.get(`/api/verticals?q=${range}`);

    dispatch({ type: GET_RANGEVERTICALS, payload: res.data });
  };

  const getRangeReviews = async (range) => {
    const res = await axios.get(`/api/reviews?q=${range}`);

    dispatch({ type: GET_RANGEREVIEWS, payload: res.data });
  };
  return (
    <SiteContext.Provider
      value={{
        current: state.current,
        sites: state.sites,
        layout: state.layout,
        page: state.page,
        error: state.error,
        getSites,
        getSite,
        setCurrentSite,
        clearCurrentSite,
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
        deletePage,
        createSiteCSS,
        insertCSSOverride,
        clearSiteCSS,
        getFirms,
        getVerticals,
        getBlogs,
        getArticles,
        getQuizs,
        getReviews,
        getRangeFirms,
        getRangeVerticals,
        getRangeBlogs,
        getRangeArticles,
        getRangeQuizs,
        getRangeReviews,
      }}>
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteState;
