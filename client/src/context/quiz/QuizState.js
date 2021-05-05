import React, { useReducer } from "react";
import axios from "axios";
import QuizContext from "./quizContext";
import quizReducer from "./quizReducer";

import styled from "styled-components";

import {
 GET_QUIZS,
 QUIZ_ERROR,
 GET_QUIZ,
 SET_CURRENTQUIZ,
 CLEAR_CURRENTQUIZ,
 DELETE_QUIZ,
 POST_QUIZ,
 PUT_QUIZ,
} from "../types";

const QuizState = (props) => {
 const initialState = {
  current: null,
  quizs: null,
  error: null,
 };

 const [state, dispatch] = useReducer(quizReducer, initialState);

 const getQuizs = async (_id) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/quizs?q=${_id}`, config);

   dispatch({
    type: GET_QUIZS,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: QUIZ_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const clearCurrentQuiz = () => {
  dispatch({ type: CLEAR_CURRENTQUIZ });
 };

 const getQuiz = async (_id) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  try {
   const res = await axios.get(`/api/quizs/${_id}`, config);

   dispatch({
    type: GET_QUIZ,
    payload: res.data,
   });
   setCurrentQuiz(res.data);
  } catch (err) {
   dispatch({
    type: QUIZ_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const setCurrentQuiz = (current) => {
  dispatch({
   type: SET_CURRENTQUIZ,
   payload: current,
  });
 };

 const postQuiz = async (formData) => {
  const config = {
   headers: {
    "Content-Type": "multipart/form-data",
   },
  };
  try {
   const res = await axios.post("/api/quizs/", formData, config);
   dispatch({
    type: POST_QUIZ,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: QUIZ_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const putQuiz = async (formData, _id) => {
  const config = {
   headers: {
    "Content-Type": "multipart/form-data",
   },
  };
  try {
   const res = await axios.put(`/api/quizs/${_id}`, formData, config);
   dispatch({
    type: PUT_QUIZ,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: QUIZ_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 const deleteQuiz = async (_id) => {
  try {
   await axios.delete(`/api/quizs/${_id}`);

   dispatch({
    type: DELETE_QUIZ,
    payload: _id,
   });
  } catch (err) {
   dispatch({
    type: QUIZ_ERROR,
    payload: err.response.data.msg,
   });
  }
 };

 return (
  <QuizContext.Provider
   value={{
    current: state.current,
    quizs: state.quizs,
    error: state.error,
    getQuizs,
    getQuiz,
    setCurrentQuiz,
    clearCurrentQuiz,
    deleteQuiz,
    postQuiz,
    putQuiz,
   }}>
   {props.children}
  </QuizContext.Provider>
 );
};

export default QuizState;
