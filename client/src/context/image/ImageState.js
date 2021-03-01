import React, { useReducer } from "react";
import axios from "axios";
import ImageContext from "./imageContext";
import imageReducer from "./imageReducer";

import {
  GET_IMAGES,
  GET_IMAGE,
  IMAGE_ERROR,
  DELETE_IMAGE,
  SET_CURRENTIMAGE,
  CLEAR_CURRENTIMAGE,
  PUT_IMAGE,
} from "../types";

const ImageState = (props) => {
  const initialState = {
    current: null,
    images: null,
    image: null,
    error: null,
  };

  const [state, dispatch] = useReducer(imageReducer, initialState);

  const deleteImage = async (_id) => {
    try {
      await axios.delete(`/api/images/${_id}`);

      dispatch({
        type: DELETE_IMAGE,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: IMAGE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const getImage = async (img) => {
    const config = {
      headers: {
        "Content-Type": `${img.contentType}`,
      },
      responseType: "arraybuffer",
    };
    const res = await axios.get(`/api/images/${img._id}`, config);

    console.log(res.data);
    dispatch({
      type: GET_IMAGE,
      payload: res.data,
    });
  };

  const setCurrentImage = (current) => {
    dispatch({
      type: SET_CURRENTIMAGE,
      payload: current,
    });
  };

  const clearCurrentImage = () => {
    dispatch({ type: CLEAR_CURRENTIMAGE });
  };
  const putImage = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post(`/api/images/`, formData, config);

    console.log(res.data);
    dispatch({
      type: PUT_IMAGE,
      payload: res.data,
    });
  };

  const getImages = async () => {
    const config = {
      responseType: "application/json",
    };

    const res = await axios.get("/api/images", config);

    dispatch({
      type: GET_IMAGES,
      payload: res.data,
    });
  };

  return (
    <ImageContext.Provider
      value={{
        current: state.current,
        images: state.images,
        error: state.error,
        deleteImage,
        putImage,
        getImages,
        getImage,
        setCurrentImage,
        clearCurrentImage,
      }}>
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageState;