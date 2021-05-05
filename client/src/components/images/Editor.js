import React, { useState, useContext, useEffect, useRef } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageContext from "../../context/image/imageContext";
import ImageEditor from "@toast-ui/react-image-editor";
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");
const myTheme = {
 "menu.backgroundColor": "white",
 "common.backgroundColor": "#151515",
 "downloadButton.backgroundColor": "white",
 "downloadButton.borderColor": "white",
 "downloadButton.color": "black",
 "menu.normalIcon.path": icond,
 "menu.activeIcon.path": iconb,
 "menu.disabledIcon.path": icona,
 "menu.hoverIcon.path": iconc,
};

const Editor = ({ image, exitEditor }) => {
 const imageContext = useContext(ImageContext);
 const {
  deleteImage,
  putImage,
  clearCurrentImage,
  current,
  getImages,
 } = imageContext;
 const [imageSrc, setImageSrc] = useState("");
 const imageEditor = useRef("");

 console.log(current);
 const saveImageToDisk = () => {
  const imageEditorInst = imageEditor.current.imageEditorInst;

  const data = imageEditorInst.toDataURL();

  if (data) {
   const mimeType = data.split(";")[0];
   const extension = data.split(";")[0].split("/")[1];
   deleteImage(current._id);
   download(data, image.filename, mimeType);
  }
 };

 const [file, setFile] = useState([]);

 const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append(`${file[0].name}`, file[0]);
  putImage(formData);
  clearCurrentImage();
  exitEditor();
  window.location.reload();
 };

 useEffect(() => {
  if (file.length > 0) {
   setSubmitStatus(true);
  }
 }, [file.length]);

 const [submitStatus, setSubmitStatus] = useState(false);

 return (
  <div>
   <div className='all-center grid-2'>
    <h1>Photo Editor</h1>
    <div
     className='btn btn-primary btn-block'
     onClick={() => saveImageToDisk()}>
     Download Updated Image
    </div>
    <div>
     <form onSubmit={onSubmit}>
      <label htmlFor='images'>Upload Updated Image</label>
      {submitStatus ? (
       <div>
        <input
         type='submit'
         className='btn btn-primary btn-block'
         value='Upload New Image'
        />
       </div>
      ) : (
       <div>
        <input
         type='file'
         name='img'
         onChange={(e) => {
          setFile([...file, e.target.files[0]]);
         }}
         style={{ width: "200px" }}
        />
       </div>
      )}
     </form>
    </div>
   </div>
   <ImageEditor
    includeUI={{
     loadImage: {
      path: image.url,
      name: image.filename,
     },
     theme: myTheme,
     menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
     initMenu: "",
     uiSize: {
      height: `calc(100vh - 160px)`,
     },
     menuBarPosition: "bottom",
    }}
    cssMaxHeight={window.innerHeight}
    cssMaxWidth={window.innerWidth}
    selectionStyle={{
     cornerSize: 20,
     rotatingPointOffset: 70,
    }}
    usageStatistics={true}
    ref={imageEditor}
   />
  </div>
 );
};

export default Editor;
