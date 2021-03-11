import React, { useReducer } from "react";
import axios from "axios";
import LeadContext from "./leadContext";
import leadReducer from "./leadReducer";

import {
  GET_LEADS,
  LEAD_ERROR,
  GET_LEAD,
  SET_CURRENTLEAD,
  CLEAR_CURRENTLEAD,
  DELETE_LEAD,
  POST_LEAD,
  PUT_LEAD,
} from "../types";

const LeadState = (props) => {
  const initialState = {
    current: null,
    leads: null,
    error: null,
    page: null,
  };

  const [state, dispatch] = useReducer(leadReducer, initialState);

  const getLeads = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/leads?q=${_id}`, config);

      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LEAD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentLead = () => {
    dispatch({ type: CLEAR_CURRENTLEAD });
  };

  const getLead = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/leads/${_id}`, config);

      dispatch({
        type: GET_LEAD,
        payload: res.data,
      });
      setCurrentLead(res.data);
    } catch (err) {
      dispatch({
        type: LEAD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentLead = (current) => {
    dispatch({
      type: SET_CURRENTLEAD,
      payload: current,
    });
  };

  const postLead = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/leads/", formData, config);
      dispatch({
        type: POST_LEAD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LEAD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putLead = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/leads/${_id}`, formData, config);
      dispatch({
        type: PUT_LEAD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LEAD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteLead = async (_id) => {
    try {
      await axios.delete(`/api/leads/${_id}`);

      dispatch({
        type: DELETE_LEAD,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: LEAD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <LeadContext.Provider
      value={{
        current: state.current,
        leads: state.leads,
        error: state.error,
        getLeads,
        getLead,
        setCurrentLead,
        clearCurrentLead,
        deleteLead,
        postLead,
        putLead,
      }}>
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
