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
  SET_CURRENTPAGE,
  CLEAR_CURRENTPAGE,
  SET_CURRENTCOMPONENT,
  CLEAR_CURRENTCOMPONENT,
  CLEAR_CURRENTCONTENT,
  DELETE_SITE,
  DELETE_AREA,
  POST_SITE,
  PUT_SITE,
  DELETE_PAGE,
  POST_PAGES,
  PUT_PAGES,
  GET_PAGES,
  GET_PAGE,
  PUT_COMPONENT,
  POST_COMPONENT,
  DELETE_COMPONENT,
  GET_COMPONENT,
  GET_COMPONENTS,
  GET_REVIEWSSEARCHED,
  GET_VERTICALSSEARCHED,
  GET_FIRMSSEARCHED,
  GET_BLOGSSEARCHED,
  GET_QUIZSSEARCHED,
  CLEAR_SITELAYOUT,
  GET_ARTICLESSEARCHED,
  SET_CURRENTFONT,
  SET_CURRENTPALLET,
  SET_CURRENTCONTENT,
  SET_CONTENT,
  CLEAR_CONTENT,
} from "../types";

const SiteState = (props) => {
  const initialState = {
    error: null,
    layout: null,
    currentContent: null,
    currentPage: null,
    currentSite: null,
    currentComponent: null,
    font: null,
    pallet: null,
    content: [],
    myComponents: null,
    pages: null,
    sites: null,
  };

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const getSites = async (userid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites/sites?q=${userid}`, config);

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

  const setCurrentSite = (site) => {
    dispatch({ type: SET_CURRENTSITE, payload: site });
  };

  const getSite = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites/sites/${_id}`, config);

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

  const setCurrentPallet = (pallet) => {
    dispatch({
      type: SET_CURRENTPALLET,
      payload: pallet,
    });
  };

  const postSite = async (site) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/sites/sites", site, config);
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

  const putSite = async (site, _id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/sites/sites/${_id}`, site, config);
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
      await axios.delete(`/api/sites/sites/${_id}`);

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

  const deleteArea = async (_id, area) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(`/api/sites/pages/${_id}/areas`, area, config);

      dispatch({
        type: DELETE_AREA,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteComponent = async (_id) => {
    try {
      await axios.delete(`/api/sites/components/${_id}`);

      dispatch({
        type: DELETE_COMPONENT,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  const getPages = async (userid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites/pages?q=${userid}`, config);

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

  const getPage = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites/pages/${_id}`, config);

      dispatch({
        type: GET_PAGE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const postPage = async (page) => {
    const config = {
      headers: {
        "Content-Type": "appplication/json",
      },
    };
    try {
      const res = await axios.post("/api/sites/pages", page, config);
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

  const putPage = async (page) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/sites/pages/${page._id}`, page, config);
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
      await axios.delete(`/api/sites/pages/${_id}`);

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

  const getComponents = async (userid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/sites/components?q=${userid}`, config);

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

  const postComponent = async (component) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`/api/sites/components/`, component, config);

      dispatch({
        type: POST_COMPONENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SITE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putComponent = async (component) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `/api/sites/components/${component._id}`,
        component,
        config
      );

      dispatch({
        type: PUT_COMPONENT,
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

  const setCurrentComponent = (component) => {
    dispatch({
      type: SET_CURRENTCOMPONENT,
      payload: component,
    });
  };
  const clearCurrentComponent = () => {
    dispatch({
      type: CLEAR_CURRENTCOMPONENT,
    });
  };

  const setCurrentPage = (page) => {
    dispatch({
      type: SET_CURRENTPAGE,
      payload: page,
    });
  };
  const clearCurrentPage = () => {
    dispatch({
      type: CLEAR_CURRENTPAGE,
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
    console.log(_id);
    const res = await axios.get(`/api/articles?q=${_id}`);
    res.data.forEach((piece) => {
      piece.contentType = "article";
    });

    console.log(res.data);
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
        error: state.error,
        layout: state.layout,
        currentContent: state.currentContent,
        currentPage: state.currentPage,
        currentSite: state.currentSite,
        currentComponent: state.currentComponent,
        font: state.font,
        pallet: state.pallet,
        content: state.content,
        myComponents: state.myComponents,
        pages: state.pages,
        sites: state.sites,
        setCurrentFont,
        setCurrentPallet,
        getSites,
        getSite,
        setCurrentSite,
        clearCurrentSite,
        deleteSite,
        postSite,
        putSite,
        setCurrentContent,
        setContent,
        clearContent,
        postComponent,
        getComponent,
        getComponents,
        putComponent,
        deleteComponent,
        deleteArea,
        setCurrentComponent,
        clearCurrentComponent,
        deletePage,
        postPage,
        getPage,
        getPages,
        putPage,
        setCurrentPage,
        clearCurrentPage,
        deletePage,
        getFirms,
        getVerticals,
        getBlogs,
        getArticles,
        getQuizs,
        getReviews,
        clearCurrentContent,
      }}>
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteState;
