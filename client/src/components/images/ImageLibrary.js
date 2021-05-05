import React, { useContext, useEffect, useState, useCallback } from "react";
import ImageContext from "../../context/image/imageContext";
import axios from "axios";
import Spinner from "../layout/Spinner";
import Editor from "./Editor";

const ImageLibrary = () => {
 const imageContext = useContext(ImageContext);
 const [imageArray, setImageArray] = useState([]);
 const [editorState, setEditorState] = useState(false);
 const [editorImage, setEditorImage] = useState({
  chunkSize: 0,
  contentType: "",
  filename: "",
  length: 0,
  md5: "",
  uploadDate: "",
  url: "",
  _id: "",
 });
 const {
  getImages,
  images,
  loading,
  deleteImage,
  setCurrentImage,
 } = imageContext;
 useEffect(() => {
  getImages();
 }, []);

 const exitEditor = useCallback(() => {
  setEditorState((prevState) => !prevState);
 }, []);
 React.useEffect(() => {
  if (images !== null && !loading) {
   async function getImage(img) {
    let imageBlob;
    try {
     imageBlob = (
      await axios.get(`/api/images/${img._id}`, { responseType: "blob" })
     ).data;
    } catch (err) {
     return null;
    }

    let obj = {
     ...img,
     url: URL.createObjectURL(imageBlob),
    };
    return obj;
   }
   async function getImageArray() {
    const imageArray = [];
    for (const img of images) {
     imageArray.push(await getImage(img));
    }
    setImageArray(imageArray);
   }

   getImageArray();
  }
 }, [images]);

 console.log(imageArray);
 return (
  <div>
   {editorState ? (
    <div>
     <Editor exitEditor={exitEditor} image={editorImage} />
    </div>
   ) : (
    <div className='grid-4'>
     {!loading && imageArray.length > 0 ? (
      imageArray.map((img, i) => {
       return (
        <div className='card'>
         <span
          style={{ float: "right" }}
          className='bg-light lead'
          onClick={() => deleteImage(img._id)}>
          <a>X</a>
         </span>
         <a
          onClick={() => {
           setEditorState((prevState) => !prevState);
           setEditorImage(img);
           setCurrentImage(img);
          }}>
          <img
           src={img.url}
           alt={`image-${i}`}
           key={i}
           style={{ width: "200px", height: "200px" }}
          />
         </a>
        </div>
       );
      })
     ) : (
      <div
       style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
       }}>
       {" "}
       <Spinner />
      </div>
     )}
    </div>
   )}
  </div>
 );
};

export default ImageLibrary;
