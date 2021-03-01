import React, { useEffect, useContext, useState } from "react";
import ImageContext from "../../context/image/imageContext";
const ImageItem = ({ img }) => {
  const imageContext = useContext(ImageContext);
  const { getImage, image } = imageContext;
  const [pic, setPic] = useState(null);

  useEffect(() => {
    getImage(img);
  }, []);

  console.log(image);

  useEffect(() => {
    if (image !== null) {
      setPic(URL.createObjectURL(new Blob([image], { type: img.contentType })));
    }
  }, [image]);

  console.log(pic);
  return (
    <div className='card'>{pic !== null ? <img src={pic} alt='' /> : ""}</div>
  );
};

export default ImageItem;
