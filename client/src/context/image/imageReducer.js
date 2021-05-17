import {
 GET_IMAGES,
 DELETE_IMAGE,
 IMAGE_ERROR,
 GET_IMAGE,
 PUT_IMAGE,
 GET_CONTENTIMAGE,
 GET_COMPONENTIMAGE,
 SET_CURRENTIMAGE,
 CLEAR_CURRENTIMAGE,
 GET_COLLECTIONIMAGE,
 CLEAR_COLLECTIONIMAGE,
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
    contentImage: null,
   };

  case CLEAR_COLLECTIONIMAGE:
   return {
    ...state,
    collectionPreview: null,
   };
  case GET_IMAGE:
   return {
    ...state,
    image: action.payload,
    loading: false,
   };

  case GET_COLLECTIONIMAGE:
   return {
    ...state,
    collectionPreview: {
     code: URL.createObjectURL(
      new Blob([action.payload.img]),
      `${action.payload.type}`
     ),
     name: action.payload.name,
    },
    loading: false,
   };

  case GET_CONTENTIMAGE:
   return {
    ...state,
    contentImage: {
     background: action.payload.background,
     code: URL.createObjectURL(
      new Blob([action.payload.img]),
      `${action.payload.type}`
     ),
     imgIndex: action.payload.imgIndex,
     name: action.payload.name,
     level: action.payload.cellLevel,
    },

    loading: false,
   };

  case GET_COMPONENTIMAGE:
   return {
    ...state,
    componentImages: [
     ...state.componentImages,
     {
      code: URL.createObjectURL(
       new Blob([action.payload.img]),
       `${action.payload.type}`
      ),
      key: action.payload.key,
      value: action.payload.value,
     },
    ],
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
