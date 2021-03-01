import React from "react";
import parse from "html-react-parser";

const BlogPreviewer = ({ blog, resetPreview }) => {
  return (
    <div>
      <span style={{ float: "right" }} className='bg-light lead'>
        <a onClick={resetPreview}>X</a>
      </span>
      <div className='container bg-light'>
        <div className='all-center'>
          <h3 className='lead'>{blog.title}</h3>
          <h5>
            <i>{blog.date}</i>
          </h5>
        </div>
        <div className='m-2 container' style={{ textIndent: "25px" }}>
          <div>{parse(blog.p1)}</div>
          <br />
          <div
            className='all-center'
            style={{ height: "300px", width: "300px" }}>
            {blog.img2}
          </div>
          <br />
          <div className=''>{parse(blog.p2)}</div>
          <br />
          <div className='grid-2'>
            <div style={{ margin: "auto" }}>{parse(blog.p3)}</div>
            <div style={{ height: "600px", width: "600px" }}>{blog.img3}</div>
          </div>
          <br />
          <div className=''>{parse(blog.p4)}</div>
          <br />
          <div className=''>{parse(blog.p5)}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreviewer;
