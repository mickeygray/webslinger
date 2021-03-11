import React, { useReducer } from "react";
import axios from "axios";
import FirmContext from "./firmContext";
import firmReducer from "./firmReducer";

import {
  GET_FIRMS,
  FIRM_ERROR,
  GET_FIRM,
  SET_CURRENTFIRM,
  CLEAR_CURRENTFIRM,
  DELETE_FIRM,
  POST_FIRM,
  PUT_FIRM,
} from "../types";

const FirmState = (props) => {
  const initialState = {
    current: null,
    firms: null,
    error: null,
  };

  const [state, dispatch] = useReducer(firmReducer, initialState);

  const getFirms = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/firms?q=${_id}`, config);

      dispatch({
        type: GET_FIRMS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FIRM_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentFirm = () => {
    dispatch({ type: CLEAR_CURRENTFIRM });
  };

  const getFirm = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/firms/${_id}`, config);

      dispatch({
        type: GET_FIRM,
        payload: res.data,
      });
      setCurrentFirm(res.data);
    } catch (err) {
      dispatch({
        type: FIRM_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentFirm = (current) => {
    dispatch({
      type: SET_CURRENTFIRM,
      payload: current,
    });
  };

  const postFirm = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/firms/", formData, config);
      dispatch({
        type: POST_FIRM,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FIRM_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putFirm = async (formData, _id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/firms/${_id}`, formData, config);
      dispatch({
        type: PUT_FIRM,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FIRM_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteFirm = async (_id) => {
    try {
      await axios.delete(`/api/firms/${_id}`);

      dispatch({
        type: DELETE_FIRM,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: FIRM_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <FirmContext.Provider
      value={{
        current: state.current,
        firms: state.firms,
        error: state.error,
        getFirms,
        getFirm,
        setCurrentFirm,
        clearCurrentFirm,
        deleteFirm,
        postFirm,
        putFirm,
      }}>
      {props.children}
    </FirmContext.Provider>
  );
};

export default FirmState;
