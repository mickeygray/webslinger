import React, { createContext, useContext, useReducer } from "react";
import appReducer from "./appReducer";
import axios from "axios";
import {
  GET_PAGES,
  RENDER_PAGE,
  ADD_IP,
  ADD_LEAD,
  ADD_CLICK,
  SET_SECTION,
} from "./types";
const AppContext = createContext();

export function AppWrapper({ children }) {
  const sharedState = {
    clicks: [],
    routes: [],
    leads: [],
    ip: [],
    globals: {},
    pages: [],
    section: null,
    page: null,
  };

  const [state, dispatch] = useReducer(appReducer, sharedState);

  const getPages = async (_id) => {
    const res = await axios.get(`/api/sites/${_id}`);
    dispatch({
      type: GET_PAGES,
      payload: res.data,
    });
  };

  const renderPage = (page) => {
    dispatch({
      type: RENDER_PAGE,
      payload: page,
    });
  };

  const addClick = (click) => {
    if (sessionStorage.getItem("click") !== null) {
      const existingLead = JSON.parse(sessionStorage.getItem("click"));
      let clicks;
      if (typeof existingLead === "object" && existingLead !== null) {
        clicks = JSON.stringify([click, existingLead]);
      } else {
        clicks = JSON.stringify([click, ...existingLead]);
      }
      sessionStorage.setItem("click", clicks);
    } else {
      sessionStorage.setItem("click", JSON.stringify(click));
    }
    dispatch({
      type: ADD_CLICK,
      payload: sharedState.clicks,
    });
  };

  const addLead = (lead) => {
    if (sessionStorage.getItem("lead") !== null) {
      const existingLead = JSON.parse(sessionStorage.getItem("lead"));
      let lead;
      if (typeof existingLead === "object" && existingLead !== null) {
        lead = JSON.stringify([lead, existingLead]);
      } else {
        lead = JSON.stringify([lead, ...existingLead]);
      }
      sessionStorage.setItem("lead", lead);
    } else {
      sessionStorage.setItem("lead", JSON.stringify(lead));
    }

    dispatch({
      type: ADD_LEAD,
      payload: sharedState.leads,
    });
  };

  const addIp = (ip) => {
    sessionStorage.setItem("ip", JSON.stringify(ip));
    dispatch({
      type: ADD_IP,
      payload: sharedState.ip,
    });
  };

  const setSection = (section) => {
    dispatch({
      type: SET_SECTION,
      payload: section,
    });
  };

  const contextProps = {
    addIp,
    addLead,
    addClick,
    renderPage,
    getPages,
    setSection,
    clicks: state.clicks,
    pages: state.pages,
    leads: state.leads,
    ip: state.ip,
    globals: state.globals,
    pages: state.pages,
    section: state.section,
    page: state.page,
  };

  return (
    <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
