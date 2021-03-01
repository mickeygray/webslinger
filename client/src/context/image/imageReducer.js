import {
  GET_IMAGES,
  DELETE_IMAGE,
  IMAGE_ERROR,
  GET_IMAGE,
  PUT_IMAGE,
  SET_CURRENTIMAGE,
  CLEAR_CURRENTIMAGE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload,
        loading: false,
      };
    case SET_CURRENTIMAGE:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENTIMAGE:
      return {
        ...state,
        current: null,
      };
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
        loading: false,
      };
    case PUT_IMAGE:
      return {
        ...state,
        images: state.images.map((img) =>
          img._id === action.payload._id ? action.payload : img
        ),
        loading: false,
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image._id !== action.payload),
        loading: false,
      };
    case IMAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
