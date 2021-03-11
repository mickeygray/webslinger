import React, { useReducer } from "react";
import axios from "axios";
import VerticalContext from "./verticalContext";
import verticalReducer from "./verticalReducer";

import {
  GET_VERTICALS,
  VERTICAL_ERROR,
  GET_VERTICAL,
  SET_CURRENTVERTICAL,
  CLEAR_CURRENTVERTICAL,
  DELETE_VERTICAL,
  POST_VERTICAL,
  PUT_VERTICAL,
} from "../types";

const VerticalState = (props) => {
  const initialState = {
    current: null,
    verticals: null,
    error: null,
  };

  const [state, dispatch] = useReducer(verticalReducer, initialState);

  const getVerticals = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/verticals?q=${_id}`, config);

      dispatch({
        type: GET_VERTICALS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: VERTICAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const clearCurrentVertical = () => {
    dispatch({ type: CLEAR_CURRENTVERTICAL });
  };

  const getVertical = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`/api/verticals/${_id}`, config);

      dispatch({
        type: GET_VERTICAL,
        payload: res.data,
      });

      console.log(res.data);
      setCurrentVertical(res.data);
    } catch (err) {
      dispatch({
        type: VERTICAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const setCurrentVertical = (current) => {
    dispatch({
      type: SET_CURRENTVERTICAL,
      payload: current,
    });
  };

  const postVertical = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(formData);
    try {
      const res = await axios.post("/api/verticals/", formData, config);
      dispatch({
        type: POST_VERTICAL,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: VERTICAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const putVertical = async (formData, id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.put(`/api/verticals/${id}`, formData, config);
      dispatch({
        type: PUT_VERTICAL,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: VERTICAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const deleteVertical = async (_id) => {
    try {
      await axios.delete(`/api/verticals/${_id}`);

      dispatch({
        type: DELETE_VERTICAL,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: VERTICAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <VerticalContext.Provider
      value={{
        current: state.current,
        verticals: state.verticals,
        error: state.error,
        getVerticals,
        getVertical,
        setCurrentVertical,
        clearCurrentVertical,
        deleteVertical,
        postVertical,
        putVertical,
      }}>
      {props.children}
    </VerticalContext.Provider>
  );
};

export default VerticalState;
